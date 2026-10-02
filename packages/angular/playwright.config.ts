/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright integration-test configuration for @carbon/angular.
 *
 * Layer 2 tests run against the built Storybook static site.
 *
 * Local usage:
 *   yarn workspace @carbon/angular storybook:build
 *   yarn workspace @carbon/angular e2e
 *
 * CI: the `e2e` script runs storybook:build then starts http-server and
 * runs playwright automatically via the webServer config below.
 *
 * NOTE: `serve` (the npm package) rewrites Storybook's iframe.html?... URLs.
 * Use `http-server` instead — it serves files as-is without URL rewriting.
 */
const storybookUrl = process.env.STORYBOOK_URL ?? 'http://localhost:6012';

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],
  use: {
    baseURL: storybookUrl,
    trace: 'on-first-retry',
  },
  // Automatically start http-server against the built Storybook static output
  // when no external STORYBOOK_URL is provided (local dev and CI).
  webServer: process.env.STORYBOOK_URL
    ? undefined
    : {
        command: 'npx http-server storybook-static --port 6012 --silent',
        url: 'http://localhost:6012',
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
      },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
