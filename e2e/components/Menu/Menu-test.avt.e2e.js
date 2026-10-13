/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Menu', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Menu',
      id: 'components-menu--default',
      globals: {
        theme: 'white',
      },
    });

    const actionButton = page.getByRole('button', { name: 'Actions' });
    const menu = page.getByRole('menu', { name: 'Actions' });

    await expect(actionButton).toBeVisible();
    await expect(menu).toBeHidden();

    await actionButton.click();
    await expect(page.getByRole('menuitem').first()).toBeFocused();
    await expect(page).toHaveNoACViolations('Menu @avt-default-state');
  });

  test('@avt-keyboard-nav Menu', async ({ page }) => {
    await visitStory(page, {
      component: 'Menu',
      id: 'components-menu--default',
      globals: {
        theme: 'white',
      },
    });

    const actionButton = page.getByRole('button', { name: 'Actions' });
    const menu = page.getByRole('menu', { name: 'Actions' });
    const firstItem = page.getByRole('menuitem', { name: /Share with/ });
    const lastItem = page.getByRole('menuitem', { name: /Delete/ });
    const nestedMenu = page.getByRole('menu', { name: 'Share with' });
    const nestedMenuItem = page
      .getByRole('menuitemradio')
      .filter({ hasText: 'None' })
      .nth(0);

    await page.keyboard.press('Tab');
    await expect(actionButton).toBeFocused();
    await expect(menu).toBeHidden();

    await page.keyboard.press('Enter');
    await expect(firstItem).toBeVisible();
    await expect(lastItem).toBeVisible();
    await expect(nestedMenu).toBeHidden();
    await expect(firstItem).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(actionButton).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(firstItem).toBeFocused();

    // Should go to last item when focused on the first item and arrow up is pressed
    await page.keyboard.press('ArrowUp');
    await expect(lastItem).toBeFocused();

    // Should open menu with ArrowRight and focus on first item
    await page.keyboard.press('ArrowDown');
    await expect(firstItem).toBeFocused();

    // avoid flaky test failures from the keyboard press happening too quickly
    // this retries the keypress along with the focus assertion until it passes
    await expect(async () => {
      await page.keyboard.press('ArrowRight');
      await expect(nestedMenuItem).toBeFocused();
    }).toPass();

    await expect(nestedMenu).toBeVisible();
    await expect(nestedMenuItem).toBeVisible();
    await expect(nestedMenuItem).toHaveAttribute('aria-checked', 'false');

    // avoid flaky test failures from the keyboard press happening too quickly
    // this retries the keypress along with the focus assertion until it passes
    await expect(async () => {
      // Should close menu with ArrowLeft
      await page.keyboard.press('ArrowLeft');
      await expect(nestedMenu).toBeHidden();
      await expect(firstItem).toBeFocused();
    }).toPass();

    // avoid flaky test failures from the keyboard press happening too quickly
    // this retries the keypress along with the focus assertion until it passes
    await expect(async () => {
      await page.keyboard.press('ArrowRight');
      await expect(nestedMenuItem).toBeFocused();
    }).toPass();

    await expect(nestedMenuItem).toHaveAttribute('aria-checked', 'false');

    // Should select item with enter key and close the root menu
    await page.keyboard.press('Enter');
    await expect(menu).toBeHidden();
    await expect(actionButton).toBeFocused();
  });
});
