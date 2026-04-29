/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs';
import path from 'path';
import ts from 'typescript';

/**
 * Creates the tsdown/Rolldown plugin used by the scoped-elements build to strip
 * global registration and add scoped child registration where needed.
 */
export function scopedElementsDecoratorStripPlugin() {
  return {
    name: 'scoped-elements-decorator-strip',
    transform(code, id) {
      const filePath = id.split('?')[0];
      const isTsSource = filePath.endsWith('.ts');
      const isComponentSource = filePath.includes('/src/components/');

      if (!isTsSource || !isComponentSource) {
        return null;
      }

      const scopedChildrenMapping = createScopedChildrenMapping(code, filePath);
      let transformed = code;
      if (scopedChildrenMapping) {
        transformed = applyScopedChildComponentTransforms(
          transformed,
          scopedChildrenMapping
        );
      }
      transformed = removeCustomElementRegistration(transformed, filePath);

      if (transformed === code) {
        return null;
      }

      return {
        code: transformed,
        map: null,
      };
    },
  };
}

/**
 * Builds the child-registration metadata for a component by resolving its
 * side-effect imports to decorated child component classes.
 */
function createScopedChildrenMapping(sourceText, filePath) {
  const currentComponent = getCustomElementMetadata(sourceText, filePath);
  if (!currentComponent?.className) {
    return undefined;
  }

  const importReplacements = [];
  const scopedChildDefinitions = [];
  const scopedChildDefinitionsByTagName = new Map();
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  const existingImportsByFilePath = getExistingImportsByFilePath(
    sourceFile,
    filePath
  );

  for (const statement of sourceFile.statements) {
    if (!isSideEffectImportDeclaration(statement)) {
      continue;
    }

    const childComponents = resolveScopedChildComponents(
      filePath,
      statement.moduleSpecifier.text
    );

    const uniqueChildComponents = childComponents
      .map((childComponent) => {
        const existingClassName = existingImportsByFilePath.get(
          childComponent.filePath
        );

        return {
          ...childComponent,
          className: existingClassName ?? childComponent.className,
          needsImport: !existingClassName,
        };
      })
      .filter((childComponent) => {
        if (
          childComponent.className === currentComponent.className ||
          scopedChildDefinitionsByTagName.has(childComponent.tagName)
        ) {
          return false;
        }

        scopedChildDefinitionsByTagName.set(
          childComponent.tagName,
          childComponent
        );
        scopedChildDefinitions.push({
          tagName: childComponent.tagName,
          elementClassName: childComponent.className,
        });
        return true;
      });

    if (uniqueChildComponents.length) {
      const childComponentImports = uniqueChildComponents
        .filter((childComponent) => childComponent.needsImport)
        .map(
          (childComponent) =>
            `import ${childComponent.className} from '${childComponent.importPath}';`
        );

      importReplacements.push({
        from: statement.getText(sourceFile),
        to: childComponentImports.join('\n'),
      });
    }
  }

  if (!scopedChildDefinitions.length) {
    return undefined;
  }

  return {
    className: currentComponent.className,
    importReplacements,
    scopedChildDefinitions,
  };
}

/**
 * Finds default imports already present in a source file so generated child
 * registration can reuse them instead of adding duplicate import declarations.
 */
function getExistingImportsByFilePath(sourceFile, filePath) {
  const importsByFilePath = new Map();

  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !statement.importClause?.name ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      continue;
    }

    const importedFilePath = resolveImportPath(
      filePath,
      statement.moduleSpecifier.text
    );
    if (!importedFilePath) {
      continue;
    }

    importsByFilePath.set(importedFilePath, statement.importClause.name.text);
  }

  return importsByFilePath;
}

/**
 * Returns whether an import only exists for module side effects, which is how
 * child custom elements are commonly registered in the standard build.
 */
function isSideEffectImportDeclaration(statement) {
  return (
    ts.isImportDeclaration(statement) &&
    !statement.importClause &&
    ts.isStringLiteral(statement.moduleSpecifier) &&
    statement.moduleSpecifier.text.startsWith('.')
  );
}

/**
 * Resolves a side-effect import to one or more decorated child components,
 * following simple barrel files recursively.
 */
function resolveScopedChildComponents(
  filePath,
  importSpecifier,
  visited = new Set()
) {
  const childFilePath = resolveImportPath(filePath, importSpecifier);
  if (!childFilePath || visited.has(childFilePath)) {
    return [];
  }

  visited.add(childFilePath);

  const sourceText = fs.readFileSync(childFilePath, 'utf8');
  const metadata = getCustomElementMetadata(sourceText, childFilePath);
  if (metadata?.className && metadata.tagName) {
    return [
      {
        ...metadata,
        importPath: getImportPath(filePath, childFilePath),
      },
    ];
  }

  const sourceFile = ts.createSourceFile(
    childFilePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  return sourceFile.statements.flatMap((statement) => {
    if (!isSideEffectImportDeclaration(statement)) {
      return [];
    }

    return resolveScopedChildComponents(
      childFilePath,
      statement.moduleSpecifier.text,
      visited
    ).map((childComponent) => ({
      ...childComponent,
      importPath: getImportPath(filePath, childComponent.filePath),
    }));
  });
}

/**
 * Resolves a relative TypeScript import specifier to an actual source file.
 */
function resolveImportPath(filePath, importSpecifier) {
  const basePath = path.resolve(path.dirname(filePath), importSpecifier);
  const candidates = [
    basePath,
    `${basePath}.ts`,
    path.join(basePath, 'index.ts'),
  ];

  return candidates.find((candidate) => {
    try {
      return fs.statSync(candidate).isFile();
    } catch {
      return false;
    }
  });
}

/**
 * Creates a source import path from one TypeScript file to another.
 */
function getImportPath(fromFilePath, toFilePath) {
  const relativePath = path
    .relative(path.dirname(fromFilePath), toFilePath)
    .replaceAll(path.sep, '/')
    .replace(/\.ts$/, '');

  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

/**
 * Extracts the class name and tag name from a decorated custom element class.
 */
function getCustomElementMetadata(sourceText, filePath) {
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  let metadata;
  const visit = (node) => {
    if (metadata || !ts.isClassDeclaration(node) || !node.name) {
      ts.forEachChild(node, visit);
      return;
    }

    const customElementDecorator = node.modifiers?.find(
      (modifier) =>
        ts.isDecorator(modifier) &&
        ts.isCallExpression(modifier.expression) &&
        ts.isIdentifier(modifier.expression.expression) &&
        modifier.expression.expression.text === 'customElement'
    );

    if (!customElementDecorator) {
      ts.forEachChild(node, visit);
      return;
    }

    const [tagNameArgument] = customElementDecorator.expression.arguments;
    const tagName = getCustomElementTagName(tagNameArgument, sourceFile);
    if (!tagName) {
      ts.forEachChild(node, visit);
      return;
    }

    metadata = {
      className: node.name.text,
      filePath,
      tagName,
    };
  };

  ts.forEachChild(sourceFile, visit);
  return metadata;
}

/**
 * Converts the supported `@customElement()` tag-name argument shapes into a
 * concrete tag name for scoped registry definitions.
 */
function getCustomElementTagName(node, sourceFile) {
  if (!node) {
    return undefined;
  }

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  const text = node.getText(sourceFile);
  const prefixTemplateMatch = text.match(/^`\$\{prefix\}(-[^`]*)`$/);
  if (prefixTemplateMatch) {
    return `cds${prefixTemplateMatch[1]}`;
  }

  return undefined;
}

/**
 * Applies child import rewrites and injects scoped registry setup into a
 * component source file.
 */
function applyScopedChildComponentTransforms(
  sourceText,
  scopedChildrenMapping
) {
  let transformed = sourceText;
  for (const importReplacement of scopedChildrenMapping.importReplacements) {
    transformed = transformed.replace(
      importReplacement.from,
      importReplacement.to
    );
  }
  transformed = addAdoptStylesImport(transformed);

  const scopedRegistryInjection = createScopedRegistryInjection(
    scopedChildrenMapping
  );
  return transformed.replace(
    '  static styles = styles;',
    `${scopedRegistryInjection}\n\n  static styles = styles;`
  );
}

/**
 * Adds Lit's `adoptStyles` helper import so injected render-root code can
 * preserve static styles after creating a registry-backed shadow root.
 */
function addAdoptStylesImport(sourceText) {
  const adoptStylesImport =
    "import { adoptStyles } from '@lit/reactive-element';";

  if (sourceText.includes(adoptStylesImport)) {
    return sourceText;
  }

  return sourceText.replace(
    "import { LitElement, html } from 'lit';",
    `${adoptStylesImport}\nimport { LitElement, html } from 'lit';`
  );
}

/**
 * Generates the class members that create a scoped child registry and attach it
 * to this component's shadow root.
 */
function createScopedRegistryInjection({ className, scopedChildDefinitions }) {
  const scopedChildDefinitionEntries = scopedChildDefinitions
    .map(
      ({ tagName, elementClassName }) =>
        `    { tagName: '${tagName}', elementClass: ${elementClassName} },`
    )
    .join('\n');

  return `  private static scopedChildDefinitions: Array<{
    tagName: string;
    elementClass: CustomElementConstructor;
  }> = [
${scopedChildDefinitionEntries}
  ];

  private static scopedChildRegistry: CustomElementRegistry | null | undefined;

  private static getScopedChildRegistry(): CustomElementRegistry | null {
    if (this.scopedChildRegistry !== undefined) {
      return this.scopedChildRegistry;
    }

    if (typeof CustomElementRegistry === 'undefined') {
      this.scopedChildRegistry = null;
      return this.scopedChildRegistry;
    }

    const registry = new CustomElementRegistry();
    for (const { tagName, elementClass } of this.scopedChildDefinitions) {
      if (registry.get(tagName)) {
        continue;
      }

      try {
        registry.define(tagName, elementClass);
      } catch {
        // Continue in case the runtime rejects a definition so other
        // child elements can still be available.
      }
    }

    this.scopedChildRegistry = registry;
    return this.scopedChildRegistry;
  }

  createRenderRoot() {
    const registry = (this.constructor as typeof ${className})
      .getScopedChildRegistry();

    if (!registry) {
      return super.createRenderRoot();
    }

    const shadowRootOptions =
      (this.constructor as typeof LitElement).shadowRootOptions ??
      LitElement.shadowRootOptions;
    const renderRoot = this.attachShadow({
      ...shadowRootOptions,
      // @ts-expect-error -- Native scoped custom element registries are not in TS DOM typings yet.
      customElements: registry,
      // @ts-expect-error -- Some implementations/polyfills use this name instead.
      customElementRegistry: registry,
    });
    adoptStyles(renderRoot, (this.constructor as typeof ${className}).elementStyles);

    return renderRoot;
  }`;
}

/**
 * Removes global custom-element self-registration from component modules while
 * preserving all other decorators and exports.
 */
export function removeCustomElementRegistration(sourceText, filePath) {
  let didChange = false;
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  const transformer = (context) => {
    const visit = (node) => {
      if (
        ts.isImportDeclaration(node) &&
        node.importClause?.namedBindings &&
        ts.isNamedImports(node.importClause.namedBindings)
      ) {
        const existingImports = node.importClause.namedBindings.elements;
        const nextImports = existingImports.filter(
          (importSpecifier) => importSpecifier.name.text !== 'customElement'
        );

        if (nextImports.length !== existingImports.length) {
          didChange = true;
          if (!nextImports.length && !node.importClause.name) {
            return undefined;
          }

          const namedBindings = nextImports.length
            ? ts.factory.updateNamedImports(
                node.importClause.namedBindings,
                nextImports
              )
            : undefined;
          const importClause = ts.factory.updateImportClause(
            node.importClause,
            node.importClause.isTypeOnly,
            node.importClause.name,
            namedBindings
          );

          return ts.factory.updateImportDeclaration(
            node,
            node.modifiers,
            importClause,
            node.moduleSpecifier,
            node.attributes
          );
        }
      }

      if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
        const currentModifiers = node.modifiers;
        if (currentModifiers?.length) {
          const nextModifiers = currentModifiers.filter((modifier) => {
            if (!ts.isDecorator(modifier)) {
              return true;
            }

            if (
              ts.isCallExpression(modifier.expression) &&
              ts.isIdentifier(modifier.expression.expression) &&
              modifier.expression.expression.text === 'customElement'
            ) {
              didChange = true;
              return false;
            }

            return true;
          });

          if (nextModifiers.length !== currentModifiers.length) {
            if (ts.isClassDeclaration(node)) {
              return ts.factory.updateClassDeclaration(
                node,
                nextModifiers,
                node.name,
                node.typeParameters,
                node.heritageClauses,
                node.members
              );
            }

            return ts.factory.updateClassExpression(
              node,
              nextModifiers,
              node.name,
              node.typeParameters,
              node.heritageClauses,
              node.members
            );
          }
        }
      }

      return ts.visitEachChild(node, visit, context);
    };

    return (node) => ts.visitNode(node, visit);
  };

  const result = ts.transform(sourceFile, [transformer]);
  const transformed = result.transformed[0];
  result.dispose();

  if (!didChange) {
    return sourceText;
  }

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printFile(transformed);
}
