'use strict';

const { prefix } = require('../../globals/js/settings');

const items = [
  {
    id: 'downshift-1-item-0',
    label: 'Option 1',
  },
  {
    id: 'downshift-1-item-1',
    label: 'Option 2',
  },
  {
    id: 'downshift-1-item-2',
    label: 'Option 3',
    selected: true,
  },
  {
    id: 'downshift-1-item-3',
    label: 'Option 4',
  },
];

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Combo Box',
      context: {
        items,
      },
    },
    {
      name: 'disabled',
      label: 'Disabled',
      context: {
        disabled: true,
        items,
      },
    },
  ],
};
