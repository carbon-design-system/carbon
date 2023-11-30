/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Slug @avt', () => {
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

  test('@avt-advanced-states open state', async ({ page }) => {
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

  test('@avt-advanced-states ai form', async ({ page }) => {
    await visitStory(page, {
      component: 'Slug',
      id: 'components-form--ai-form',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Slug-form');
  });
});
