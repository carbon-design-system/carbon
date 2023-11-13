/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('MultiSelect @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'MultiSelect',
      id: 'components-multiselect--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('MultiSelect');
  });

  test('@avt-default-state filterable multiselect', async ({ page }) => {
    await visitStory(page, {
      component: 'FilterableMultiSelect',
      id: 'components-multiselect--filterable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FilterableMultiSelect');
  });

  // Skipping now due to AVT violation, possible false positive
  test.skip('@avt-advanced-states open filterable multiselect', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'FilterableMultiSelect',
      id: 'components-multiselect--filterable',
      globals: {
        theme: 'white',
      },
    });
    const toggleButton = page.getByRole('combobox');

    await expect(toggleButton).toBeVisible();
    // Tab and open the MultiSelect
    await page.keyboard.press('Tab');
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('combobox', { expanded: true })).toBeVisible;

    await expect(page).toHaveNoACViolations('MultiSelect-open');
  });

  // Skipping now due to AVT violation, possible false positive
  test.skip('@avt-advanced-states open multiselect', async ({ page }) => {
    await visitStory(page, {
      component: 'MultiSelect',
      id: 'components-multiselect--default',
      globals: {
        theme: 'white',
      },
    });
    const toggleButton = page.getByRole('combobox');

    await expect(toggleButton).toBeVisible();
    // Tab and open the MultiSelect
    await page.keyboard.press('Tab');
    await expect(toggleButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('combobox', { expanded: true })).toBeVisible;

    await expect(page).toHaveNoACViolations('MultiSelect-open');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'MultiSelect',
      id: 'components-multiselect--default',
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
        name: 'An example option that is really long to show what should be done to handle long text',
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // select first option (should select with enter and space)
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('option', {
        name: 'An example option that is really long to show what should be done to handle long text',
        selected: true,
      })
    ).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('option', {
        name: 'An example option that is really long to show what should be done to handle long text',
        selected: false,
      })
    ).toBeVisible();
    await page.keyboard.press('Space');
    await expect(
      page.getByRole('option', {
        name: 'An example option that is really long to show what should be done to handle long text',
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

  test.slow('@avt-keyboard-nav filterable multiselect', async ({ page }) => {
    await visitStory(page, {
      component: 'FilterableMultiSelect',
      id: 'components-multiselect--filterable',
      globals: {
        theme: 'white',
      },
    });
    const toggleButton = page.getByRole('combobox');
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
        name: 'An example option that is really long to show what should be done to handle long text',
      })
    ).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // select first option (should only select with enter)
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('option', {
        name: 'An example option that is really long to show what should be done to handle long text',
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
    await page.keyboard.press('Enter');
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

    // should filter menu items based on text input
    await page.keyboard.press('2');
    await expect(menu).toBeVisible();
    await expect(
      page.getByRole('option', {
        name: 'Option 2',
        selected: false,
      })
    ).toBeVisible();
    await expect(
      page.getByRole('option', {
        name: 'Option 1',
        selected: false,
      })
    ).not.toBeVisible();
  });
});
