'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

module.exports = {
  context: {
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
