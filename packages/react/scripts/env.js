/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const BABEL_ENV = process.env.BABEL_ENV;

const docgenConfig = {
  plugins: [
    [
      'babel-plugin-react-docgen',
      {
        removeMethods: true,
      },
    ],
  ],
};

module.exports = () => ({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: BABEL_ENV === 'es' ? false : 'commonjs',
        targets: {
          browsers: ['extends browserslist-config-carbon'],
        },
      },
    ],
  ],
  ...(BABEL_ENV === 'docgen' && docgenConfig),
});
