/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('StructuredList @avt', () => {
  test('accessibility-checker', async ({ page }) => {
    await visitStory(page, {
      component: 'StructuredList',
      id: 'components-structuredlist--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('StructuredList');
  });

  test('accessibility-checker selection', async ({ page }) => {
    await visitStory(page, {
      component: 'StructuredList',
      id: 'components-structuredlist--selection',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('StructuredList-selection');
  });

  test('accessibility-checker skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'StructuredList',
      id: 'components-structuredlist--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('StructuredList-skeleton');
  });

  test('accessibility-checker keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'StructuredList',
      id: 'components-structuredlist--selection',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByRole('table')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.locator('input#row-0')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    const row = page.getByRole('row');
    await expect(row.nth(2)).toHaveClass(/cds--structured-list-row--selected/);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('input#row-0')).toBeFocused();

    await expect(page).toHaveNoACViolations('StructuredList-keyboardnav');
  });

  test('accessibility-checker mouse interaction', async ({ page }) => {
    await visitStory(page, {
      component: 'StructuredList',
      id: 'components-structuredlist--selection',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByRole('table')).toBeVisible();
    page.locator('input#row-1').click({ force: true });
    const row = page.getByRole('row');
    await expect(row.nth(2)).toHaveClass(/cds--structured-list-row--selected/);

    await expect(page).toHaveNoACViolations('StructuredList-mouse-interaction');
  });
});
