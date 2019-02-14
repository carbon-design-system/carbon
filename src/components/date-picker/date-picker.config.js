/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const featureFlags = require('../../globals/js/feature-flags');
const { prefix } = require('../../globals/js/settings');
const { componentsX } = featureFlags;

module.exports = {
  context: {
    featureFlags,
    prefix,
    componentsX,
  },
};
