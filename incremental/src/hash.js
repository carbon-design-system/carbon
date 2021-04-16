/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const crypto = require('crypto');

function createHash(...contents) {
  const value = crypto.createHash('sha256');
  for (const content of contents) {
    value.update(content);
  }
  return value.digest('base64');
}

module.exports = {
  createHash,
};
