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

test.describe('Tooltip', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tooltip',
          id: 'components-tooltip--default',
          theme,
        });
      });

      test('alignment @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tooltip',
          id: 'components-tooltip--alignment',
          theme,
        });
      });

      test('duration @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tooltip',
          id: 'components-tooltip--duration',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'Tooltip',
      id: 'components-tooltip--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tooltip');
  });
});
