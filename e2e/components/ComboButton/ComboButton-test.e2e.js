/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory } = require('../../test-utils/storybook');

test.describe('ComboButton Visual Regression Tests', () => {
  for (const theme of themes) {
    test(`Theme: ${theme}`, async ({ page }) => {
      const componentId = 'components-combobutton--default';
      await takeVisualSnapshot(page, componentId, theme);
    });
  }

  async function takeVisualSnapshot(page, componentId, theme) {
    await snapshotStory(page, {
      component: 'ComboButton',
      id: componentId,
      theme,
    });
  }
});
