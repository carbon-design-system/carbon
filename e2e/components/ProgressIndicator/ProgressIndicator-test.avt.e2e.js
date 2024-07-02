/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt ProgressIndicator', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ProgressIndicator');
  });

  test('@avt-advanced-states interactive', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--interactive',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ProgressIndicator-interactive');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ProgressIndicator-skeleton');
  });

  test('@avt-advanced-states - onHover', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--default',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByText('First step')).toBeVisible();

    page.getByText('First step').hover();

    await expect(page).toHaveNoACViolations('ProgressIndicator-onhover');
  });

  test('@avt-advanced-states - complete', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--default',
      globals: {
        theme: 'white',
      },
    });

    // Checking if the 'complete' prop is adding the correct class
    expect(page.locator('.cds--progress-step--complete')).toBeTruthy();
  });

  test('@avt-advanced-states', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--default',
      globals: {
        theme: 'white',
      },
    });

    // Checking if the 'current' prop is adding the correct class
    expect(page.locator('.cds--progress-step--current')).toBeTruthy();
  });

  test('@avt-advanced-states - interactive onHover', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--interactive',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByText('Click me')).toBeVisible();

    page.getByText('Click me').hover();

    await expect(page).toHaveNoACViolations(
      'ProgressIndicator-interactive-onhover'
    );
  });

  test('@avt-keyboard-nav progress indicator', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--interactive',
      globals: {
        theme: 'white',
      },
    });
    // Testing the first element interaction
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Click me' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Click me' })).toBeFocused();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');

    // Testing the third element interaction
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('button', { name: 'Third step' })
    ).toBeFocused();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');

    await expect(
      page.getByRole('button', { name: 'Third step' })
    ).toBeFocused();
  });
});
