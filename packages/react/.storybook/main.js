/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import remarkGfm from 'remark-gfm';
import fs from 'fs';
import glob from 'fast-glob';
import path from 'path';
import react from '@vitejs/plugin-react';

// We can't use .mdx files in conjuction with `storyStoreV7`, which we are using to preload stories for CI purposes only.
// MDX files are fine to ignore in CI mode since they don't make a difference for VRT testing
const storyGlobs = [
  './Welcome/Welcome.mdx',
  '../src/**/*.stories.js',
  '../src/**/*.stories.mdx',
  '../src/components/Tile/Tile.mdx',
  '../src/**/next/*.stories.js',
  '../src/**/next/**/*.stories.js',
  '../src/**/next/*.stories.mdx',
  '../src/**/*-story.js',
];

const stories = glob
  .sync(storyGlobs, {
    ignore: ['../src/**/docs/*.mdx', '../src/**/next/docs/*.mdx'],
    cwd: __dirname,
  })
  // Filters the stories by finding the paths that have a story file that ends
  // in `-story.js` and checks to see if they also have a `.stories.js`,
  // if so then defer to the `.stories.js`
  .filter((match) => {
    const filepath = path.resolve(__dirname, match);
    const basename = path.basename(match, '.js');
    const denylist = new Set([
      'DataTable-basic-story',
      'DataTable-batch-actions-story',
      'DataTable-filtering-story',
      'DataTable-selection-story',
      'DataTable-sorting-story',
      'DataTable-toolbar-story',
      'DataTable-dynamic-content-story',
      'DataTable-expansion-story',
    ]);
    if (denylist.has(basename)) {
      return false;
    }
    if (basename.endsWith('-story')) {
      const component = basename.replace(/-story$/, '');
      const storyName = path.resolve(
        filepath,
        '..',
        'next',
        `${component}.stories.js`
      );
      if (fs.existsSync(storyName)) {
        return false;
      }
      return true;
    }
    return true;
  });

const config = {
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: true,
        backgrounds: false,
        controls: true,
        docs: true,
        toolbars: true,
        viewport: true,
      },
    },
    '@storybook/addon-storysource',
    /**
     * For now, the storybook-addon-accessibility-checker fork replaces the @storybook/addon-a11y.
     * Eventually they plan to attempt to get this back into the root addon with the storybook team.
     * See more: https://ibm-studios.slack.com/archives/G01GCBCGTPV/p1697230798817659
     */
    // '@storybook/addon-a11y',
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
  ],
  features: {
    previewCsfV3: true,
    buildStoriesJson: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories,
  typescript: {
    reactDocgen: 'react-docgen', // Favor docgen from prop-types instead of TS interfaces
  },
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },

  async viteFinal(config, { configType }) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    if (configType === 'DEVELOPMENT') {
      config.define = {
        __DEV__: process.env.NODE_ENV !== 'production',
      };
    }

    return mergeConfig(config, {
      esbuild: {
        include: /\.[jt]sx?$/,
        exclude: [],
        loader: 'tsx',
      },
      optimizeDeps: {
        esbuildOptions: {
          loader: {
            '.js': 'jsx',
          },
        },
      },
      // plugins: [
      //   react({
      //     babel: {
      //       // This instructs Vite to use Babel for the necessary transforms,
      //       // including converting __DEV__ to true/false in our code.
      //       babelrc: true,
      //       configFile: true,
      //     },
      //   }),
      // ],
    });
  },
  docs: {
    autodocs: true,
    defaultName: 'Overview',
  },
};

export default config;
