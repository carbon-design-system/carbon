/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

module.exports = {
  context: {
    prefix,
    componentsX,
  },
  variants: [
    {
      name: 'default',
      label: 'Loading',
      notes: `
        Loading spinners are used when retrieving data or performing slow computations,
        and help to notify users that loading is underway.
      `,
      context: {
        overlay: true,
      },
    },
    {
      name: 'without-overlay',
      label: 'Without overlay',
      context: {
        overlay: false,
      },
    },
    {
      name: 'small',
      label: 'Small',
      context: {
        overlay: false,
        small: true,
      },
    },
  ],
};
