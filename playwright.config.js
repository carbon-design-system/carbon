/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { devices } = require('@playwright/test');
const path = require('path');

const config = {
  // https://playwright.dev/docs/api/class-testconfig#test-config-test-dir
  testDir: path.join(__dirname, 'e2e'),

  // https://playwright.dev/docs/api/class-testconfig#test-config-test-ignore
  testIgnore: [
    path.join(__dirname, 'e2e', 'icons'),
    path.join(__dirname, 'e2e', 'icons-react'),
    path.join(__dirname, 'e2e', 'icons-vue'),
    path.join(__dirname, 'e2e', 'pictograms'),
    path.join(__dirname, 'e2e', 'pictograms-react'),
  ],

  // https://playwright.dev/docs/api/class-testconfig#test-config-test-match
  testMatch: /.*-test.e2e\.m?js$/,

  // https://playwright.dev/docs/api/class-testconfig#test-config-timeout
  timeout: 1000 * 30,

  // https://playwright.dev/docs/api/class-testconfig#test-config-output-dir
  outputDir: path.join(__dirname, '.playwright', 'results'),
  snapshotDir: path.join(__dirname, '.playwright', 'snapshots'),

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    // Desktop
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
      },
    },
  ],
  reporter: [
    ['line'],
    [
      'json',
      {
        outputFile: path.join(__dirname, '.playwright', 'results.json'),
      },
    ],
  ],
};

module.exports = config;
