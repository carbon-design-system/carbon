/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'node:fs';
import path from 'node:path';
import glob from 'fast-glob';
import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin';
import { StorybookConfig } from '@storybook/core-common';

const babelLoaderString = 'babel-loader';

const stories: string[] = glob
  .sync(
    [
      './Welcome/Welcome.stories.js',
      '../src/**/*.stories.@(js|tsx|ts)',
      '../src/**/*.stories.mdx',
      '../src/**/next/*.stories.js',
      '../src/**/next/**/*.stories.js',
      '../src/**/next/*.stories.mdx',
      '../src/**/*-story.js',
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
    const basename = path.basename(match, '.js');
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
        `${component}.stories.js`
      );

      if (fs.existsSync(storyName)) {
        return false;
      }

      return true;
    }

    return true;
  });
const unused = '';

const config: StorybookConfig = {
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
    builder: 'webpack5',
  },
  features: {
    previewCsfV3: true,
  },
  framework: '@storybook/react',
  stories,
  webpackFinal: (config) => {
    const babelLoader = config?.module?.rules?.find((rule) => {
      if (rule !== '...') {
        const use = rule.use;
        // Handle case when use is a string
        if (typeof use === 'string') {
          return use.includes(babelLoaderString);
        }

        // Handle case when use is an array
        if (Array.isArray(use)) {
          return use?.some((useItem) => {
            // useItem can be an array of strings, objects, or a webpack callback method.
            if (typeof useItem === 'function') {
              return false;
            }

            if (typeof useItem === 'string') {
              return useItem.includes(babelLoaderString);
            }

            return useItem?.loader?.includes(babelLoaderString);
          });
        }
      }
    });

    // This is a temporary trick to get `babel-loader` to ignore packages that
    // are brought in that have an es, lib, or umd directory.
    //
    // Typically this is covered by /node_modules/ (which is the default), but
    // in our case it seems like these dependencies are resolving to where their
    // symlink points to. In other words, `@carbon/icons-react` becomes
    // `../icons-react/es/index.js`.
    //
    // This results in these files being included in `babel-loader` and causing
    // the build times to increase dramatically
    if (babelLoader && babelLoader !== '...') {
      babelLoader.exclude = [
        /node_modules/,
        /packages\/.*\/(es|lib|umd)/,
        /packages\/icons-react\/next/,
      ];
    }

    config?.module?.rules?.push({
      test: /\.s?css$/,
      sideEffects: true,
      use: [
        {
          loader:
            process.env.NODE_ENV === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 1 version'],
                }),
              ],
            },
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              includePaths: [
                path.resolve(__dirname, '..', 'node_modules'),
                path.resolve(__dirname, '..', '..', '..', 'node_modules'),
              ],
            },
            warnRuleAsWarning: true,
            sourceMap: true,
          },
        },
      ],
    });

    if (process.env.NODE_ENV === 'production') {
      config?.plugins?.push(
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        })
      );
    }

    return config;
  },
};
module.exports = config;
