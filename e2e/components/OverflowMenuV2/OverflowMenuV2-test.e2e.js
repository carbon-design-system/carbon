/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('OverflowMenuV2', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'OverflowMenuV2',
          id: 'components-overflowmenuv2--overflow-menu-v-2',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'OverflowMenuV2',
      id: 'components-overflowmenuv2--overflow-menu-v-2',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('OverflowMenuV2');
  });
});
