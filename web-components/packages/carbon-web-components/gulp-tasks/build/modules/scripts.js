/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const babel = require('gulp-babel');
const filter = require('gulp-filter');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const stripComments = require('strip-comments');

const babelPluginResourceJSPaths = require('../../../tools/babel-plugin-resource-js-paths');
const config = require('../../config');

/**
 * Builds the module script files
 *
 * @returns {*} Gulp stream
 */
function scripts() {
  return (
    gulp
      .src([
        `${config.srcDir}/**/*.ts`,
        `!${config.srcDir}/**/*-story*.ts*`,
        `!${config.srcDir}/**/stories/*.ts`,
        `!${config.srcDir}/**/*.d.ts`,
        `!${config.srcDir}/index-with-polyfills.ts`,
      ])
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: ['@babel/preset-modules'],
          // `version` field ensures `@babel/plugin-transform-runtime` is applied to newer helpers like decorator
          plugins: [
            ['@babel/plugin-transform-runtime', { useESModules: true, version: '7.8.0' }],
            [
              'template-html-minifier', // TODO: verify this is actually needed, doesn't seem to be doing anything
              {
                modules: {
                  'lit-html': ['html'],
                  'lit-element': ['html'],
                },
                htmlMinifier: {
                  collapseWhitespace: true,
                  conservativeCollapse: true,
                  removeComments: true,
                  caseSensitive: true,
                  minifyCSS: true,
                },
              },
            ],
            babelPluginResourceJSPaths,
          ],
        })
      )
      // Avoids generating `.js` from interface-only `.ts` files
      .pipe(filter((file) => stripComments(file.contents.toString(), { sourceType: 'module' }).replace(/\s/g, '')))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.jsDestDir))
  );
}

gulp.task('build:modules:scripts', scripts);
