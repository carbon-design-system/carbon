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
 * import { previewCandidate__SearchBar, previewCandidate__InlineTip } from "@carbon/ibm-products";
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
    .find(j.ImportSpecifier)
    .filter(
      (path) => !!nonStableComponentKeys.includes(path.node.imported.name)
    )
    .replaceWith((path) =>
      j.importSpecifier(
        j.identifier(productsPreviewMap[path.node.imported.name])
      )
    )
    .toSource();
}

module.exports = transformer;
