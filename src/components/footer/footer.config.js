'use strict';

const items = [
  {
    title: 'Need Help?',
    label: 'Contact Bluemix Sales',
  },
  {
    title: 'Estimate Monthly Cost',
    label: 'Cost Calculator',
  },
];

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Footer',
      notes: `
        Footer is used on configuration screens.
      `,
      context: {
        items,
      },
    },
  ],
};
