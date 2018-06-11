'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Dropdown',
      notes: `
        The Dropdown component is used for navigating or filtering existing content.
      `,
    },
    {
      name: 'light',
      label: 'Dropdown (Light)',
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
      label: 'Up (Light)',
      context: {
        up: true,
        light: true,
      },
    },
    {
      name: 'inline',
      label: 'Inline',
      context: {
        inline: true,
      },
    },
  ],
};
