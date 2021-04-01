/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const path = require('path');
const stripBanner = require('rollup-plugin-strip-banner');
const packageJson = require('./package.json');

const banner = `/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

module.exports = {
  input: './src/index.js',
  external: [
    ...Object.keys(packageJson.peerDependencies),
    ...Object.keys(packageJson.dependencies),
    ...Object.keys(packageJson.devDependencies),
  ],
  plugins: [
    nodeResolve(),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      babelrc: false,
      exclude: ['node_modules/**'],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: ['extends browserslist-config-carbon'],
            },
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        'dev-expression',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-transform-react-constant-elements',
      ],
      babelHelpers: 'bundled',
    }),
    stripBanner(),
    {
      transform(_code, id) {
        // Make sure to mark feature-flags.js as having side-effects to make
        // sure it gets included in the final bundle
        if (id === path.join(__dirname, 'src', 'feature-flags.js')) {
          return {
            moduleSideEffects: true,
          };
        }
      },
    },
  ],
  output: [
    {
      dir: 'es',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      banner,
    },
    {
      dir: 'lib',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      banner,
    },
  ],
};
