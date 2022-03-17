/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

const items = [
  {
    label: 'Breadcrumb 1',
  },
  {
    label: 'Breadcrumb 2',
  },
  {
    label: 'Breadcrumb 3',
  },
];

module.exports = {
  context: {
    prefix,
    items,
  },
  variants: [
    {
      name: 'default',
      label: 'Breadcrumb',
      notes: `
        Breadcrumb enables users to quickly see their location within a path of navigation
        and move up to a parent level if desired.
      `,
    },
    {
      name: 'current-page',
      label: 'with current page',
      context: {
        items: items.map((item, i) => {
          if (i !== items.length - 1) {
            return item;
          }
          return {
            ...item,
            current: true,
          };
        }),
      },
    },
  ],
};
