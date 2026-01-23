/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Migrate Grid components to v12 by adding noRowGap prop
 * and enabling the feature flag
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  // Early return if no Grid components found
  const hasGrid =
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: 'Grid' } },
      })
      .size() > 0;

  if (!hasGrid) {
    return null;
  }

  let modified = false;

  // Add noRowGap prop to all Grid components
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: 'Grid' } },
    })
    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;

      // Check if noRowGap already exists
      const hasNoRowGap = attributes.some(
        (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'noRowGap'
      );

      // Add noRowGap={true} for backward compatibility
      if (!hasNoRowGap) {
        attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier('noRowGap'),
            j.jsxExpressionContainer(j.booleanLiteral(true))
          )
        );
        modified = true;
      }
    });

  if (!modified) {
    return null;
  }

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';

// Made with Bob
