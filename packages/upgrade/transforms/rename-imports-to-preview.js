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
 * import { unstable__FluidTimePicker } from '@carbon/react';
 *
 * After:
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
    .find(j.ImportSpecifier)
    .filter(
      (path) => !!nonStableComponentKeys.includes(path.node.imported.name)
    )
    .replaceWith((path) =>
      j.importSpecifier(j.identifier(reactPreviewMap[path.node.imported.name]))
    )
    .toSource();
}

module.exports = transformer;
