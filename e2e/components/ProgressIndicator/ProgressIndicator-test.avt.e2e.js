/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('ProgressIndicator', () => {
  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ProgressIndicator');
  });

  test('progress indicator - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--interactive',
      globals: {
        theme: 'white',
      },
    });
    // Focus the first element
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Click me' })).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Click me' })).toBeFocused();

    // Testing the click in the first element
    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');

    // Focus the third element
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('button', { name: 'Third step' })
    ).toBeFocused();
  });
});
