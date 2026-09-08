/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

// NOTE: All tests are skipped because NotificationsPanel stories are excluded
// from the v11 Storybook via productMigratedStoryGlobs. Re-enable when the v12
// Storybook runs in CI.

test.describe('@avt NotificationsPanel', () => {
  test.skip('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'NotificationsPanel',
      id: 'components-notificationspanel--default',
      globals: {
        theme: 'white',
      },
    });

    const notificationPanel = page.locator('[role="dialog"]');
    await expect(notificationPanel).toBeVisible();
    await page.waitForTimeout(300);

    await expect(page).toHaveNoACViolations(
      'NotificationsPanel @avt-default-state'
    );
  });

  test.skip('@avt-notification-panel-focus-trap', async ({ page }) => {
    await visitStory(page, {
      component: 'NotificationsPanel',
      id: 'components-notificationspanel--default',
      globals: {
        theme: 'white',
      },
    });

    const notificationPanel = page.locator('[role="dialog"]');
    await expect(notificationPanel).toBeVisible();

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      await expect(notificationPanel).toContainText(
        await page.evaluate(() => document.activeElement?.textContent || '')
      );
    }
  });
});
