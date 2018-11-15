'use strict';

const { prefix } = require('../../globals/js/settings');

const items = [
  {
    id: 'radio-button-1',
    value: 'red',
    label: 'Radio Button label',
  },
  {
    id: 'radio-button-2',
    value: 'green',
    label: 'Radio Button label',
  },
  {
    id: 'radio-button-3',
    value: 'blue',
    label: 'Radio Button label',
    disabled: true,
  },
];

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Progress Indicator',
      context: {
        selectedValue: 'red',
        group: 'radio-button',
        items,
      },
    },
  ],
};
