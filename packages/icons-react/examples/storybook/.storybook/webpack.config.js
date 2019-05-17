'use strict';

const TerserPlugin = require('terser-webpack-plugin');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.optimization = {
    ...defaultConfig.optimization,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          mangle: false,
        },
      }),
    ],
  };

  defaultConfig.module.rules.push({
    test: /-story\.js$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          prettierConfig: {
            bracketSpacing: true,
            parser: 'babylon',
            printWidth: 80,
            singleQuote: true,
            trailingComma: 'es5',
          },
        },
      },
    ],
    enforce: 'pre',
  });

  return defaultConfig;
};
