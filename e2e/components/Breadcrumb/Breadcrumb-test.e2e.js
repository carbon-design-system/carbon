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

test.describe('breadcrumb', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('breadcrumb with overflow menu @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'breadcrumb',
          story: 'breadcrumb-with-overflow-menu',
          globals: { theme },
        });
        const overflowButton = page.locator(
          'button[aria-haspopup="true"][aria-expanded="false"]'
        );
        await overflowButton.click();
        await expect(overflowButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });
});
