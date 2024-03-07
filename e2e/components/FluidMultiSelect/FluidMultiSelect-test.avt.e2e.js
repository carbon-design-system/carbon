/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt FluidMultiSelect', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidMultiSelect',
      id: 'experimental-fluid-components-unstable-fluidmultiselect--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'FluidMultiSelect @avt-default-state'
    );
  });

  test('@avt-advanced-states condensed', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidMultiSelect',
      id: 'experimental-fluid-components-unstable-fluidmultiselect--condensed',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidMultiSelect-condensed');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidMultiSelect',
      id: 'experimental-fluid-components-unstable-fluidmultiselect--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidMultiSelect-skeleton');
  });

  test('@avt-keyboard-nav FluidMultiSelect', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidMultiSelect',
      id: 'experimental-fluid-components-unstable-fluidmultiselect--default',
      globals: {
        theme: 'white',
      },
    });
    const toggleButton = page.getByRole('combobox', {
      expanded: false,
    });
    const selection = page.getByRole('button', {
      name: 'Clear all selected items',
    });
    const menu = page.getByRole('listbox');

    await expect(toggleButton).toBeVisible();
    await expect(selection).not.toBeVisible();
    // Tab and open the MultiSelect with Arrow Down
    await page.keyboard.press('Tab');
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(menu).toBeVisible();
    // Close with Escape, retain focus, and open with Enter
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(menu).toBeVisible();
    // Close with Escape, retain focus, and open with Spacebar
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Space');
    await expect(menu).toBeVisible();
    // Navigation inside the menu
    // move to first option
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('option', {
        name: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // select first option (should select with enter and space)
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('option', {
        name: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        selected: true,
      })
    ).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('option', {
        name: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        selected: false,
      })
    ).toBeVisible();
    await page.keyboard.press('Space');
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
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // select second option
    await page.keyboard.press('Space');
    await expect(
      page.getByRole('option', {
        name: 'Option 1',
        selected: true,
      })
    ).toBeVisible();
    // focus comes back to the toggle button after closing
    await page.keyboard.press('Escape');
    await expect(toggleButton).toBeFocused();
    // should show count of selected items when closed
    await expect(menu).not.toBeVisible();
    await expect(selection).toBeVisible();
    // should only clear selection when escape is pressed when the menu is closed
    await page.keyboard.press('Escape');
    await expect(selection).not.toBeVisible();
  });

  test('@avt-keyboard-nav FluidMultiSelect condensed', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidMultiSelect',
      id: 'experimental-fluid-components-unstable-fluidmultiselect--condensed',
      globals: {
        theme: 'white',
      },
    });
    const toggleButton = page.getByRole('combobox', {
      expanded: false,
    });
    const selection = page.getByRole('button', {
      name: 'Clear all selected items',
    });
    const menu = page.getByRole('listbox');

    await expect(toggleButton).toBeVisible();
    await expect(selection).not.toBeVisible();
    // Tab and open the MultiSelect with Arrow Down
    await page.keyboard.press('Tab');
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(menu).toBeVisible();
    // Close with Escape, retain focus, and open with Enter
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(menu).toBeVisible();
    // Close with Escape, retain focus, and open with Spacebar
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Space');
    await expect(menu).toBeVisible();
    // Navigation inside the menu
    // move to first option
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('option', {
        name: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // select first option (should select with enter and space)
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('option', {
        name: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        selected: true,
      })
    ).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('option', {
        name: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        selected: false,
      })
    ).toBeVisible();
    await page.keyboard.press('Space');
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
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // select second option
    await page.keyboard.press('Space');
    await expect(
      page.getByRole('option', {
        name: 'Option 1',
        selected: true,
      })
    ).toBeVisible();
    // focus comes back to the toggle button after closing
    await page.keyboard.press('Escape');
    await expect(toggleButton).toBeFocused();
    // should show count of selected items when closed
    await expect(menu).not.toBeVisible();
    await expect(selection).toBeVisible();
    // should only clear selection when escape is pressed when the menu is closed
    await page.keyboard.press('Escape');
    await expect(selection).not.toBeVisible();
  });
});
