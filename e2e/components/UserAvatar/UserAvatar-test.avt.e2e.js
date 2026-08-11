// cspell:words useravatar

/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt UserAvatar', () => {
  test.skip('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'UserAvatar',
      id: 'components-useravatar--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('UserAvatar @avt-default-state');
  });

  test.skip('@avt-focus-state', async ({ page }) => {
    await visitStory(page, {
      component: 'UserAvatar',
      id: 'components-useravatar--default',
      globals: {
        theme: 'white',
      },
    });

    await page.keyboard.press('Tab');
    await expect(
      page
        .locator('section')
        .filter({ hasText: "useTheme reveals theme: 'white" })
        .getByLabel('TW, Thomas J. Watson user profile')
    ).toBeFocused();
  });

  test.skip('@avt-hover-state', async ({ page }) => {
    await visitStory(page, {
      component: 'UserAvatar',
      id: 'components-useravatar--default',
      globals: {
        theme: 'white',
      },
    });

    const tooltipTrigger = page
      .locator('section')
      .filter({ hasText: "useTheme reveals theme: 'white" })
      .getByLabel('TW, Thomas J. Watson user profile');
    await expect(tooltipTrigger).toBeVisible();
    await tooltipTrigger.hover();
    const tooltipContent = page
      .getByText('TW, Thomas J. Watson user profile')
      .first();
    await expect(tooltipContent).toBeVisible();
    // Press ESCAPE key while hover is active
    await page.keyboard.press('Escape');
    await expect(tooltipContent).toBeHidden();
  });
});
