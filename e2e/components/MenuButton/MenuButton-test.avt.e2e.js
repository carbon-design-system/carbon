/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('MenuButton @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'MenuButton',
      id: 'components-menubutton--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('MenuButton');
  });

  test('@avt-advanced-states with danger', async ({ page }) => {
    await visitStory(page, {
      component: 'MenuButton',
      id: 'components-menubutton--with-danger',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('MenuButton-with-danger');
  });

  test('@avt-advanced-states with dividers', async ({ page }) => {
    await visitStory(page, {
      component: 'MenuButton',
      id: 'components-menubutton--with-dividers',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('MenuButton-with-dividers');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'MenuButton',
      id: 'components-menubutton--default',
      globals: {
        theme: 'white',
      },
    });

    const actionButton = page.getByRole('button', { name: 'Action' });
    await expect(actionButton).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(actionButton).toBeFocused();

    // Entering the menu button
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitem').first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('menuitem').nth(1)).toBeFocused();
    // Skip the disabled item and come back to the first item
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('menuitem').first()).toBeFocused();

    // Closing by selecting an item and focusing on the action button
    await page.keyboard.press('Enter');
    await expect(actionButton).toBeFocused();
  });

  test('@avt-keyboard-nav with danger', async ({ page }) => {
    await visitStory(page, {
      component: 'MenuButton',
      id: 'components-menubutton--with-danger',
      globals: {
        theme: 'white',
      },
    });

    const actionButton = page.getByRole('button', { name: 'Action' });
    await expect(actionButton).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(actionButton).toBeFocused();

    // Entering the menu button
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitem').first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    // Validate danger button
    await expect(page.getByRole('menuitem').last()).toBeFocused();
    await expect(page.getByText('Danger action')).toBeVisible();

    // Closing by selecting an item and focusing on the action button
    await page.keyboard.press('Enter');
    await expect(actionButton).toBeFocused();
  });

  test('@avt-keyboard-nav with dividers', async ({ page }) => {
    await visitStory(page, {
      component: 'MenuButton',
      id: 'components-menubutton--with-dividers',
      globals: {
        theme: 'white',
      },
    });

    const actionButton = page.getByRole('button', { name: 'Action' });
    await expect(actionButton).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(actionButton).toBeFocused();

    // Entering the menu button
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitem').first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('menuitem').last()).toBeFocused();
    expect(page.getByRole('separator')).toBeTruthy();

    // Closing by selecting an item and focusing on the action button
    await page.keyboard.press('Enter');
    await expect(actionButton).toBeFocused();
  });
});
