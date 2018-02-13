'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      notes: `
        Select displays a list below its title when selected. They are used primarily in forms,
        where a user chooses one option from a list. Once the user selects an item, the dropdown will
        dissapear and the field will reflect the user's choice. Create Select Item components for each
        option in the list.
      `,
    },
    {
      name: 'inline',
      label: 'Inline',
      notes: 'Inline select is for use when there will be multiple elements in a row.',
      context: {
        inline: true,
      },
    },
    {
      name: 'light',
      label: 'Light',
      context: {
        light: true,
      },
    },
    {
      name: 'invalid',
      label: 'Invalid',
      context: {
        invalid: true,
      },
    },
    {
      name: 'light-invalid',
      label: 'Light invalid',
      context: {
        light: true,
        invalid: true,
      },
    },
  ],
};
