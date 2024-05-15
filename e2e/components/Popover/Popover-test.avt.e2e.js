/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('@avt Popover', () => {
  test('@avt-advanced-states auto align', async ({ page }) => {
    await visitStory(page, {
      component: 'Popover',
      id: 'components-popover--experimental-auto-align',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Popover-auto-align');
  });

  test('@avt-advanced-states tab tip', async ({ page }) => {
    await visitStory(page, {
      component: 'Popover',
      id: 'components-popover--tab-tip',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Popover-tab-tip');
  });

  test('@avt-keyboard-nav tab tip', async ({ page }) => {
    await visitStory(page, {
      component: 'Popover',
      id: 'components-popover--tab-tip',
      globals: {
        theme: 'white',
      },
    });

    const leftButton = page.getByRole('button', { name: 'Settings' }).first();
    const rightButton = page.getByRole('button', { name: 'Settings' }).last();

    await expect(leftButton).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(leftButton).toBeFocused();

    // Checking popover state and interaction with Enter key
    await expect(page.locator('.cds--popover--open')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.locator('.cds--popover--open')).toBeHidden();

    // Checking popover state and interaction with Space key
    await page.keyboard.press('Space');
    await expect(page.locator('.cds--popover--open')).toBeVisible();
    await page.keyboard.press('Space');
    await expect(page.locator('.cds--popover--open')).toBeHidden();

    // Checking popover state and interaction with Escape key
    await page.keyboard.press('Space');
    await expect(page.locator('.cds--popover--open')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.cds--popover--open')).toBeHidden();

    // Testing right popover
    await page.keyboard.press('Tab');
    await expect(rightButton).toBeFocused();

    // Checking popover state and interaction with Enter key
    await page.keyboard.press('Enter');
    await expect(page.locator('.cds--popover--open')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.locator('.cds--popover--open')).toBeHidden();

    // Checking popover state and interaction with Space key
    await page.keyboard.press('Space');
    await expect(page.locator('.cds--popover--open')).toBeVisible();
    await page.keyboard.press('Space');
    await expect(page.locator('.cds--popover--open')).toBeHidden();

    // Checking popover state and interaction with Escape key (it should not close)
    await page.keyboard.press('Space');
    await expect(page.locator('.cds--popover--open')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.cds--popover--open')).toBeVisible();
  });
});
