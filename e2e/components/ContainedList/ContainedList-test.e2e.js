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

test.describe('ContainedList', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContainedList',
          id: 'components-containedlist--default',
          theme,
        });
      });

      test('disclosed @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContainedList',
          id: 'components-containedlist--disclosed',
          theme,
        });
      });

      test('with-actions @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContainedList',
          id: 'components-containedlist--with-actions',
          theme,
        });
      });

      test('with-icons @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContainedList',
          id: 'components-containedlist--with-icons',
          theme,
        });
      });

      test('with-interactive-items @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContainedList',
          id: 'components-containedlist--with-interactive-items',
          theme,
        });
      });

      test('with-interactive-items-and-actions @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContainedList',
          id: 'components-containedlist--with-interactive-items-and-actions',
          theme,
        });
      });

      test('with-layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContainedList',
          id: 'components-containedlist--with-layer',
          theme,
        });
      });

      test('with-list-title-decorators @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContainedList',
          id: 'components-containedlist--with-list-title-decorators',
          theme,
        });
      });

      test('playground @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ContainedList',
          id: 'components-containedlist--playground',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ContainedList');
  });
});
