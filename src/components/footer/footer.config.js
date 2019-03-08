/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');
const { breakingChangesX } = require('../../globals/js/feature-flags');

const items = [
  {
    title: 'Need Help?',
    label: 'Contact Bluemix Sales',
  },
  {
    title: 'Estimate Monthly Cost',
    label: 'Cost Calculator',
  },
];

module.exports = {
  meta: {
    removed: breakingChangesX,
    useIframe: true,
  },
  hidden: true,
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Footer',
      notes: `
        Footer is used on configuration screens.
      `,
      context: {
        items,
      },
    },
  ],
};
