/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Unordered',
      context: {
        tag: 'ul',
        type: 'unordered',
        displayType: 'Unordered',
      },
    },
    {
      name: 'ordered',
      label: 'Ordered',
      context: {
        tag: 'ol',
        type: 'ordered',
        displayType: 'Ordered',
      },
    },
  ],
};
