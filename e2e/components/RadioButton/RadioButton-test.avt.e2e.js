/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('RadioButton @avt', () => {
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
    await expect(page.locator('input#radio-1')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.locator('input#radio-1')).toBeChecked();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('input#radio-2')).toBeChecked();
  });

  test('@avt-advanced-states - invalid state', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--playground',
      globals: {
        theme: 'white',
      },
      args: {
        invalid: 'true',
        invalidText: 'Invalid selection',
      },
    });

    await expect(page.getByText('Invalid selection')).toBeVisible();
    await expect(page).toHaveNoACViolations('RadioButton-invalid');
  });

  test('@avt-advanced-states - warn state', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--playground',
      globals: {
        theme: 'white',
      },
      args: {
        warn: 'true',
        warnText: 'Please notice the warning',
      },
    });

    await expect(page.getByText('Please notice the warning')).toBeVisible();
    await expect(page).toHaveNoACViolations('RadioButton-warn');
  });

  test('@avt-advanced-states - disabled state', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--playground',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: 'true',
      },
    });

    await expect(page.locator('input#radio-1')).toBeDisabled();
    await expect(page).toHaveNoACViolations('RadioButton-disabled');
  });

  test('@avt-advanced-states - read only state', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioButton',
      id: 'components-radiobutton--playground',
      globals: {
        theme: 'white',
      },
      args: {
        readOnly: 'true',
      },
    });

    const inputElement = await page.locator('input#radio-1').isChecked();
    expect(inputElement).toBeFalsy();
    await expect(page).toHaveNoACViolations('RadioButton-read-only');
  });
});
