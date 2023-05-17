/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('FluidSearch', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('fluid select @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FluidSearch',
          id: 'experimental-unstable-fluidsearch--default',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidSearch',
      id: 'experimental-unstable-fluidsearch--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidSearch');
  });
});
