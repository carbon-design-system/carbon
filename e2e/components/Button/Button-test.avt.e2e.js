/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Button @avt', () => {
  test('accessibility-checker', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button');
  });

  test('accessibility-checker button danger', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--danger',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-danger');
  });

  test('accessibility-checker button ghost', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--ghost',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-ghost');
  });

  test('accessibility-checker button icon-button', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--icon-button',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-icon-button');
  });

  test('accessibility-checker button secondary', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--secondary',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-secondary');
  });

  test('accessibility-checker button set-of-buttons', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--set-of-buttons',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-set-of-buttons');
  });

  test('accessibility-checker button skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-skeleton');
  });

  test('accessibility-checker button tertiary', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--tertiary',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-tertiary');
  });

  test('accessibility-checker disabled button', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--default',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: true,
      },
    });

    await expect(page.getByRole('button')).toBeDisabled();
    await expect(page).toHaveNoACViolations('Button-disabled');
  });

  test('accessibility-checker keyboard interaction', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('button')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button')).toBeFocused();
  });

  test('accessibility-checker mouse interaction', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('button')).toBeVisible();
    await page.getByRole('button').click();
    await expect(page.getByRole('button')).toBeFocused();
  });

  test('accessibility-checker hover state', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('button')).toBeVisible();
    page.getByRole('button').hover();

    await expect(page).toHaveNoACViolations('Button-hover');
  });
});
