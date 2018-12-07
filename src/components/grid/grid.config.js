'use strict';

const { prefix } = require('../../globals/js/settings');
const { breakingChangesX } = require('../../globals/js/feature-flags');

module.exports = {
  meta: {
    useIframe: true,
  },
  context: {
    prefix,
    breakingChangesX,
  },
  variants: [
    {
      name: 'default',
      label: 'Grid',
    },
  ],
};
