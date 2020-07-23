/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const defaultOptions = {
  '@babel/preset-env': {
    modules: false,
    targets: {
      browsers: ['extends browserslist-config-carbon'],
    },
  },
};

module.exports = (options = defaultOptions) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        ...defaultOptions['@babel/preset-env'],
        ...options['@babel/preset-env'],
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'dev-expression',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
  ],
});
