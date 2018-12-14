'use strict';

const featureFlags = require('../../globals/js/feature-flags');
const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    featureFlags,
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Number Input',
      notes: `
        Number inputs are similar to text fields, but contain controls used to increase or decrease an incremental value.
        The Number Input component can be passed a starting value, a min, a max, and the step.
      `,
    },
    {
      name: 'light',
      label: 'Number Input (Light)',
      context: {
        light: true,
      },
    },
  ],
};
