/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('ComboButton @avt', () => {
  test('@avt-default-state ComboButton ', async ({ page }) => {
    await visitStory(page, {
      component: 'ComboButton',
      id: 'components-combobutton--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ComboButton');
  });

  test('@avt-advanced-states ComboButton With Danger ', async ({ page }) => {
    await visitStory(page, {
      component: 'ComboButton',
      id: 'components-combobutton--with-danger',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ComboButton-with-danger');
  });

  test('@avt-keyboard-nav ComboButton', async ({ page }) => {
    await visitStory(page, {
      component: 'ComboButton',
      id: 'components-combobutton--default',
      globals: {
        theme: 'white',
      },
    });
    const primaryButton = page.getByRole('button', { name: 'Primary action' });
    const iconButton = page.locator('button.cds--btn--icon-only');

    // Testing buttons
    await expect(primaryButton).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(primaryButton).toBeFocused();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(iconButton).toBeFocused();

    // Checking menu interaction
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitem').first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('menuitem').nth(1)).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menuitem').first()).not.toBeVisible();
  });

  test('@avt-keyboard-nav ComboButton with danger', async ({ page }) => {
    await visitStory(page, {
      component: 'ComboButton',
      id: 'components-combobutton--with-danger',
      globals: {
        theme: 'white',
      },
    });
    const primaryButton = page.getByRole('button', { name: 'Primary action' });
    const iconButton = page.locator('button.cds--btn--icon-only');

    // Testing buttons
    await expect(primaryButton).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(primaryButton).toBeFocused();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(iconButton).toBeFocused();

    // Checking menu interaction
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitem').first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    // Checking danger button
    await expect(page.getByRole('menuitem').nth(3)).toBeFocused();
    await expect(page.getByRole('menuitem').nth(3)).toHaveClass(
      /cds--menu-item--danger/
    );
    // Selecting the item to close the menu
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitem').first()).not.toBeVisible();
  });
});
