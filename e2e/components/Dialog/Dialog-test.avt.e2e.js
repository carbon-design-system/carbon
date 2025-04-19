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
  test('@avt-native-dialog-behavior modal', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--modal',
      globals: {
        theme: 'white',
      },
    });
    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/cds--dialog cds--dialog--modal/);
    await expect(page.locator('.cds--dialog__close')).toBeFocused();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(
      page.locator('.cds--btn.cds--btn--secondary:has-text("Close")')
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.locator('.cds--btn.cds--btn--primary:has-text("Save")')
    ).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(
      page.locator('.cds--btn.cds--btn--secondary:has-text("Close")')
    ).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('.cds--dialog__close')).toBeFocused();
    await expect(page.locator('.cds--dialog__header')).toBeVisible();
    await expect(page.locator('.cds--dialog-header__heading')).toBeVisible();
    await expect(page.locator('.cds--dialog-header__label')).toBeVisible();
    await expect(page.locator('.cds--dialog-content')).toBeVisible();
    await expect(page.locator('.cds--dialog-footer')).toBeVisible();
    await page.locator('.cds--dialog__close').click();
    await expect(dialog).toBeHidden();
  });
  test('@avt-native-dialog-behavior non-modal', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--non-modal',
      globals: {
        theme: 'white',
      },
    });
    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/cds--dialog/);
    await expect(page.locator('.cds--dialog__close')).toBeFocused();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeFocused();
    await page
      .locator('.cds--btn.cds--btn--secondary:has-text("Cancel")')
      .focus();
    await expect(
      page.locator('.cds--btn.cds--btn--secondary:has-text("Cancel")')
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.locator('.cds--btn.cds--btn--primary:has-text("Submit")')
    ).toBeFocused();
    await expect(page.locator('.cds--dialog__header')).toBeVisible();
    await expect(page.locator('.cds--dialog-header__heading')).toBeVisible();
    await expect(page.locator('.cds--dialog-header__label')).toBeVisible();
    await expect(page.locator('.cds--dialog-content')).toBeVisible();
    await expect(page.locator('.cds--dialog-footer')).toBeVisible();
  });
  test('@avt-keyboard-nav passive dialog', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--passive-dialog',
      globals: {
        theme: 'white',
      },
    });
    const toggleButton = page.getByRole('button', { name: 'Toggle open' });
    await toggleButton.click();
    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/cds--dialog cds--dialog--modal/);
    await expect(page.locator('.cds--dialog__close')).toBeFocused();
    await page.keyboard.press('Tab');
    // In dialog the focus circules through the close button and URL
    await page.keyboard.press('Tab');
    await expect(page.locator('.cds--dialog__close')).toBeFocused();
    await page.locator('.cds--dialog__close').click();
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
    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/cds--dialog--danger/);
    await expect(
      page.locator('.cds--btn.cds--btn--secondary:has-text("Cancel")')
    ).toBeFocused();
  });
});
