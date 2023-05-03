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

test.describe('DataTable', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('basic - default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-basic--default',
          theme,
        });
      });

      test('batch actions - default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-batch-actions--default',
          theme,
        });
      });

      test('filtering - usage @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-filtering--usage',
          theme,
        });
      });

      test('selection - usage @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-selection--usage',
          theme,
        });
      });

      test('selection - with radio selection @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-selection--with-radio-selection',
          theme,
        });
      });

      test('selection - with selection and sorting @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-selection--with-selection-and-sorting',
          theme,
        });
      });

      test('sorting - usage @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-sorting--usage',
          theme,
        });
      });

      test('toolbar - default toolbar @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-toolbar--default-toolbar',
          theme,
        });
      });

      test('toolbar - persistent toolbar @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-toolbar--persistent-toolbar',
          theme,
        });
      });

      test('toolbar - small persistent toolbar @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-toolbar--small-persistent-toolbar',
          theme,
        });
      });

      test('toolbar - with overflow menu @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-toolbar--with-overflow-menu',
          theme,
        });
      });

      test('dynamic - example @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-dynamic--example',
          theme,
        });
      });

      test('expansion - usage @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-expansion--usage',
          theme,
        });
      });

      test('expansion - batch expansion @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DataTable',
          id: 'components-datatable-expansion--batch-expansion',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'DataTable',
      id: 'components-datatable-basic--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('DataTable');
  });
});
