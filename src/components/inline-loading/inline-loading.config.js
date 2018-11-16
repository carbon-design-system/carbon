'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Inline Loading',
      context: {
        showToggleButton: true,
      },
    },
  ],
};
