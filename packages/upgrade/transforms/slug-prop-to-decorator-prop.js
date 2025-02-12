/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Replace slug prop with decorator
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

  // Early return if no JSX elements with slug prop found
  if (!root.find(j.JSXAttribute, { name: { name: 'slug' } }).size()) {
    return null;
  }

  // Replace slug with decorator
  root
    .find(j.JSXAttribute, {
      name: { name: 'slug' },
    })
    .forEach((path) => {
      // Create new decorator attribute with same value as slug
      const newAttribute = j.jsxAttribute(
        j.jsxIdentifier('decorator'),
        path.node.value
      );

      // Replace the slug attribute with decorator
      j(path).replaceWith(newAttribute);
    });

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
