/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';
import { litStyleLoader, litTemplateLoader } from '@mordech/vite-lit-loader';
import viteSVGResultCarbonIconLoader from '../tools/vite-svg-result-carbon-icon-loader';
const glob = require('fast-glob');

const stories = glob.sync(
  [
    '../docs/**/*.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  {
    ignore: ['../src/**/docs/*.mdx'],
    cwd: __dirname,
  }
);

const config: StorybookConfig = {
  stories: stories,
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    'storybook-addon-accessibility-checker',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      plugins: [
        litStyleLoader(),
        litTemplateLoader(),
        viteSVGResultCarbonIconLoader(),
      ],
      optimizeDeps: {
        include: ['@storybook/web-components'],
        exclude: ['lit', 'lit-html'],
      },
    });
  },
  docs: {
    autodocs: true,
    defaultName: 'Overview',
  },
};
export default config;
