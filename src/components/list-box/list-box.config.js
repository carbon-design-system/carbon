/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const featureFlags = require('../../globals/js/feature-flags');
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
];

module.exports = {
  context: {
    featureFlags,
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'List Box',
      context: {
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
    {
      name: 'inline',
      label: 'Inline',
      context: {
        inline: true,
        items,
      },
    },
  ],
};
