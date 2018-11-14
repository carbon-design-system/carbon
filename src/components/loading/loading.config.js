'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Loading',
      notes: `
        Loading spinners are used when retrieving data or performing slow computations,
        and help to notify users that loading is underway.
      `,
      context: {
        overlay: true,
      },
    },
    {
      name: 'without-overlay',
      label: 'Without overlay',
      context: {
        overlay: false,
      },
    },
    {
      name: 'small',
      label: 'Small',
      context: {
        overlay: false,
        small: true,
      },
    },
  ],
};
