/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StorybookConfig } from '@storybook/web-components-vite';

import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { mergeConfig } from 'vite';
import { litStyleLoader, litTemplateLoader } from '@mordech/vite-lit-loader';
import glob from 'fast-glob';
import remarkGfm from 'remark-gfm';

const require = createRequire(import.meta.url);

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
    'storybook-addon-accessibility-checker',
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    getAbsolutePath('@storybook/addon-links'),
  ],
  features: {
    interactions: false, // disable Interactions tab
  },
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
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
    });
  },
  docs: {
    defaultName: 'Overview',
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
