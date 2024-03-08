/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('@avt InteractiveTag', () => {
  test('@avt-advanced-states DismissibleTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'experimental-unstable-interactivetag--dismissible',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('DismissibleTag');
  });

  // Testing being skipped because it is failing in the ToggleTip that operational it's using
  test('@avt-advanced-states OperationalTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'experimental-unstable-interactivetag--operational',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('OperationalTag');
  });

  test('@avt-advanced-states SelectableTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'experimental-unstable-interactivetag--selectable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('SelectableTag');
  });

  test('@avt-keyboard-nav DismissibleTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'experimental-unstable-interactivetag--dismissible',
      globals: {
        theme: 'white',
      },
    });
    const button = page.getByRole('button').first();
    await expect(button).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
  });

  test('@avt-keyboard-nav OperationalTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'experimental-unstable-interactivetag--operational',
      globals: {
        theme: 'white',
      },
    });
    const button = page.getByRole('button').first();
    await expect(button).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await expect(button).toHaveClass(/cds--tag--red/);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Expecte the OperationalTag with tooltip be focusable and visible
    await expect(page.getByRole('button').nth(10)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByText('View More')).toBeVisible();
  });

  test('@avt-keyboard-nav SelectableTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'experimental-unstable-interactivetag--selectable',
      globals: {
        theme: 'white',
      },
    });
    const tag = page.getByRole('button').first();
    await expect(tag).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(tag).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(tag).toHaveClass(/cds--tag--selectable-selected/);
  });
});
