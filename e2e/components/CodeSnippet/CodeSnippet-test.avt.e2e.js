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

  test('accessibility-checker CodeSnippet multiline @avt', async ({ page }) => {
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

  test('accessibility-checker CodeSnippet inline keyboard nav', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--inline',
      globals: {
        theme: 'white',
      },
    });

    // Checking the code button
    await expect(page.getByRole('button')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button')).toBeFocused();

    // Checking the copy button
    await page.keyboard.press('Enter');
    await expect(page.getByRole('tooltip')).toHaveText('Copied to clipboard');
  });

  test('accessibility-checker CodeSnippet multiline keyboard nav', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--multiline',
      globals: {
        theme: 'white',
      },
    });

    // Checking the code button
    await expect(page.getByRole('textbox')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('textbox')).toBeFocused();

    // Checking the copy button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('tooltip')).toHaveText('Copied to clipboard');

    // Checking show more toggle
    await expect(page.getByText('Show more')).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByText('Show less')).toBeVisible();
    await expect(page.getByText('Show more')).not.toBeVisible();
  });

  test('accessibility-checker CodeSnippet singleline keyboard nav', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--singleline',
      globals: {
        theme: 'white',
      },
    });
    // Checking the code button
    await expect(page.getByRole('textbox')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('textbox')).toBeFocused();

    // Checking the copy button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('tooltip')).toHaveText('Copied to clipboard');

    // Checking the Arrow navigation
    await page.keyboard.press('Shift+Tab');

    await expect(
      page.locator('div.cds--snippet__overflow-indicator--right')
    ).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(
      page.locator('div.cds--snippet__overflow-indicator--left')
    ).toBeVisible();
  });
});
