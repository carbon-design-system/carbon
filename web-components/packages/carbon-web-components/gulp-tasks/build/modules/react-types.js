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
const gulp = require('gulp');
const header = require('gulp-header');
const path = require('path');
const prettier = require('gulp-prettier');
const rename = require('gulp-rename');
const { readFile } = require('fs');
const { promisify } = require('util');

const config = require('../../config');
const babelPluginCreateReactCustomElementTypeDef = require('../../../tools/babel-plugin-create-react-custom-element-type-def');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

/**
 * Builds the React types
 *
 * @returns {Promise<void>} Gulp stream
 */
async function reactTypes() {
  const banner = await readFileAsync(path.resolve(__dirname, '../../../tools/license.js'), 'utf8');
  await promisifyStream(() =>
    gulp
      .src([`${config.srcDir}/components/**/*.ts`, `!${config.srcDir}/**/*-story*.ts*`, `!${config.srcDir}/**/stories/*.ts`])
      .pipe(
        babel({
          babelrc: false,
          plugins: [
            ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
            '@babel/plugin-syntax-typescript',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-optional-chaining',
            babelPluginCreateReactCustomElementTypeDef,
          ],
        })
      )
      .pipe(prettier())
      .pipe(header(banner))
      .pipe(
        rename(pathObj => {
          pathObj.extname = '.d.ts';
        })
      )
      .pipe(gulp.dest(`${config.jsDestDir}/components-react`))
  );
}

gulp.task('build:modules:react-types', reactTypes);
