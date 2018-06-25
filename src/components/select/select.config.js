'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Select',
      notes: `
        Select displays a list below its title when selected. They are used primarily in forms,
        where a user chooses one option from a list. Once the user selects an item, the dropdown will
        dissapear and the field will reflect the user's choice. Create Select Item components for each
        option in the list.
      `,
    },
    {
      name: 'inline',
      label: 'Inline Select',
      notes: 'Inline select is for use when there will be multiple elements in a row.',
      context: {
        inline: true,
      },
    },
    {
      name: 'light',
      label: 'Select (Light)',
      context: {
        light: true,
      },
    },
    {
      name: 'invalid',
      label: 'Select (Invalid)',
      context: {
        invalid: true,
      },
    },
    {
      name: 'inline-invalid',
      label: 'Inline Select (Invalid)',
      context: {
        inline: true,
        invalid: true,
      },
    },
    {
      name: 'light-invalid',
      label: 'Select (Light/Invalid)',
      context: {
        light: true,
        invalid: true,
      },
    },
  ],
};
