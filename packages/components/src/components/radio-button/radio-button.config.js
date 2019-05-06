/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

const items = () => {
  const groupId = Math.random()
    .toString(36)
    .substr(2);
  return [
    {
      id: `radio-button-${groupId}-1`,
      value: 'red',
      label: 'Radio button label',
    },
    {
      id: `radio-button-${groupId}-2`,
      value: 'green',
      label: 'Radio button label',
    },
    {
      id: `radio-button-${groupId}-3`,
      value: 'blue',
      label: 'Radio button label',
      disabled: true,
    },
  ];
};

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Radio button group',
      context: {
        selectedValue: 'red',
        group: 'radio-button',
        items: items(),
      },
    },
    {
      name: 'horizontal-left',
      label: 'Radio button group (Label at left)',
      context: {
        direction: 'left',
        selectedValue: 'red',
        group: 'radio-button',
        items: items(),
      },
    },
    {
      name: 'vertical',
      label: 'Vertical radio button group',
      context: {
        selectedValue: 'red',
        group: 'radio-button--vertical',
        vertical: true,
        items: items(),
      },
    },
    {
      name: 'vertical-left',
      label: 'Vertical radio button group (Label at left)',
      context: {
        direction: 'left',
        selectedValue: 'red',
        group: 'radio-button--vertical',
        vertical: true,
        items: items(),
      },
    },
  ],
};
