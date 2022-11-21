/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

process.env.JEST_PLAYWRIGHT_CONFIG = `${__dirname}/jest-playwright.config.js`;

module.exports = {
  globalSetup: './setup',
  globalTeardown: './teardown',
  setupFilesAfterEnv: ['expect-playwright'],
  testEnvironment: 'jest-playwright-preset',
  testRegex: '.*_steps\\.js$',
};
