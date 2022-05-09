/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('UIShell', () => {
  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'UIShell',
      id: 'components-ui-shell--header-base',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('UIShell');
  });
});
