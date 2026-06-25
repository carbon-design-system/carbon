/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StorybookConfig } from '@storybook/web-components-vite';

import { mergeConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { litStyleLoader, litTemplateLoader } from '@mordech/vite-lit-loader';
import remarkGfm from 'remark-gfm';
import glob from 'fast-glob';
import { getAutoTrack } from '../../../scripts/get-auto-track-script.js';

const configDir = fileURLToPath(new URL('.', import.meta.url));

const stories = glob.sync(
  [
    './welcome/**/*.stories.*',
    '../docs/**/*.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  {
    ignore: [
      '../src/**/docs/*.mdx',
      // TODO: Enable add-select stories once the components are updated to be equivalent to their React counterpart
      '../src/components/add-select/**/*.stories.*',
      '../src/components/add-select/**/*.mdx',
      '../src/patterns/add-select/**/*.stories.*',
      '../src/patterns/add-select/**/*.mdx',
    ],
    cwd: configDir,
  }
);

const config: StorybookConfig = {
  stories: stories,
  addons: [
    '@storybook/addon-a11y',
    'storybook-addon-accessibility-checker',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  features: {
    interactions: false, // disable Interactions tab
  },
  managerHead: (head) => {
    return `
      ${head}
      ${
        process.env.NODE_ENV !== 'development'
          ? getAutoTrack('ibm-products-web-components-storybook')
          : ''
      }
    `;
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [litStyleLoader(), litTemplateLoader()],
      optimizeDeps: {
        include: ['@storybook/web-components-vite'],
        exclude: ['lit', 'lit-html'],
      },
      css: {
        transformer: 'postcss',
      },
      resolve: {
        preserveSymlinks: true,
      },
    });
  },
  docs: {
    defaultName: 'Overview',
  },
};

export default config;
