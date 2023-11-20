/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('FluidTextInput @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTextInput',
      id: 'experimental-unstable-fluidtextinput--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidTextInput');
  });

  test('@avt-advanced-states password input', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTextInput',
      id: 'experimental-unstable-fluidtextinput--password-input',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidTextInput-password-input');
  });

  test('@avt-advanced-states with tooltip', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTextInput',
      id: 'experimental-unstable-fluidtextinput--default-with-tooltip',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidTextInput-with-tooltip');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTextInput',
      id: 'experimental-unstable-fluidtextinput--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidTextInput-skeleton');
  });

  test('@avt-keyboard-nav default', async ({ page }) => {
    await visitStory(page, {
      component: 'TextInput',
      id: 'experimental-unstable-fluidtextinput--default',
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

  test('@avt-keyboard-nav with tooltip', async ({ page }) => {
    await visitStory(page, {
      component: 'TextInput',
      id: 'experimental-unstable-fluidtextinput--default-with-tooltip',
      globals: {
        theme: 'white',
      },
    });
    const input = page.getByRole('textbox');
    await expect(input).toBeVisible();

    // Check tooltip visibility
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Show information')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(
      page.getByText('Additional field information here.')
    ).toBeVisible();

    // Check the focus
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
      id: 'experimental-unstable-fluidtextinput--password-input',
      globals: {
        theme: 'white',
      },
    });
    const input = page.getByRole('textbox');
    const span = page.locator('span.cds--assistive-text');

    await page.keyboard.press('Tab');
    await input.fill('Text');

    // Checking toggle interaction
    await page.keyboard.press('Tab');
    await expect(span).toHaveText('Show password');
    await page.keyboard.press('Enter');
    await expect(span).toHaveText('Hide password');
  });
});
