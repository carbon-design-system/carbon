/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

// TODO: remove test.skip and re-enable when the v12 Storybook is running in CI.
// TagOverflow stories are currently excluded from the v11 Storybook via productMigratedStoryGlobs.

test.describe('@avt TagOverflow', () => {
  test.skip('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'TagOverflow',
      id: 'components-tagoverflow--tags-with-overflow-count',
      globals: {
        theme: 'white',
      },
    });
    // Wait for the overflow tag to be visible before clicking
    await page.waitForSelector('button.cds--tag.cds--tag--operational', {
      visible: true,
    });
    await page.getByText('+2').click();
    await expect(page).toHaveNoACViolations('TagOverflow @avt-default-state');
  });
});
