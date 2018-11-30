'use strict';

const featureFlags = require('../../globals/js/feature-flags');
const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    featureFlags,
    prefix,
    leftIcon: () => (!featureFlags.componentsX ? 'carbon-icon-chevron-left-classic' : 'carbon-icon-chevron-left'),
    rightIcon: () => (!featureFlags.componentsX ? 'carbon-icon-chevron-right-classic' : 'carbon-icon-chevron-right'),
  },
  variants: [
    {
      name: 'arrow-icons',
      hidden: true,
    },
  ],
};
