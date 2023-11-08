/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('breadcrumb @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Breadcrumb',
      id: 'components-breadcrumb--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Breadcrumb-default-state');
  });

  test('@avt-advanced-states with overflow menu', async ({ page }) => {
    await visitStory(page, {
      component: 'Breadcrumb',
      id: 'components-breadcrumb--breadcrumb-with-overflow-menu',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Breadcrumb-with-overflow-menu');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Breadcrumb',
      id: 'components-breadcrumb--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Breadcrumb-skeleton');
  });

  test('@avt-keyboard-nav default', async ({ page }) => {
    await visitStory(page, {
      component: 'Breadcrumb',
      id: 'components-breadcrumb--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('Breadcrumb 1')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByText('Breadcrumb 1')).toBeFocused();
    // Checking if the link is enabled to be clicked on
    await expect(page.getByText('Breadcrumb 1')).toBeEnabled();
  });

  test('@avt-keyboard-nav - item without href prop', async ({ page }) => {
    await visitStory(page, {
      component: 'Breadcrumb',
      id: 'components-breadcrumb--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('Breadcrumb 3')).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByText('Breadcrumb 3')).toBeFocused();

    // The Breadcrumb 4 should not be focusable
    await page.keyboard.press('Tab');
    await expect(page.getByText('Breadcrumb 4')).not.toBeFocused();
  });

  test('@avt-keyboard-nav with overflow menu keyboard navigation', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Breadcrumb',
      id: 'components-breadcrumb--breadcrumb-with-overflow-menu',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByText('Breadcrumb 1')).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Verify icon-description
    await expect(page.getByText('Options')).toBeVisible();

    // Entering and navigating the options
    await page.keyboard.press('Enter');
    await expect(
      page.locator('button', { hasText: 'Breadcrumb 3' })
    ).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(
      page.locator('button', { hasText: 'Breadcrumb 4' })
    ).toBeFocused();
  });
});
