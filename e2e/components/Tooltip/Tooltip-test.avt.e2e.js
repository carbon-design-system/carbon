/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Tooltip @avt', () => {
  test('default state', async ({ page }) => {
    await visitStory(page, {
      component: 'Tooltip',
      id: 'components-tooltip--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tooltip');
  });

  test('default state - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Modal',
      id: 'components-tooltip--default',
      globals: {
        theme: 'white',
      },
    });

    // Expect tooltip to be visible
    await expect(page.getByRole('button')).toBeVisible();
  });
});
