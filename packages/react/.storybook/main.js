/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const addons = [
  'storybook-preset-carbon',
  require.resolve('./addon-carbon-theme/register'),
];

if (process.env.CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES === 'true') {
  addons.push('@carbon/storybook-addon-theme/register');
}

module.exports = {
  addons,
  stories: ['../src/**/*-story.js', '../src/**/*.stories.mdx'],
};
