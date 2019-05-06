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
    label: 'First section',
    target: '.demo--panel--opt-1',
    selected: true,
  },
  {
    label: 'Second section',
    target: '.demo--panel--opt-2',
  },
  {
    label: 'Third section',
    target: '.demo--panel--opt-3',
  },
];

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Content Switcher',
      notes: `
        The Content Switcher component manipulates the content shown following an exclusive or “either/or” pattern.
        Create Switch components for each section in the content switcher.
      `,
      context: {
        items,
      },
    },
    {
      name: 'disabled',
      label: 'Disabled',
      context: {
        items: items.map(item => ({ ...item, disabled: true })),
      },
    },
  ],
};
