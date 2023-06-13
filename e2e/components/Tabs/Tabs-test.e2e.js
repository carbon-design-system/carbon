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

test.describe('Tabs', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--default',
          theme,
        });
      });

      test('dismissable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--dismissable',
          theme,
        });
      });

      test('dismissable with icons @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--dismissable-with-icons',
          theme,
        });
      });

      test('manual @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--manual',
          theme,
        });
      });

      test('icon 20 only @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--icon-20-only',
          theme,
        });
      });

      test('icon only @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--icon-only',
          theme,
        });
      });

      test('contained @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--contained',
          theme,
        });
      });

      test('contained with secondary labels @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--contained-with-secondary-labels',
          theme,
        });
      });

      test('with icons @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--with-icons',
          theme,
        });
      });

      test('contained with icons @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--contained-with-icons',
          theme,
        });
      });

      test('contained with secondary labels and icons @vrt', async ({
        page,
      }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--contained-with-secondary-labels-and-icons',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-tabs--line',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tabs');
  });
});
