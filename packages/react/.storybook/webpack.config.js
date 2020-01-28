/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const rtlcss = require('rtlcss');
const customProperties = require('postcss-custom-properties');

const {
  CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES = 'false',
  CARBON_REACT_STORYBOOK_USE_EXTERNAL_CSS,
  CARBON_REACT_USE_CONTROLLED_STATE_WITH_EVENT_LISTENER,
  CARBON_REACT_STORYBOOK_USE_RTL,
  NODE_ENV = 'development',
} = process.env;

const useExternalCss = NODE_ENV === 'production';
const useControlledStateWithEventListener =
  CARBON_REACT_USE_CONTROLLED_STATE_WITH_EVENT_LISTENER === 'true';
const useRtl = CARBON_REACT_STORYBOOK_USE_RTL === 'true';

const replaceTable = {
  useControlledStateWithEventListener,
};

class FeatureFlagProxyPlugin {
  /**
   * A WebPack resolver plugin that proxies module request
   * for `carbon-components/es/globals/js/settings` to `./settings`.
   */
  constructor() {
    this.source = 'before-described-relative';
  }

  apply(resolver) {
    resolver.plugin(this.source, (request, callback) => {
      if (/[\\/]globals[\\/]js[\\/]settings$/.test(request.path)) {
        request.path = path.resolve(__dirname, './settings');
      }
      callback();
    });
  }
}

module.exports = ({ config, mode }) => {
  config.devtool =
    NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map';
  config.optimization = {
    ...config.optimization,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          mangle: false,
        },
      }),
    ],
  };

  config.module.rules.push({
    test: /(\/|\\)FeatureFlags\.js$/,
    loader: 'string-replace-loader',
    options: {
      multiple: Object.keys(replaceTable).map(key => ({
        search: `export\\s+const\\s+${key}\\s*=\\s*false`,
        replace: `export const ${key} = ${replaceTable[key]}`,
        flags: 'i',
      })),
    },
  });

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

  config.resolve = {
    modules: ['node_modules'],
    plugins: [new FeatureFlagProxyPlugin()],
  };

  return config;
};
