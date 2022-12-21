/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

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

      test('improved contrast clickable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile-experimental-improved-contrast--clickable',
          theme,
        });
      });

      test('improved contrast clickable with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile-experimental-improved-contrast--clickable-with-layer',
          theme,
        });
      });

      test('improved contrast selectable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile-experimental-improved-contrast--selectable',
          theme,
        });
      });

      test('improved contrast multi select @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile-experimental-improved-contrast--multi-select',
          theme,
        });
      });

      test('improved contrast radio @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile-experimental-improved-contrast--radio',
          theme,
        });
      });

      test('improved contrast radio with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile-experimental-improved-contrast--radio-with-layer',
          theme,
        });
      });

      test('improved contrast expandable @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile-experimental-improved-contrast--expandable',
          theme,
        });
      });

      test('improved contrast expandable with interactive @vrt', async ({
        page,
      }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile-experimental-improved-contrast--expandable-with-interactive',
          theme,
        });
      });

      test('improved contrast expandable with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Tile',
          id: 'components-tile-experimental-improved-contrast--expandable-with-layer',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'Tile',
      id: 'components-tile--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tile');
  });

  test('accessibility-checker selectable tile @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'SelectableTile',
      id: 'components-tile--selectable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('SelectableTile');
  });
});
