/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

const itemsPerPageChoices = [
  {
    value: '10',
    label: '10',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '30',
    label: '30',
  },
  {
    value: '40',
    label: '40',
  },
  {
    value: '50',
    label: '50',
  },
];

const pageNumberChoices = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
];

const variants = [
  {
    name: 'default',
    label: 'Default',
    context: {
      version: 'x',
      itemsPerPageChoices,
      pageNumberChoices,
      totalPages: 5,
    },
  },
  {
    // `name`/`label`` here not supporting theme switcher
    name: 'Disabled Pagination Buttons',
    label: 'Disabled Pagination Buttons',
    context: {
      version: 'x',
      itemsPerPageChoices: [itemsPerPageChoices[0]],
      totalPages: 1,
      pageNumberChoices: [pageNumberChoices[0]],
      disabledPaginationButton: true,
    },
    notes: `
      Notify the user of their position in the page range by disabling the appropriate pagination buttons
      at the start or end of the range.
    `,
  },
];

module.exports = {
  context: {
    prefix,
  },
  variants,
};
