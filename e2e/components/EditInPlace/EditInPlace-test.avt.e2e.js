/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt EditInPlace', () => {
  // TODO: enable tests in v12 when component stories are included in Storybook build
  test.skip('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'EditInPlace',
      id: 'components-editinplace--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('EditInPlace @avt-default-state');
  });

  test.skip('cancel button is disabled when no value change', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'EditInPlace',
      id: 'components-editinplace--default',
      globals: {
        theme: 'white',
      },
    });

    // Click on the input to enter edit mode
    const input = page.getByRole('textbox', { name: /label text/i });
    await input.click();

    // Wait for edit mode to activate
    await page.waitForTimeout(100);

    // Cancel button should be disabled initially (no changes)
    const cancelButton = page.getByRole('button', { name: /cancel/i });
    await expect(cancelButton).toBeDisabled();
  });

  test.skip('cancel button is enabled when value changes', async ({ page }) => {
    await visitStory(page, {
      component: 'EditInPlace',
      id: 'components-editinplace--default',
      globals: {
        theme: 'white',
      },
    });

    // Click on the input to enter edit mode
    const input = page.getByRole('textbox', { name: /label text/i });
    await input.click();

    // Type new value
    await input.fill('New value');

    // Cancel button should now be enabled
    const cancelButton = page.getByRole('button', { name: /cancel/i });
    await expect(cancelButton).not.toBeDisabled();
  });

  test.skip('cancel button is disabled when only whitespace is added', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'EditInPlace',
      id: 'components-editinplace--default',
      globals: {
        theme: 'white',
      },
    });

    // Click on the input to enter edit mode
    const input = page.getByRole('textbox', { name: /label text/i });
    const currentValue = await input.inputValue();
    await input.click();

    // Add only whitespace
    await input.fill(currentValue + '   ');

    // Cancel button should remain disabled (trimmed values are the same)
    const cancelButton = page.getByRole('button', { name: /cancel/i });
    await expect(cancelButton).toBeDisabled();
  });

  test.skip('save button is disabled when value is invalid', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'EditInPlace',
      id: 'components-editinplace--invalid',
      globals: {
        theme: 'white',
      },
    });

    // Click on the input to enter edit mode
    const input = page.getByRole('textbox', { name: /label text/i });
    await input.click();

    // Save button should be disabled due to invalid state
    const saveButton = page.getByRole('button', { name: /save/i });
    await expect(saveButton).toBeDisabled();

    // Cancel button should also be disabled since no change was made
    const cancelButton = page.getByRole('button', { name: /cancel/i });
    await expect(cancelButton).toBeDisabled();
  });

  test.skip('cancel button restores original value', async ({ page }) => {
    await visitStory(page, {
      component: 'EditInPlace',
      id: 'components-editinplace--default',
      globals: {
        theme: 'white',
      },
    });

    // Get original value
    const input = page.getByRole('textbox', { name: /label text/i });
    const originalValue = await input.inputValue();

    // Click on input to enter edit mode
    await input.click();

    // Change value
    await input.fill('Changed value');

    // Click cancel
    const cancelButton = page.getByRole('button', { name: /cancel/i });
    await cancelButton.click();

    // Value should be restored to original
    await expect(input).toHaveValue(originalValue);
  });
});
