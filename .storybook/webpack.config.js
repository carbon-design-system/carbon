'use strict';

const path = require('path');

module.exports = (storybookBaseConfig, configType, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.s?css/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: { importLoaders: 2 },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require('autoprefixer')({
              browsers: ['last 1 version', 'ie >= 11'],
            }),
          ],
        },
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [path.resolve(__dirname, '..', 'node_modules')],
        },
      },
    ],
  });
  return defaultConfig;
};
