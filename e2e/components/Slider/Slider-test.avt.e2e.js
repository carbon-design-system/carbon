/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Slider @avt', () => {
  test('default state', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Slider');
  });

  test('default state - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--default',
      globals: {
        theme: 'white',
      },
    });

    // Focus on the slider via keyboard navigation
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('slider', { name: 'Slider Label' })
    ).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('slider', { name: 'Slider Label' })
    ).toBeFocused();
  });
});
