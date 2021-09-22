/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const {
  CARBON_REACT_STORYBOOK_USE_EXTERNAL_CSS,
  CARBON_REACT_USE_CONTROLLED_STATE_WITH_EVENT_LISTENER,
  NODE_ENV = 'development',
} = process.env;

const useControlledStateWithEventListener =
  CARBON_REACT_USE_CONTROLLED_STATE_WITH_EVENT_LISTENER === 'true';

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
      multiple: Object.keys(replaceTable).map((key) => ({
        search: `export\\s+const\\s+${key}\\s*=\\s*false`,
        replace: `export const ${key} = ${replaceTable[key]}`,
        flags: 'i',
      })),
    },
  });

  config.resolve = {
    modules: ['node_modules'],
    plugins: [new FeatureFlagProxyPlugin()],
  };

  return config;
};
