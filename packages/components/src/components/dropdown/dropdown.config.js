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
    label: 'Option 1',
    value: 'all',
  },
  {
    label: 'Option 2',
    value: 'cloudFoundry',
  },
  {
    label: 'Option 3',
    value: 'staging',
  },
  {
    label: 'Option 4',
    value: 'dea',
  },
  {
    label: 'Option 5',
    value: 'router',
  },
  {
    label:
      'An example option that is really long to show what should be done to handle long text',
    value: 'loremipsum',
  },
];

module.exports = {
  context: {
    prefix,
    default: {
      idSuffix: `example-${Math.random().toString(36).substr(2)}`,
    },
    helper: {
      idSuffix: `example-${Math.random().toString(36).substr(2)}`,
    },
    disabled: {
      idSuffix: `example-${Math.random().toString(36).substr(2)}`,
    },
    invalid: {
      idSuffix: `example-${Math.random().toString(36).substr(2)}`,
    },
  },
  variants: [
    {
      name: 'default',
      label: 'Dropdown',
      notes: `
        The Dropdown component is used for navigating or filtering existing content.
      `,
      context: {
        items,
      },
    },
    {
      name: 'light',
      label: 'Dropdown (Light)',
      context: {
        light: true,
        items,
      },
    },
    {
      name: 'up',
      label: 'Up',
      context: {
        up: true,
        items,
      },
    },
    {
      name: 'up-light',
      label: 'Up (Light)',
      context: {
        up: true,
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
