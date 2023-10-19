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

test.describe('Modal', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Modal',
          id: 'components-modal--default',
          theme,
        });
      });

      test('passive modal @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Modal',
          id: 'components-modal--passive-modal',
          theme,
        });
      });

      test('full width modal @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Modal',
          id: 'components-modal--full-width',
          theme,
        });
      });

      test('with scrolling content modal @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Modal',
          id: 'components-modal--with-scrolling-content',
          theme,
        });
      });
    });
  });
});
