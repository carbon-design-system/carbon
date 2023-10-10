/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('ComposedModal @avt', () => {
  test('@avt-default-state ComposedModal', async ({ page }) => {
    await visitStory(page, {
      component: 'ComposedModal',
      id: 'components-composedmodal--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ComposedModal');
  });

  test('@avt-advanced-states ComposedModal Full Width', async ({ page }) => {
    await visitStory(page, {
      component: 'ComposedModal',
      id: 'components-composedmodal--full-width',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ComposedModal-full-width');
  });

  test.skip('@avt-advanced-states ComposedModal Passive Modal', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ComposedModal',
      id: 'components-composedmodal--passive-modal',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ComposedModal-passive-modal');
  });

  test('@avt-advanced-states ComposedModal With state manager', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ComposedModal',
      id: 'components-composedmodal--with-state-manager',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ComposedModal-with-state-manager');
  });

  test('@avt-keyboard-nav ComposedModal', async ({ page }) => {
    await visitStory(page, {
      component: 'ComposedModal',
      id: 'components-composedmodal--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('Account resource')).toBeVisible();

    // First item should be focused
    await expect(page.locator('input#text-input-1')).toBeVisible();
    await expect(page.locator('input#text-input-1')).toBeFocused();
    // Testing navigation inside the modal
    await page.keyboard.press('Tab');
    await expect(page.locator('select#select-1')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Add' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
    await page.keyboard.press('Enter');
    // Make sure modal was closed
    await expect(page.getByText('Account resource')).not.toBeVisible();
  });

  test('@avt-keyboard-nav ComposedModal Full width', async ({ page }) => {
    await visitStory(page, {
      component: 'ComposedModal',
      id: 'components-composedmodal--full-width',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('Full Width Modal')).toBeVisible();

    // First item should be focused
    await expect(page.getByRole('button', { name: 'Add' })).toBeFocused();

    // Testing navigation inside the modal
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();
    await page.keyboard.press('Enter');
    // Make sure modal was closed
    await expect(page.getByText('Full Width Modal')).not.toBeVisible();
  });

  test('@avt-keyboard-nav ComposedModal Passive modal', async ({ page }) => {
    await visitStory(page, {
      component: 'ComposedModal',
      id: 'components-composedmodal--passive-modal',
      globals: {
        theme: 'white',
      },
    });
    await expect(
      page.getByText('You have been successfully signed out')
    ).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).click();

    // Make sure modal was closed
    await expect(
      page.getByText('You have been successfully signed out')
    ).not.toBeVisible();
  });

  test('@avt-keyboard-nav ComposedModal With state manager', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ComposedModal',
      id: 'components-composedmodal--with-state-manager',
      globals: {
        theme: 'white',
      },
    });
    await expect(
      page.getByRole('button', { name: 'Launch composed modal' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Launch composed modal' })
    ).toBeFocused();

    // Open modal
    await page.keyboard.press('Enter');

    // First item should be focused
    await expect(page.locator('input#text-input-1')).toBeVisible();
    await expect(page.locator('input#text-input-1')).toBeFocused();
    // Testing navigation inside the modal
    await page.keyboard.press('Tab');
    await expect(page.locator('select#select-1')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Add' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
    await page.keyboard.press('Enter');
    // Make sure modal was closed and button gets focused
    await expect(page.getByText('Account resource')).not.toBeVisible();
    await expect(page.getByRole('button')).toBeFocused();
    await expect(
      page.getByRole('button', { name: 'Launch composed modal' })
    ).toBeFocused();
  });
});
