/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshot } = require('../../test-utils/snapshot');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('breadcrumb', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('breadcrumb @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'breadcrumb',
          story: 'default',
          theme,
        });
      });

      test('breadcrumb with overflow menu @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'breadcrumb',
          story: 'breadcrumb-with-overflow-menu',
          theme,
        });
        await page
          .locator('button[aria-haspopup="true"][aria-expanded="false"]')
          .click();
        await snapshot(page, {
          component: 'breadcrumb',
          story: 'breadcrumb-with-overflow-menu',
          theme,
        });
      });
    });
  });
});
