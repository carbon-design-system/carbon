/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = (on, config) => {
  if (config.testingType === 'component') {
    const { startDevServer } = require('@cypress/webpack-dev-server');
    const webpackConfig = require('../../webpack.config.js');

    on('dev-server:start', (options) =>
      startDevServer({ options, webpackConfig })
    );
  }

  return config;
};
