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
  test('simple state @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--simple',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('DatePicker');
  });

  test('range @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--range',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('DatePicker-Range');
  });

  test('disabled state state @avt', async ({ page }) => {
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
  test.skip('open state @avt', async ({ page }) => {
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

  test('simple state - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--simple',
      globals: {
        theme: 'white',
      },
    });

    await page.keyboard.press('Tab');
    await expect(page.locator('input#date-picker-simple')).toBeFocused();
  });

  test('range - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--range',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.locator('body')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.locator('input#date-picker-input-id-start')
    ).toBeFocused();
  });
});
