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
const rename = require('gulp-rename');
const through2 = require('through2');
const { readFile } = require('fs');
const { promisify } = require('util');

const config = require('../../config');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

/**
 * Builds the Icon types
 *
 * @returns {Promise<void>} Gulp stream
 */
async function iconTypes() {
  const banner = await readFileAsync(path.resolve(__dirname, '../../../tools/license.js'), 'utf8');
  await promisifyStream(() =>
    gulp
      .src([`${config.iconsDir}/**/*.js`, `!${config.iconsDir}/index.js`])
      .pipe(
        through2.obj((file, enc, done) => {
          file.contents = Buffer.from(`
                import { SVGTemplateResult } from 'lit-html';
                declare const svgResultCarbonIcon:
                  ({ children, ...attrs }?: { children?: SVGTemplateResult; [attr: string]: any }) => SVGTemplateResult;
                export default svgResultCarbonIcon;
              `);
          done(null, file);
        })
      )
      .pipe(
        rename(pathObj => {
          pathObj.extname = '.d.ts';
        })
      )
      .pipe(prettier())
      .pipe(header(banner))
      .pipe(gulp.dest(path.resolve(config.jsDestDir, 'icons')))
  );
}

gulp.task('build:modules:icon-types', iconTypes);
