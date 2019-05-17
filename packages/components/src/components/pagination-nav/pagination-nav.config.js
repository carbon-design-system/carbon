/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  default: 'default',
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Pagination Nav',
      notes: 'Pagination Nav is a group of pagination buttons or links.',
      context: {
        variant: 'default',
        pages: [
          {
            page: 1,
            active: true,
          },
          {
            page: 2,
          },
          {
            page: 3,
          },
          {
            page: 4,
          },
          {
            page: 5,
          },
        ],
        showPagePrevious: {
          disabled: true,
        },
        showPageNext: true,
      },
    },
    {
      name: 'default--with-select',
      label: 'Pagination Nav With Select',
      notes:
        'A Select menu can be added for large sets of pages as an overflow.',
      context: {
        variant: 'default',
        pages: [
          {
            page: 1,
          },
          {
            page: 2,
          },
          {
            page: 3,
            active: true,
          },
          {
            page: 4,
          },
          {
            page: 5,
          },
          {
            select: [
              {
                value: '',
                page: '',
              },
              {
                value: '6',
                page: '6',
              },
              {
                value: '7',
                page: '7',
              },
              {
                value: '8',
                page: '8',
              },
              {
                value: '9',
                page: '9',
              },
            ],
          },
          {
            page: 10,
          },
        ],
        showPagePrevious: true,
        showPageNext: true,
      },
    },
    {
      name: 'default--as-anchor',
      label: 'Pagination Nav as anchor tags <a>.',
      context: {
        variant: 'default',
        pages: [
          {
            page: 1,
            active: true,
          },
          {
            page: 2,
          },
          {
            page: 3,
          },
          {
            page: 4,
          },
          {
            page: 5,
          },
        ],
        showPagePrevious: {
          disabled: true,
        },
        showPageNext: true,
        elementAsAnchor: true,
      },
    },
  ],
};
