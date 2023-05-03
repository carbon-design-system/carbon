/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('FluidNumberInput', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('fluid text input @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FluidNumberInput',
          id: 'experimental-unstable-fluidnumberinput--default',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidNumberInput',
      id: 'experimental-unstable-fluidnumberinput--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidNumberInput');
  });
});
