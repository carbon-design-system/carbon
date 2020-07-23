/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { BABEL_ENV } = process.env;

const babelConfig = {
  presets: [
    [
      'babel-preset-carbon',
      {
        '@babel/preset-env': {
          modules: BABEL_ENV === 'es' ? false : 'commonjs',
          targets: {
            browsers: ['extends browserslist-config-carbon'],
          },
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};

module.exports = babelConfig;
