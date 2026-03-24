/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Pagination', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('pagination tooltip on hover @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Pagination',
          id: 'components-pagination--default',
          globals: { theme },
        });

        const nextButton = page.getByRole('button', { name: /next/i });
        await nextButton.hover();

        await expect(page.getByText(/next/i)).toBeVisible();
      });
    });
  });
});
