/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
require('./build/dist');
require('./build/modules');
require('./build/sass');

gulp.task('build', gulp.parallel(gulp.task('build:modules'), gulp.task('build:sass'), gulp.task('build:dist')));
