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

test.describe('StructuredList', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('simple @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'StructuredList',
          id: 'components-structuredlist--default',
          theme,
        });
      });

      test('with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'StructuredList',
          id: 'components-structuredlist--with-background-layer',
          theme,
        });
      });

      test('selection @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'StructuredList',
          id: 'components-structuredlist--selection',
          theme,
        });
      });
    });
  });
});
