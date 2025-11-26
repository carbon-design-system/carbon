import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';
import { litStyleLoader, litTemplateLoader } from '@mordech/vite-lit-loader';
import remarkGfm from 'remark-gfm';
import glob from 'fast-glob';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    buildStoriesJson: true,
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
      resolve: {
        preserveSymlinks: true,
      },
      build: {
        target: 'es2020',
        rollupOptions: {
          output: {
            // Don't add hashes to font file names during build
            assetFileNames: (assetInfo) => {
              if (
                assetInfo.name &&
                (assetInfo.name.endsWith('.woff2') ||
                  assetInfo.name.endsWith('.woff'))
              ) {
                return 'assets/[name][extname]';
              }
              return 'assets/[name]-[hash][extname]';
            },
          },
        },
        // Use esbuild for minification to avoid issues with terser
        minify: 'esbuild',
        // Ensure proper module format
        modulePreload: false,
      },
      sourcemap: true,
    });
  },
  docs: {
    defaultName: 'Overview',
  },
};
export default config;
