#!/usr/bin/env node

/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const commander = require('commander');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

async function makeWebpackServer(port) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const config = require(path.resolve(process.cwd(), 'webpack.config.js'));
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, Object.assign(config.devServer || {}, { open: false }));
    compiler.hooks.done.tap('webpack-server', () => {
      server.listen(port, error => {
        if (error) {
          reject(error);
        } else {
          resolve(server);
        }
      });
    });
    compiler.hooks.failed.tap('webpack-server', error => {
      reject(error);
    });
  });
}

commander.option('-p, --port [port]', 'The port to use').parse(process.argv);

makeWebpackServer(commander.port).then(
  () => {
    process.exit(0);
  },
  error => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
);
