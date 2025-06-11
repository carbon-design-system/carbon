import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
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
import viteSVGResultCarbonIconLoader from '../tools/vite-svg-result-carbon-icon-loader';
const require = createRequire(import.meta.url);
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
      plugins: [
        litStyleLoader(),
        litTemplateLoader(),
        viteSVGResultCarbonIconLoader(),
      ],
      css: {
        preprocessorOptions: {
          // suppress mixed-declarations warnings until resolved in
          // https://github.com/carbon-design-system/carbon/issues/16962
          scss: {
            api: 'modern',
            silenceDeprecations: ['mixed-decls'],
          },
        },
      },
      optimizeDeps: {
        include: ['@storybook/web-components-vite'],
        exclude: ['lit', 'lit-html'],
      },
      define: {
        'process.env': process.env,
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
