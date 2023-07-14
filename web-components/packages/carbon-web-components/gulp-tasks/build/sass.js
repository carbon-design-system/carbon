/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
const config = require('../config');

/**
 * Builds the sass files
 *
 * @returns {*} gulp stream
 */
function sass() {
  return gulp.src([`${config.srcDir}/**/*.scss`, `!${config.srcDir}/**/*-story.scss`]).pipe(gulp.dest(config.sassDestDir));
}

gulp.task('build:sass', sass);
