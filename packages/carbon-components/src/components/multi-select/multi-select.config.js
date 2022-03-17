/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

const items = [
  {
    id: 'downshift-1-item-0',
    label: 'Option 1',
    selected: true,
  },
  {
    id: 'downshift-1-item-1',
    label: 'Option 2',
  },
  {
    id: 'downshift-1-item-2',
    label: 'Option 3',
  },
  {
    id: 'downshift-1-item-3',
    label: 'Option 4',
  },
  {
    id: 'downshift-1-item-4',
    label:
      'An example option that is really long to show what should be done to handle long text',
  },
];

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Multi Select',
      context: {
        items,
      },
    },
    {
      name: 'filterable',
      label: 'Filterable Multi Select',
      context: {
        filterable: true,
        items,
      },
    },
    {
      name: 'inline',
      label: 'Inline',
      context: {
        inline: true,
        items,
      },
    },
    {
      name: 'light',
      label: 'Light',
      context: {
        light: true,
        items,
      },
    },
  ],
};
