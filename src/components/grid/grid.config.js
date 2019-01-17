'use strict';

const { prefix } = require('../../globals/js/settings');
const featureFlags = require('../../globals/js/feature-flags');

module.exports = {
  meta: {
    useIframe: true,
  },
  context: {
    featureFlags,
    prefix,
    rows: [
      {
        breakpoint: 'sm',
        columns: Array.from({ length: 4 }),
        title: 'Small (4 columns @ 320px)',
      },
      {
        breakpoint: 'md',
        columns: Array.from({ length: 8 }),
        title: 'Medium (8 columns @ 672px)',
      },
      {
        breakpoint: 'lg',
        columns: Array.from({ length: 16 }),
        title: 'Large (16 columns @ 1312px)',
      },
      {
        breakpoint: 'xlg',
        columns: Array.from({ length: 16 }),
        title: 'X-Large (16 columns @ 1312px)',
      },
      {
        breakpoint: 'max',
        columns: Array.from({ length: 16 }),
        title: 'Max (16 columns @ 1584px)',
      },
    ],
  },
  variants: [
    {
      name: 'default',
      label: 'Grid',
    },
  ],
};
