'use strict';

const { prefix } = require('../../globals/js/settings');

const items = [
  {
    label: 'Option 1',
    value: 'all',
  },
  {
    label: 'Option 2',
    value: 'cloudFoundry',
  },
  {
    label: 'Option 3',
    value: 'staging',
  },
  {
    label: 'Option 4',
    value: 'dea',
  },
  {
    label: 'Option 5',
    value: 'router',
  },
];

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Dropdown',
      notes: `
        The Dropdown component is used for navigating or filtering existing content.
      `,
      context: {
        items,
      },
    },
    {
      name: 'light',
      label: 'Dropdown (Light)',
      context: {
        light: true,
        items,
      },
    },
    {
      name: 'up',
      label: 'Up',
      context: {
        up: true,
        items,
      },
    },
    {
      name: 'up-light',
      label: 'Up (Light)',
      context: {
        up: true,
        light: true,
        items,
      },
    },
    {
      name: 'inline',
      label: 'Inline',
      context: {
        inline: true,
        items,
      },
    },
  ],
};
