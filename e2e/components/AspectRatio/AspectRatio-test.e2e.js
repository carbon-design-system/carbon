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

test.describe('AspectRatio', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('aspectratio @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'AspectRatio',
          id: 'components-aspectratio--default',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'AspectRatio',
      id: 'components-aspectratio--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('AspectRatio');
  });
});
