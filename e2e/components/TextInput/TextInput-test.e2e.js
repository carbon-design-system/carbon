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

test.describe('TextInput', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'TextInput',
          id: 'components-textinput--default',
          theme,
        });
      });

      test('fluid @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'TextInput',
          id: 'components-textinput--fluid',
          theme,
        });
      });

      test('toggle password visibility @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'TextInput',
          id: 'components-textinput--toggle-password-visibility',
          theme,
        });
      });

      test('read only @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'TextInput',
          id: 'components-textinput--read-only',
          theme,
        });
      });

      test('with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'TextInput',
          id: 'components-textinput--with-layer',
          theme,
        });
      });
    });
  });
});
