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
    await expect(page).toHaveNoACViolations('Menu @avt-default-state');
  });

  test.fixme('@avt-keyboard-nav Menu', async ({ page }) => {
    await visitStory(page, {
      component: 'Menu',
      id: 'components-menu--default',
      globals: {
        theme: 'white',
      },
    });

    const firstItem = await page.getByRole('menuitem', { name: 'Share with' });
    const LastItem = await page.getByRole('menuitem', { name: 'Delete' });
    const nestedMenu = await page.getByRole('menu', { name: 'Share with' });
    const nestedMenuItem = await page
      .getByRole('menuitemradio')
      .filter({ hasText: 'None' })
      .nth(0);

    await expect(firstItem).toBeVisible();
    await expect(LastItem).toBeVisible();
    await expect(nestedMenu).toBeHidden();
    await expect(firstItem).toBeFocused();

    // Should go to last item when focused on the first item and arrow up is pressed
    await page.keyboard.press('ArrowUp');
    await expect(LastItem).toBeFocused();

    // Should open menu with ArrowRight and focus on first item
    await page.keyboard.press('ArrowDown');
    await expect(firstItem).toBeFocused();

    // avoid flaky test failures from the keyboard press happening too quickly
    // this retries the keypress along with the focus assertion until it passes
    await expect(async () => {
      await page.keyboard.press('ArrowRight');
      expect(nestedMenuItem).toBeFocused();
    }).toPass();

    await expect(nestedMenu).toBeVisible();
    await expect(nestedMenuItem).toBeVisible();
    await expect(nestedMenuItem).toHaveAttribute('aria-checked', 'false');

    // avoid flaky test failures from the keyboard press happening too quickly
    // this retries the keypress along with the focus assertion until it passes
    await expect(async () => {
      // Should select item with enter key
      await page.keyboard.press('Enter');
      await expect(nestedMenuItem).toHaveAttribute('aria-checked', 'true');
    }).toPass();

    // avoid flaky test failures from the keyboard press happening too quickly
    // this retries the keypress along with the focus assertion until it passes
    await expect(async () => {
      // Should close menu with ArrowLeft
      await page.keyboard.press('ArrowLeft');
      await expect(nestedMenu).toBeHidden();
    }).toPass();
  });
});
