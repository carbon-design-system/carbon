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
    linkId: 'tab-link-1',
    panelId: 'tab-panel-1',
    panelClass: 'tab-1',
    label: 'Tab label 1',
    panelContent: 'Content for first tab goes here.',
    selected: true,
  },
  {
    linkId: 'tab-link-2',
    panelId: 'tab-panel-2',
    panelClass: 'tab-2',
    label: 'Tab label 2',
    panelContent: 'Content for second tab goes here.',
  },
  {
    linkId: 'tab-link-3',
    panelId: 'tab-panel-3',
    panelClass: 'tab-3',
    label: 'Tab label 3',
    panelContent: 'Content for third tab goes here.',
  },
  {
    linkId: 'tab-link-4',
    panelId: 'tab-panel-4',
    panelClass: 'tab-4',
    label: 'Tab label 4',
    panelContent: 'Content for fourth tab goes here.',
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
      label: 'Tabs',
      context: {
        items,
      },
    },
  ],
};
