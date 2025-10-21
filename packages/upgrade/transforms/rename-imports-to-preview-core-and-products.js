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
        const newSpecifiers = [];
        const seen = new Set();

        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            const importedName = specifier.imported.name;
            const localName = specifier.local
              ? specifier.local.name
              : importedName;

            if (nonStableKeys.includes(importedName)) {
              const transformedImportedName = allPreviews[importedName];

              if (!seen.has(importedName)) {
                seen.add(importedName);

                if (p === '@carbon/ibm-products') {
                  // Create aliased import for products components
                  const importSpecifier = j.importSpecifier(
                    j.identifier(transformedImportedName),
                    j.identifier(localName)
                  );
                  newSpecifiers.push(importSpecifier);
                } else {
                  // For @carbon/react, just update the name
                  specifier.imported.name = transformedImportedName;
                  newSpecifiers.push(specifier);
                }
              }
            } else {
              // Keep non-transformed imports as-is
              newSpecifiers.push(specifier);
            }
          } else {
            // Keep non-ImportSpecifier types (like ImportDefaultSpecifier)
            newSpecifiers.push(specifier);
          }
        });

        path.node.specifiers = newSpecifiers;
      });
  });

  return root.toSource();
}

module.exports = transformer;
