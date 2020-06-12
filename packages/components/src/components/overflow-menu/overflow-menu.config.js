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
    title:
      'An example option that is really long to show what should be done to handle long text',
    label:
      'An example option that is really long to show what should be done to handle long text',
    primaryFocus: true,
  },
  {
    label: 'Option 2',
  },
  {
    label: 'Option 3',
  },
  {
    label: 'Option 4',
  },
  {
    label: 'Disabled',
    disabled: true,
  },
  {
    label: 'Danger option',
    danger: true,
  },
];

const idSuffix = {
  default: `example-${Math.random().toString(36).substr(2)}`,
  flip: `example-${Math.random().toString(36).substr(2)}`,
  link: `example-${Math.random().toString(36).substr(2)}`,
};

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Overflow Menu',
      notes: `
        Overflow Menu is used when additional options are available to the user and there is a space constraint.
        Create Overflow Menu Item components for each option on the menu.
      `,
      context: {
        direction: 'bottom',
        items,
        idSuffix,
      },
    },
    {
      name: 'up',
      label: 'Up',
      context: {
        direction: 'top',
        items,
        idSuffix,
      },
    },
  ],
};
