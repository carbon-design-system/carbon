/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Search', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Search',
      id: 'components-search--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-search--default');
  });

  test('@avt-advanced-states expandable', async ({ page }) => {
    await visitStory(page, {
      component: 'Search',
      id: 'components-search--expandable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-search--expandable');
  });

  test('@avt-keyboard-nav - search', async ({ page }) => {
    await visitStory(page, {
      component: 'Search',
      id: 'components-search--default',
      globals: {
        theme: 'white',
      },
    });
    const search = page.getByRole('searchbox');
    const clearButton = page.getByRole('button', {
      name: 'Clear search input',
    });
    await expect(search).toBeVisible();
    await expect(clearButton).toBeHidden();

    // Tab to the Search
    await page.keyboard.press('Tab');
    await expect(search).toBeFocused();
    // Enter search value
    await search.fill('test');
    await expect(search).toHaveValue('test');
    await expect(clearButton).toBeVisible();
    // Clear the search value with Clear button
    await page.keyboard.press('Tab');
    await expect(clearButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(search).toHaveValue('');
    await expect(search).toBeFocused();
    // Clear the search value with ESC key
    await search.fill('test');
    await expect(search).toHaveValue('test');
    await page.keyboard.press('Escape');
    await expect(search).toHaveValue('');
    await expect(search).toBeFocused();
  });

  test('@avt-keyboard-nav - expandable search', async ({ page }) => {
    await visitStory(page, {
      component: 'Search',
      id: 'components-search--expandable',
      globals: {
        theme: 'white',
      },
    });
    const search = page.getByRole('searchbox');
    const clearButton = page.getByRole('button', {
      name: 'Clear search input',
    });
    const searchButton = page.getByRole('button');
    await expect(search).toBeHidden();
    await expect(clearButton).toBeHidden();
    await expect(searchButton).toBeVisible();
    await expect(searchButton).not.toHaveAttribute('aria-expanded', 'true');

    // Tab to the ExpandableSearch, should only open on Enter
    await page.keyboard.press('Tab');
    await expect(searchButton).toBeFocused();
    await expect(search).toBeHidden();
    // Enter search value
    await page.keyboard.press('Enter');
    await expect(search).toBeVisible();
    await expect(searchButton).toHaveAttribute('aria-expanded', 'true');
    await search.fill('test');
    await expect(search).toHaveValue('test');
    await expect(clearButton).toBeVisible();
    // Clear the search value with Clear button
    await page.keyboard.press('Tab');
    await expect(clearButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(search).toHaveValue('');
    await expect(search).toBeFocused();
    // Clear the search value with ESC key
    await search.fill('test');
    await expect(search).toHaveValue('test');
    await page.keyboard.press('Escape');
    await expect(search).toHaveValue('');
    await expect(search).toBeFocused();
    // Close ExpandableSearch with ESC
    await page.keyboard.press('Escape');
    await expect(searchButton).not.toHaveAttribute('aria-expanded', 'true');
    await expect(search).toBeHidden();
  });

  test('@avt-keyboard-nav tooltip on focus', async ({ page }) => {
    await visitStory(page, {
      component: 'Search',
      id: 'components-search--expandable',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByRole('button')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button')).toBeFocused();
    await expect(page.getByRole('tooltip')).toHaveText('Search');
  });
});
