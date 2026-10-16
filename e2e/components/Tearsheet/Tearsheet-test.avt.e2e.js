/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// TODO: Remove test.skip and change to test() when the v12 Storybook is
// running in CI. Stories are currently excluded from the v11 Storybook via
// productMigratedStoryGlobs in product-migrated-components.mjs.

const { test, expect } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

const prefix = 'cds';
const blockClass = `${prefix}--tearsheet`;

test.describe('@avt Tearsheet', () => {
  test.skip('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Tearsheet',
      id: 'components-tearsheet--default',
      globals: {
        theme: 'white',
      },
    });

    await expect(page).toHaveNoACViolations('Tearsheet @avt-default-state');
  });

  test.skip('@avt-open-and-close', async ({ page }) => {
    await visitStory(page, {
      component: 'Tearsheet',
      id: 'components-tearsheet--default',
      globals: {
        theme: 'white',
      },
    });

    const modalElement = page.locator(`.${prefix}--modal.is-visible`);

    // Expect Tearsheet to be in the viewport
    await expect(modalElement).toBeInViewport();

    // Pressing 'Escape' key to close the Tearsheet
    await page.keyboard.press('Escape');
    await page.screenshot({ animations: 'disabled' });

    await expect(modalElement).not.toBeInViewport();
  });

  test.skip('@avt-default-state-focus-trap', async ({ page }) => {
    await visitStory(page, {
      component: 'Tearsheet',
      id: 'components-tearsheet--default',
      globals: {
        theme: 'white',
      },
    });

    const modalElement = page.locator(`.${prefix}--modal.is-visible`);
    const cancelButton = page.getByText('Cancel');
    const backButton = page.getByText('Back');
    const nextButton = page.getByText('Next');

    // Check Tearsheet is visible
    await expect(modalElement).toBeInViewport();

    // Press 'Tab' key to focus the 'Cancel' button
    await page.keyboard.press('Tab');
    await expect(cancelButton).toBeFocused();

    // Press 'Tab' key to focus the 'Back' button
    await page.keyboard.press('Tab');
    await expect(backButton).toBeFocused();

    // Press 'Tab' key to focus the 'Next' button
    await page.keyboard.press('Tab');
    await expect(nextButton).toBeFocused();
  });

  test.skip('@avt-stacking', async ({ page }) => {
    // TODO: story 'components-tearsheet--stacking-tearsheet' may not yet exist
    // in Carbon core — re-enable when confirmed
    await visitStory(page, {
      component: 'Tearsheet',
      id: 'components-tearsheet--stacking-tearsheet',
      globals: {
        theme: 'white',
      },
    });

    // Close all pre-opened tearsheets
    await page.keyboard.press('Escape');
    await page.screenshot({ animations: 'disabled' });
    await page.keyboard.press('Escape');
    await page.screenshot({ animations: 'disabled' });
    await page.keyboard.press('Escape');
    await page.screenshot({ animations: 'disabled' });

    const openButton1 = page.getByText('Toggle tearsheet 1');
    await expect(openButton1).toBeFocused();

    // Open the first Tearsheet
    await page.keyboard.press('Enter');
    await page.screenshot({ animations: 'disabled' });

    const ts1 = page.locator(`.${prefix}--modal.is-visible`);
    await expect(ts1).toBeInViewport();
    await expect(page).toHaveNoACViolations('Tearsheet @avt-stacking');
  });

  test.skip('@avt-narrow', async ({ page }) => {
    // TODO: story 'components-tearsheet--narrow-tearsheet' may not yet exist
    // in Carbon core — re-enable when confirmed
    await visitStory(page, {
      component: 'Tearsheet',
      id: 'components-tearsheet--narrow-tearsheet',
      globals: {
        theme: 'white',
      },
    });

    const modalElement = page.locator(`.${blockClass}--narrow`);
    await expect(modalElement).toBeInViewport();
    await expect(page).toHaveNoACViolations('Tearsheet @avt-narrow');
  });

  test.skip('@avt-with-influencer', async ({ page }) => {
    // TODO: story 'components-tearsheet--with-influencer' may not yet exist
    // in Carbon core — re-enable when confirmed
    await visitStory(page, {
      component: 'Tearsheet',
      id: 'components-tearsheet--with-influencer',
      globals: {
        theme: 'white',
      },
    });

    const modalElement = page.locator(`.${prefix}--modal.is-visible`);
    await expect(modalElement).toBeInViewport();
    await expect(page).toHaveNoACViolations('Tearsheet @avt-with-influencer');
  });
});
