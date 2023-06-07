/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('Menu', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('menu @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Menu',
          id: 'components-menu--playground',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'Menu',
      id: 'components-menu--playground',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Menu');
  });
});
