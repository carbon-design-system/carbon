/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('Checkbox @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Checkbox',
      id: 'components-checkbox--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Checkbox');
  });

  test('@avt-advanced-states single', async ({ page }) => {
    await visitStory(page, {
      component: 'Checkbox',
      id: 'components-checkbox--single',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Checkbox-single');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Checkbox',
      id: 'components-checkbox--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Checkbox-skeleton');
  });

  test('@avt-keyboard-nav default', async ({ page }) => {
    await visitStory(page, {
      component: 'Checkbox',
      id: 'components-checkbox--default',
      globals: {
        theme: 'white',
      },
    });
    const checkbox1 = page.locator('input#checkbox-label-1');

    await expect(checkbox1).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(checkbox1).toBeFocused();

    // Checking checkbox
    await page.keyboard.press('Space');
    await expect(checkbox1).toBeChecked();

    // Unchecking checkbox
    await page.keyboard.press('Space');
    await expect(checkbox1).not.toBeChecked();
  });

  test('@avt-keyboard-nav single', async ({ page }) => {
    await visitStory(page, {
      component: 'Checkbox',
      id: 'components-checkbox--single',
      globals: {
        theme: 'white',
      },
    });
    const checkbox3 = page.locator('input#checkbox-3');
    const checkbox4 = page.locator('input#checkbox-4');
    const checkbox5 = page.locator('input#checkbox-5');
    const checkbox6 = page.locator('input#checkbox-6');

    // Check the first checkbox 3
    await expect(checkbox3).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(checkbox3).toBeFocused();
    await page.keyboard.press('Space');
    await expect(checkbox3).toBeChecked();

    // Check the first checkbox 4
    await expect(checkbox4).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(checkbox4).toBeFocused();
    await page.keyboard.press('Space');
    await expect(checkbox4).toBeChecked();

    // Check the first checkbox 5
    await expect(checkbox5).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(checkbox5).toBeFocused();
    await page.keyboard.press('Space');
    await expect(checkbox5).toBeChecked();

    // Checking if the checkbox is readonly
    await expect(checkbox6).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(checkbox6).toBeFocused();
    await page.keyboard.press('Space');
    await expect(checkbox6).not.toBeChecked();
  });
});
