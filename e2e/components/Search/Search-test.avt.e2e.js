/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Search @avt', () => {
  test('accessibility-checker', async ({ page }) => {
    await visitStory(page, {
      component: 'Search',
      id: 'components-search--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-search--default');
  });

  test('accessibility-checker expandable', async ({ page }) => {
    await visitStory(page, {
      component: 'Search',
      id: 'components-search--expandable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-search--expandable');
  });

  test('search - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Search',
      id: 'components-search--default',
      globals: {
        theme: 'white',
      },
    });
    const search = page.getByRole('searchbox');
    const clearButton = page.getByRole('button');
    await expect(search).toBeVisible();
    await expect(clearButton).not.toBeVisible();

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

  test('expandable search - keyboard nav', async ({ page }) => {
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
    await expect(search).not.toBeVisible();
    await expect(clearButton).not.toBeVisible();
    await expect(searchButton).toBeVisible();
    await expect(searchButton).not.toHaveAttribute('aria-expanded', 'true');

    // Tab to the ExpandableSearch, should only open on Enter
    await page.keyboard.press('Tab');
    await expect(searchButton).toBeFocused();
    await expect(search).not.toBeVisible();
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
    await expect(search).not.toBeVisible();
  });
});
