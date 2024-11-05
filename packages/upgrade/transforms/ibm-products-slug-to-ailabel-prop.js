/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const defaultOptions = {
  quote: 'auto',
  trailingComma: true,
};

function transform(fileInfo, api, options) {
  const printOptions = options.printOptions || defaultOptions;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  function replacePropForComponent(name) {
    root
      .find(j.JSXOpeningElement, {
        name: {
          name,
        },
      })
      .forEach((openingElement) => {
        j(openingElement)
          .find(j.JSXAttribute, {
            name: {
              name: 'slug',
            },
          })
          .forEach((path) => {
            const slugValue = path.node.value;
            const newAttribute = j.jsxAttribute(
              j.jsxIdentifier('aiLabel'),
              slugValue
            );
            j(path).replaceWith(newAttribute);
          });
      });
  }

  const components = [
    'Tearsheet',
    'SidePanel',
    'ExpressiveCard',
    'ProductiveCard',
  ];
  for (const component of components) {
    replacePropForComponent(component);
  }

  return root.toSource(printOptions);
}

module.exports = transform;
