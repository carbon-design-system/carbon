'use strict';

const featureFlags = require('../../globals/js/feature-flags');
const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    prefix,
    addFilledIcon: () => (featureFlags.componentsX ? 'carbon-icon-add-filled' : 'carbon-icon-add-solid-classic'),
  },
};
