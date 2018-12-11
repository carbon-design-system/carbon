'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

const selectItems = [
  {
    label: 'Choose an option',
    disabled: true,
    selected: true,
    hidden: true,
  },
  {
    label: 'A much longer option that is worth having around to check how text flows',
    value: 'solong',
  },
  {
    label: 'Category 1',
    items: [
      {
        label: 'Option 1',
        value: 'option1',
      },
      {
        label: 'Option 2',
        value: 'option2',
      },
    ],
  },
  {
    label: 'Category 2',
    items: [
      {
        label: 'Option 1',
        value: 'option1',
      },
      {
        label: 'Option 2',
        value: 'option2',
      },
    ],
  },
];

module.exports = {
  context: {
    prefix,
    componentsX,
  },
  variants: [
    {
      name: 'default',
      label: 'Form',
      notes: 'Forms are widely used to collect user input.',
      context: {
        selectItems,
      },
    },
    {
      name: 'light',
      label: 'Form (Light)',
      context: {
        light: true,
        selectItems,
      },
    },
  ],
};
