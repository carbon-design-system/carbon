/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Dropdown @avt', () => {
  test('accessibility-checker', async ({ page }) => {
    await visitStory(page, {
      component: 'Dropdown',
      id: 'components-dropdown--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Dropdown');
  });

  // Skipping now due to AVT violation, possible false positive
  test.skip('accessibility-checker open dropdown', async ({ page }) => {
    await visitStory(page, {
      component: 'Dropdown',
      id: 'components-dropdown--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('combobox')).toBeVisible();

    // Tab and open the Dropdown
    await page.keyboard.press('Tab');
    const toggleButton = page.getByRole('combobox');
    const menu = page.getByRole('listbox');
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('combobox', { expanded: true })).toBeVisible;
    await expect(menu).toBeFocused();

    await expect(page).toHaveNoACViolations('Dropdown-open');
  });

  test('dropdown - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Dropdown',
      id: 'components-dropdown--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('combobox')).toBeVisible();

    // Tab and open the Dropdown with Arrow Down
    await page.keyboard.press('Tab');
    const toggleButton = page.getByRole('combobox');
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('listbox')).toBeVisible();
    // Close with Escape, retain focus, and open with Enter
    await page.keyboard.press('Escape');
    await expect(page.getByRole('listbox')).not.toBeVisible();
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    // Navigation inside the menu
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('option', {
        name: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        selected: true,
      })
    ).toBeVisible();
    // move to second option
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('option', {
        name: 'Option 1',
        selected: true,
      })
    ).toBeVisible();
    // select second option
    await page.keyboard.press('Enter');
    // focus comes back to the toggle button
    await expect(toggleButton).toBeFocused();
  });
});
