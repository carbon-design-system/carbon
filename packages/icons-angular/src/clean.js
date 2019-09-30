/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { remove } = require('fs-extra');
const paths = require('./paths');

async function clean() {
  cleanSome([
    paths.TS,
    paths.LIB,
    paths.UMD,
    paths.WASTE,
    paths.EXAMPLES_LIB,
    paths.STORIES,
    paths.DIST,
  ]);
}

async function cleanSome(paths) {
  return Promise.all(paths.map(path => remove(path)));
}

module.exports = {
  clean,
  cleanSome,
};
