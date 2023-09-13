/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory } = require('../../test-utils/storybook');

test.describe('OverflowMenu', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'OverflowMenu',
          id: 'components-overflowmenu--default',
          theme,
        });
      });

      test('render custom icon @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'OverflowMenu',
          id: 'components-overflowmenu--render-custom-icon',
          theme,
        });
      });

      test('feature flags default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'OverflowMenu',
          id: 'experimental-feature-flags-overflowmenu--overflow-menu',
          theme,
        });
      });

      test('feature flags render custom icon @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'OverflowMenu',
          id: 'experimental-feature-flags-overflowmenu--custom-icon',
          theme,
        });
      });
    });
  });
});
