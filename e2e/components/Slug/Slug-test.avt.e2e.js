/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Slug', async () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Slug',
      id: 'experimental-unstable-slug--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Slug');
  });

  test.slow('@avt-advanced-states open state', async ({ page }) => {
    await visitStory(page, {
      component: 'Slug',
      id: 'experimental-unstable-slug--default',
      globals: {
        theme: 'white',
      },
    });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveNoACViolations('Slug-open');
  });

  test.slow('@avt-advanced-states ai form', async ({ page }) => {
    await visitStory(page, {
      component: 'Slug',
      id: 'experimental-unstable-slug-form--form-example',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Slug-form');
  });

  test('@avt-keyboard-nav - slug', async ({ page }) => {
    await visitStory(page, {
      component: 'Search',
      id: 'experimental-unstable-slug--callout',
      globals: {
        theme: 'white',
      },
    });
    const slug = page.getByRole('button', {
      name: 'AI - Show information',
    });
    const callout = page.locator('.cds--popover--open');
    await expect(slug).toBeVisible();
    await expect(callout).toBeVisible();

    // Tab to the Slug
    await page.keyboard.press('Tab');
    await expect(slug).toBeFocused();

    // Close the slug (example is open by default)
    await page.keyboard.press('Enter');
    await expect(callout).toBeHidden();

    // Should also be able to open with space
    await page.keyboard.press('Space');
    await expect(callout).toBeVisible();

    // Tab should go to buttons, and then close after last button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('button', {
        name: 'View details',
      })
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(callout).toBeHidden();

    // Should also close on escape
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(callout).toBeHidden();
    await slug.click();
    await expect(callout).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(callout).toBeHidden();
  });
});
