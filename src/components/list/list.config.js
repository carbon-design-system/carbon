'use strict';

module.exports = {
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
