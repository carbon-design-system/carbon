'use strict';

const featureFlags = require('../../globals/js/feature-flags');
const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    featureFlags,
    prefix,
  },
};
