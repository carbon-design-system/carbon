'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

module.exports = {
  context: {
    prefix,
    componentsX,
  },
};
