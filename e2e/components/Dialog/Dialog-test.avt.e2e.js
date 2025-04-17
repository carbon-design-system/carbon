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

    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();

    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();

    await page.getByRole('button', { name: 'Toggle open' }).click();
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
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

    await expect(page.getByRole('button', { name: 'close' })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();

    const button = page.getByRole('button', { name: 'Toggle open' });
    await button.click();
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
  });

  test('@avt-composable-pattern', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--modal',
      globals: {
        theme: 'white',
      },
    });

    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();

    await expect(page.getByRole('button', { name: 'close' })).toBeFocused();

    await expect(page.locator('.cds--dialog__header')).toBeVisible();
    await expect(page.locator('.cds--dialog-header__heading')).toBeVisible();
    await expect(page.locator('.cds--dialog-header__label')).toBeVisible();
    await expect(page.locator('.cds--dialog-content')).toBeVisible();
    await expect(page.locator('.cds--dialog-footer')).toBeVisible();

    await expect(page.locator('.cds--dialog__header-controls')).toBeVisible();
    await expect(page.locator('.cds--dialog__close')).toBeVisible();

    await page.locator('.cds--dialog__close').click();
    await expect(dialog).toBeHidden();
  });

  test('@avt-keyboard-nav passive dialog', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--passive-dialog',
      globals: {
        theme: 'white',
      },
    });

    const button = page.getByRole('button', { name: 'Toggle open' });
    await button.click();

    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();

    await expect(page.getByRole('button', { name: 'close' })).toBeFocused();

    await expect(page.locator('.cds--dialog-footer')).toBeHidden();

    await page.keyboard.press('Tab');

    await expect(page.getByRole('button', { name: 'close' })).toBeFocused();

    await page.getByRole('button', { name: 'close' }).click();
    await expect(dialog).toBeHidden();
  });

  test('@avt-alertdialog-role', async ({ page }) => {
    await visitStory(page, {
      component: 'unstable_Dialog',
      id: 'experimental-unstable-dialog--danger-dialog',
      globals: {
        theme: 'white',
      },
    });

    const button = page.getByRole('button', { name: 'Toggle open' });
    await button.click();

    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();

    await expect(page.getByRole('button', { name: 'close' })).toBeFocused();

    await expect(dialog).toHaveClass(/cds--dialog--danger/);
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(dialog).toBeHidden();
  });

  //   test('@avt-scrolling-content', async ({ page }) => {
  //     await visitStory(page, {
  //       component: 'unstable_Dialog',
  //       id: 'experimental-unstable-dialog--modal',
  //       globals: {
  //         theme: 'white',
  //       },
  //     });

  //     const dialog = page.locator('dialog');
  //     await expect(dialog).toBeVisible();

  //     // Verify that the close button is focused initially
  //     await expect(page.getByRole('button', { name: 'close' })).toBeFocused();

  //     // Check if content is scrollable when needed
  //     const content = page.locator('.cds--dialog-content');
  //     await expect(content).toBeVisible();

  //     // Check if scrollHeight is greater than clientHeight (indicating scrollable content)
  //     const isScrollable = await content.evaluate((el) => {
  //       return el.scrollHeight > el.clientHeight;
  //     });

  //     // If content is scrollable, it should have the scroll-content class
  //     if (isScrollable) {
  //       await expect(content).toHaveClass(/cds--dialog-scroll-content/);
  //     }

  //     // Close the dialog
  //     await page.getByRole('button', { name: 'Close' }).click();
  //     await expect(dialog).toBeHidden();
  //   });
});
