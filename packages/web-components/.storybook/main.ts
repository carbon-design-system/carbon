/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StorybookConfig } from '@storybook/web-components-vite';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { litStyleLoader, litTemplateLoader } from '@mordech/vite-lit-loader';
import glob from 'fast-glob';
import remarkGfm from 'remark-gfm';
import { productMigratedStoryGlobs } from '../product-migrated-components.mjs';
import { getIbmAnalyticsHeads } from '../../../tasks/storybook-ibm-analytics.mjs';
import { storybookStackBlitz } from '../../../tasks/storybook-stackblitz/vite-plugin.mjs';
import { webComponentsStackBlitz } from '../../../tasks/storybook-stackblitz/web-components.mjs';

const configDir = fileURLToPath(new URL('.', import.meta.url));

// resolve SB from this workspace rather than hoisted root
function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const { managerAnalyticsHead, previewAnalyticsHead } = getIbmAnalyticsHeads(
  'CarbonWebComponentsStorybook'
);

const stories = glob.sync(
  [
    '../docs/**/*.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    './**/*.mdx',
    './**/*.stories.@(js|jsx|ts|tsx)',
  ],
  {
    ignore: [
      '../src/**/docs/*.mdx',
      // ibm-products components in migration are v12-only; exclude from v11 Storybook
      ...productMigratedStoryGlobs,
    ],
    cwd: configDir,
  }
);

const config: StorybookConfig = {
  // `head` contains manager-head.html/preview-head.html
  managerHead: (head) => `${head}${managerAnalyticsHead}`,
  previewHead: (head) => `${head}${previewAnalyticsHead}`,
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
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      plugins: [
        litStyleLoader(),
        litTemplateLoader(),
        // "Open in StackBlitz" docs action, generated from each story
        storybookStackBlitz(webComponentsStackBlitz),
      ],
      optimizeDeps: {
        include: ['@storybook/web-components-vite'],
        exclude: ['lit', 'lit-html'],
      },
      build: {
        /**
         * Use esbuild for CSS minification because Lightning CSS (Vite 8.0 default)
         * fails when additional selectors are appended after ::slotted(), ::part(), etc.
         */
        cssMinify: 'esbuild',
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
