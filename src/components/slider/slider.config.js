'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Slider',
      notes: `
        A slider enables the user to specify a numeric value which must be no less than a given value, 
        and no more than another given value. 
      `,
    },
    {
      name: 'light',
      label: 'Light',
      context: {
        light: true,
      },
    },
  ],
};
