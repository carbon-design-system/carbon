/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
const { test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshot } = require('../../test-utils/snapshot');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('IconIndicator', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('icon indicator @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'IconIndicator',
          id: 'preview-statusindicators-preview-iconindicator--default',
          theme,
        });
      });

      test('icon indicator size 20 @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'IconIndicator',
          id: 'preview-statusindicators-preview-iconindicator--default',
          theme,
          args: {
            size: '20',
          },
        });
        await snapshot(page, {
          component: 'IconIndicator',
          id: 'preview-statusindicators-preview-iconindicator--default',
          theme,
        });
      });
    });
  });
});
