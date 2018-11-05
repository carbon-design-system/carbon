'use strict';

const { componentsX } = require('../../globals/js/feature-flags');

module.exports = {
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
