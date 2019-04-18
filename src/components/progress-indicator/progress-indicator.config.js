/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

const steps = [
  {
    state: 'complete',
    label: 'First step',
    optional: true,
    optionalLabel: 'Optional',
  },
  {
    state: 'current',
    label: 'Second Step',
    overflow: true,
    overflowLabel: 'Overflow Ex.1',
    tooltipId: Math.random()
      .toString(36)
      .substr(2),
  },
  {
    state: 'incomplete',
    label: 'Third Step',
    overflow: true,
    overflowLabel: 'Overflow Ex. 2 Multi Line',
    tooltipId: Math.random()
      .toString(36)
      .substr(2),
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
      },
    },
    {
      name: 'vertical',
      label: 'Vertical',
      context: {
        vertical: true,
        steps,
      },
    },
  ],
};
