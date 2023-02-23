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

test.describe('FlexGrid', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('auto columns @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FlexGrid',
          id: 'components-flexgrid--auto-columns',
          theme,
        });
      });

      test('responsive grid @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FlexGrid',
          id: 'components-flexgrid--responsive-grid',
          theme,
        });
      });

      test('offset @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FlexGrid',
          id: 'components-flexgrid--offset',
          theme,
        });
      });

      test('condensed @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FlexGrid',
          id: 'components-flexgrid--condensed',
          theme,
        });
      });

      test('condensed columns @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FlexGrid',
          id: 'components-flexgrid--condensed-columns',
          theme,
        });
      });

      test('narrow @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FlexGrid',
          id: 'components-flexgrid--narrow',
          theme,
        });
      });

      test('narrow columns @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FlexGrid',
          id: 'components-flexgrid--narrow-columns',
          theme,
        });
      });

      test('full width @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FlexGrid',
          id: 'components-flexgrid--full-width',
          theme,
        });
      });

      test('mixed grid modes @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FlexGrid',
          id: 'components-flexgrid--mixed-grid-modes',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'FlexGrid',
      id: 'components-flexgrid--auto-columns',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FlexGrid');
  });
});
