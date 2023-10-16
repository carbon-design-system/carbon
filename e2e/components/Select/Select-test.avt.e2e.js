/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Select @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Select',
      id: 'components-select--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-select--default');
  });

  test('@avt-advanced-states inline', async ({ page }) => {
    await visitStory(page, {
      component: 'Select',
      id: 'components-select--inline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-select--inline');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Select',
      id: 'components-select--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-select--skeleton');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Select',
      id: 'components-select--default',
      globals: {
        theme: 'white',
      },
    });

    const select = page.getByRole('combobox');
    await expect(select).toBeVisible();
    // Tab to Select
    await page.keyboard.press('Tab');
    await expect(select).toBeFocused();
    await expect(select).toHaveValue('');
    // Select Option 4
    await select.selectOption('Option 4');
    await expect(select).toHaveValue('Option 4');
  });
});
