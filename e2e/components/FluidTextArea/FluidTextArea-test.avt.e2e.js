/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('FluidTextArea @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidTextArea',
      id: 'experimental-unstable-fluidtextarea--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidTextArea @avt-default-state');
  });
});
