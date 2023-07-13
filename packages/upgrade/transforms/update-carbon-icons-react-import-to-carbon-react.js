/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Rewrites imports from '@carbon/icons-react' to '@carbon/react/icons'
 *
 * Transforms:
 *
 * import { Add } from '@carbon/icons-react';
 *
 * Into:
 *
 * import { Add } from "@carbon/react/icons";
 */

function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration, {
      source: {
        value: '@carbon/icons-react',
      },
    })
    .forEach((path) => {
      path.get('source').replace(j.stringLiteral('@carbon/react/icons'));
    })
    .toSource();
}

module.exports = transformer;
