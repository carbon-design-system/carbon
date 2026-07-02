/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt PaginationNav', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'PaginationNav',
      id: 'components-paginationnav--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('PaginationNav');
  });

  test('@avt-keyboard-nav PaginationNav', async ({ page }) => {
    await visitStory(page, {
      component: 'PaginationNav',
      id: 'components-paginationnav--default',
      globals: {
        theme: 'white',
      },
    });

    const activePage = page.getByRole('button', { name: 'Active, Page' });

    // First page has to active on load and left arrow disabled
    await expect(activePage).toHaveAttribute('data-page', '1');
    await expect(activePage).toHaveClass(/cds--pagination-nav__page--active/);
    await expect(page.getByRole('button').first()).toBeDisabled();

    // Focus the first page
    await page.keyboard.press('Tab');
    await expect(activePage).toBeFocused();

    // Selecting page 2
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(activePage).toHaveAttribute('data-page', '2');
    await expect(page.getByRole('button').first()).toBeEnabled();

    // Tabbing to the ArrowRight
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Next page action in the arrow key
    await page.keyboard.press('Enter');
    await expect(activePage).toHaveAttribute('data-page', '3');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await expect(activePage).toHaveAttribute('data-page', '9');

    // Selecting last page number 25
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    await expect(activePage).toHaveAttribute('data-page', '25');
    await expect(page.getByRole('button').last()).toBeDisabled();

    // Selecting options
    await page.keyboard.press('Shift+Tab');
    const select = page.getByLabel('Select Page number').last();
    await expect(select).toBeFocused();
    await select.selectOption('13');
    await expect(activePage).toHaveAttribute('data-page', '13');
  });
});
