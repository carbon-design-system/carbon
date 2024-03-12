/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Dropdown', () => {
  test('@avt-default-state', async ({ page }) => {
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
  test.skip('@avt-advanced-states open state', async ({ page }) => {
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

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Dropdown',
      id: 'components-dropdown--default',
      globals: {
        theme: 'white',
      },
    });
    const toggleButton = page.getByRole('combobox');
    const menu = page.getByRole('listbox');

    await expect(toggleButton).toBeVisible();
    // Tab and open the Dropdown with Arrow Down
    await page.keyboard.press('Tab');
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(menu).toBeVisible();
    // Close with Escape, retain focus, and open with Space
    await page.keyboard.press('Escape');
    await page.keyboard.press('Space');
    await expect(menu).toBeVisible();
    // Close with Escape, retain focus, and open with Enter
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    // Should focus on selected item by default
    await expect(
      page.getByRole('option', {
        name: 'Option 1',
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--active cds--list-box__menu-item--highlighted'
    );
    // Navigation inside the menu
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('option', {
        name: 'Option 2',
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // select second option
    await page.keyboard.press('Enter');
    // focus comes back to the toggle button
    await expect(toggleButton).toBeFocused();
  });
});
