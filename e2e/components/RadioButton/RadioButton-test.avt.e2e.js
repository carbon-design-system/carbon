/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt RadioButton', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('RadioButton');
  });

  test('@avt-advanced-states - vertical', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--vertical',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('RadioButton-vertical');
  });

  test('@avt-advanced-states - skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('RadioButton-skeleton');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.locator('input#radio-email')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.locator('input#radio-email')).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('input#radio-sms')).toBeVisible();
  });

  test('@avt-advanced-states - invalid state', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--default',
      globals: {
        theme: 'white',
      },
      args: {
        invalid: 'true',
      },
    });

    await expect(page.getByText('Choose a notification method.')).toBeVisible();
    await expect(page).toHaveNoACViolations('RadioButton-invalid');
  });

  test('@avt-advanced-states - warn state', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--default',
      globals: {
        theme: 'white',
      },
      args: {
        warn: 'true',
      },
    });

    await expect(
      page.getByText('Review your notification preference before continuing.')
    ).toBeVisible();
    await expect(page).toHaveNoACViolations('RadioButton-warn');
  });

  test('@avt-advanced-states - disabled state', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--default',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: 'true',
      },
    });

    await expect(page.locator('input#radio-email')).toBeDisabled();
    await expect(page).toHaveNoACViolations('RadioButton-disabled');
  });

  test('@avt-advanced-states - read only state', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--default',
      globals: {
        theme: 'white',
      },
      args: {
        readOnly: 'true',
      },
    });

    const inputElement = await page.locator('input#radio-email').isChecked();
    expect(inputElement).toBeTruthy();
    await expect(page).toHaveNoACViolations('RadioButton-read-only');
  });
});
