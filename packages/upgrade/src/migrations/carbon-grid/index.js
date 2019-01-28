/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const migrations = new Set([require('./0.0.1-alpha.32')]);

module.exports = {
  name: '@carbon/grid',
  migrations,
};
