'use strict';

const featureFlags = require('../../globals/js/feature-flags');
const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    infoIcon: () => featureFlags.componentsX ? 'carbon-icon-information' : 'carbon-icon-info-outline',
    prefix,
  },
};
