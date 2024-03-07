/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt FluidSearch', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidSearch',
      id: 'experimental-fluid-components-unstable-fluidsearch--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidSearch @avt-default-state');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidSearch',
      id: 'experimental-fluid-components-unstable-fluidsearch--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidSearch-skeleton');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Search',
      id: 'experimental-fluid-components-unstable-fluidsearch--default',
      globals: {
        theme: 'white',
      },
    });
    const search = page.getByRole('searchbox');
    const clearButton = page.getByRole('button', {
      name: 'Clear search input',
    });
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
});
