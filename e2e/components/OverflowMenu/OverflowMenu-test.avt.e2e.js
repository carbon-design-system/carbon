/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt OverflowMenu', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'OverflowMenu',
      id: 'components-overflowmenu--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('OverflowMenu');
  });

  test('@avt-advanced-states render custom icon', async ({ page }) => {
    await visitStory(page, {
      component: 'OverflowMenu',
      id: 'components-overflowmenu--render-custom-icon',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('OverflowMenu-custom-icon');
  });

  test('@avt-advanced-states open menu', async ({ page }) => {
    await visitStory(page, {
      component: 'OverflowMenu',
      id: 'components-overflowmenu--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('button')).toBeVisible();

    // Tab and open the toggle button for the OverflowMenu
    await page.keyboard.press('Tab');
    const toggleButton = page.getByRole('button');
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menu')).toBeVisible();

    await expect(page).toHaveNoACViolations('OverflowMenu-open');
  });

  test('@avt-advanced-states render custom icon open', async ({ page }) => {
    await visitStory(page, {
      component: 'OverflowMenu',
      id: 'components-overflowmenu--render-custom-icon',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('button')).toBeVisible();

    // Tab and open the toggle button for the OverflowMenu
    await page.keyboard.press('Tab');
    const toggleButton = page.getByRole('button');
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menu')).toBeVisible();

    await expect(page).toHaveNoACViolations('OverflowMenu-custom-icon-open');
  });

  test('@avt-keyboard-nav overflow-menu', async ({ page }) => {
    await visitStory(page, {
      component: 'OverflowMenu',
      id: 'components-overflowmenu--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('button')).toBeVisible();

    // Tab and open the OverflowMenu
    await page.keyboard.press('Tab');
    const toggleButton = page.getByRole('button');
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menu')).toBeVisible();
    // Navigation inside the menu
    await expect(
      page.locator('button').filter({ hasText: 'Stop app' })
    ).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(
      page.locator('button').filter({ hasText: 'Restart app' })
    ).toBeFocused();
    await page.keyboard.press('Enter');
    // focus comes back to the toggle button
    await expect(toggleButton).toBeFocused();
  });
});
