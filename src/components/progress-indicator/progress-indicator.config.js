'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

const steps = [
  {
    state: 'complete',
    label: 'First step',
    optional: true,
    optionalLabel: 'Optional',
  },
  {
    state: 'current',
    label: 'Long Second step',
  },
  {
    state: 'incomplete',
    label: 'Really Long Multi Line Third step',
  },
  {
    state: 'incomplete',
    label: 'Fourth step',
    invalid: true,
  },
  {
    state: 'incomplete',
    label: 'Fifth step',
    disabled: true,
  },
];

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Progress Indicator',
      context: {
        steps,
        componentsX,
      },
    },
  ],
};
