/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('FluidTimePicker @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTimePicker',
      id: 'experimental-fluid-components-unstable-fluidtimepicker--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'FluidTimePicker @avt-default-state'
    );
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTimePicker',
      id: 'experimental-fluid-components-unstable-fluidtimepicker--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidTimePicker-skeleton');
  });

  test('@avt-keyboard-nav TimePicker', async ({ page }) => {
    await visitStory(page, {
      component: 'TimePicker',
      id: 'experimental-fluid-components-unstable-fluidtimepicker--default',
      globals: {
        theme: 'white',
      },
    });

    const inputTime = page.locator('#time-picker-1');
    await expect(inputTime).toBeVisible();
    await page.keyboard.press('Tab');

    // Checking input time interaction
    await expect(inputTime).toBeFocused();
    await inputTime.fill('11:45');
    await expect(inputTime).toHaveValue('11:45');

    // Checking info icon
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Show information').first()).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(
      page.getByLabel('Additional field information here.').first()
    ).toBeVisible();

    // Checking select time interaction
    await page.keyboard.press('Tab');
    const selectTime = page.locator('#select-1');
    await page.keyboard.press('Space');
    await selectTime.selectOption('am');
    await expect(selectTime).toHaveValue('am');

    // Checking select time zone interaction
    await page.keyboard.press('Tab');
    const selectTimeZone = page.locator('#select-2');
    await page.keyboard.press('Space');
    await selectTimeZone.selectOption('et');
    await expect(selectTimeZone).toHaveValue('et');
  });
});
