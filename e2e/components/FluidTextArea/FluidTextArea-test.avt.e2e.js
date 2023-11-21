/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('FluidTextArea @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTextArea',
      id: 'experimental-unstable-fluidtextarea--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidTextArea @avt-default-state');
  });

  test('@avt-advanced-states default-with-layers', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTextArea',
      id: 'experimental-unstable-fluidtextarea--default-with-layers',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'FluidTextArea-default-with-layers'
    );
  });

  test('@avt-advanced-states default-with-tooltip', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTextArea',
      id: 'experimental-unstable-fluidtextarea--default-with-tooltip',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'FluidTextArea-default-with-tooltip'
    );
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTextArea',
      id: 'experimental-unstable-fluidtextarea--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidTextArea-skeleton');
  });

  test('@avt-keyboard-nav FluidTextArea default', async ({ page }) => {
    await visitStory(page, {
      component: 'TextArea',
      id: 'experimental-unstable-fluidtextarea--default',
      globals: {
        theme: 'white',
      },
    });
    const textArea = page.getByRole('textbox');
    await expect(page.getByText('Text Area label')).toBeVisible();

    // Checking focus on textarea
    await page.keyboard.press('Tab');
    await expect(textArea).toBeFocused();

    // Writting a word to check functionality
    await textArea.fill('test');
    await expect(textArea).toHaveValue('test');
    await expect(page).toHaveNoACViolations('FluidTextArea default');
  });

  test('@avt-keyboard-nav FluidTextArea with tooltip', async ({ page }) => {
    await visitStory(page, {
      component: 'TextArea',
      id: 'experimental-unstable-fluidtextarea--default-with-tooltip',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('Text Area label')).toBeVisible();

    // Checking tooltip
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Show information')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(
      page.getByText('Additional field information here.')
    ).toBeVisible();

    // Checking focus on textarea
    const textArea = page.getByRole('textbox');
    await page.keyboard.press('Tab');
    await expect(textArea).toBeFocused();

    // Writting a word to check functionality
    await textArea.fill('test');
    await expect(textArea).toHaveValue('test');
    await expect(page).toHaveNoACViolations('FluidTextArea with tooltip');
  });
});
