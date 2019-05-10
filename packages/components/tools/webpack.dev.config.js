'use strict';

const env = process.env.NODE_ENV || 'development';
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

class FeatureFlagProxyPlugin {
  /**
   * A WebPack resolver plugin that proxies module request
   * for `src/globals/js/feature-flags` to `demo/js/feature-flags`,
   * which is a file generated from `src/globals/js/feature-flags` with effective feature flag values.
   */
  constructor() {
    this.source = 'before-described-relative';
  }

  apply(resolver) {
    resolver.plugin(this.source, (request, callback) => {
      if (/feature-flags$/i.test(request.path)) {
        request.path = path.resolve(__dirname, '../demo/feature-flags');
      }
      callback();
    });
  }
}

module.exports = {
  mode: env,
  devtool: 'source-maps',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, '../demo/index'),
  ],
  output: {
    path: path.resolve(__dirname, '../demo'),
    publicPath: '/',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    filename: 'demo.js',
    library: 'CarbonComponents',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    plugins: [new FeatureFlagProxyPlugin()],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
