/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { reactPreviewMap } = require('./nonStableMapping');

/**
 * Updates imports for non-stable components
 *
 * @example
 * Before:
 * import { unstable__FluidTimePicker as FluidTimePicker } from '@carbon/react';
 * or
 * import { unstable__FluidTimePicker } from '@carbon/react';
 *
 * After:
 * import { preview__FluidTimePicker as FluidTimePicker } from "@carbon/react";
 * or
 * import { preview__FluidTimePicker } from "@carbon/react";
 */

const nonStableComponentKeys = Object.keys(reactPreviewMap);

function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration, {
      source: {
        value: '@carbon/react',
      },
    })
    .forEach((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          nonStableComponentKeys.forEach((c) => {
            let importedName = specifier.imported.name;
            let transformedImportedName = importedName;
            if (importedName === c) {
              transformedImportedName = reactPreviewMap[c];
              specifier.imported.name = transformedImportedName;
            }
          });
        }
      });
    })
    .toSource();
}

module.exports = transformer;
