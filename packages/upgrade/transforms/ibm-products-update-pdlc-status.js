/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { productsPreviewMap } = require('./nonStableMapping');

/**
 * Updates imports for non-stable components
 *
 * @example
 * Before:
 * import { SearchBar, InlineTip } from '@carbon/ibm-products';
 *
 * After:
 * import { previewCandidate__SearchBar as SearchBar, previewCandidate__InlineTip as InlineTip } from "@carbon/ibm-products";
 */

const nonStableComponentKeys = Object.keys(productsPreviewMap);

function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration, {
      source: {
        value: '@carbon/ibm-products',
      },
    })
    .forEach((path) => {
      const uniqueSpecifiers = new Set();
      const newSpecifiers = [];
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          nonStableComponentKeys.forEach((c) => {
            const importedName = specifier.imported.name;
            const localName = specifier.local
              ? specifier.local.name
              : importedName;
            let transformedImportedName = importedName;
            if (importedName === c) {
              transformedImportedName = productsPreviewMap[c];
              specifier.imported.name = transformedImportedName;
              // Build new import specifier so that
              // products components changing exports
              // are aliased to their original name.
              // This will help to avoid additional changes
              // within jsx.
              const importSpecifier = j.importSpecifier(
                j.identifier(transformedImportedName),
                // Use the already specified alias if there is one
                j.identifier(localName)
              );
              j(path).replaceWith(
                j.importDeclaration(
                  [...path.node.specifiers, importSpecifier],
                  path.node.source
                )
              );

              if (specifier.type === 'ImportSpecifier') {
                if (!uniqueSpecifiers.has(importedName)) {
                  uniqueSpecifiers.add(importedName);
                  newSpecifiers.push(importSpecifier);
                }
              } else {
                newSpecifiers.push(specifier);
              }
            }
          });
          // Replace the original specifiers with the new aliased ones
          // to prevent further changes needed in jsx for products components
          const others = path.node.specifiers.filter(
            (c) => !Object.values(productsPreviewMap).includes(c.imported.name)
          );
          path.node.specifiers = [...others, ...newSpecifiers];
        }
      });
    })
    .toSource();
}

module.exports = transformer;
