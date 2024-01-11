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
    '../src/**/checkbox.stories.ts',
    '../src/**/checkbox.mdx',
    '../src/**/accordion.mdx',
    '../src/**/accordion.stories.ts',
    '../src/**/breadcrumb.mdx',
    '../src/**/breadcrumb.stories.ts',
    '../src/**/code-snippet.mdx',
    '../src/**/code-snippet.stories.ts',
    '../src/**/combo-box.stories.ts',
    '../src/**/combo-box.mdx',
    '../src/**/date-picker.mdx',
    '../src/**/date-picker.stories.ts',
    '../src/**/content-switcher.mdx',
    '../src/**/content-switcher.stories.ts',
    '../src/**/dropdown.stories.ts',
    '../src/**/dropdown.mdx',
    '../src/**/data-table-*.stories.ts',
    '../src/**/data-table.mdx',
    '../src/**/ordered-list.stories.ts',
    '../src/**/unordered-list.stories.ts',
    '../src/**/list.mdx',
    '../src/**/icon-button.mdx',
    '../src/**/icon-button.stories.ts',
    '../src/**/inline-loading.mdx',
    '../src/**/inline-loading.stories.ts',
    '../src/**/loading.stories.ts',
    '../src/**/loading.mdx',
    '../src/**/button.mdx',
    '../src/**/button.stories.ts',
    '../src/**/link.mdx',
    '../src/**/link.stories.ts',
    '../src/**/layer.stories.ts',
    '../src/**/layer.mdx',
    '../src/**/file-uploader.mdx',
    '../src/**/file-uploader.stories.ts',
    '../src/**/form-group.mdx',
    '../src/**/form-group.stories.ts',
    '../src/**/modal.stories.ts',
    '../src/**/modal.mdx',
    '../src/**/file-uploader.stories.ts',
    '../src/**/number-input.mdx',
    '../src/**/number-input.stories.ts',
    '../src/**/multi-select.mdx',
    '../src/**/multi-select.stories.ts',
    '../src/**/notification.mdx',
    '../src/**/actionable-notification.stories.ts',
    '../src/**/inline-notification.stories.ts',
    '../src/**/toast-notification.stories.ts',
    '../src/**/overflow-menu.mdx',
    '../src/**/overflow-menu.stories.ts',
    '../src/**/progress-bar.mdx',
    '../src/**/progress-bar.stories.ts',
    '../src/**/progress-indicator.mdx',
    '../src/**/progress-indicator.stories.ts',
    '../src/**/search.mdx',
    '../src/**/search.stories.ts',
    '../src/**/select.mdx',
    '../src/**/select.stories.ts',
    '../src/**/skeleton-placeholder.mdx',
    '../src/**/skeleton-placeholder.stories.ts',
    '../src/**/skeleton-text.mdx',
    '../src/**/skeleton-text.stories.ts',
    '../src/**/skip-to-content.mdx',
    '../src/**/skip-to-content.stories.ts',
    '../src/**/slider.mdx',
    '../src/**/slider.stories.ts',
    '../src/**/tag.mdx',
    '../src/**/tag.stories.ts',
    '../src/**/tooltip.mdx',
    '../src/**/tooltip.stories.ts',
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
