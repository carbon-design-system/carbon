'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

module.exports = {
  context: {
    componentsX,
    downIcon: () => componentsX ? 'carbon-icon-chevron-down' : 'carbon-icon-caret-down',
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Text Input',
      context: {
        light: false,
        componentsX,
      },
    },
    {
      name: 'light',
      label: 'Text Input (Light)',
      context: {
        light: true,
        componentsX,
      },
    },
  ],
};
