/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function safeAsync(promise) {
  return new Promise(resolve => {
    promise
      .then((...args) => resolve([args, null]))
      .catch(error => [null, error]);
  });
}

module.exports = safeAsync;
