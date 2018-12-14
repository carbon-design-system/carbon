'use strict';

const featureFlags = require('../../globals/js/feature-flags');
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

const variants = [
  {
    name: 'default',
    label: 'V1',
    context: {
      itemsPerPageChoices,
      version: 'v1',
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
    },
  },
]
  .filter(variant => {
    if (componentsX) {
      return variant.context.version !== 'v2';
    }
    return variant;
  })
  .map((variant, index) => {
    if (index === 0) {
      return {
        ...variant,
        name: 'default',
      };
    }
    return variant;
  });

module.exports = {
  context: {
    featureFlags,
    prefix,
    pageNumberChoices,
  },
  variants,
};
