/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Custom Elements Manifest analyzer plugin for `@carbon/web-components`.
 *
 * The analyzer reads a tag from `@customElement('tag')` or
 * `customElements.define('tag', X)`. Carbon has neither: a class carries its
 * tag as `static is` and a barrel registers it with `defineCustomElement(X)`.
 * This plugin bridges the gap to the analyzer for what it cannot derive from
 * syntax alone.
 *
 * - tag names, from `static is`
 * - `custom-element-definition` exports, from `defineCustomElement()` calls
 * - superclasses imported under a different local name, and classes that share
 *   a name across modules, both of which break name-based inheritance
 * - event names dispatched through a static getter (`eventChange`)
 * - types and defaults that are inferred rather than written
 * - module paths, which have to name the shipped `es/*.js` rather than the
 *   `src/*.ts` it was built from
 *
 * Tracking: https://github.com/carbon-design-system/carbon/issues/22820
 */

import fs from 'node:fs';
import path from 'node:path';

// separates a class name from its module while two classes share the name
const MANGLE = '\u0000';

/**
 * @param {object} options
 * @param {() => import('typescript').TypeChecker} options.getChecker
 *   returns the type checker of the program the modules were created from
 * @param {string} [options.cwd] package root
 * @param {string} [options.srcDir] source directory, relative to `cwd`
 * @param {string} [options.outDir] shipped directory, relative to `cwd`
 */
export default function carbonCemPlugin({
  getChecker,
  cwd = process.cwd(),
  srcDir = 'src',
  outDir = 'es',
}) {
  let ts;
  let checker;

  // class name -> the modules declaring it, to spot names used more than once
  const classModules = new Map();
  // `file#Class` -> everything recorded about a class while analyzing
  const classes = new Map();
  // module path -> local name -> the declaration it was imported from
  const imports = new Map();
  // `defineCustomElement()` calls, resolved once every tag is known
  const definitions = [];
  const errors = [];

  const relative = (fileName) =>
    path.relative(cwd, path.resolve(cwd, fileName)).split(path.sep).join('/');
  const isSource = (file) => file.startsWith(`${srcDir}/`);
  const keyOf = (file, name) => `${file}#${name}`;
  const internalName = (file, name) =>
    (classModules.get(name)?.size ?? 0) > 1 ? `${name}${MANGLE}${file}` : name;
  const publicName = (name) => name.split(MANGLE)[0];

  /**
   * Follow an identifier through imports and re-exports to where it is
   * declared
   */
  function resolve(node) {
    let symbol = checker.getSymbolAtLocation(node);
    if (symbol && symbol.flags & ts.SymbolFlags.Alias) {
      symbol = checker.getAliasedSymbol(symbol);
    }
    const declaration = symbol?.valueDeclaration ?? symbol?.declarations?.[0];
    if (!declaration) return null;
    const file = relative(declaration.getSourceFile().fileName);
    const name = declaration.name?.getText?.() ?? symbol.getName();
    return { declaration, file, name };
  }

  /**
   * Evaluate an expression that is a string or number at build time, such as
   * `${prefix}-button`, `BUTTON_KIND.PRIMARY`, or a static getter returning
   * either
   */
  function evaluate(node, depth = 0) {
    if (!node || depth > 8) return undefined;
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (
      ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isNonNullExpression(node)
    ) {
      return evaluate(node.expression, depth + 1);
    }
    if (ts.isTemplateExpression(node)) {
      let text = node.head.text;
      for (const span of node.templateSpans) {
        const value = evaluate(span.expression, depth + 1);
        if (value === undefined) return undefined;
        text += value + span.literal.text;
      }
      return text;
    }
    if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node)) {
      const constant = ts.isPropertyAccessExpression(node)
        ? checker.getConstantValue(node)
        : undefined;
      if (constant !== undefined) return constant;
      const target = ts.isIdentifier(node) ? node : node.name;
      return evaluateDeclaration(resolve(target)?.declaration, depth + 1);
    }
    return undefined;
  }

  function evaluateDeclaration(declaration, depth) {
    if (!declaration) return undefined;
    if (
      ts.isVariableDeclaration(declaration) ||
      ts.isPropertyDeclaration(declaration) ||
      ts.isEnumMember(declaration)
    ) {
      return evaluate(declaration.initializer, depth);
    }
    if (ts.isGetAccessorDeclaration(declaration)) {
      const [statement] = declaration.body?.statements ?? [];
      return statement && ts.isReturnStatement(statement)
        ? evaluate(statement.expression, depth)
        : undefined;
    }
    // `const { eventChange } = this.constructor as typeof CDSCheckbox`
    if (ts.isBindingElement(declaration)) {
      const owner = declaration.parent.parent;
      const property = checker
        .getTypeAtLocation(owner.initializer ?? owner)
        .getProperty((declaration.propertyName ?? declaration.name).getText());
      return evaluateDeclaration(property?.valueDeclaration, depth);
    }
    return undefined;
  }

  /**
   * Print a type the way a consumer would write it. Enums are printed as the
   * values an attribute accepts rather than as the enum's name.
   */
  function printType(type) {
    const parts = type.isUnion() ? type.types : [type];
    const print = (part) =>
      checker.typeToString(part, undefined, ts.TypeFormatFlags.NoTruncation);
    if (!parts.some(isEnumLiteral)) {
      const text = print(type);
      return text === 'any' ? undefined : text;
    }
    const texts = new Set(
      parts.map((part) => {
        if (!isEnumLiteral(part)) return print(part);
        return typeof part.value === 'string' ? `'${part.value}'` : part.value;
      })
    );
    // the checker lists `boolean` in a union as its two literals
    if (texts.has('true') && texts.has('false')) {
      texts.delete('true');
      texts.delete('false');
      texts.add('boolean');
    }
    return [...texts].join(' | ');
  }

  const isEnumLiteral = (type) =>
    Boolean(type.flags & ts.TypeFlags.EnumLiteral) &&
    !(type.flags & ts.TypeFlags.BooleanLiteral);

  // the type named by `@property({ type: Boolean })`, for an untyped property
  function litType(member) {
    for (const { expression } of ts.getDecorators(member) ?? []) {
      const [options] = ts.isCallExpression(expression)
        ? expression.arguments
        : [];
      if (!options || !ts.isObjectLiteralExpression(options)) continue;
      const type = options.properties.find(
        (property) =>
          ts.isPropertyAssignment(property) &&
          property.name.getText() === 'type'
      );
      const text = type?.initializer.getText();
      if (['Boolean', 'String', 'Number'].includes(text)) {
        return text.toLowerCase();
      }
    }
    return undefined;
  }

  const isStatic = (member) =>
    member.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword
    ) ?? false;

  // names of the events a class body dispatches
  function dispatchedEvents(classNode) {
    const names = [];
    const visit = (node) => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === 'dispatchEvent'
      ) {
        const [event] = node.arguments;
        if (event && ts.isNewExpression(event) && event.arguments?.[0]) {
          const [nameNode] = event.arguments;
          const target = ts.isPropertyAccessExpression(nameNode)
            ? nameNode.name
            : nameNode;
          const declaration = ts.isIdentifier(target)
            ? resolve(target)?.declaration
            : undefined;
          const binding =
            declaration && ts.isBindingElement(declaration)
              ? (declaration.propertyName ?? declaration.name).getText()
              : undefined;
          names.push({
            // set when the name is read off the constructor, where a subclass
            // can override it
            member:
              binding ??
              (declaration &&
              ts.isClassLike(declaration.parent) &&
              isStatic(declaration)
                ? declaration.name.getText()
                : undefined),
            value: evaluate(nameNode),
            type: event.expression.getText(),
          });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(classNode);
    return names;
  }

  function analyzeClass(node, moduleDoc) {
    const file = moduleDoc.path;
    const name = node.name.getText();
    const classDoc = moduleDoc.declarations.find(
      (declaration) => declaration.kind === 'class' && declaration.name === name
    );
    if (!classDoc) return;

    const record = {
      file,
      name,
      statics: new Map(),
      dispatched: dispatchedEvents(node),
      superclass: undefined,
    };
    classes.set(keyOf(file, name), record);

    for (const member of node.members) {
      const memberName = member.name?.getText?.();
      if (!memberName) continue;

      if (isStatic(member)) {
        const value = evaluateDeclaration(member, 0);
        if (typeof value === 'string') record.statics.set(memberName, value);
        continue;
      }

      if (
        !ts.isPropertyDeclaration(member) &&
        !ts.isGetAccessorDeclaration(member)
      ) {
        continue;
      }
      const memberDoc = classDoc.members?.find(
        (doc) => doc.name === memberName && !doc.static
      );
      const attributeDoc = classDoc.attributes?.find(
        (doc) => doc.fieldName === memberName
      );
      const type = checker.getTypeAtLocation(member);
      const isEnum = (type.isUnion() ? type.types : [type]).some(isEnumLiteral);
      const text = printType(type) ?? litType(member);
      const initializer = ts.isPropertyDeclaration(member)
        ? member.initializer
        : undefined;
      const value =
        initializer &&
        (ts.isIdentifier(initializer) ||
          ts.isPropertyAccessExpression(initializer))
          ? evaluate(initializer)
          : undefined;
      for (const doc of [memberDoc, attributeDoc]) {
        if (!doc) continue;
        if (text && (isEnum || !doc.type?.text)) doc.type = { text };
        if (value !== undefined) {
          doc.default = typeof value === 'string' ? `'${value}'` : `${value}`;
        }
      }
    }

    // Not every class is converted to `static is` yet. One still registered by
    // a decorator defines its element from its own module, on import.
    const decorator = ts
      .getDecorators(node)
      ?.map(({ expression }) => expression)
      .find(
        (expression) =>
          ts.isCallExpression(expression) &&
          ['customElement', 'carbonElement'].includes(
            expression.expression.getText()
          )
      );
    const decoratorTag = decorator && evaluate(decorator.arguments[0]);
    if (typeof decoratorTag === 'string') {
      record.decoratorTag = decoratorTag;
      definitions.push({ moduleDoc, target: record, name: decoratorTag });
    }

    const tagName = record.statics.get('is') ?? record.decoratorTag;
    if (tagName) {
      if (classDoc.tagName && classDoc.tagName !== tagName) {
        errors.push(
          `${file}: ${name} documents \`@element ${classDoc.tagName}\` but registers as \`${tagName}\``
        );
      }
      classDoc.tagName = tagName;
      classDoc.customElement = true;
      const isDoc = classDoc.members?.find(
        (doc) => doc.name === 'is' && doc.static
      );
      if (isDoc) {
        isDoc.type = { text: 'string' };
        isDoc.default = `'${tagName}'`;
      }
    }

    // `extends HostListenerMixin(FocusMixin(LitElement))`
    const heritage = node.heritageClauses?.find(
      (clause) => clause.token === ts.SyntaxKind.ExtendsKeyword
    )?.types[0]?.expression;
    const references = [];
    let superclassNode;
    for (let expression = heritage; expression; ) {
      if (ts.isCallExpression(expression)) {
        references.push(expression.expression);
        [expression] = expression.arguments;
      } else {
        references.push(expression);
        superclassNode = expression;
        break;
      }
    }
    for (const reference of references) {
      if (!ts.isIdentifier(reference)) continue;
      const target = resolve(reference);
      if (!target || !isSource(target.file)) continue;
      if (reference === superclassNode) {
        record.superclass = keyOf(target.file, target.name);
      }
      for (const doc of [classDoc.superclass, ...(classDoc.mixins ?? [])]) {
        if (doc?.name === reference.text) {
          doc.name = internalName(target.file, target.name);
          doc.module = target.file;
          delete doc.package;
        }
      }
    }
  }

  // the static string `member` resolves to on a class, honoring overrides
  function staticOf(key, member) {
    for (let record = classes.get(key); record; ) {
      if (record.statics.has(member)) return record.statics.get(member);
      record = classes.get(record.superclass);
    }
    return undefined;
  }

  function linkEvents(classDoc, key) {
    // drop what the analyzer guessed from `dispatchEvent()`: the name is
    // either missing or the identifier it was read from
    const events = (classDoc.events ?? []).filter(
      (event) => event.name && !/^event[A-Z]/.test(event.name)
    );
    for (let record = classes.get(key); record; ) {
      for (const { member, value, type } of record.dispatched) {
        const name = (member && staticOf(key, member)) ?? value;
        if (typeof name !== 'string') continue;
        const existing = events.find((event) => event.name === name);
        if (existing) {
          existing.type ??= { text: type };
        } else {
          events.push({
            name,
            type: { text: type },
            ...(record === classes.get(key)
              ? {}
              : { inheritedFrom: { name: record.name, module: record.file } }),
          });
        }
      }
      record = classes.get(record.superclass);
    }
    if (events.length) classDoc.events = events;
    else delete classDoc.events;
  }

  // a union written across several lines keeps its line breaks otherwise
  function tidyType(doc) {
    if (doc.type?.text) {
      doc.type.text = doc.type.text.replace(/\s+/g, ' ').replace(/^\| /, '');
    }
  }

  // Members that are not API: `private` ones, and ones named as internal
  // without saying so. `protected` members stay, for subclasses.
  const isInternal = (member) =>
    member.privacy === 'private' ||
    (!member.privacy && member.name.startsWith('_'));

  function linkMembers(classDoc) {
    const internal = new Map(
      (classDoc.members ?? [])
        .filter(isInternal)
        .map((member) => [member.name, member])
    );
    if (classDoc.members) {
      classDoc.members = classDoc.members.filter(
        (member) => !isInternal(member)
      );
      for (const member of classDoc.members) {
        if (member.attribute) member.attribute = member.attribute.toLowerCase();
        tidyType(member);
      }
    }
    if (classDoc.attributes) {
      // A subclass redeclaring a property replaces the attribute it inherited.
      // Attributes are listed nearest class first, so the first one wins.
      const seen = new Set();
      classDoc.attributes = classDoc.attributes.filter((attribute) => {
        attribute.name = attribute.name.toLowerCase();
        tidyType(attribute);
        // A property named as internal is still API when it is given an
        // attribute name of its own, as `checked` is on `cds-toggle`.
        const field = internal.get(attribute.fieldName);
        if (field) {
          if (
            field.privacy === 'private' ||
            attribute.name === attribute.fieldName.toLowerCase()
          ) {
            return false;
          }
          delete attribute.fieldName;
        }
        const keys = [attribute.name, attribute.fieldName].filter(Boolean);
        if (keys.some((key) => seen.has(key))) return false;
        keys.forEach((key) => seen.add(key));
        return true;
      });
    }
  }

  // `src/components/button/button.ts` -> `es/components/button/button.js`
  function shippedPath(modulePath, from) {
    let file = modulePath.replace(/^\//, '');
    if (file.startsWith('.')) {
      file = path.posix.join(path.posix.dirname(from), file);
    }
    if (!isSource(file)) return modulePath;
    if (!/\.ts$/.test(file)) {
      const candidate = [`${file}.ts`, `${file}/index.ts`].find((name) =>
        fs.existsSync(path.join(cwd, name))
      );
      if (!candidate) return modulePath;
      file = candidate;
    }
    return `${outDir}/${file.slice(srcDir.length + 1).replace(/\.ts$/, '.js')}`;
  }

  // rewrite every module reference and restore names mangled for uniqueness
  function finalize(value, from) {
    if (Array.isArray(value)) {
      value.forEach((item) => finalize(item, from));
    } else if (value && typeof value === 'object') {
      delete value.__file;
      if (typeof value.module === 'string') {
        value.module = shippedPath(value.module, from);
      }
      if (typeof value.name === 'string') value.name = publicName(value.name);
      Object.values(value).forEach((item) => finalize(item, from));
    }
  }

  return {
    name: 'carbon-web-components',

    initialize({ ts: typescript }) {
      ts = typescript;
      checker = getChecker();
    },

    collectPhase({ node }) {
      if (
        ts.isClassDeclaration(node) &&
        node.name &&
        ts.isSourceFile(node.parent)
      ) {
        const name = node.name.getText();
        if (!classModules.has(name)) classModules.set(name, new Set());
        classModules.get(name).add(relative(node.getSourceFile().fileName));
      }
    },

    analyzePhase({ node, moduleDoc }) {
      if (ts.isSourceFile(node)) {
        moduleDoc.path = relative(moduleDoc.path);
        return;
      }

      if (
        ts.isClassDeclaration(node) &&
        node.name &&
        ts.isSourceFile(node.parent)
      ) {
        analyzeClass(node, moduleDoc);
        return;
      }

      if (ts.isImportDeclaration(node) && node.importClause) {
        const { name, namedBindings } = node.importClause;
        const locals = [
          ...(name ? [name] : []),
          ...(namedBindings && ts.isNamedImports(namedBindings)
            ? namedBindings.elements.map((element) => element.name)
            : []),
        ];
        for (const local of locals) {
          const target = resolve(local);
          if (!target || !isSource(target.file)) continue;
          if (!imports.has(moduleDoc.path)) {
            imports.set(moduleDoc.path, new Map());
          }
          imports.get(moduleDoc.path).set(local.text, target);
        }
        return;
      }

      // `defineCustomElement(CDSButton)`
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === 'defineCustomElement' &&
        ts.isExpressionStatement(node.parent) &&
        ts.isSourceFile(node.parent.parent)
      ) {
        const [classArg, options] = node.arguments;
        const target = classArg && resolve(classArg);
        if (!target) {
          errors.push(
            `${moduleDoc.path}: cannot resolve \`${node.getText()}\` to a class`
          );
          return;
        }
        const nameOption =
          options && ts.isObjectLiteralExpression(options)
            ? options.properties.find(
                (property) =>
                  ts.isPropertyAssignment(property) &&
                  property.name.getText() === 'name'
              )
            : undefined;
        definitions.push({
          moduleDoc,
          target,
          name: nameOption ? evaluate(nameOption.initializer) : undefined,
        });
      }
    },

    moduleLinkPhase({ moduleDoc }) {
      for (const declaration of moduleDoc.declarations ?? []) {
        if (declaration.kind !== 'class') continue;
        declaration.__file = moduleDoc.path;
        const mangled = internalName(moduleDoc.path, declaration.name);
        if (mangled === declaration.name) continue;
        for (const exported of moduleDoc.exports ?? []) {
          if (exported.declaration?.name === declaration.name) {
            exported.declaration.name = mangled;
          }
        }
        declaration.name = mangled;
      }
    },

    packageLinkPhase({ customElementsManifest }) {
      const tags = new Map();

      for (const moduleDoc of customElementsManifest.modules) {
        for (const classDoc of moduleDoc.declarations ?? []) {
          if (classDoc.kind === 'mixin') linkMembers(classDoc);
          if (classDoc.kind !== 'class') continue;
          const key = keyOf(moduleDoc.path, publicName(classDoc.name));
          linkEvents(classDoc, key);
          linkMembers(classDoc);
          if (classDoc.tagName) {
            const other = tags.get(classDoc.tagName);
            if (other) {
              errors.push(
                `\`${classDoc.tagName}\` is declared by both ${other} and ${moduleDoc.path}`
              );
            }
            tags.set(classDoc.tagName, moduleDoc.path);
          }
        }
      }

      // The analyzer's own definitions come from the decorator, whose tag it
      // cannot read out of a template literal. They are replaced below.
      for (const moduleDoc of customElementsManifest.modules) {
        moduleDoc.exports = moduleDoc.exports?.filter(
          (exported) => exported.kind !== 'custom-element-definition'
        );
      }

      const defined = new Set();
      for (const { moduleDoc, target, name } of definitions) {
        const record = classes.get(keyOf(target.file, target.name));
        // the decorator has already defined the element from its own module
        if (record?.decoratorTag && target !== record) continue;
        const tagName = name ?? record?.statics.get('is');
        if (!tagName) {
          errors.push(
            `${moduleDoc.path}: \`defineCustomElement(${target.name})\` registers a class with no \`static is\``
          );
          continue;
        }
        defined.add(tagName);
        (moduleDoc.exports ??= []).push({
          kind: 'custom-element-definition',
          name: tagName,
          declaration: { name: target.name, module: target.file },
        });
      }

      for (const [tagName, file] of tags) {
        if (!defined.has(tagName)) {
          errors.push(
            `${file}: \`${tagName}\` is never registered; pass its class to \`defineCustomElement()\` in a barrel`
          );
        }
      }

      for (const moduleDoc of customElementsManifest.modules) {
        // a barrel re-exporting what it imported points at itself; point it at
        // the module that declares the class instead
        for (const exported of moduleDoc.exports ?? []) {
          const { declaration } = exported;
          if (
            exported.kind !== 'js' ||
            declaration?.module !== moduleDoc.path ||
            moduleDoc.declarations?.some(
              (local) => local.name === declaration.name
            )
          ) {
            continue;
          }
          const target = imports.get(moduleDoc.path)?.get(declaration.name);
          if (target) {
            declaration.name = target.name;
            declaration.module = target.file;
          }
        }
      }

      customElementsManifest.modules = customElementsManifest.modules.filter(
        (moduleDoc) =>
          moduleDoc.declarations?.length || moduleDoc.exports?.length
      );
      for (const moduleDoc of customElementsManifest.modules) {
        const from = moduleDoc.path;
        moduleDoc.path = shippedPath(from, from);
        finalize(moduleDoc.declarations, from);
        finalize(moduleDoc.exports, from);
      }

      if (errors.length) {
        throw new Error(
          `Custom Elements Manifest could not be generated:\n- ${errors.join('\n- ')}`
        );
      }
    },
  };
}
