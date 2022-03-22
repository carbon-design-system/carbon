/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /packages\/.*\/(es|lib|umd)/,
          /packages\/icons-react\/next/,
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['extends browserslist-config-carbon'],
                    },
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                'dev-expression',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-export-namespace-from',
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-transform-react-constant-elements',
              ],
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('sass-loader'),
            options: {
              implementation: require('sass'),
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, '..', 'node_modules'),
                  path.resolve(__dirname, '..', '..', '..', 'node_modules'),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    fallback: {
      assert: false,
      buffer: false,
      console: false,
      constants: false,
      crypto: false,
      domain: false,
      events: false,
      http: false,
      https: false,
      net: false,
      os: false,
      path: false,
      punycode: false,
      process: false,
      querystring: false,
      stream: false,
      string_decoder: false,
      sys: false,
      timers: false,
      tls: false,
      tty: false,
      url: false,
      util: false,
      vm: false,
      zlib: false,
    },
  },
};
