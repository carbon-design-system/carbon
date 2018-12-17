'use strict';

const featureFlags = require('../../globals/js/feature-flags');
const { prefix } = require('../../globals/js/settings');

const items = [
  {
    title: 'An example option that is really long to show what should be done to handle long text',
    label: 'An example option that is really long to show what should be done to handle long text',
    primaryFocus: true,
  },
  {
    label: 'Option 2',
  },
  {
    label: 'Option 3',
  },
  {
    label: 'Option 4',
  },
  {
    label: 'Disabled',
    disabled: true,
  },
  {
    label: 'Danger option',
    danger: true,
  },
];

module.exports = {
  context: {
    featureFlags,
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Overflow Menu',
      notes: `
        Overflow Menu is used when additional options are available to the user and there is a space constraint.
        Create Overflow Menu Item components for each option on the menu.
      `,
      context: {
        direction: 'bottom',
        items,
      },
    },
    {
      name: 'up',
      label: 'Up',
      context: {
        direction: 'top',
        items,
      },
    },
  ],
};
