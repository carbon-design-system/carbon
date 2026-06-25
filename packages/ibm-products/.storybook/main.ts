/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StorybookConfig } from '@storybook/react-vite';

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import remarkGfm from 'remark-gfm';
import glob from 'fast-glob';
import { resolve } from 'path';
import { getAutoTrack } from '../../../scripts/get-auto-track-script.js';

const require = createRequire(import.meta.url);
const configDir = fileURLToPath(new URL('.', import.meta.url));

// Expand glob patterns to explicit file paths for Chromatic compatibility
const storyGlobs = [
  '../src/**/!(*.internal).stories.*',
  './ComponentPlayground/**/*.stories.*',
  './Welcome/**/*.stories.*',
  './PrebuiltPatterns/**/*.mdx',
  '../../../examples/carbon-for-ibm-products/example-gallery/src/example-gallery.stories.*',
];

const stories = glob.sync(storyGlobs, {
  cwd: configDir,
});

const config: StorybookConfig = {
  staticDirs: ['../public'],

  addons: [
    '@storybook/addon-a11y',
    'storybook-addon-accessibility-checker',
    '@storybook/addon-links',
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
  ],

  features: {
    interactions: false, // disable Interactions tab
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories,

  typescript: {
    reactDocgen: 'react-docgen', // Favor docgen from prop-types instead of TS interfaces
  },

  managerHead: (head) => {
    return `
      ${head}
      ${
        process.env.NODE_ENV !== 'development'
          ? getAutoTrack('ibm-products-react-storybook')
          : ''
      }
    `;
  },

  async viteFinal(config, { configType }) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      build: {
        sourcemap: true,
        rollupOptions: {
          onLog(level: any, log: any, handler: any) {
            // https://github.com/vitejs/vite/issues/15012#issuecomment-1815854072
            if (log.code === 'MODULE_LEVEL_DIRECTIVE') {
              return;
            }
            handler(level, log);
          },
        },
      },
      esbuild: {
        include: /\.[jt]sx?$/,
        exclude: [],
        loader: 'tsx',
        keepNames: true,
      },
      optimizeDeps: {
        esbuildOptions: {
          loader: {
            '.js': 'jsx',
          },
        },
      },
      resolve: {
        preserveSymlinks: true,
        alias: {
          ALIAS_STORY_STYLE_CONFIG: resolve(
            configType === 'DEVELOPMENT'
              ? '../ibm-products-styles/src/config-dev.scss'
              : '../ibm-products-styles/src/config.scss'
          ),
          '@carbon/ibm-products': resolve(
            configDir,
            '../src/components/index.ts'
          ),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern',
            quietDeps: true,
            silenceDeprecations: ['global-builtin', 'legacy-js-api'],
          },
        },
      },
      experimental: {
        enableNativePlugin: true,
      },
    });
  },

  docs: {
    defaultName: 'Overview',
  },
};

export default config;
