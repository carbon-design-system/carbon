/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('InlineLoading @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'InlineLoading',
      id: 'components-inlineloading--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('InlineLoading @avt-default-state');
  });
});
