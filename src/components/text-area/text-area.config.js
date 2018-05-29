'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Text Area',
      notes: `
        Text areas enable the user to interact with and input data. A text area is used when you
        anticipate the user to input more than 1 sentence.
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
