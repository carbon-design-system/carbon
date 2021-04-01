/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const preprocessor = require('@cypress/react/plugins/load-webpack');
const percyHealthCheck = require('@percy/cypress/task');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  config.env.webpackFilename = 'webpack.config.js';
  preprocessor(on, config);

  on('task', percyHealthCheck);
  return config;
};
