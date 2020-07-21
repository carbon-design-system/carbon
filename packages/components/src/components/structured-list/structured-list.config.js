/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

const columns = [
  {
    name: 'column1',
    title: 'Column1',
    nowrap: true,
  },
  {
    name: 'column2',
    title: 'Column2',
  },
];

/* eslint-disable max-len */

const rows = [
  {
    selected: true,
    id: 'apache-id',
    value: 'apache spark',
    selectionLabel: 'apache spark',
    column1: 'Row 1',
    column2: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.
    `,
  },
  {
    id: 'cloudant-id',
    value: 'Cloudant',
    selectionLabel: 'Cloudant',
    column1: 'Row 2',
    column2: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.
    `,
  },
  {
    id: 'block-storate-id',
    value: 'block-storage',
    selectionLabel: 'block-storage',
    column1: 'Row 3',
    column2: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.
    `,
  },
  {
    id: 'open-whisk-id',
    value: 'open-whisk',
    selectionLabel: 'open-whisk',
    column1: 'Row 4',
    column2: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.
    `,
  },
];

/* eslint-enable max-len */

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Structured List',
      context: {
        columns,
        rows: rows.slice(0, 2),
      },
    },
    {
      name: 'selection',
      label: 'With selection',
      context: {
        columns,
        rows,
        selectable: true,
        group: 'services',
      },
    },
  ],
};
