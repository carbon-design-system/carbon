/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { devices, expect } = require('@playwright/test');
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
  testMatch: /.*-test(.avt|.vrt)?.e2e\.m?js$/,

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

let aChecker;

expect.extend({
  async toHaveNoACViolations(page, id) {
    if (!aChecker) {
      aChecker = require('accessibility-checker');
      const denylist = new Set([
        'html_lang_exists',
        'page_title_exists',
        'skip_main_exists',
        'html_skipnav_exists',
        'aria_content_in_landmark',
        'aria_child_tabbable',
      ]);

      const ruleset = await aChecker.getRuleset('IBM_Accessibility');
      const customRuleset = JSON.parse(JSON.stringify(ruleset));

      customRuleset.id = 'Custom_Ruleset';
      customRuleset.checkpoints = customRuleset.checkpoints.map(
        (checkpoint) => {
          checkpoint.rules = checkpoint.rules.filter((rule) => {
            return !denylist.has(rule.id);
          });
          return checkpoint;
        }
      );

      aChecker.addRuleset(customRuleset);
    }

    const result = await aChecker.getCompliance(page, id);
    if (aChecker.assertCompliance(result.report) === 0) {
      return {
        pass: true,
      };
    } else {
      return {
        pass: false,
        message: () => aChecker.stringifyResults(result.report),
      };
    }
  },
});

module.exports = config;
