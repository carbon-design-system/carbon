/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const asyncDone = require('async-done');
const babel = require('gulp-babel');
const filter = require('gulp-filter');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const header = require('gulp-header');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const stripComments = require('strip-comments');
const through2 = require('through2');
const { promisify } = require('util');
const { readFile } = require('fs');

const babelPluginResourceCJSPaths = require('../../../tools/babel-plugin-resource-cjs-paths');
const config = require('../../config');
const reLicense = require('../../../tools/license-text');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

/**
 * Builds the scripts node modules
 *
 * @returns {Promise<*>} gulp stream
 */
async function scriptsNode() {
  const banner = await readFileAsync(path.resolve(__dirname, '../../../tools/license.js'), 'utf8');
  await promisifyStream(() =>
    gulp
      .src(
        [
          `${config.srcDir}/components/**/defs.ts`,
          `${config.srcDir}/globals/**/*.ts`,
          `!${config.srcDir}/globals/decorators/**/*.ts`,
          `!${config.srcDir}/globals/directives/**/*.ts`,
          `!${config.srcDir}/globals/internal/**/*.ts`,
          `!${config.srcDir}/globals/mixins/**/*.ts`,
        ],
        { base: config.srcDir }
      )
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: ['@babel/preset-modules'],
          // Ensures `babel-plugin-resource-cjs-paths` runs before `@babel/plugin-transform-modules-commonjs`
          plugins: [
            // `version` field ensures `@babel/plugin-transform-runtime` is applied to newer helpers like decorator
            ['@babel/plugin-transform-runtime', { useESModules: false, version: '7.8.0' }],
            babelPluginResourceCJSPaths,
            '@babel/plugin-transform-modules-commonjs',
          ],
        })
      )
      // Avoids generating `.js` from interface-only `.ts` files
      .pipe(filter((file) => stripComments(file.contents.toString()).replace(/\s/g, '')))
      .pipe(
        gulpif(
          (file) => reLicense.test(file.contents.toString()),
          through2.obj((file, enc, done) => {
            done(null, file);
          }),
          header(banner)
        )
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.cjsDestDir))
  );
}

gulp.task('build:modules:scripts-node', scriptsNode);
