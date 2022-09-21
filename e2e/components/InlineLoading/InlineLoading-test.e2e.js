/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('InlineLoading', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('inline loading @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'InlineLoading',
          id: 'components-inlineloading--default',
          theme,
        });
      });

      test('ux example @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'InlineLoading',
          id: 'components-inlineloading--ux-example',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'InlineLoading',
      id: 'components-inlineloading--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('InlineLoading');
  });
});
