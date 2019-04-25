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
      label: 'Single Line',
      notes: `
        Code snippets are small blocks of reusable code that can be inserted in a code file.

        The Single style is for single-line code snippets.
      `,
      context: {
        variant: 'single',
      },
    },
    {
      name: 'multi',
      label: 'Multi Line',
      notes: `
        Code snippets are small blocks of reusable code that can be inserted in a code file.

        The Multi-line style is for larger code blocks.
      `,
      context: {
        variant: 'multi',
      },
    },
    {
      name: 'inline',
      label: 'Inline',
      notes: `
        Code snippets are small blocks of reusable code that can be inserted in a code file.

        The inline style is for code blocks within a block of text on a white background.
      `,
      context: {
        variant: 'inline',
      },
    },
    {
      name: 'inline-light',
      label: 'Inline (Light)',
      notes: `
        Code snippets are small blocks of reusable code that can be inserted in a code file.

        The inline style is for code blocks within a block of text.
      `,
      context: {
        variant: 'inline',
        light: 'true',
      },
    },
  ],
};
