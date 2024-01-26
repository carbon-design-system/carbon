/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory } = require('../../test-utils/storybook');

test.describe('FluidTimePicker', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('fluid text input @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FluidTimePicker',
          id: 'experimental-fluid-components-unstable-fluidtimepicker--default',
          theme,
        });
      });
    });
  });
});
