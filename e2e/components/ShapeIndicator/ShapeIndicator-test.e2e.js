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

test.describe('ShapeIndicator', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('shape indicator @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ShapeIndicator',
          id: 'preview-statusindicators-preview-shapeindicator--default',
          theme,
        });
      });

      test('shape indicator text size 14 @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'ShapeIndicator',
          id: 'preview-statusindicators-preview-shapeindicator--default',
          theme,
          args: {
            textSize: '14',
          },
        });
        await snapshot(page, {
          component: 'ShapeIndicator',
          id: 'preview-statusindicators-preview-shapeindicator--default',
          theme,
        });
      });
    });
  });
});
