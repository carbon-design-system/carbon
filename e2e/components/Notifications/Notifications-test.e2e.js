/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory } = require('../../test-utils/storybook');

test.describe('Notifications', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('toast @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Notifications',
          id: 'components-notifications--toast',
          theme,
        });
      });

      test('inline @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Notifications',
          id: 'components-notifications--inline',
          theme,
        });
      });

      test('actionable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Notifications',
          id: 'components-notifications--actionable',
          theme,
        });
      });
    });
  });
});
