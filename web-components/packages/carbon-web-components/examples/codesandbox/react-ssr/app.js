/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const React = require('react');
const ReactDOMServer = require('react-dom/server.js');
const { default: App } = require('./views/App.js');

const app = express();
const compiler = webpack(require('./webpack.config'));

app.use(webpackDevMiddleware(compiler, { index: false, serverSideRender: true }));

app.get('/', (req, res) => {
  const { devMiddleware } = res.locals.webpack;
  const { stats } = devMiddleware;
  const { assetsByChunkName } = stats.toJson();
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'public, max-age=0');
  res.send(
    `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>carbon-web-components example with React SSR</title>
        </head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <div id="root">${ReactDOMServer.renderToString(React.createElement(App))}</div>
          <script src="${assetsByChunkName.main}"></script>
        </body>
      </html>
    `
  );
  res.end();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`); // eslint-disable-line no-console
});
