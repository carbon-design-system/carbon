/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Tabs', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('icon 20 only - focus @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Tabs',
          id: 'components-tabs--icon-20-only',
          globals: { theme },
        });

        // Focus the tab to invoke the tooltip
        await page.keyboard.press('Tab');
        await expect(page.getByRole('tab', { name: 'Activity' })).toBeFocused();
      });

      test('icon only - focus @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Tabs',
          id: 'components-tabs--icon-only',
          globals: { theme },
        });

        // Focus the tab to invoke the tooltip
        await page.keyboard.press('Tab');
        await expect(page.getByRole('tab', { name: 'Activity' })).toBeFocused();
      });
    });
  });
});
