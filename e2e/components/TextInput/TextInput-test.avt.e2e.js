/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt TextInput', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'TextInput',
      id: 'components-textinput--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('TextInput');
  });

  test('@avt-advanced-states - disabled', async ({ page }) => {
    await visitStory(page, {
      component: 'TextInput',
      id: 'components-textinput--playground',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: 'true',
      },
    });

    await expect(page.getByRole('textbox')).toBeDisabled();
    await expect(page).toHaveNoACViolations('TextInput-Disabled');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'TextInput',
      id: 'components-textinput--default',
      globals: {
        theme: 'white',
      },
    });
    const input = page.getByRole('textbox');

    // Check the focus
    await expect(input).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    // Check input interaction
    await input.fill('Text');
    await expect(input).toHaveValue('Text');
    await page.keyboard.press('Backspace');
    await expect(input).toHaveValue('Tex');
  });

  test('@avt-keyboard-nav for password', async ({ page }) => {
    await visitStory(page, {
      component: 'TextInput',
      id: 'components-textinput--toggle-password-visibility',
      globals: {
        theme: 'white',
      },
    });
    const input = page.getByRole('textbox');

    await page.keyboard.press('Tab');
    await input.fill('Text');

    // Checking toggle interaction
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Show password')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.getByLabel('Hide password')).toBeVisible();
  });
});
