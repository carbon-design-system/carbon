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
      label: 'Interactive Tooltip',
      notes: `
        Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
        For more regular use case, e.g. giving the user more text information about something,
        use definition tooltip or icon tooltip.
      `,
      context: {
        noHeading: {
          idSuffix: `example-${Math.random().toString(36).substr(2)}`,
        },
        heading: {
          idSuffix: `example-${Math.random().toString(36).substr(2)}`,
        },
        label: {
          idSuffix: `example-${Math.random().toString(36).substr(2)}`,
        },
      },
    },
    {
      name: 'definition',
      label: 'Definition Tooltip',
      notes: `
        Definition tooltip is for regular use case of tooltip,
        e.g. giving the user more text information about something, like defining a word.
        This works better than the interactive tooltip in regular use cases
        because the info icon used in interactive tooltip can be repetitive when it’s shown several times on a page.
        Definition tooltip does not use any JavaScript.
        If there are actions a user can take in the tooltip (e.g. a link or a button), use interactive tooltip.

        For top positioning, replace bx--tooltip--definition__bottom class with bx--tooltip--definition__top.
        For center/right alignment, add bx--tooltip--definition__align-center/bx--tooltip--definition__align-end class
        to the DOM element with bx--tooltip--definition__bottom/bx--tooltip--definition__top.
      `,
    },
    {
      name: 'icon',
      label: 'Icon Tooltip',
      notes: `
        Icon tooltip is for short single line of text describing an icon.
        Icon tooltip does not use any JavaScript. No label should be added to this variation.
        If there are actions a user can take in the tooltip (e.g. a link or a button), use interactive tooltip.
      `,
    },
  ],
};
