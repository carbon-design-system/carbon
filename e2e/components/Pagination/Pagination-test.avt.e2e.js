/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Pagination', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Pagination',
      id: 'components-pagination--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-pagination--default');
  });

  test('@avt-advanced-states multiple-pagination-components', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Pagination',
      id: 'components-pagination--multiple-pagination-components',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'components-pagination--multiple-pagination-components'
    );
  });

  test('@avt-keyboard-nav - pagination', async ({ page }) => {
    await visitStory(page, {
      component: 'Pagination',
      id: 'components-pagination--default',
      globals: {
        theme: 'white',
      },
    });

    const itemsPerPage = page.getByRole('combobox', {
      name: 'Items per page:',
    });
    const pageSelector = page.getByRole('combobox', {
      name: 'Page of 11 pages',
    });
    const updatedPageSelector = page.getByRole('combobox', {
      name: 'Page of 3 pages',
    });
    const nextPageButton = page.getByRole('button', { name: 'Next' });
    const prevPageButton = page.getByRole('button').first();

    await expect(itemsPerPage).toBeVisible();
    await expect(pageSelector).toBeVisible();
    await expect(updatedPageSelector).toBeHidden();

    // Tab to first items per page
    await page.keyboard.press('Tab');
    await expect(itemsPerPage).toBeFocused();
    // Select 50 items per page
    await itemsPerPage.selectOption('50');
    await expect(itemsPerPage).toHaveValue('50');
    // Should update the pages text
    await expect(pageSelector).toBeHidden();
    await expect(updatedPageSelector).toBeVisible();
    // Should still be on page one
    await expect(updatedPageSelector).toHaveValue('1');
    // Tab to next page arrow key
    await page.keyboard.press('Tab');
    await expect(updatedPageSelector).toBeFocused();
    await expect(prevPageButton).toBeDisabled();
    await page.keyboard.press('Tab');
    await expect(nextPageButton).toBeFocused();
    // Go to next page
    await page.keyboard.press('Enter');
    await expect(updatedPageSelector).toHaveValue('2');
    // Tab to previous page
    await expect(prevPageButton).toBeEnabled();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    await expect(updatedPageSelector).toHaveValue('1');
    await expect(prevPageButton).toBeDisabled();
  });
});
