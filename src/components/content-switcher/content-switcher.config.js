'use strict';

const featureFlags = require('../../globals/js/feature-flags');
const { prefix } = require('../../globals/js/settings');

const items = [
  {
    label: 'First section',
    target: '.demo--panel--opt-1',
    selected: true,
  },
  {
    label: 'Second section',
    target: '.demo--panel--opt-2',
  },
  {
    label: 'Third section',
    target: '.demo--panel--opt-3',
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
      label: 'Content Switcher',
      notes: `
        The Content Switcher component manipulates the content shown following an exclusive or “either/or” pattern.
        Create Switch components for each section in the content switcher.
      `,
      context: {
        items,
      },
    },
    {
      name: 'with-icon',
      label: 'With icon',
      context: {
        hasIcon: true,
        items,
      },
    },
  ],
};
