'use strict';

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');

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
  entry: !isDev
    ? [path.resolve(__dirname, '../demo/index')]
    : [
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, '../demo/index'),
      ],
  output: {
    path: path.resolve(__dirname, '../demo'),
    publicPath: '/',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    filename: isDev ? 'demo.js' : 'demo.min.js',
    library: 'CarbonComponents',
    libraryTarget: 'var',
  },
  optimization: {
    minimizer: isDev ? [] : [new TerserPlugin()],
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
  plugins: !isDev
    ? []
    : [new webpack.ProgressPlugin(), new webpack.HotModuleReplacementPlugin()],
  performance: { hints: false },
};
