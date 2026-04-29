/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ts from 'typescript';

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

      const transformed = removeCustomElementRegistration(code, filePath);
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
