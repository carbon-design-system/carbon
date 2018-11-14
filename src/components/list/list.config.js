'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Unordered',
      context: {
        tag: 'ul',
        type: 'unordered',
        displayType: 'Unordered',
      },
    },
    {
      name: 'ordered',
      label: 'Ordered',
      context: {
        tag: 'ol',
        type: 'ordered',
        displayType: 'Ordered',
      },
    },
  ],
};
