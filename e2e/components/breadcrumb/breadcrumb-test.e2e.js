/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test');
const { themes, snapshotStory } = require('../../test-utils/storybook');

test.describe('breadcrumb @vrt', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('breadcrumb', async ({ page }, testInfo) => {
        await snapshotStory(page, testInfo, {
          component: 'breadcrumb',
          story: 'breadcrumb-story',
          theme,
        });
      });

      test('breadcrumb with overflow menu', async ({ page }, testInfo) => {
        await snapshotStory(page, testInfo, {
          component: 'breadcrumb',
          story: 'breadcrumb-with-overflow-menu',
          theme,
        });
      });
    });
  });
});
