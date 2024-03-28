/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt CodeSnippet', () => {
  test('@avt-default-state inline', async ({ page }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--inline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('CodeSnippet inline');
  });

  test('@avt-advanced-states inline hover', async ({ page }) => {
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

  test('@avt-advanced-states inline focused', async ({ page }) => {
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
  test.skip('@avt-default-state multiline', async ({ page }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--multiline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('CodeSnippet multiline');
  });

  test('@avt-default-state singleline', async ({ page }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--singleline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('CodeSnippet singleline');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'CodeSnippet',
      id: 'components-codesnippet--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('CodeSnippet skeleton');
  });

  test('@avt-keyboard-nav inline', async ({ page }) => {
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

  test('@avt-keyboard-nav multiline', async ({ page }) => {
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
    await expect(page.getByText('Show more')).toBeHidden();
  });

  test('@avt-keyboard-nav singleline', async ({ page }) => {
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
