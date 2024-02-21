/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('DatePicker @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--simple',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('DatePicker');
  });

  test('range @avt-advanced-states', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--range',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('DatePicker-Range');
  });

  test('disabled @avt-advanced-states', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--playground',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: 'true',
      },
    });

    await expect(page.locator('input#date-picker-single')).toBeDisabled();
    await expect(page).toHaveNoACViolations('DatePicker-Disabled');
  });

  // skipping for now due to accessibility violation
  test('skeleton @avt-advanced-states', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--skeleton',
      globals: {
        theme: 'white',
      },
    });

    await expect(page).toHaveNoACViolations('DatePicker-Skeleton');
  });

  // skipping for now due to accessibility violation
  test('open @avt-advanced-states', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--playground',
      globals: {
        theme: 'white',
      },
    });

    await page.locator('input#date-picker-single').focus();
    await expect(page.locator('div.flatpickr-calendar')).toHaveClass(/open/);
    await expect(page.locator('input#date-picker-single')).toBeFocused();
    await expect(page).toHaveNoACViolations('DatePicker-Open');
  });

  test('simple state @avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--single-with-calendar',
      globals: {
        theme: 'white',
      },
    });

    // for some reason the firs tab is not working to focus the first tabstop, so focusing manually
    await page.getByRole('textbox', { name: 'Date Picker label' }).focus();
    await expect(
      page.getByRole('textbox', { name: 'Date Picker label' })
    ).toBeFocused();
    await expect(page.locator('div.flatpickr-calendar')).toHaveClass(/open/);
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('span.today')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(
      page.getByRole('textbox', { name: 'Date Picker label' })
    ).toBeFocused();
    await expect(page.locator('div.flatpickr-calendar')).not.toHaveClass(
      /open/
    );
  });

  test('range state @avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--range-with-calendar',
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
      page.locator('input#date-picker-input-id-finish')
    ).toBeFocused();
    await expect(page.locator('div.flatpickr-calendar')).not.toHaveClass(
      /open/
    );
  });
});
