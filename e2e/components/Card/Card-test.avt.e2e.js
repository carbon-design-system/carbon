/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Card', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Card',
      id: 'preview-preview-card--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Card @avt-default-state');
  });

  test('@avt-advanced-states clickable', async ({ page }) => {
    await visitStory(page, {
      component: 'Card',
      id: 'preview-preview-card--clickable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Card-clickable');
  });

  test('@avt-advanced-states disabled', async ({ page }) => {
    await visitStory(page, {
      component: 'Card',
      id: 'preview-preview-card--disabled',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Card-disabled');
  });

  test('@avt-advanced-states with AI label', async ({ page }) => {
    await visitStory(page, {
      component: 'Card',
      id: 'preview-preview-card--with-ai-label',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Card-with-ai-label');
  });

  test('@avt-advanced-states horizontal layout', async ({ page }) => {
    await visitStory(page, {
      component: 'Card',
      id: 'preview-preview-card--with-horizontal-media',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Card-with-horizontal-media');
  });

  test('@avt-advanced-states with header actions', async ({ page }) => {
    await visitStory(page, {
      component: 'Card',
      id: 'preview-preview-card--with-header-actions',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Card-with-header-actions');
  });

  test('@avt-keyboard-nav clickable card receives focus and activates on Enter', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Card',
      id: 'preview-preview-card--clickable',
      globals: {
        theme: 'white',
      },
    });

    // Tab into the first clickable card (role="button")
    await page.keyboard.press('Tab');
    const card = page.getByRole('button', { name: 'Usage report' });
    await expect(card).toBeFocused();

    // Enter activates it — browser alert fires; dismiss so the test can continue
    page.once('dialog', (dialog) => dialog.dismiss());
    await page.keyboard.press('Enter');

    // Focus should return to the same card after activation
    await expect(card).toBeFocused();
  });

  test('@avt-keyboard-nav disabled clickable card is not reachable by Tab', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Card',
      id: 'preview-preview-card--clickable',
      globals: {
        theme: 'white',
      },
    });

    const disabledCard = page.getByRole('button', { name: 'Disabled card' });

    // The disabled card has tabIndex="-1" so Tab should never land on it
    await expect(disabledCard).toHaveAttribute('tabindex', '-1');
  });

  test('@avt-keyboard-nav header actions are independently focusable', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Card',
      id: 'preview-preview-card--with-header-actions',
      globals: {
        theme: 'white',
      },
    });

    // Tab into the first action button in the header
    await page.keyboard.press('Tab');
    const editButton = page.getByRole('button', { name: 'Edit' }).first();
    await expect(editButton).toBeFocused();

    // Tab to the next action
    await page.keyboard.press('Tab');
    const deleteButton = page.getByRole('button', { name: 'Delete' }).first();
    await expect(deleteButton).toBeFocused();
  });
});
