/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt FluidDropdown', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDropdown',
      id: 'experimental-fluid-components-unstable-fluiddropdown--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidDropdown');
  });

  test('@avt-advanced-states condensed', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDropdown',
      id: 'experimental-fluid-components-unstable-fluiddropdown--condensed',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidDropdown-condensed');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDropdown',
      id: 'experimental-fluid-components-unstable-fluiddropdown--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidDropdown-skeleton');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Dropdown',
      id: 'experimental-fluid-components-unstable-fluiddropdown--default',
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
    // Expect focus to be on 1st item in menu after Arrow Down
    // when there is no initial selected item
    await expect(
      page.getByRole('option', {
        name: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // Close with Escape, retain focus, and open with Space
    await page.keyboard.press('Escape');
    await page.keyboard.press('Space');
    await expect(menu).toBeVisible();
    // Close with Escape, retain focus, and open with Enter
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    // Expect focus to be retained when no initial selected item after Enter
    await expect(toggleButton).toBeFocused();
    await expect(menu).toBeVisible();
    // Select item from menu
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    // Open with Enter after item has been selected
    await page.keyboard.press('Enter');
    // Should focus on selected item by default
    await expect(
      page.getByRole('option', {
        name: 'Option 2',
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--active cds--list-box__menu-item--highlighted'
    );
    // Should focus on selected item by default on Arrow Down as well
    await page.keyboard.press('Escape');
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('option', {
        name: 'Option 2',
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--active cds--list-box__menu-item--highlighted'
    );
    // Navigation inside the menu
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('option', {
        name: 'Option 4',
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
