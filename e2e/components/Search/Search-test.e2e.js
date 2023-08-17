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

test.describe('Search', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Search',
          id: 'components-search--default',
          theme,
        });
      });

      test('disabled @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Search',
          id: 'components-search--disabled',
          theme,
        });
      });

      test('expandable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Search',
          id: 'components-search--expandable',
          theme,
        });
      });

      test('with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Search',
          id: 'components-search--with-layer',
          theme,
        });
      });

      test('expandable with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Search',
          id: 'components-search--expandable-with-layer',
          theme,
        });
      });
    });
  });
});
