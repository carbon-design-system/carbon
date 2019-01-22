/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');
const { breakingChangesX } = require('../../globals/js/feature-flags');

module.exports = {
  hidden: true,
  meta: {
    removed: breakingChangesX,
  },
  context: {
    prefix,
  },
};
