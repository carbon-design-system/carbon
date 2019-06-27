/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const baseConfig = {
  input: path.resolve(__dirname, './src/index.js'),
  external: [],
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main'],
    }),
    commonjs({
      include: [/node_modules/],
      extensions: ['.js'],
    }),
    babel({
      exclude: /node_modules/,
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: ['last 1 version', 'ie >= 11', 'Firefox ESR'],
            },
          },
        ],
      ],
    }),
  ],
};

module.exports = [
  {
    ...baseConfig,
    output: {
      format: 'esm',
      file: path.join('es', 'index.js'),
    },
  },
  {
    ...baseConfig,
    output: {
      format: 'cjs',
      file: path.join('lib', 'index.js'),
    },
  },
  {
    ...baseConfig,
    output: {
      format: 'umd',
      file: path.join('umd', 'index.js'),
      name: 'CarbonSpec',
    },
  },
];
