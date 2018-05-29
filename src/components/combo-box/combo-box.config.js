'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Combo Box',
    },
    {
      name: 'disabled',
      label: 'Disabled',
      context: {
        disabled: true,
      },
    },
  ],
};
