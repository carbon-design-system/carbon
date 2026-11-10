/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

// TODO: Remove test.skip when ScrollGradient is removed from
// productMigratedStoryGlobs and its stories are included in the v11 Storybook.
// Also update component field from 'ScrollGradient' to match v12 export name.
test.describe('@avt ScrollGradient', () => {
  test.skip('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'ScrollGradient',
      id: 'utilities-scrollgradient--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'ScrollGradient @avt-default-state'
    );
  });
});
