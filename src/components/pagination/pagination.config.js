'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

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
    totalPages: 5,
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
    componentsX,
  },
  variants: [
    {
      name: 'default',
      label: 'Pagination',
      context: {
        itemsPerPageChoices,
        pageNumberChoices,
      },
    },
  ],
};
