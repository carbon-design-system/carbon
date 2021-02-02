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
  CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES = 'false',
  CARBON_REACT_STORYBOOK_USE_RTL,
  NODE_ENV = 'development',
} = process.env;

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
    CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES === 'true' &&
      require.resolve('./dist/preset.js'),
  ],

  webpack(config) {
    const sassLoader = {
      loader: 'sass-loader',
      options: {
        prependData() {
          return `
            $feature-flags: (
              ui-shell: true,
              enable-css-custom-properties: ${CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES},
            );
          `;
        },
        sassOptions: {
          includePaths: [path.resolve(__dirname, '..', 'node_modules')],
        },
        sourceMap: true,
      },
    };

    const fastSassLoader = {
      loader: 'fast-sass-loader',
      options: {
        data: `
          $feature-flags: (
            ui-shell: true,
            enable-css-custom-properties: ${CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES},
          );
        `,
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
        NODE_ENV === 'production' ? sassLoader : fastSassLoader,
      ],
    });

    if (useExternalCss) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        })
      );
    }

    return config;
  },
};
