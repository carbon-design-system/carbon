/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { reactPreviewMap, productsPreviewMap } = require('./nonStableMapping');

/**
 * Updates imports for non-stable components
 *
 * @example
 * Before:
 * import { unstable__FluidTimePicker } from '@carbon/react';
 * import { SearchBar } from '@carbon/ibm-products';
 *
 * After:
 * import { preview__FluidTimePicker } from "@carbon/react";
 * import { previewCandidate__SearchBar as SearchBar } from '@carbon/ibm-products';
 */

const allPreviews = { ...reactPreviewMap, ...productsPreviewMap };
const nonStableKeys = Object.keys(allPreviews);

const carbonPackages = ['@carbon/react', '@carbon/ibm-products'];

function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  carbonPackages.forEach((p) => {
    root
      .find(j.ImportDeclaration, {
        source: {
          value: p,
        },
      })
      .forEach((path) => {
        const uniqueSpecifiers = new Set();
        const newSpecifiers = [];
        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            nonStableKeys.forEach((c) => {
              const importedName = specifier.imported.name;
              const localName = specifier.local
                ? specifier.local.name
                : importedName;
              let transformedImportedName = importedName;
              if (importedName === c) {
                transformedImportedName = allPreviews[c];
                specifier.imported.name = transformedImportedName;
                if (p === '@carbon/ibm-products') {
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
              }
            });
            // Replace the original specifiers with the new aliased ones
            // to prevent further changes needed in jsx for products components
            if (p === '@carbon/ibm-products') {
              const others = path.node.specifiers.filter(
                (c) =>
                  !Object.values(productsPreviewMap).includes(c.imported.name)
              );
              path.node.specifiers = [...others, ...newSpecifiers];
            }
          }
        });
      });
  });
  return root.toSource();
}

module.exports = transformer;
