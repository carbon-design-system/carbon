'use strict';

const { prefix } = require('../../globals/js/settings');

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
  meta: {
    useIframe: true,
  },
  context: {
    prefix,
  },
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
