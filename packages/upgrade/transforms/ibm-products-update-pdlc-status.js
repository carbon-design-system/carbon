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
      const seen = new Set();
      const newSpecifiers = [];

      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          const importedName = specifier.imported.name;
          const localName = specifier.local
            ? specifier.local.name
            : importedName;

          const isAlreadyUpdated = nonStableComponentKeys.some(
            (key) => importedName === productsPreviewMap[key]
          );

          const needsUpdate = nonStableComponentKeys.includes(importedName);

          if (isAlreadyUpdated) {
            // Already has prefix, ensure it has an alias to the base component name
            // Find the base component name by looking up which key maps to this prefixed name
            const baseComponentName = nonStableComponentKeys.find(
              (key) => productsPreviewMap[key] === importedName
            );

            if (baseComponentName && !seen.has(importedName)) {
              seen.add(importedName);
              const importSpecifier = j.importSpecifier(
                j.identifier(importedName),
                j.identifier(localName)
              );
              newSpecifiers.push(importSpecifier);
            } else if (!seen.has(importedName)) {
              seen.add(importedName);
              newSpecifiers.push(specifier);
            }
          } else if (needsUpdate) {
            const transformedImportedName = productsPreviewMap[importedName];

            if (!seen.has(transformedImportedName)) {
              seen.add(transformedImportedName);
              const importSpecifier = j.importSpecifier(
                j.identifier(transformedImportedName),
                j.identifier(localName)
              );
              newSpecifiers.push(importSpecifier);
            }
          } else {
            // Keep other imports unchanged
            if (!seen.has(importedName)) {
              seen.add(importedName);
              newSpecifiers.push(specifier);
            }
          }
        } else {
          newSpecifiers.push(specifier);
        }
      });
      path.node.specifiers = newSpecifiers;
    })
    .toSource();
}

module.exports = transformer;
