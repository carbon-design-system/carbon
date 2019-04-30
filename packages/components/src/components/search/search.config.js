/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  default: 'extra-large',
  context: {
    prefix,
  },
  variants: [
    {
      name: 'extra-large',
      label: 'Normal search',
      notes: `
        Search enables users to specify a word or a phrase to find particular relevant pieces of content
        without the use of navigation. Search can be used as the primary means of discovering content,
        or as a filter to aid the user in finding content.
      `,
      context: {
        suffix: 'xl',
      },
    },
    {
      name: 'small',
      label: 'Small search',
      notes: `
        Search enables users to specify a word or a phrase to find particular relevant pieces of content
        without the use of navigation. Search can be used as the primary means of discovering content,
        or as a filter to aid the user in finding content. With the small version, the search field will be
        more compact.
      `,
      context: {
        suffix: 'sm',
      },
    },
    {
      name: 'extra-large-light',
      label: 'Normal search (Light)',
      notes: `
        Search enables users to specify a word or a phrase to find particular relevant pieces of content
        without the use of navigation. Search can be used as the primary means of discovering content,
        or as a filter to aid the user in finding content.
      `,
      context: {
        suffix: 'xl',
        light: true,
      },
    },
    {
      name: 'small-light',
      label: 'Small search (Light)',
      notes: `
        Search enables users to specify a word or a phrase to find particular relevant pieces of content
        without the use of navigation. Search can be used as the primary means of discovering content,
        or as a filter to aid the user in finding content. With the small version, the search field will be
        more compact.
      `,
      context: {
        suffix: 'sm',
        light: true,
      },
    },
  ],
};
