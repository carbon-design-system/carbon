/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('CodeSnippet @avt', () => {
  test('accessibility-checker CodeSnippet inline', async ({ page }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--inline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('CodeSnippet inline');
  });

  test('accessibility-checker CodeSnippet inline hover @avt', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--inline',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByRole('button')).toBeVisible();
    page.getByRole('button').hover();
    await expect(page).toHaveNoACViolations('CodeSnippet inline hover');
  });

  test('accessibility-checker CodeSnippet inline focused @avt', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--inline',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByRole('button')).toBeVisible();
    page.getByRole('button').focus();
    await expect(page).toHaveNoACViolations('CodeSnippet inline focused');
  });

  // Skipping due to a11y violation issue #14237
  test.skip('accessibility-checker CodeSnippet multiline @avt', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--multiline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('CodeSnippet multiline');
  });

  test('accessibility-checker CodeSnippet singleline @avt', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--singleline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('CodeSnippet singleline');
  });

  test('accessibility-checker CodeSnippet skeleton @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('CodeSnippet skeleton');
  });
});
