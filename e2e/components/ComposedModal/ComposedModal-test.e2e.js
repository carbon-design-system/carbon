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

test.describe('ComposedModal', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ComposedModal',
          id: 'components-composedmodal--default',
          theme,
        });
      });

      test('passive modal @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ComposedModal',
          id: 'components-composedmodal--passive-modal',
          theme,
        });
      });

      test('with state manager @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ComposedModal',
          id: 'components-composedmodal--with-state-manager',
          theme,
        });
      });

      test('full width modal @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ComposedModal',
          id: 'components-composedmodal--full-width',
          theme,
        });
      });

      test('with scrolling content @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ComposedModal',
          id: 'components-composedmodal--with-scrolling-content',
          theme,
        });
      });
    });
  });
});
