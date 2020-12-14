/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// Install:
// @storybook/addon-storysource
// @storybook/source-loader

// Addon
// Add storysource to this config, remove from carbon's

module.exports = {
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-notes/register',
    'storybook-readme/register',

    // Phase 1: port over add-ons from packages/react/.storybook
    // Phase 2: port over webpack config for Sass
    // Phase 3: port over custom panels/add-ons
  ],

  // We get the current config and we return the new webpack config
  webpack(config) {
    // Configure sass
    // sass-loader
    // css-loader, style-loader, postcss-loader, ...
    config.module.rules.push({
      test: /-story\.jsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {
            prettierConfig: {
              parser: 'babylon',
              printWidth: 80,
              tabWidth: 2,
              bracketSpacing: true,
              trailingComma: 'es5',
              singleQuote: true,
            },
          },
        },
      ],
      enforce: 'pre',
    });

    return config;
  },
};
