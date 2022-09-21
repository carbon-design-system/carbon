/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const autoprefixer = require('autoprefixer');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const cssnano = require('cssnano');
const fs = require('fs');
const multiInput = require('rollup-plugin-multi-input').default;
const path = require('path');
const postcss = require('postcss');
const replace = require('@rollup/plugin-replace');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const rtlcss = require('rtlcss');
const { promisify } = require('util');
const { terser } = require('rollup-plugin-terser');

const carbonIcons = require('./rollup-plugin-icons');
const fixHostPseudo = require('./postcss-fix-host-pseudo');
const license = require('./rollup-plugin-license');
const litSCSS = require('./rollup-plugin-lit-scss');

const readFile = promisify(fs.readFile);

/**
 * Stores the suffix to append depending on build mode
 *
 * @type {{development: string, production: string}}
 */
const modeSuffixes = {
  development: '',
  production: '.min',
};

/**
 * Stores the suffix to append for render direction setting
 *
 * @type {{ltr: string, rtl: string}}
 */
const dirSuffixes = {
  ltr: '',
  rtl: '.rtl',
};

/**
 * Generates the multi-input for the rollup config
 *
 * @param {string} mode The build mode
 * @param {string} dir The UI direction
 * @param {Array} folders Package names as inputs
 * @returns {{}} Object with inputs
 * @private
 */
function _generateInputs(mode, dir, folders) {
  const inputs = {};

  folders.forEach(folder => {
    inputs[`${folder}${dirSuffixes[dir]}${modeSuffixes[mode]}`] = `src/components/${folder}/index.ts`;
  });

  return inputs;
}

/**
 * Gets the PostCSS plugin configuration
 *
 * @param {string} mode The build mode
 * @param {string} dir The UI direction
 * @private
 */
function _getPostCSSPlugins(mode, dir) {
  const postCSSPlugins = [fixHostPseudo(), autoprefixer()];

  // Add cssnano for production mode
  if (mode !== 'development') {
    postCSSPlugins.push(cssnano());
  }

  // Add rtlcss if enabled
  if (dir === 'rtl') {
    postCSSPlugins.push(rtlcss);
  }

  return postCSSPlugins;
}

/**
 * Sets the rollup configuration based on various settings
 *
 * @param {object} [options] The build options.
 * @param {string} [options.mode=development] The build mode.
 * @param {string} [options.dir=development] The UI direction.
 * @param {Array} [options.folders] Package names as inputs
 * @returns {object} The Rollup config.
 */
function getRollupConfig({ mode = 'development', dir = 'ltr', folders = [] } = {}) {
  const postCSSPlugins = _getPostCSSPlugins(mode, dir);

  const licenseOptions = {
    whitelist: /^(carbon-components|@carbon*)$/i,
    async licenseSelf() {
      return readFile(path.resolve(__dirname, './license.js'), 'utf8');
    },
  };

  return {
    input: _generateInputs(mode, dir, folders),
    plugins: [
      multiInput(),
      nodeResolve({
        browser: true,
        mainFields: ['jsnext', 'module', 'main'],
        dedupe: ['carbon-components'],
        extensions: ['.js', '.ts'],
      }),
      commonjs({
        include: [/node_modules/],
        sourceMap: true,
      }),
      carbonIcons(),
      babel.babel({
        babelHelpers: 'runtime',
        extensions: ['.ts'],
        exclude: ['node_modules/**'], // only transpile our source code
        presets: ['@babel/preset-modules'],
        plugins: [
          '@babel/plugin-transform-typescript',
          '@babel/plugin-proposal-class-properties',
          ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
          '@babel/plugin-proposal-nullish-coalescing-operator',
          ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
          '@babel/plugin-proposal-optional-chaining',
          ...(mode === 'development'
            ? []
            : [
                [
                  'template-html-minifier',
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
              ]),
        ],
      }),
      litSCSS({
        includePaths: [path.resolve(__dirname, '../node_modules')],
        async preprocessor(contents, id) {
          return (await postcss(postCSSPlugins).process(contents, { from: id })).css;
        },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      ...(mode === 'development' ? [license(licenseOptions)] : [terser(), license(licenseOptions)]),
    ],
  };
}

module.exports = getRollupConfig;
