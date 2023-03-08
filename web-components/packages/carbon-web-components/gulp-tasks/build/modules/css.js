/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const asyncDone = require('async-done');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const header = require('gulp-header');
const path = require('path');
const postcss = require('gulp-postcss');
const prettier = require('gulp-prettier');
const replaceExtension = require('replace-ext');
const rtlcss = require('rtlcss');
const sass = require('gulp-sass')(require('sass'));
const through2 = require('through2');
const { promisify } = require('util');
const { readFile } = require('fs');

const config = require('../../config');
const fixHostPseudo = require('../../../tools/postcss-fix-host-pseudo');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

/**
 * Builds the CSS module file
 *
 * @param {object} [options] The build options.
 * @param {string} [options.banner] License banner
 * @param {string} [options.dir] Reading direction
 * @returns {*} Gulp stream
 * @private
 */
const buildModulesCSS = ({ banner, dir }) =>
  gulp
    .src([`${config.srcDir}/**/*.scss`, `!${config.srcDir}/**/*-story.scss`])
    .pipe(
      header(`
        $feature-flags: (
          enable-css-custom-properties: true
        );
      `)
    )
    .pipe(
      sass({
        includePaths: ['node_modules', '../../node_modules'],
      })
    )
    .pipe(
      postcss([
        fixHostPseudo(),
        autoprefixer(),
        ...(dir === 'rtl' ? [rtlcss] : []),
      ])
    )
    .pipe(cleanCSS())
    .pipe(
      through2.obj((file, enc, done) => {
        file.contents = Buffer.from(`
          import { css } from 'lit';
          export default css([${JSON.stringify(String(file.contents))}]);
        `);
        file.path = replaceExtension(
          file.path,
          dir === 'rtl' ? '.rtl.css.js' : '.css.js'
        );
        done(null, file);
      })
    )
    .pipe(prettier())
    .pipe(header(banner))
    .pipe(gulp.dest(path.resolve(config.jsDestDir)));

/**
 * Builds the CSS
 *
 * @returns {Promise<void>} Stream
 */
async function css() {
  const banner = await readFileAsync(
    path.resolve(__dirname, '../../../tools/license.js'),
    'utf8'
  );
  await Promise.all([
    promisifyStream(() => buildModulesCSS({ banner })),
    promisifyStream(() => buildModulesCSS({ banner, dir: 'rtl' })),
  ]);
}

gulp.task('build:modules:css', css);
