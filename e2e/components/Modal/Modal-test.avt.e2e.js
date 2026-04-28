/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Modal', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Modal',
      id: 'components-modal--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Modal');
  });

  test('@avt-keyboard-nav default state', async ({ page }) => {
    await visitStory(page, {
      component: 'Modal',
      id: 'components-modal--with-state-manager',
      globals: {
        theme: 'white',
      },
    });

    const button = page.getByRole('button', { name: 'Launch modal' });

    // Open the modal via keyboard navigation
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
    await expect(page.getByRole('dialog')).toBeHidden();
    // Focus moves to the button that opened the Modal
    await expect(button).toBeFocused();
  });

  test('@avt-keyboard-nav danger modal', async ({ page }) => {
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

  test('@avt-keyboard-nav default state, no interactive elements in body', async ({
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

  test('@avt-keyboard-nav passive modal', async ({ page }) => {
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

  test('@avt-keyboard-nav should only scrollIntoView interactive elements if necessary', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Modal',
      id: 'components-modal--with-scrolling-content',
      globals: {
        theme: 'white',
      },
    });

    const primaryInput = page.getByRole('textbox', { name: 'Domain name' });
    await expect(primaryInput).toBeFocused();

    const modalContent = page.locator('.cds--modal-content');
    await expect(modalContent).toHaveClass(/cds--modal-scroll-content/);

    const isScrollable = await modalContent.evaluate(
      (node) => node.scrollHeight > node.clientHeight
    );
    expect(isScrollable).toBe(true);

    const initialScrollTop = await modalContent.evaluate(
      (node) => node.scrollTop
    );

    await page.keyboard.press('Tab');
    await expect(page.getByRole('combobox', { name: 'Region' })).toBeFocused();

    // scrollIntoView should only run when needed, not on every tab stop.
    const scrollTopAfterFirstTab = await modalContent.evaluate(
      (node) => node.scrollTop
    );
    expect(scrollTopAfterFirstTab).toBe(initialScrollTop);

    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('combobox', {
        name: 'Permissions (Example of Floating UI)',
      })
    ).toBeFocused();

    const scrollTopAfterSecondTab = await modalContent.evaluate(
      (node) => node.scrollTop
    );
    expect(scrollTopAfterSecondTab).toBe(initialScrollTop);
  });
});
