/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('FluidDatePicker @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDatePicker',
      id: 'experimental-unstable-fluiddatepicker--range-with-calendar',
      globals: {
        theme: 'white',
      },
    });
  });

  test('@avt-advanced-states single', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDatePicker',
      id: 'experimental-unstable-fluiddatepicker--single',
      globals: {
        theme: 'white',
      },
    });
  });

  test('@avt-advanced-states simple', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidDatePicker',
      id: 'experimental-unstable-fluiddatepicker--simple',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidDatePicker');
  });
});
