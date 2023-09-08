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

test.describe('Pagination', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('pagination @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Pagination',
          id: 'components-pagination--default',
          theme,
        });
      });

      test('multiple pagination components @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Pagination',
          id: 'components-pagination--multiple-pagination-components',
          theme,
        });
      });

      test('pagination with custom page sizes label @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Pagination',
          id: 'components-pagination--pagination-with-custom-page-sizes-label',
          theme,
        });
      });
    });
  });
});
