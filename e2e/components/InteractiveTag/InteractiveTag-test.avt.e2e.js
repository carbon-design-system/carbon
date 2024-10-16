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
      id: 'components-tag--dismissible',
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
      id: 'components-tag--operational',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('OperationalTag');
  });

  test('@avt-advanced-states SelectableTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'components-tag--selectable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('SelectableTag');
  });

  test('@avt-keyboard-nav DismissibleTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'components-tag--dismissible',
      globals: {
        theme: 'white',
      },
    });
    await expect(
      page.getByText('Tag content with a long text description').first()
    ).toBeVisible();

    const tooltip = page.getByRole('tooltip');
    const button = page.getByRole('button').nth(1);
    await expect(button).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await expect(tooltip).toHaveAttribute('aria-hidden', 'false');

    // Test dismissible functionality
    await page.keyboard.press('Enter');
    await expect(
      page.getByText('Tag content with a long text description')
    ).not.toBeVisible();

    // Reset button click
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    await expect(
      page.getByText('Tag content with a long text description').first()
    ).toBeVisible();
  });

  test('@avt-keyboard-nav OperationalTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'components-tag--operational',
      globals: {
        theme: 'white',
      },
    });
    const button = page.getByRole('button').first();
    await expect(button).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await expect(page.getByRole('tooltip')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
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
    await expect(page.getByText('Tag 1 name').first()).toBeVisible();
  });

  test('@avt-keyboard-nav SelectableTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'components-tag--selectable',
      globals: {
        theme: 'white',
      },
    });
    const tag = page.getByRole('button').first();
    await expect(tag).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(tag).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('tooltip')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
    await expect(tag).toHaveClass(/cds--tag--selectable-selected/);
    await page.keyboard.press('Tab');
  });
});
