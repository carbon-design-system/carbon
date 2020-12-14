/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  addons: [
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

    return config;
  },
};
