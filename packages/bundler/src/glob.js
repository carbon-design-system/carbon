/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const globNative = require('glob');

function glob(pattern, options = {}) {
  return new Promise((resolve, reject) => {
    globNative(pattern, options, (error, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(files);
    });
  });
}

module.exports = glob;
