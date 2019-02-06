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
    componentsX,
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Text Input',
      context: {
        light: false,
        componentsX,
      },
    },
    {
      name: 'light',
      label: 'Text Input (Light)',
      context: {
        light: true,
        componentsX,
      },
    },
  ],
};
