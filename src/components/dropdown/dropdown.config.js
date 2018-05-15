'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      notes: `
        The Dropdown component is used for navigating or filtering existing content.
      `,
    },
    {
      name: 'light',
      label: 'Light',
      context: {
        light: true,
      },
    },
    {
      name: 'up',
      label: 'Up',
      context: {
        up: true,
      },
    },
    {
      name: 'up-light',
      label: 'Up light',
      context: {
        up: true,
        light: true,
      },
    },
  ],
};
