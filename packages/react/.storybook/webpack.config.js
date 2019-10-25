/**
 * Copyright IBM Corp. 2019
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
  CARBON_REACT_STORYBOOK_USE_STYLE_SOURCEMAP,
  CARBON_REACT_USE_CONTROLLED_STATE_WITH_EVENT_LISTENER,
  CARBON_REACT_STORYBOOK_USE_RTL,
} = process.env;

const useExternalCss = CARBON_REACT_STORYBOOK_USE_EXTERNAL_CSS === 'true';
const useStyleSourceMap = CARBON_REACT_STORYBOOK_USE_STYLE_SOURCEMAP === 'true';
const useControlledStateWithEventListener =
  CARBON_REACT_USE_CONTROLLED_STATE_WITH_EVENT_LISTENER === 'true';
const useRtl = CARBON_REACT_STORYBOOK_USE_RTL === 'true';

const replaceTable = {
  useControlledStateWithEventListener,
};

const styleLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      sourceMap: useStyleSourceMap,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        const autoPrefixer = require('autoprefixer')({
          overrideBrowserslist: ['last 1 version', 'ie >= 11'],
        });
        return [customProperties(), autoPrefixer, ...(useRtl ? [rtlcss] : [])];
      },
      sourceMap: useStyleSourceMap,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      prependData(loaderContext) {
        const entrypoint = path.resolve(__dirname, './_container.scss');
        const flags = `
          $feature-flags: (
            ui-shell: true,
            enable-css-custom-properties: ${CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES},
          );
        `;

        // If we're attempting to process our entrypoint, we'll just pass in the
        // feature flags that we want enabled. This entrypoint will bring in
        // things like the CSS Reset and @font-face declarations that we want to
        // load only once whereas we don't need these loaded per-component
        if (loaderContext.resourcePath === entrypoint) {
          return flags;
        }

        // For other scss files that we bring in from carbon, we can selectively
        // turn off flags that we have that emit CSS that has already been
        // loaded by the entrypoint. We can also disable warnings around feature
        // flag deviations so that this isn't displayed each time an scss file is
        // loaded
        return `
          ${flags}

          $css--font-face: false;
          $css--body: false;
          $css--reset: false;
          $did-warn-diverged-feature-flags: true;
        `;
      },
      sassOptions: {
        includePaths: [path.resolve(__dirname, '..', 'node_modules')],
      },
      sourceMap: useStyleSourceMap,
    },
  },
];

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
  config.devtool = useStyleSourceMap ? 'source-map' : '';
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

  config.module.rules.push({
    test: /\.scss$/,
    sideEffects: true,
    use: [
      { loader: useExternalCss ? MiniCssExtractPlugin.loader : 'style-loader' },
      ...styleLoaders,
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
