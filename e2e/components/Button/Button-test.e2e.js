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

test.describe('Button', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--default',
          theme,
        });
      });

      test('secondary @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--secondary',
          theme,
        });
      });

      test('tertiary @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--tertiary',
          theme,
        });
      });

      test('danger @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--danger',
          theme,
        });
      });

      test('ghost @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--ghost',
          theme,
        });
      });

      test('icon button @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--icon-button',
          theme,
        });
      });

      test('set of buttons @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--set-of-buttons',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button');
  });
});
