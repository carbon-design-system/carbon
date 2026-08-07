/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt SidePanel', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'SidePanel',
      id: 'components-sidepanel--slide-over',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('SidePanel');
  });

  test('@avt-multi-step', async ({ page }) => {
    await visitStory(page, {
      component: 'SidePanel',
      id: 'components-sidepanel--panel-with-second-step',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('Main view')).toBeVisible();
    await page.getByText('View all').click();
    await expect(page.getByText('Detail view')).toBeVisible();
    await page.getByRole('button', { name: 'back' }).click();
    await expect(page.getByText('Main view')).toBeVisible();
  });

  test('@avt-action-toolbar', async ({ page }) => {
    await visitStory(page, {
      component: 'SidePanel',
      id: 'components-sidepanel--with-action-toolbar',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByLabel('Close')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByText('Copy')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Settings')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Delete')).toBeFocused();
  });

  test('@avt-focus-trap', async ({ page }) => {
    await visitStory(page, {
      component: 'SidePanel',
      id: 'components-sidepanel--slide-over',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByLabel('Close')).toBeFocused();
    await page.getByLabel('Close').click();
    await expect(page.getByText('Open side panel')).toBeFocused();
  });
});
