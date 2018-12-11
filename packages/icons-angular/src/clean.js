/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { remove } = require('fs-extra');
const paths = require('./paths');

module.exports = async function clean() {
  return Promise.all([
    remove(paths.TS),
    remove(paths.LIB),
    remove(paths.WASTE),
    remove(paths.EXAMPLES_LIB),
    remove(paths.STORIES),
  ]);
};
