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

test.describe('ContentSwitcher', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContentSwitcher',
          id: 'components-contentswitcher--default',
          theme,
        });
      });

      test('with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContentSwitcher',
          id: 'components-contentswitcher--with-layer',
          theme,
        });
      });

      test('icon only with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContentSwitcher',
          id: 'components-contentswitcher--icon-only-with-layer',
          theme,
        });
      });
    });
  });
});
