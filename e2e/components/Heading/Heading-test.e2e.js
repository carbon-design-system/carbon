/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('Heading', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('heading @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Heading',
          id: 'components-heading--default',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'Heading',
      id: 'components-heading--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Heading');
  });
});
