/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

// TODO: remove test.skip and change globals.theme to 'white' when the v12
// Storybook is running in CI. FullPageError stories are currently excluded
// from the v11 Storybook via productMigratedStoryGlobs.

test.describe('@avt FullPageError', () => {
  test.skip('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FullPageError',
      id: 'components-fullpageerror--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FullPageError @avt-default-state');
  });
});
