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

test.describe('ComboBox', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('combobox @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ComboBox',
          id: 'components-combobox--default',
          theme,
        });
      });

      test('with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ComboBox',
          id: 'components-combobox--with-layer',
          theme,
        });
      });
    });
  });
});
