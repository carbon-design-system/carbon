/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('OrderedList', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('native styles @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'OrderedList',
          id: 'components-orderedlist--default',
          theme,
        });
      });

      test('nested @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'OrderedList',
          id: 'components-orderedlist--nested',
          theme,
        });
      });

      test('native list styles @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'OrderedList',
          id: 'components-orderedlist--native-list-styles',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'OrderedList',
      id: 'components-orderedlist--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('OrderedList');
  });
});
