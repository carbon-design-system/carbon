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

test.describe('ProgressIndicator', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ProgressIndicator',
          id: 'components-progressindicator--default',
          theme,
        });
      });

      test('interactive @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'ProgressIndicator',
          id: 'components-progressindicator--interactive',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ProgressIndicator');
  });

  // test('progress indicator - hover state', async ({ page }) => {
  //   await visitStory(page, {
  //     component: 'ProgressIndicator',
  //     id: 'components-progressindicator--default',
  //     globals: {
  //       theme: 'white',
  //     },
  //   });

  //   await page.getByRole('svg', { name: 'First step' }).hover();
  //   await expect(
  //     page.getByRole('button', {
  //       name: 'Step 1: Getting started with Carbon Design System',
  //     })
  //   ).toBeVisible();
  // });

  test('progress indicator - active state', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressIndicator',
      id: 'components-progressindicator--interactive',
      globals: {
        theme: 'white',
      },
    });
    await page.keyboard.press('Tab');
    // await expect(page.getByText('Click me')).toBeFocused();
    await expect(
      page.getByRole('paragraph', { name: 'Click me' })
    ).toBeFocutsed();

    // await page.getByRole('button', { name: 'Click me' }).click();

    // await expect(page.getByRole('alert', { name: 'Clicked' })).toBeVisible();
  });
});
