'use strict';

const featureFlags = require('../../globals/js/feature-flags');
const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    prefix,
    checkmarkFilledIcon: () =>
      featureFlags.componentsX ? 'carbon-icon-checkmark-filled' : 'carbon-icon-checkmark-solid-classic',
  },
};
