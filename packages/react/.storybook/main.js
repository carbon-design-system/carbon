/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const glob = require('fast-glob');
const path = require('path');

const stories = glob
  .sync(
    [
      './Welcome/Welcome.stories.jsx',
      '../src/**/*.stories.jsx',
      '../src/**/*.stories.mdx',
      '../src/**/next/*.stories.jsx',
      '../src/**/next/**/*.stories.jsx',
      '../src/**/next/*.stories.mdx',
      '../src/**/*-story.jsx',
    ],
    {
      cwd: __dirname,
    }
  )
  // Filters the stories by finding the paths that have a story file that ends
  // in `-story.js` and checks to see if they also have a `.stories.js`,
  // if so then defer to the `.stories.js`
  .filter((match) => {
    const filepath = path.resolve(__dirname, match);
    const basename = path.basename(match, '.jsx');
    const denylist = new Set([
      'TooltipDefinition-story',
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
        `${component}.stories.jsx`
      );

      if (fs.existsSync(storyName)) {
        return false;
      }

      return true;
    }

    return true;
  });

module.exports = {
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
    '@storybook/addon-a11y',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    previewCsfV3: true,
  },
  framework: '@storybook/react',
  stories,
  async viteFinal(config) {
    // Annoying way to add babel plugin,
    // until https://github.com/storybookjs/builder-vite/issues/286 is fixed
    config.plugins = [
      require('@storybook/builder-vite/dist/plugins/react-docgen').reactDocgen({
        exclude: [/^\.\.\//, /node_modules/],
        include: /\.(jsx?)$/,
      }),
      ...config.plugins.filter((plugin) => {
        return !(Array.isArray(plugin)
          ? plugin[0].name === 'vite:react-babel'
          : plugin.name === 'react-docgen');
      }),
      require('@vitejs/plugin-react')({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        babel: { presets: ['babel-preset-carbon'] },
      }),
    ];
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include || []),
        'color', // Used in @carbon/themes
      ],
    };
    config.define = {
      __DEV__: process.env.NODE_ENV !== 'production',
    };
    config.css = {
      preprocessorOptions: {
        scss: {
          includePaths: [
            path.resolve(__dirname, '..', 'node_modules'),
            path.resolve(__dirname, '..', '..', '..', 'node_modules'),
          ],
        },
      },
    };
    return config;
  },
};
