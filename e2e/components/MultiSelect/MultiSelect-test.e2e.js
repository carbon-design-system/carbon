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

test.describe('MultiSelect', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'MultiSelect',
          id: 'components-multiselect--default',
          theme,
        });
      });

      test('with initial selected items @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'MultiSelect',
          id: 'components-multiselect--with-initial-selected-items',
          theme,
        });
      });

      test('filterable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'MultiSelect',
          id: 'components-multiselect--filterable',
          theme,
        });
      });

      test('with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'MultiSelect',
          id: 'components-multiselect--with-layer',
          theme,
        });
      });

      test('filterable with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'MultiSelect',
          id: 'components-multiselect--filterable-with-layer',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'MultiSelect',
      id: 'components-multiselect--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('MultiSelect');
  });
});
