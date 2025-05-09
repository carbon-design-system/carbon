/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Dialog', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--modal',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Dialog');
  });
  test('@avt-advanced-states modal', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--modal',
      globals: {
        theme: 'white',
      },
    });
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/cds--dialog cds--dialog--modal/);
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Save' })).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();

    await page.getByRole('button', { name: 'Close' }).click();
    await expect(dialog).toBeHidden();
  });
  test('@avt-advanced-states non-modal', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--non-modal',
      globals: {
        theme: 'white',
      },
    });
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/cds--dialog/);
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeFocused();

    page.getByRole('button', { name: 'Cancel' }).focus();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeFocused();
  });
  test('@avt-advanced-states passive dialog', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--passive-dialog',
      globals: {
        theme: 'white',
      },
    });
    const toggleButton = page.getByRole('button', { name: 'Toggle open' });
    await toggleButton.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/cds--dialog cds--dialog--modal/);
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();

    await page.getByRole('button', { name: 'Close' }).click();
    await expect(dialog).toBeHidden();
  });

  test('@avt-alertdialog-role danger dialog', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--danger-dialog',
      globals: {
        theme: 'white',
      },
    });
    const toggleButton = page.getByRole('button', { name: 'Toggle open' });
    await toggleButton.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();
  });
});
