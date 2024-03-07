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
      id: 'components-menu--playground',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Menu @avt-default-state');
  });

  test('@avt-keyboard-nav Menu', async ({ page }) => {
    await visitStory(page, {
      component: 'Menu',
      id: 'components-menu--playground',
      globals: {
        theme: 'white',
      },
    });

    const firstItem = page.getByRole('menuitem', { name: 'Share with' });
    const LastItem = page.getByRole('menuitem', { name: 'Delete' });
    const nestedMenu = page.getByRole('menu', { name: 'Share with' });
    const nestedMenuItem = page
      .getByRole('menuitemradio', {
        name: 'None',
      })
      .first();

    await expect(firstItem).toBeVisible();
    await expect(LastItem).toBeVisible();
    await expect(nestedMenu).not.toBeVisible();
    await expect(firstItem).toBeFocused();

    // Should go to last item when focused on the first item and arrow up is pressed
    await page.keyboard.press('ArrowUp');
    await expect(LastItem).toBeFocused();

    // Should open menu with ArrowRight and focus on first item
    await page.keyboard.press('ArrowDown');
    await expect(firstItem).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(nestedMenu).toBeVisible();
    await expect(nestedMenuItem).toBeVisible();
    await expect(nestedMenuItem).toBeFocused();
    await expect(nestedMenuItem).not.toBeChecked();

    // Should select item with enter key
    await page.keyboard.press('Enter');
    await expect(nestedMenuItem).toBeChecked();

    // Should close menu with ArrowLeft
    await page.keyboard.press('ArrowLeft');
    await expect(nestedMenu).not.toBeVisible();
  });
});
