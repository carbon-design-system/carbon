/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Framework-agnostic helpers for turning one export of a CSF stories module
 * into standalone code.
 *
 * Inherits `render` or `args` from the default export, and its render
 * function calls helpers, constants and imports declared elsewhere in module.
 * `extractStory()` keeps the story and the default export then tree-shakes
 * the module down to top-level declarations and imports they reference,
 * transitively.
 *
 * The result is plain data (source text plus import declarations). Turning it
 * into a project, including how imports are rewritten, is handled in
 * framework-specific generator.
 */

import fs from 'node:fs';
import { storyNameFromExport, toId } from 'storybook/internal/csf';
import ts from 'typescript';

// Storybook-specific keys of a story or meta object
const STORYBOOK_ONLY_KEYS = new Set([
  'beforeEach',
  'component',
  'decorators',
  'excludeStories',
  'id',
  'includeStories',
  'loaders',
  'name',
  'parameters',
  'play',
  'storyName',
  'subcomponents',
  'tags',
  'title',
]);

export function parseModule(file, text = fs.readFileSync(file, 'utf8')) {
  const kind = /\.tsx?$/.test(file)
    ? file.endsWith('x')
      ? ts.ScriptKind.TSX
      : ts.ScriptKind.TS
    : file.endsWith('x')
      ? ts.ScriptKind.JSX
      : ts.ScriptKind.JS;
  return ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
}

const unwrap = (node) => {
  while (
    node &&
    (ts.isAsExpression(node) ||
      ts.isParenthesizedExpression(node) ||
      ts.isSatisfiesExpression(node) ||
      ts.isTypeAssertionExpression(node))
  ) {
    node = node.expression;
  }
  return node;
};

const isExported = (statement) =>
  statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);

function bindingNames(name, out = []) {
  if (ts.isIdentifier(name)) {
    out.push(name.text);
  } else {
    for (const element of name.elements ?? []) {
      if (!ts.isOmittedExpression(element)) {
        bindingNames(element.name, out);
      }
    }
  }
  return out;
}

// names bound by import declaration, excluding type-only bindings
export function importedNames(declaration) {
  const clause = declaration.importClause;
  if (!clause || clause.isTypeOnly) {
    return [];
  }
  const names = [];
  if (clause.name) {
    names.push(clause.name.text);
  }
  const bindings = clause.namedBindings;
  if (bindings && ts.isNamespaceImport(bindings)) {
    names.push(bindings.name.text);
  }
  if (bindings && ts.isNamedImports(bindings)) {
    for (const element of bindings.elements) {
      if (!element.isTypeOnly) {
        names.push(element.name.text);
      }
    }
  }
  return names;
}

// Index a CSF module: imports, top-level declarations, the default export
// (meta), named story exports and CSF2-style `Story.args = ...` assignments
export function analyzeCsf(sourceFile) {
  const imports = new Map(); // local name -> ImportDeclaration
  const sideEffectImports = [];
  const declarations = new Map(); // name -> top-level statement
  const assignments = new Map(); // story name -> [ExpressionStatement]
  const stories = [];
  let meta = null;

  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement)) {
      if (!statement.importClause) {
        sideEffectImports.push(statement);
      }
      for (const name of importedNames(statement)) {
        imports.set(name, statement);
      }
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        for (const name of bindingNames(declaration.name)) {
          declarations.set(name, statement);
        }
        if (isExported(statement) && ts.isIdentifier(declaration.name)) {
          stories.push({
            name: declaration.name.text,
            init: unwrap(declaration.initializer),
          });
        }
      }
    } else if (
      (ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement)) &&
      statement.name
    ) {
      declarations.set(statement.name.text, statement);
    } else if (ts.isExportAssignment(statement)) {
      meta = unwrap(statement.expression);
    } else if (
      ts.isExpressionStatement(statement) &&
      ts.isBinaryExpression(statement.expression) &&
      statement.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isPropertyAccessExpression(statement.expression.left) &&
      ts.isIdentifier(statement.expression.left.expression)
    ) {
      const story = statement.expression.left.expression.text;
      if (!assignments.has(story)) {
        assignments.set(story, []);
      }
      assignments.get(story).push(statement);
    }
  }

  // `const meta = {...}; export default meta;`
  if (meta && ts.isIdentifier(meta)) {
    const statement = declarations.get(meta.text);
    const declaration = statement?.declarationList?.declarations.find(
      (d) => ts.isIdentifier(d.name) && d.name.text === meta.text
    );
    meta = unwrap(declaration?.initializer) ?? null;
  }

  return {
    imports,
    sideEffectImports,
    declarations,
    assignments,
    stories,
    meta,
  };
}

// Identifiers in `node` that refer to one of `names`, excluding property names
// and object keys; shorthand properties count as references
function referencedNames(node, names, found = new Set()) {
  const visit = (n) => {
    if (ts.isIdentifier(n) && names.has(n.text)) {
      const parent = n.parent;
      const isPropertyName =
        parent &&
        ((ts.isPropertyAccessExpression(parent) && parent.name === n) ||
          (ts.isPropertyAssignment(parent) && parent.name === n) ||
          (ts.isMethodDeclaration(parent) && parent.name === n) ||
          (ts.isPropertyDeclaration(parent) && parent.name === n));
      if (!isPropertyName) {
        found.add(n.text);
      }
    }
    ts.forEachChild(n, visit);
  };
  visit(node);
  return found;
}

const keyOf = (sourceFile, property) =>
  property.name?.getText(sourceFile).replace(/^['"]|['"]$/g, '');

// object literal props that aren't Storybook-specific
function runtimeProperties(sourceFile, object, { keepArgTypes, keep }) {
  if (!object || !ts.isObjectLiteralExpression(object)) {
    return [];
  }
  return object.properties.filter((property) => {
    const key = keyOf(sourceFile, property);
    if (key === 'argTypes') {
      return keepArgTypes;
    }
    return keep.has(key) || !STORYBOOK_ONLY_KEYS.has(key);
  });
}

const hasKey = (sourceFile, properties, key) =>
  properties.some((p) => keyOf(sourceFile, p) === key);

const objectText = (sourceFile, properties) =>
  properties.length
    ? `{\n${properties.map((p) => `  ${p.getText(sourceFile)}`).join(',\n')},\n}`
    : '{}';

// names of argTypes that declare `mapping`
function mappedArgNames(sourceFile, nodes) {
  const names = new Set();
  const visit = (node) => {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isObjectLiteralExpression(node.initializer) &&
      node.initializer.properties.some(
        (p) => keyOf(sourceFile, p) === 'mapping'
      )
    ) {
      names.add(keyOf(sourceFile, node));
    }
    ts.forEachChild(node, visit);
  };
  for (const node of nodes) {
    if (node) {
      visit(node);
    }
  }
  return names;
}

/**
 * Arg names a story sets, from `args` objects in `nodes`.
 * Follows identifiers and spreads to top-level object literals;
 * returns null when it can't tell, e.g. computed args.
 */
function storyArgNames(sourceFile, csf, nodes) {
  const names = new Set();
  const resolve = (name) => {
    const statement = csf.declarations.get(name);
    const declaration = statement?.declarationList?.declarations.find(
      (d) => ts.isIdentifier(d.name) && d.name.text === name
    );
    return unwrap(declaration?.initializer);
  };
  const seen = new Set();
  const addObject = (node) => {
    node = unwrap(node);
    if (!node) {
      return true;
    }
    if (ts.isIdentifier(node)) {
      if (seen.has(node.text)) {
        return true;
      }
      seen.add(node.text);
      return addObject(resolve(node.text));
    }
    if (!ts.isObjectLiteralExpression(node)) {
      return false;
    }
    for (const property of node.properties) {
      if (ts.isSpreadAssignment(property)) {
        if (!addObject(property.expression)) {
          return false;
        }
      } else {
        names.add(keyOf(sourceFile, property));
      }
    }
    return true;
  };
  for (const node of nodes) {
    const object = unwrap(node);
    if (!object) {
      continue;
    }
    if (ts.isObjectLiteralExpression(object)) {
      for (const property of object.properties) {
        if (keyOf(sourceFile, property) !== 'args') {
          continue;
        }
        const value = ts.isShorthandPropertyAssignment(property)
          ? property.name
          : property.initializer;
        if (!addObject(value)) {
          return null;
        }
      }
      // a spread story (`...Default`) might carry args we can't see here
      if (object.properties.some((p) => ts.isSpreadAssignment(p))) {
        for (const p of object.properties.filter(ts.isSpreadAssignment)) {
          const target = unwrap(p.expression);
          if (!ts.isIdentifier(target)) {
            return null;
          }
          const spread = storyArgNames(sourceFile, csf, [resolve(target.text)]);
          if (spread === null) {
            return null;
          }
          for (const n of spread) {
            names.add(n);
          }
        }
      }
    } else if (!addObject(object)) {
      // A CSF2 `Story.args = ...` value
      return null;
    }
  }
  return names;
}

/**
 * Extract one story as standalone source
 *
 * Returns:
 * - `story`: object literal source for the story (runtime keys only)
 * - `meta`: same for the default export, or null when the story doesn't use it
 * - `renderFrom`: 'story' | 'meta' | 'either' — where `render` comes from
 * - `declarations`: referenced top-level statements, in source order
 * - `imports`: side-effect imports plus the imports binding referenced names,
 *   each as `{ declaration, names }` (names = the referenced local bindings)
 * - `usesArgTypesMapping`: whether `argTypes.mapping` must be applied
 *
 * `options.keep`: Storybook keys the framework renders with, e.g. React's
 * `component` (a story without `render` renders `meta.component`)
 */
export function extractStory(sourceFile, csf, storyName, { keep = [] } = {}) {
  keep = new Set(keep);
  const entry = csf.stories.find((s) => s.name === storyName);
  if (!entry) {
    throw new Error(`No story export named "${storyName}"`);
  }

  const text = (node) => node.getText(sourceFile);

  let init = entry.init;
  let storySource;
  let storySpreads = false;
  let usesArgTypesMapping = false;

  // CSF2: `export const Story = Template.bind({}); Story.args = {...};`
  const csf2 = (csf.assignments.get(storyName) ?? [])
    .map((statement) => ({
      key: statement.expression.left.name.text,
      value: statement.expression.right,
    }))
    .filter(({ key }) => key === 'args' || key === 'render');

  if (init && ts.isObjectLiteralExpression(init)) {
    storySpreads = init.properties.some((p) => ts.isSpreadAssignment(p));
  }

  // Collect referenced names first so `usesArgTypesMapping` can account for
  // argTypes declared elsewhere, e.g. `argTypes: sharedArgTypes`
  const topLevel = new Set([...csf.declarations.keys(), ...csf.imports.keys()]);

  const build = (keepArgTypes) => {
    // Story object entries, as source text
    let entries;
    if (init && ts.isObjectLiteralExpression(init)) {
      entries = runtimeProperties(sourceFile, init, {
        keepArgTypes,
        keep,
      }).map(text);
    } else if (
      init &&
      (ts.isArrowFunction(init) || ts.isFunctionExpression(init))
    ) {
      entries = [`render: ${text(init)}`];
    } else if (
      init &&
      ts.isCallExpression(init) &&
      ts.isPropertyAccessExpression(init.expression) &&
      init.expression.name.text === 'bind'
    ) {
      entries = [`render: ${text(init.expression.expression)}`];
    } else {
      entries = init ? [`...${text(init)}`] : [];
      storySpreads = true;
    }
    for (const { key, value } of csf2) {
      entries.push(`${key}: ${text(value)}`);
    }
    storySource = entries.length
      ? `{\n${entries.map((e) => `  ${e}`).join(',\n')},\n}`
      : '{}';

    let renderFrom;
    const storyHasRender = entries.some((e) => /^render\s*[:(]/.test(e));
    const metaProps = runtimeProperties(sourceFile, csf.meta, {
      keepArgTypes,
      keep,
    });
    const metaHasRender =
      hasKey(sourceFile, metaProps, 'render') ||
      (keep.has('component') && hasKey(sourceFile, metaProps, 'component'));
    const metaHasArgs = hasKey(sourceFile, metaProps, 'args');

    if (storyHasRender) {
      renderFrom = 'story';
    } else if (storySpreads) {
      renderFrom = metaHasRender ? 'either' : 'story';
    } else {
      renderFrom = 'meta';
    }

    const needsMeta =
      metaHasArgs ||
      renderFrom !== 'story' ||
      (keepArgTypes && hasKey(sourceFile, metaProps, 'argTypes'));
    const metaSource = needsMeta ? objectText(sourceFile, metaProps) : null;

    // Transitive closure over referenced top-level names
    const roots = [
      parseModule(
        sourceFile.languageVariant === ts.LanguageVariant.JSX
          ? 'story.tsx'
          : 'story.ts',
        `(${storySource});(${metaSource ?? '{}'});`
      ),
    ];
    const needed = new Set();
    for (const root of roots) {
      referencedNames(root, topLevel, needed);
    }
    needed.delete(storyName);
    const queue = [...needed];
    const statements = new Set();
    while (queue.length) {
      const name = queue.pop();
      const statement = csf.declarations.get(name);
      if (!statement || statements.has(statement)) {
        continue;
      }
      statements.add(statement);
      for (const ref of referencedNames(statement, topLevel)) {
        if (!needed.has(ref)) {
          needed.add(ref);
          queue.push(ref);
        }
      }
    }
    return {
      renderFrom,
      metaSource,
      needed,
      statements,
    };
  };

  // argTypes are dropped unless the story sets an arg whose argType maps
  // control values, such as an icon name to an icon. The argType might
  // be declared elsewhere in the module, e.g. `argTypes: sharedArgTypes`
  const withArgTypes = build(true);
  const mapped = mappedArgNames(sourceFile, [
    init,
    csf.meta,
    ...withArgTypes.statements,
  ]);
  if (mapped.size) {
    const argNames = storyArgNames(sourceFile, csf, [
      init,
      csf.meta,
      ...csf2.filter(({ key }) => key === 'args').map(({ value }) => value),
    ]);
    usesArgTypesMapping =
      argNames === null || [...argNames].some((name) => mapped.has(name));
  }
  const result = usesArgTypesMapping ? withArgTypes : build(false);

  const declarations = sourceFile.statements.filter((s) =>
    result.statements.has(s)
  );
  const importDeclarations = new Set(csf.sideEffectImports);
  for (const name of result.needed) {
    if (csf.imports.has(name)) {
      importDeclarations.add(csf.imports.get(name));
    }
  }
  const imports = sourceFile.statements
    .filter((s) => importDeclarations.has(s))
    .map((declaration) => ({
      declaration,
      names: new Set(
        importedNames(declaration).filter((n) => result.needed.has(n))
      ),
    }));

  return {
    story: storySource,
    meta: result.metaSource,
    renderFrom: result.renderFrom,
    declarations,
    imports,
    topLevelNames: topLevel,
    usesArgTypesMapping,
  };
}

const stringProperty = (sourceFile, object, key) => {
  if (!object || !ts.isObjectLiteralExpression(object)) {
    return null;
  }
  const property = object.properties.find(
    (p) => ts.isPropertyAssignment(p) && p.name.getText(sourceFile) === key
  );
  return property && ts.isStringLiteralLike(property.initializer)
    ? property.initializer.text
    : null;
};

// The default export's `title`, or null.
export const metaTitle = (sourceFile, meta) =>
  stringProperty(sourceFile, meta, 'title');

// Story export names of a stories module.
export function storyNames(file) {
  return analyzeCsf(parseModule(file)).stories.map((s) => s.name);
}

// display name a story sets for itself (`name: '...'`, or CSF2
// `Story.storyName = '...'`), if any
function ownName(sourceFile, csf, story) {
  for (const statement of csf.assignments.get(story.name) ?? []) {
    const { left, right } = statement.expression;
    if (left.name.text === 'storyName' && ts.isStringLiteralLike(right)) {
      return right.text;
    }
  }
  return stringProperty(sourceFile, story.init, 'name');
}

// `{ id, title, name }` (as Storybook names them) per story export.
export function storyEntries(file) {
  const sourceFile = parseModule(file);
  const csf = analyzeCsf(sourceFile);
  const title = metaTitle(sourceFile, csf.meta);
  if (!title) {
    return new Map();
  }
  return new Map(
    csf.stories.map((story) => {
      const storyName = storyNameFromExport(story.name);
      return [
        story.name,
        {
          id: toId(title, storyName),
          title,
          name: ownName(sourceFile, csf, story) ?? storyName,
        },
      ];
    })
  );
}

// Source text of a top-level statement without its `export` keyword, so the
// extracted code reads like an app module rather than a stories module.
export function statementText(sourceFile, statement) {
  return statement.getText(sourceFile).replace(/^export\s+(?!default)/, '');
}

// every `html` tagged template's raw text in module, for tag scanning
export function htmlTemplates(sourceFile) {
  const templates = [];
  const visit = (node) => {
    if (
      ts.isTaggedTemplateExpression(node) &&
      ts.isIdentifier(node.tag) &&
      node.tag.text === 'html'
    ) {
      templates.push(node.template.getText(sourceFile));
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return templates;
}

export { ts };
