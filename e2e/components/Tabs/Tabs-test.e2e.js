/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshot } = require('../../test-utils/snapshot');
const { snapshotStory } = require('../../test-utils/storybook');

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

        // Focus the tab to invoke the tooltip and snapshot it
        await page.keyboard.press('Tab');
        await expect(page.getByRole('tab', { name: 'Activity' })).toBeFocused();
        await snapshot(page, {
          theme,
          component: 'Tabs',
          id: 'components-tabs--icon-20-only | focused',
        });
      });

      test('icon only @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--icon-only',
          theme,
        });

        // Focus the tab to invoke the tooltip and snapshot it
        await page.keyboard.press('Tab');
        await expect(page.getByRole('tab', { name: 'Activity' })).toBeFocused();
        await snapshot(page, {
          theme,
          component: 'Tabs',
          id: 'components-tabs--icon-only | focused',
        });
      });

      test('contained @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--contained',
          theme,
        });
      });

      test('contained fullWidth @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--contained-full-width',
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

      test('vertical @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tabs',
          id: 'components-tabs--vertical',
          theme,
        });
      });
    });
  });
});
