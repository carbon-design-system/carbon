/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const del = require('del');
const gulp = require('gulp');
const config = require('./config');

/**
 * Clean task
 *
 * @returns {Promise} Promise after all folders are cleaned
 * @private
 */
function _clean() {
  return Promise.all([del(config.cjsDestDir), del(config.jsDestDir), del(config.sassDestDir), del(config.distDestDir)]);
}

// Clean task
gulp.task('clean', _clean);
