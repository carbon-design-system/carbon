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
const replace = require('@rollup/plugin-replace');
const stripBanner = require('rollup-plugin-strip-banner');
const { terser } = require('rollup-plugin-terser');
const packageJson = require('./package.json');

const baseConfig = {
  input: './src/index.js',
  external: [
    ...Object.keys(packageJson.peerDependencies),
    ...Object.keys(packageJson.dependencies),
    'prop-types',
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
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-export-default-from',
      ],
      babelHelpers: 'bundled',
    }),
    stripBanner(),
  ],
};

const umdExternalDependencies = Object.keys(
  packageJson.peerDependencies
).filter((dependency) => dependency !== 'carbon-components');

const umdBundleConfig = {
  input: baseConfig.input,
  external: [...umdExternalDependencies, 'prop-types'],
  output: {
    name: 'CarbonComponentsReact',
    format: 'umd',
    globals: {
      classnames: 'classNames',
      'prop-types': 'PropTypes',
      react: 'React',
      'react-dom': 'ReactDOM',
      'carbon-icons': 'CarbonIcons',
    },
  },
};

module.exports = [
  // TODO: update configuration to correctly support tree-shaking for React
  // components. See:
  // https://github.com/carbon-design-system/carbon/issues/5442
  // Generates the following bundles:
  // ESM:       es/index.js
  // CommonJS: lib/index.js
  // {
  //   ...baseConfig,
  //   output: [
  //     {
  //       format: 'esm',
  //       file: 'es/index.js',
  //     },
  //     {
  //       format: 'cjs',
  //       file: 'lib/index.js',
  //     },
  //   ],
  // },

  // Generate the development UMD bundle:
  // UMD: umd/carbon-components-react.js
  {
    ...umdBundleConfig,
    plugins: [
      ...baseConfig.plugins,
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
    output: {
      ...umdBundleConfig.output,
      file: 'umd/carbon-components-react.js',
    },
  },

  // Generate the production UMD bundle:
  // UMD: umd/carbon-components-react.min.js
  {
    ...umdBundleConfig,
    plugins: [
      ...baseConfig.plugins,
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser(),
    ],
    output: {
      ...umdBundleConfig.output,
      file: 'umd/carbon-components-react.min.js',
    },
  },
];
