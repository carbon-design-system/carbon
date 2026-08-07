/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt BigNumber', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'preview__BigNumber',
      id: 'preview-bignumber--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('BigNumber');
  });
});
