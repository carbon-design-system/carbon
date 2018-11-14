'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Text Input',
      notes: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
      `,
    },
    {
      name: 'light',
      label: 'Text Input (Light)',
      context: {
        light: true,
      },
    },
    {
      name: 'password',
      label: 'Password Input',
      context: {
        password: true,
      },
    },
    {
      name: 'password--light',
      label: 'Password Input (Light)',
      context: {
        light: true,
        password: true,
      },
    },
  ],
};
