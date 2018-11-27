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
    label: 'Overflow Ex. 1',
  },
  {
    state: 'incomplete',
    label: 'Overflow Ex. 2 Multi Line',
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
