/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const packageJson = require('./package.json');

const baseConfig = {
  input: './src/index.js',
  external: Object.keys(packageJson.peerDependencies),
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['extends browserslist-config-carbon'],
            },
          },
        ],
        '@babel/preset-react',
      ],
    }),
  ],
};

module.exports = [
  {
    ...baseConfig,
    output: {
      format: 'esm',
      file: 'es/index.js',
    },
  },
  {
    ...baseConfig,
    output: {
      format: 'cjs',
      file: 'lib/index.js',
    },
  },
];
