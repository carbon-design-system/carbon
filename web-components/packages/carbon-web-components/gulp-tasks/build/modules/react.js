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
const babel = require('gulp-babel');
const header = require('gulp-header');
const path = require('path');
const prettier = require('gulp-prettier');
const { promisify } = require('util');
const { readFile } = require('fs');

const config = require('../../config');
const babelPluginCreateReactCustomElementType = require('../../../tools/babel-plugin-create-react-custom-element-type');
const babelPluginResourceCJSPaths = require('../../../tools/babel-plugin-resource-cjs-paths');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

/**
 * Builds React modules.
 *
 * @param {object} options The build options.
 * @param {string} options.banner The banner content.
 * @param {string} [options.targetEnv=browser] The target environment.
 * @private
 */
const buildModulesReact = ({ banner, targetEnv = 'browser' }) => {
  let stream = gulp
    .src([
      `${config.srcDir}/components/**/*.ts`,
      `!${config.srcDir}/**/defs.ts*`,
      `!${config.srcDir}/**/*-story*.ts*`,
      `!${config.srcDir}/**/stories/*.ts`,
    ])
    .pipe(
      babel({
        babelrc: false,
        plugins: [
          ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
          '@babel/plugin-syntax-typescript',
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining',
          [babelPluginCreateReactCustomElementType, { nonUpgradable: targetEnv === 'node' }],
        ],
      })
    );

  if (targetEnv === 'node') {
    stream = stream.pipe(
      babel({
        babelrc: false,
        // Ensures `babel-plugin-resource-cjs-paths` runs before `@babel/plugin-transform-modules-commonjs`
        plugins: [babelPluginResourceCJSPaths, '@babel/plugin-transform-modules-commonjs'],
      })
    );
  }

  const destDir = {
    browser: `${config.jsDestDir}/components-react`,
    node: `${config.cjsDestDir}/components-react-node`,
  }[targetEnv];

  return stream.pipe(prettier()).pipe(header(banner)).pipe(gulp.dest(destDir));
};

/**
 * Builds the react modules
 *
 * @returns {Promise<void>} Gulp stream
 */
async function react() {
  const banner = await readFileAsync(path.resolve(__dirname, '../../../tools/license.js'), 'utf8');
  await Promise.all([
    promisifyStream(() => buildModulesReact({ banner })),
    promisifyStream(() => buildModulesReact({ banner, targetEnv: 'node' })),
  ]);
}

gulp.task('build:modules:react', react);
