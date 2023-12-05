/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test'); // eslint-disable-line
const { themes } = require('../../test-utils/env');
const { snapshotStory } = require('../../test-utils/storybook'); // eslint-disable-line

test.describe('Slug', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Slug',
          id: 'experimental-unstable-slug--default',
          theme,
        });
      });

      test('slug inside form @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Slug',
          id: 'experimental-unstable-slug-form--form-example',
          theme,
        });
      });
    });
  });
});
