/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');

const CACHE_DIRECTORY = path.resolve(__dirname, '..', '.cache');

const Cache = {
  async clear() {
    if (fs.existsSync(CACHE_DIRECTORY)) {
      await fs.remove(CACHE_DIRECTORY);
    }
  },
  async cleanup() {
    throw new Error('Unimplemented');
  },
};

module.exports = {
  Cache,
};
