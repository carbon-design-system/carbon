'use strict';

const { prefix } = require('../../globals/js/settings');
const { breakingChangesX } = require('../../globals/js/feature-flags');

module.exports = {
  hidden: true,
  meta: {
    removed: breakingChangesX,
    useIframe: true,
  },
  context: {
    prefix,
  },
};
