'use strict';

const { prefix } = require('../../globals/js/settings');

const itemsPerPageChoices = [
  {
    value: '10',
    label: '10',
    selected: true,
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
    selected: true,
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

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'V1',
      context: {
        itemsPerPageChoices,
      },
      notes: `
        Pagination is used for splitting up content or data into several pages, with a control for navigating to the next or previous page.
      `,
    },
    {
      name: 'v2',
      label: 'V2',
      context: {
        version: 'v2',
        itemsPerPageChoices,
        pageNumberChoices,
      },
    },
  ],
};
