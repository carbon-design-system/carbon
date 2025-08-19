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
 * import { previewCandidate__SearchBar } from '@carbon/ibm-products';
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
      .find(j.ImportSpecifier)
      .filter((path) => !!nonStableKeys.includes(path.node.imported.name))
      .replaceWith((path) =>
        j.importSpecifier(j.identifier(allPreviews[path.node.imported.name]))
      );
  });
  return root.toSource();
}

module.exports = transformer;
