'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    prefix,
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
