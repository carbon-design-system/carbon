/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('FluidDatePicker @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDatePicker',
      id: 'experimental-fluid-components-unstable-fluiddatepicker--range-with-calendar',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidDatePicker');
  });

  test('@avt-advanced-states single', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDatePicker',
      id: 'experimental-fluid-components-unstable-fluiddatepicker--single',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidDatePicker-single');
  });

  test('@avt-advanced-states simple', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDatePicker',
      id: 'experimental-fluid-components-unstable-fluiddatepicker--simple',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidDatePicker-simple');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDatePicker',
      id: 'experimental-fluid-components-unstable-fluiddatepicker--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidDatePicker-skeleton');
  });

  test('@avt-keyboard-nav single', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDatePicker',
      id: 'experimental-fluid-components-unstable-fluiddatepicker--single',
      globals: {
        theme: 'white',
      },
    });
    // for some reason the firs tab is not working to focus the first tabstop, so focusing manually
    await page.getByRole('textbox', { name: 'Label' }).focus();
    await expect(page.getByRole('textbox', { name: 'Label' })).toBeFocused();
    await expect(page.locator('div.flatpickr-calendar')).toHaveClass(/open/);
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('span.today')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('textbox', { name: 'Label' })).toBeFocused();
    await expect(page.locator('div.flatpickr-calendar')).not.toHaveClass(
      /open/
    );
  });

  test('@avt-keyboard-nav range', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDatePicker',
      id: 'experimental-fluid-components-unstable-fluiddatepicker--range-with-calendar',
      globals: {
        theme: 'white',
      },
    });

    // for some reason the firs tab is not working to focus the first tabstop, so focusing manually
    await page.locator('input#date-picker-input-id-start').focus();
    await expect(
      page.locator('input#date-picker-input-id-start')
    ).toBeFocused();
    await expect(page.locator('div.flatpickr-calendar')).toHaveClass(/open/);
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('span.today')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('span.today')).toBeFocused();
    await expect(page.locator('div.flatpickr-calendar')).toHaveClass(/open/);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(
      page.locator('input#date-picker-input-id-start')
    ).toBeFocused();
    await expect(page.locator('div.flatpickr-calendar')).not.toHaveClass(
      /open/
    );
    await page.keyboard.press('Tab');
    await expect(
      page.locator('input#date-picker-input-id-finish')
    ).toBeFocused();
    await expect(page.locator('div.flatpickr-calendar')).toHaveClass(/open/);
    await page.keyboard.press('Escape');
    await expect(
      page.locator('input#date-picker-input-id-start')
    ).toBeFocused();
    await expect(page.locator('div.flatpickr-calendar')).not.toHaveClass(
      /open/
    );
  });
});
