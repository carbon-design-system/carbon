/**
 * Copyright IBM Corp. 2016, 2020
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

  const sizeProp = j.jsxAttribute(j.jsxIdentifier('size'), j.literal('sm'));

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
              name: 'small',
            },
          })
          .forEach((path) => {
            j(path).replaceWith(sizeProp);
          });
      });
  }

  const components = [
    'Button',
    'DangerButton',
    'PrimaryButton',
    'SecondaryButton',
    'Search',
  ];
  for (const component of components) {
    replacePropForComponent(component);
  }

  return root.toSource(printOptions);
}

module.exports = transform;
