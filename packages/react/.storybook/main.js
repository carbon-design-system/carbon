/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-notes/register',
    'storybook-readme/register',
    require.resolve('./addon-carbon-theme/register'),
  ],
  stories: ['../src/**/*-story.js', '../src/**/*.stories.mdx'],
};
