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
      label: 'Text Input',
      notes: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
      `,
    },
    {
      name: 'light',
      label: 'Text Input (Light)',
      context: {
        light: true,
      },
    },
    {
      name: 'password',
      label: 'Password Input',
      context: {
        password: true,
      },
    },
    {
      name: 'password--light',
      label: 'Password Input (Light)',
      context: {
        light: true,
        password: true,
      },
    },
  ],
};
