/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Rewrites imports from 'carbon-components-react' to '@carbon/react'
 *
 * Transforms:
 *
 * import { Button } from 'carbon-components-react';
 *
 * Into:
 *
 * import { Button } from "@carbon/react";
 */

function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration, {
      source: {
        value: 'carbon-components-react',
      },
    })
    .forEach((path) => {
      path.get('source').replace(j.stringLiteral('@carbon/react'));
    })
    .toSource();
}

module.exports = transformer;
