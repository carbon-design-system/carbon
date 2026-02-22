/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Button', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button');
  });

  test('@avt-advanced-states danger', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--danger',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-danger');
  });

  test('@avt-advanced-states ghost', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--ghost',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-ghost');
  });

  test('@avt-advanced-states icon-button', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--icon-button',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-icon-button');
  });

  test('@avt-advanced-states icon-button with badge', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--icon-button-with-badge',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-icon-button-with-badge');
  });

  test('@avt-advanced-states secondary', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--secondary',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-secondary');
  });

  test('@avt-advanced-states set-of-buttons--default', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button-set-of-buttons--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-set-of-buttons--default');
  });

  test('@avt-advanced-states fluid set-of-buttons--fluid', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button-set-of-buttons--fluid',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-set-of-buttons--fluid');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-skeleton');
  });

  test('@avt-advanced-states tertiary', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--tertiary',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Button-tertiary');
  });

  test('@avt-advanced-states disabled', async ({ page }) => {
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

    await expect(page.getByRole('button').first()).toBeDisabled();
    await expect(page).toHaveNoACViolations('Button-disabled');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('button').first()).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button').first()).toBeFocused();
  });

  test('@avt-advanced-states mouse interaction', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('button').first()).toBeVisible();
    await page.getByRole('button').first().click();
    await expect(page.getByRole('button').first()).toBeFocused();
  });

  test('@avt-advanced-states hover state', async ({ page }) => {
    await visitStory(page, {
      component: 'Button',
      id: 'components-button--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('button').first()).toBeVisible();
    await page.getByRole('button').first().hover();

    await expect(page).toHaveNoACViolations('Button-hover');
  });
});
