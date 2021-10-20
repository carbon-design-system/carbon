/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const customProperties = require('postcss-custom-properties');
const rtlcss = require('rtlcss');

const {
  CARBON_ENABLE_V11_RELEASE = 'false',
  CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES = 'false',
  CARBON_REACT_STORYBOOK_USE_RTL,
  CARBON_REACT_STORYBOOK_USE_SASS_LOADER,
  NODE_ENV = 'development',
} = process.env;

const useSassLoader = CARBON_REACT_STORYBOOK_USE_SASS_LOADER === 'true';
const useExternalCss = NODE_ENV === 'production';
const useRtl = CARBON_REACT_STORYBOOK_USE_RTL === 'true';

module.exports = {
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-notes/register',
    'storybook-readme/register',
    '@storybook/addon-links',
    require.resolve('./addon-theme/register'),
  ],

  stories: [
    './Welcome/Welcome.stories.js',
    '../src/**/*-story.js',
    '../src/**/*.stories.mdx',
  ],

  webpack(config) {
    const babelLoader = config.module.rules.find((rule) => {
      return rule.use.some(({ loader }) => {
        return loader.includes('babel-loader');
      });
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
    babelLoader.exclude = [/node_modules/, /packages\/.*\/(es|lib|umd)/];

    const sassLoader = {
      loader: require.resolve('sass-loader'),
      options: {
        additionalData(content) {
          return `
            $feature-flags: (
              ui-shell: true,
              enable-css-custom-properties: ${CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES},
              enable-v11-release: ${CARBON_ENABLE_V11_RELEASE},
            );
            ${content}
          `;
        },
        sassOptions: {
          implementation: require('sass'),
          includePaths: [path.resolve(__dirname, '..', 'node_modules')],
        },
        sourceMap: true,
      },
    };

    const fastSassLoader = {
      loader: require.resolve('fast-sass-loader'),
      options: {
        data: `
          $feature-flags: (
            ui-shell: true,
            enable-css-custom-properties: ${CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES},
            enable-v11-release: ${CARBON_ENABLE_V11_RELEASE},
          );
        `,
        implementation: require('sass'),
        includePaths: [path.resolve(__dirname, '..', '..', 'node_modules')],
      },
    };

    config.module.rules.push({
      test: /-story\.jsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {
            prettierConfig: {
              parser: 'babylon',
              printWidth: 80,
              tabWidth: 2,
              bracketSpacing: true,
              trailingComma: 'es5',
              singleQuote: true,
            },
          },
        },
      ],
      enforce: 'pre',
    });

    config.module.rules.push({
      test: /\.scss$/,
      sideEffects: true,
      use: [
        {
          loader: useExternalCss ? MiniCssExtractPlugin.loader : 'style-loader',
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
            plugins: () => {
              const autoPrefixer = require('autoprefixer')({
                overrideBrowserslist: ['last 1 version', 'ie >= 11'],
              });
              return [
                customProperties(),
                autoPrefixer,
                ...(useRtl ? [rtlcss] : []),
              ];
            },
            sourceMap: true,
          },
        },
        NODE_ENV === 'production' || useSassLoader
          ? sassLoader
          : fastSassLoader,
      ],
    });

    if (useExternalCss) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        })
      );
    }

    // Enable process.env variables other than STORYBOOK_* in our preview
    // environment
    // @see https://github.com/storybookjs/storybook/issues/12270#issuecomment-755398949
    const definePlugin = config.plugins.find((plugin) => {
      return plugin.definitions && plugin.definitions['process.env'];
    });

    definePlugin.definitions['process.env'] = {
      ...definePlugin.definitions['process.env'],
      CARBON_ENABLE_V11_RELEASE: JSON.stringify(CARBON_ENABLE_V11_RELEASE),
    };

    return config;
  },
};
