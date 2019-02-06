/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const featureFlags = require('../../globals/js/feature-flags');
const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    featureFlags,
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Number Input',
      notes: `
        Number inputs are similar to text fields, but contain controls used to increase or decrease an incremental value.
        The Number Input component can be passed a starting value, a min, a max, and the step.
      `,
    },
    {
      name: 'light',
      label: 'Number Input (Light)',
      context: {
        light: true,
      },
    },
  ],
};
