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

test.describe('FluidSelect', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('fluid select @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FluidSelect',
          id: 'experimental-unstable-fluidselect--default',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidSelect',
      id: 'experimental-unstable-fluidselect--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidSelect');
  });
});
