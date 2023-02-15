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

  function replacePropForComponent(name) {
    // Multiselect.Filterable has a different AST structure, so we need to
    // adjust the query to find it properly. If it is not 'Filterable', we use
    // the default query
    let isFilterable = name === 'Filterable';
    let openingElementQuery = {
      name: {
        name,
      },
    };
    if (isFilterable) {
      openingElementQuery = {
        name: {
          object: {
            name: 'MultiSelect',
          },
          property: {
            name: name,
          },
        },
      };
    }
    root
      .find(j.JSXOpeningElement, openingElementQuery)
      .forEach((openingElement) => {
        // Multiselect.Filterable has a different AST structure, so the name is located differently
        const { name } = isFilterable
          ? openingElement.node.name.property
          : openingElement.node.name;

        // Some components were originally set to `xl`, but are being reduced to `lg`
        const downsizedComponents = [
          'Accordion',
          'ComboBox',
          'ContentSwitcher',
          'DatePickerInput',
          'Dropdown',
          'MultiSelect',
          'Filterable',
          'NumberInput',
          'OverflowMenu',
          'Search',
          'Select',
          'TextInput',
          'TimePicker',
        ];

        const isDownsized = downsizedComponents.includes(name);

        j(openingElement)
          .find(j.JSXAttribute, {
            name: {
              name: 'size',
            },
          })
          .forEach((path) => {
            j(path).replaceWith((nodePath) => {
              const { node } = nodePath;
              const { value } = node.value;

              switch (value) {
                case 'compact':
                  node.value.value = 'xs';
                  return node;
                case 'short':
                case 'small':
                  node.value.value = 'sm';
                  return node;
                case 'field':
                  node.value.value = 'md';
                  return node;
                case 'default':
                case 'normal':
                  node.value.value = 'lg';
                  return node;
                case 'tall':
                case 'lg':
                  node.value.value = isDownsized ? 'md' : 'xl';
                  return node;
                case 'xl':
                  node.value.value = isDownsized ? 'lg' : '2xl';
                  return node;
              }
              return node;
            });
          });
      });
  }

  const components = [
    'Accordion',
    'Button',
    'ComboBox',
    'ContentSwitcher',
    'DataTable',
    'DatePickerInput',
    'Dropdown',
    'FileUploader',
    'FileUploaderButton',
    'FileUploaderDropContainer',
    'FileUploaderItem',
    'MultiSelect',
    'Filterable',
    'NumberInput',
    'OverflowMenu',
    'Search',
    'Select',
    'Table',
    'TableToolbar',
    'TextInput',
    'TimePicker',
  ];

  for (const component of components) {
    replacePropForComponent(component);
  }

  return root.toSource(printOptions);
}

module.exports = transform;
