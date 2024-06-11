/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const config = require('../config');

/**
 * Builds the sass file for the carbon (flex) grid
 *
 * @returns {*} gulp stream
 */
function _buildGrid() {
  return gulp
    .src([`${config.srcDir}/globals/scss/grid.scss`])
    .pipe(
      sass({
        includePaths: ['node_modules', '../../node_modules'],
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(config.bundleDestDir));
}

/**
 * Builds the sass file for the carbon (css) grid
 *
 * @returns {*} gulp stream
 */
function _buildCSSGrid() {
  return gulp
    .src([`${config.srcDir}/globals/scss/cssgrid.scss`])
    .pipe(
      sass({
        includePaths: ['node_modules', '../../node_modules'],
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(config.bundleDestDir));
}

/**
 * Builds the sass file for the theme zone classes
 *
 * @returns {*} gulp stream
 */
function _buildThemes() {
  return gulp
    .src([`${config.srcDir}/globals/scss/themes.scss`])
    .pipe(
      sass({
        includePaths: ['node_modules', '../../node_modules'],
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(config.bundleDestDir));
}


gulp.task('build:sass:cdn:grid', _buildGrid);
gulp.task('build:sass:cdn:cssgrid', _buildCSSGrid);
gulp.task('build:sass:cdn:themes', _buildThemes);
gulp.task(
  'build:sass:cdn',
  gulp.parallel(
    'build:sass:cdn:grid',
    'build:sass:cdn:cssgrid',
    'build:sass:cdn:themes',
  )
);
