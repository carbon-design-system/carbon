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

test.describe('Tabs', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('line @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--line',
          theme,
        });
      });

      test('manual @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--manual',
          theme,
        });
      });

      test('icon 20 only @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--icon-20-only',
          theme,
        });
      });

      test('icon only @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--icon-only',
          theme,
        });
      });

      test('contained @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--contained',
          theme,
        });
      });
    });
  });
});
