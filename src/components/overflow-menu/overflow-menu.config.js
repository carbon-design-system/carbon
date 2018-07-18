'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Overflow Menu',
      notes: `
        Overflow Menu is used when additional options are available to the user and there is a space constraint.
        Create Overflow Menu Item components for each option on the menu.
      `,
      context: {
        direction: 'bottom',
      },
    },
    {
      name: 'up',
      label: 'Up',
      context: {
        direction: 'top',
      },
    },
  ],
};
