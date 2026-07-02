/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('@avt TimePicker', () => {
  test('@avt-default-state TimePicker', async ({ page }) => {
    await visitStory(page, {
      component: 'TimePicker',
      id: 'components-timepicker--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('TimePicker');
  });

  test('@avt-advanced-states TimePicker with layer', async ({ page }) => {
    await visitStory(page, {
      component: 'TimePicker',
      id: 'components-timepicker--with-layer',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('TimePicker-with-layer');
  });

  test('@avt-keyboard-nav TimePicker', async ({ page }) => {
    await visitStory(page, {
      component: 'TimePicker',
      id: 'components-timepicker--default',
      globals: {
        theme: 'white',
      },
    });

    const inputTime = page.locator('#time-picker');
    await expect(inputTime).toBeVisible();
    await page.keyboard.press('Tab');

    // Checking input time interaction
    await expect(inputTime).toBeFocused();
    await inputTime.fill('11:45');
    await expect(inputTime).toHaveValue('11:45');

    // Checking select time interaction
    await page.keyboard.press('Tab');
    const selectTime = page.locator('#time-picker-select-1');
    await page.keyboard.press('Space');
    await selectTime.selectOption('PM');
    await expect(selectTime).toHaveValue('PM');

    // Checking select time zone interaction
    await page.keyboard.press('Tab');
    const selectTimeZone = page.locator('#time-picker-select-2');
    await page.keyboard.press('Space');
    await selectTimeZone.selectOption('Time zone 1');
    await expect(selectTimeZone).toHaveValue('Time zone 1');
  });

  test('@avt-keyboard-nav TimePicker with layer', async ({ page }) => {
    await visitStory(page, {
      component: 'TimePicker',
      id: 'components-timepicker--with-layer',
      globals: {
        theme: 'white',
      },
    });

    // Testing focus on each layer
    await expect(page.locator('#time-picker-0')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.locator('#time-picker-0')).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(page.locator('#time-picker-1')).toBeVisible();
    await expect(page.locator('#time-picker-1')).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(page.locator('#time-picker-2')).toBeVisible();
    await expect(page.locator('#time-picker-2')).toBeFocused();
  });
});
