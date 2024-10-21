/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

process.env.JEST_PUPPETEER_CONFIG = `${__dirname}/jest-puppeteer.config.js`;

module.exports = {
  globalSetup: './setup',
  globalTeardown: 'jest-environment-puppeteer/teardown',
  setupFilesAfterEnv: ['expect-puppeteer'],
  testEnvironment: 'jest-environment-puppeteer',
  testRegex: '.*_steps\\.js$',
};
