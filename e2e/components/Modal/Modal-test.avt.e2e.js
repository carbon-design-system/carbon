/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Modal @avt', () => {
  test('default state', async ({ page }) => {
    await visitStory(page, {
      component: 'Modal',
      id: 'components-modal--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Modal');
  });

  test('default state - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Modal',
      id: 'components-modal--with-state-manager',
      globals: {
        theme: 'white',
      },
    });

    const button = page.getByRole('button', { name: 'Launch modal' });

    // Open the modal via keyboard navigation
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    button.press('Enter');

    // The first interactive item in the modal should be focused once the modal is open
    await expect(
      page.getByRole('textbox', { name: 'Domain name' })
    ).toBeFocused();

    // Instead of testing the entirety of what's inside the modal, we'll skip to the cancel button
    page.getByRole('button', { name: 'Cancel' }).focus();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Add' })).toBeFocused();

    // At the end of the modal, focus should wrap up to the close button in the top right
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'close' })).toBeFocused();

    // The first interactive item in the modal should be focused again after the close button in the top right
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('textbox', { name: 'Domain name' })
    ).toBeFocused();

    // Moving back one tab stop we should be on the close button again
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('button', { name: 'close' })).toBeFocused();
    // Press the close button on Enter or Space
    await page.keyboard.press('Enter');

    // The modal should no longer be open/visisble
    await expect(page.getByRole('dialog')).not.toBeVisible();
    // Focus moves to the button that opened the Modal
    await expect(button).toBeFocused();
  });

  test('danger modal - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Modal',
      id: 'components-modal--danger-modal',
      globals: {
        theme: 'white',
      },
    });

    // Danger modals should always have the non-destructive action focused first
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();
  });

  test('default state, no interactive elements in body - keyboard nav', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Modal',
      id: 'components-modal--full-width',
      globals: {
        theme: 'white',
      },
    });

    // Non-danger modals with no interactive elements in the body should have the primary button focused by default
    await expect(page.getByRole('button', { name: 'Add' })).toBeFocused();
  });

  test('passive modal - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Modal',
      id: 'components-modal--passive-modal',
      globals: {
        theme: 'white',
      },
    });

    // Passive modals should focus the close button by default
    await expect(page.getByRole('button', { name: 'close' })).toBeFocused();

    // Passive modals without any interactive elements should lock focus to the close button
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'close' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'close' })).toBeFocused();
  });
});
