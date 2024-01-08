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
    // go back to wildcard globs once all stories are written
    // '../src/**/*.mdx',
    // '../src/**/*.stories.@(js|jsx|ts|tsx)',
    // add mdx/story files as they are being worked on
    '../src/**/link.mdx',
    '../src/**/link.stories.ts',
    '../src/**/file-uploader.mdx',
    '../src/**/file-uploader.stories.ts',
    '../src/**/overflow-menu.mdx',
    '../src/**/overflow-menu.stories.ts',
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
    '@storybook/addon-essentials',
    '@storybook/addon-mdx-gfm',
    'storybook-addon-accessibility-checker',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const x = mergeConfig(config, {
      // Add dependencies to pre-optimization)
      // resolve: {
      //   alias: [{ find: "@", replacement: resolve(__dirname, "node_modules") }]
      // },
      // resolve: {
      //   alias: {
      //     '@carbon/web-components/es/icons': path.resolve(__dirname, '@carbon/icons/lib') },
      // },
      assetsInclude: ['**/*.html'],
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

    // console.log(x)
    return x;
  },
  docs: {
    autodocs: true,
    defaultName: 'Overview',
  },
};
export default config;
