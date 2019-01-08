'use strict';

const { breakingChangesX } = require('../../globals/js/feature-flags');

module.exports = {
  meta: {
    removed: breakingChangesX,
  },
  hidden: true,
};
