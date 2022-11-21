/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const webpack = require('webpack');
const acceptLanguageParser = require('accept-language-parser');
const rtlDetect = require('rtl-detect');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const reCssBundle = /\.css\.js$/i;

const devServer = {
  open: true,
  contentBase: path.resolve(__dirname, 'src'),
  publicPath: '/dist',
  setup(app, server) {
    app.get('/', (req, res) => {
      const { fileSystem, waitUntilValid } = server.middleware;
      waitUntilValid(() => {
        const isRtl = rtlDetect.isRtlLang(acceptLanguageParser.parse(req.headers['accept-language'])[0].code);
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'public, max-age=0');
        res.send(fileSystem.readFileSync(path.resolve(__dirname, `dist/index${!isRtl ? '' : '-rtl'}.html`)));
        res.end();
      });
    });
  },
};

module.exports = [
  {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: false,
        template: './src/index.ejs',
        templateParameters: {
          dir: 'ltr',
        },
      }),
    ],
    devServer,
  },
  {
    entry: './src/index.js',
    output: {
      filename: 'bundle-rtl.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index-rtl.html',
        inject: false,
        template: './src/index.ejs',
        templateParameters: {
          dir: 'rtl',
        },
      }),
      new webpack.NormalModuleReplacementPlugin(reCssBundle, (resource) => {
        resource.request = resource.request.replace(reCssBundle, '.rtl.css.js');
      }),
    ],
    devServer,
  },
];
