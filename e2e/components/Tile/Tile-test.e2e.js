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

test.describe('Tile', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--default',
          theme,
        });
      });

      test('default with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--default-with-layer',
          theme,
        });
      });

      test('clickable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--clickable',
          theme,
        });
      });

      test('clickable with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--clickable-with-layer',
          theme,
        });
      });

      test('selectable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--selectable',
          theme,
        });
      });

      test('multi select @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--multi-select',
          theme,
        });
      });

      test('radio @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--radio',
          theme,
        });
      });

      test('radio with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--radio-with-layer',
          theme,
        });
      });

      test('expandable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--expandable',
          theme,
        });
      });

      test('expandable with interactive @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--expandable-with-interactive',
          theme,
        });
      });

      test('expandable with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile--expandable-with-layer',
          theme,
        });
      });

      test('feature flags clickable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'experimental-feature-flags-tile--clickable',
          theme,
        });
      });

      test('feature flags clickable with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'experimental-feature-flags-tile--clickable-with-layer',
          theme,
        });
      });

      test('feature flags selectable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'experimental-feature-flags-tile--selectable',
          theme,
        });
      });

      test('feature flags multi select @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'experimental-feature-flags-tile--multi-select',
          theme,
        });
      });

      test('feature flags radio @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'experimental-feature-flags-tile--radio',
          theme,
        });
      });

      test('feature flags radio with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'experimental-feature-flags-tile--radio-with-layer',
          theme,
        });
      });

      test('feature flags expandable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'experimental-feature-flags-tile--expandable',
          theme,
        });
      });

      test('feature flags expandable with interactive @vrt', async ({
        page,
      }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'experimental-feature-flags-tile--expandable-with-interactive',
          theme,
        });
      });

      test('feature flags expandable with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'experimental-feature-flags-tile--expandable-with-layer',
          theme,
        });
      });
    });
  });
});
