/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('ContentSwitcher @avt', () => {
  test('@avt-default-state ContentSwitcher', async ({ page }) => {
    await visitStory(page, {
      component: 'ContentSwitcher',
      id: 'components-contentswitcher--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ContentSwitcher');
  });

  test('@avt-advanced-states icon only', async ({ page }) => {
    await visitStory(page, {
      component: 'ContentSwitcher',
      id: 'components-contentswitcher--icon-only',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ContentSwitcher--icon-only');
  });

  test('@avt-keyboard-nav ContentSwitcher', async ({ page }) => {
    await visitStory(page, {
      component: 'ComboButton',
      id: 'components-contentswitcher--default',
      globals: {
        theme: 'white',
      },
    });
    const firstContentTab = page.getByRole('tab', { name: 'First section' });
    const secondContentTab = page.getByRole('tab', { name: 'Second section' });
    const thirdContentTab = page.getByRole('tab', { name: 'Third section' });

    // Testing content switcher
    await expect(firstContentTab).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(secondContentTab).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(thirdContentTab).toBeVisible();
  });

  test('@avt-keyboard-nav ContentSwitcher Icon only', async ({ page }) => {
    await visitStory(page, {
      component: 'ComboButton',
      id: 'components-contentswitcher--icon-only',
      globals: {
        theme: 'white',
      },
    });
    const firstIconTab = page.getByRole('tab', { name: 'Table of Contents' });
    const secondIconTab = page.getByRole('tab', { name: 'Workspace Test' });
    const thirdIconTab = page.getByRole('tab', { name: 'View Mode' });

    // Testing content switcher
    await expect(firstIconTab).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(secondIconTab).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(thirdIconTab).toBeVisible();
  });
});
