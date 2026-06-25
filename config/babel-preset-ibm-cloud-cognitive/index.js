/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default () => {
  return {
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
      '@babel/preset-typescript',
    ],
    plugins: [
      'dev-expression',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-transform-react-constant-elements',
    ],
  };
};
