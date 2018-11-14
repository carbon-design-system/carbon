'use strict';

const { prefix } = require('../../globals/js/settings');

const steps = [
  {
    state: 'complete',
    label: 'First step',
  },
  {
    state: 'current',
    label: 'Second step',
  },
  {
    state: 'incomplete',
    label: 'Third step',
  },
  {
    state: 'incomplete',
    label: 'Fourth step',
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
      },
    },
  ],
};
