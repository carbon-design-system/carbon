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

test.describe('UIShell', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('header base @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-base',
          theme,
        });
      });

      test('header base w/ navigation @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-base-w-navigation',
          theme,
        });
      });

      test('header base w/ actions @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-base-w-actions',
          theme,
        });
      });

      test('header base w/ skiptocontent @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-base-w-skip-to-content',
          theme,
        });
      });

      test('header base w/ navigation and actions @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-base-w-navigation-and-actions',
          theme,
        });
      });

      test('header base w/ navigation, actions and sidenav @vrt', async ({
        page,
      }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-base-w-navigation-actions-and-side-nav',
          theme,
        });
      });

      test('header base w/ sidenav @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-base-w-side-nav',
          theme,
        });
      });

      test('header base w/ actions and right panel @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-base-w-actions-and-right-panel',
          theme,
        });
      });

      test('header base w/ actions and switcher @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'UIShell',
          id: 'components-ui-shell--header-base-w-actions-and-switcher',
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

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'UIShell',
      id: 'components-ui-shell--header-base',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('UIShell');
  });
});
