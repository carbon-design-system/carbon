/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test'); // eslint-disable-line
const { themes } = require('../../test-utils/env');
const { snapshotStory } = require('../../test-utils/storybook'); // eslint-disable-line

test.describe('AILabel', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'AILabel',
          id: 'components-ailabel--default',
          theme,
        });
      });

      test('AILabel callout @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'AILabel',
          id: 'components-ailabel--explainability-popover',
          theme,
        });
      });

      test('AILabel inside form @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'AILabel',
          id: 'components-form--with-ai-label',
          theme,
        });
      });

      test('AILabel inside DataTable column @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'AILabel',
          id: 'components-datatable-withailabel--column-ai-label-sort',
          theme,
        });
      });

      test('AILabel inside DataTable row @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'AILabel',
          id: 'components-datatable-withailabel--ai-label-with-selection-and-expansion',
          theme,
        });
      });

      test('AILabel inside Tile @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'AILabel',
          id: 'components-tile--with-ai-label',
          theme,
        });
      });
    });
  });
});
