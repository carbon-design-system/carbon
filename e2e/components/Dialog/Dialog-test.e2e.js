/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory } = require('../../test-utils/storybook');

test.describe('Dialog', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('modal dialog @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'unstable_Dialog',
          id: 'experimental-unstable-dialog--modal',
          theme,
        });
      });

      test('non-modal dialog @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'unstable_Dialog',
          id: 'experimental-unstable-dialog--non-modal',
          theme,
        });
      });

      test('passive dialog @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'unstable_Dialog',
          id: 'experimental-unstable-dialog--passive-dialog',
          theme,
        });
      });

      test('danger dialog @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'unstable_Dialog',
          id: 'experimental-unstable-dialog--danger-dialog',
          theme,
        });
      });
    });
  });
});
