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

test.describe('CodeSnippet', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('inline @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'CodeSnippet',
          id: 'components-codesnippet--inline',
          theme,
        });
      });

      test('multiline @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'CodeSnippet',
          id: 'components-codesnippet--multiline',
          theme,
        });
      });

      test('singleline @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'CodeSnippet',
          id: 'components-codesnippet--singleline',
          theme,
        });
      });

      test('inline with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'CodeSnippet',
          id: 'components-codesnippet--inline-with-layer',
          theme,
        });
      });

      test('multiline with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'CodeSnippet',
          id: 'components-codesnippet--multiline-with-layer',
          theme,
        });
      });

      test('singleline with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'CodeSnippet',
          id: 'components-codesnippet--singleline-with-layer',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--inline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('CodeSnippet');
  });
});
