/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('FluidSelect @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidSelect',
      id: 'experimental-unstable-fluidselect--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidSelect @avt-default-state');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidSelect',
      id: 'experimental-unstable-fluidselect--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidSelect-skeleton');
  });

  test('@avt-keyboard-nav FluidSelect', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidSelect',
      id: 'experimental-unstable-fluidselect--default',
      globals: {
        theme: 'white',
      },
    });

    const select = page.getByRole('combobox').first();
    await expect(select).toBeVisible();

    // Focus on label additional information
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('button', { name: 'Show information' }).first()
    ).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(
      page.getByText('Additional field information here.').first()
    ).toBeVisible();

    // Tab to Select
    await page.keyboard.press('Tab');
    await expect(select).toBeFocused();
    await expect(select).toHaveValue('');
    // Select Option 4
    await select.selectOption('option-4');
    await expect(select).toHaveValue('option-4');
  });
});
