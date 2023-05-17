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

test.describe('DatePicker', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('simple @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DatePicker',
          id: 'components-datepicker--simple',
          theme,
        });
      });

      test('single with calendar @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DatePicker',
          id: 'components-datepicker--single-with-calendar',
          theme,
        });
      });

      test('range with calendar @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DatePicker',
          id: 'components-datepicker--range-with-calendar',
          theme,
        });
      });

      test('simple with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DatePicker',
          id: 'components-datepicker--simple-with-layer',
          theme,
        });
      });

      test('single with calendar with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DatePicker',
          id: 'components-datepicker--single-with-calendar-with-layer',
          theme,
        });
      });

      test('range with calendar with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DatePicker',
          id: 'components-datepicker--range-with-calendar-with-layer',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'DatePicker',
      id: 'components-datepicker--simple',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('DatePicker');
  });
});
