'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

module.exports = {
  context: {
    prefix,
    componentsX,
  },
  variants: [
    {
      name: 'default',
      label: 'Slider',
      notes: `
        A slider enables the user to specify a numeric value which must be no less than a given value,
        and no more than another given value.
      `,
      context: {
        inputId: 'slider-input-box',
      },
    },
    {
      name: 'light',
      label: 'Light',
      context: {
        light: true,
        inputId: 'slider-input-box-light',
      },
    },
  ],
};
