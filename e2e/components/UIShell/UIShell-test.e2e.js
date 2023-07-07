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

test.describe('UIShell', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('header @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header',
          theme,
        });
      });

      test('header w/ navigation @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-w-navigation',
          theme,
        });
      });

      test('header w/ actions @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-w-actions',
          theme,
        });
      });

      test('header w/ skiptocontent @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-w-skip-to-content',
          theme,
        });
      });

      test('header w/ navigation and actions @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-w-navigation-and-actions',
          theme,
        });
      });

      test('header w/ navigation, actions and sidenav @vrt', async ({
        page,
      }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-w-navigation-actions-and-side-nav',
          theme,
        });
      });

      test('header w/ sidenav @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-w-side-nav',
          theme,
        });
      });

      test('header w/ actions and right panel @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-w-actions-and-right-panel',
          theme,
        });
      });

      test('header w/ actions and switcher @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-w-actions-and-switcher',
          theme,
        });
      });

      test('fixed sidenav @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--fixed-side-nav',
          theme,
        });
      });

      test('fixed sidenav w/ icons @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--fixed-side-nav-w-icons',
          theme,
        });
      });

      test('fixed sidenav w/ divider @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--fixed-side-nav-w-divider',
          theme,
        });
      });

      test('sidenav rail @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--side-nav-rail',
          theme,
        });
      });

      test('sidenav rail w/header @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--side-nav-rail-w-header',
          theme,
        });
      });

      test('sidenav w/ large side nav items @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--side-nav-w-large-side-nav-items',
          theme,
        });
      });
    });
  });
});
