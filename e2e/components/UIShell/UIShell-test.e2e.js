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
      test('header w/ actions and right panel @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-header--header-w-actions-and-right-panel',
          theme,
        });
      });

      test('header w/ actions and switcher @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-header--header-w-actions-and-switcher',
          theme,
        });
      });

      test('header w/ navigation @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-header--header-w-navigation',
          theme,
        });
      });

      test('header w/ navigation, actions and sidenav @vrt', async ({
        page,
      }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-header--header-w-navigation-actions-and-side-nav',
          theme,
        });
      });

      test('header w/ navigation and actions @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-header--header-w-navigation-and-actions',
          theme,
        });
      });

      test('header w/ sidenav @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-header--header-w-side-nav',
          theme,
        });
      });

      test('fixed sidenav @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-sidenav--fixed-side-nav',
          theme,
        });
      });

      test('fixed sidenav w/ divider @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-sidenav--fixed-side-nav-w-divider',
          theme,
        });
      });

      test('fixed sidenav w/ icons @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-sidenav--fixed-side-nav-w-icons',
          theme,
        });
      });
      test('sidenav rail w/header @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-sidenav--side-nav-rail-w-header',
          theme,
        });
      });

      test('sidenav w/ large side nav items @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell-sidenav--side-nav-w-large-side-nav-items',
          theme,
        });
      });
    });
  });
});
