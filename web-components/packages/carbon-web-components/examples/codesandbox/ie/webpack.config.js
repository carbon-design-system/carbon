/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.dirname(require.resolve('carbon-web-components/es')),
          path.dirname(require.resolve('lit-html')),
          path.dirname(require.resolve('lit-element')),
          path.dirname(require.resolve('@webcomponents/custom-elements')),
          // `ShadyCSS` NPM package is missing its entry point file
          path.dirname(require.resolve('@webcomponents/shadycss/scoping-shim.min.js')),
          path.dirname(require.resolve('@webcomponents/shadydom')),
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
                    targets: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
                  },
                ],
              ],
              // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
              plugins: [['@babel/plugin-transform-runtime', { version: '7.3.0' }]],
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, 'src'),
    publicPath: '/dist',
  },
};
