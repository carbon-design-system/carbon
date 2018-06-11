'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Form',
      notes: 'Forms are widely used to collect user input.',
    },
    {
      name: 'light',
      label: 'Form (Light)',
      context: {
        light: true,
      },
    },
  ],
};
