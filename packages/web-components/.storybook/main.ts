/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StorybookConfig } from '@storybook/web-components-vite';

import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { litStyleLoader, litTemplateLoader } from '@mordech/vite-lit-loader';
import glob from 'fast-glob';
import remarkGfm from 'remark-gfm';

const configDir = fileURLToPath(new URL('.', import.meta.url));

const stories = glob.sync(
  [
    '../docs/**/*.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  {
    ignore: ['../src/**/docs/*.mdx'],
    cwd: configDir,
  }
);

const config: StorybookConfig = {
  stories: stories,
  addons: [
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
  features: {
    interactions: false, // disable Interactions tab
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      plugins: [litStyleLoader(), litTemplateLoader()],
      optimizeDeps: {
        include: ['@storybook/web-components-vite'],
        exclude: ['lit', 'lit-html'],
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        ),
        'process.env.STORYBOOK_USE_RTL': JSON.stringify(
          process.env.STORYBOOK_USE_RTL
        ),
        'process.env.CDS_FLAGS_ALL': JSON.stringify(process.env.CDS_FLAGS_ALL),
        'process.env.CDS_EXPERIEMENTAL_COMPONENT_NAME': JSON.stringify(
          process.env.CDS_EXPERIEMENTAL_COMPONENT_NAME
        ),
      },
      sourcemap: true,
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
