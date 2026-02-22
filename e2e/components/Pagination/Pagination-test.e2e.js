/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshot } = require('../../test-utils/snapshot');
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

        const nextButton = page.getByRole('button', { name: /next/i });
        await nextButton.hover();

        await expect(page.getByText(/next/i)).toBeVisible();

        await snapshot(page, {
          theme,
          component: 'Pagination',
          id: 'components-pagination--default | tooltip hover',
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
