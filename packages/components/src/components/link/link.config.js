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
      label: 'Default',
    },
    {
      name: 'inline',
      label: 'Inline',
      notes: `
        Inline by default has underline.
        Its intended use is in paragraphs and sentences,
        where underline makes it more accessible,
        so that color blue is not the only visual differentiator.
      `,
      context: {
        inline: true,
      },
    },
  ],
};
