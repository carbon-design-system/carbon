/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Link @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Link',
      id: 'components-link--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-link--default');
  });

  test('@avt-advanced-states inline', async ({ page }) => {
    await visitStory(page, {
      component: 'Link',
      id: 'components-link--inline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-link--inline');
  });

  test('@avt-advanced-states paired with icon', async ({ page }) => {
    await visitStory(page, {
      component: 'Link',
      id: 'components-link--paired-with-icon',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'components-link--paired-with-icon'
    );
  });

  // Prevent timeout
  test.slow('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Link',
      id: 'components-link--default',
      globals: {
        theme: 'white',
      },
    });

    // Checking focus
    const link = page.getByRole('link');
    await expect(link).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(link).toBeFocused();

    // Checking if the link was triggered
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(
      'iframe.html?id=components-link--default&viewMode=story&globals=theme:white#'
    );
  });
});
