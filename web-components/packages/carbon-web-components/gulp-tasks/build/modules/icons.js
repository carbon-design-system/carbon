/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const asyncDone = require('async-done');
const gulp = require('gulp');
const header = require('gulp-header');
const path = require('path');
const prettier = require('gulp-prettier');
const through2 = require('through2');

const { promisify } = require('util');
const { readFile } = require('fs');

const config = require('../../config');
const createSVGResultFromCarbonIcon = require('../../../tools/svg-result-carbon-icon');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

/**
 * Builds the icons module
 *
 * @returns {Promise<void>} Gulp stream
 */
async function icons() {
  const banner = await readFileAsync(path.resolve(__dirname, '../../../tools/license.js'), 'utf8');
  await promisifyStream(() =>
    gulp
      .src([`${config.iconsDir}/**/*.js`, `!${config.iconsDir}/index.js`])
      .pipe(
        through2.obj((file, enc, done) => {
          const descriptor = require(file.path); // eslint-disable-line global-require,import/no-dynamic-require
          const iconsESPath = path.resolve(config.jsDestDir, 'icons', path.relative(config.iconsDir, file.path));
          const spreadModulePath = path.resolve(__dirname, '../../../es/globals/directives/spread');
          file.contents = Buffer.from(`
                import { svg } from 'lit-html';
                import spread from '${path.relative(path.dirname(iconsESPath), spreadModulePath)}';
                const svgResultCarbonIcon = ${createSVGResultFromCarbonIcon(descriptor)};
                export default svgResultCarbonIcon;
              `);
          done(null, file);
        })
      )
      .pipe(prettier())
      .pipe(header(banner))
      .pipe(gulp.dest(path.resolve(config.jsDestDir, 'icons')))
  );
}

gulp.task('build:modules:icons', icons);
