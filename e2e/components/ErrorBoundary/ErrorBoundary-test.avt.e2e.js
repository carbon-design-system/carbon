/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt ErrorBoundary', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'ErrorBoundary',
      id: 'components-errorboundary--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ErrorBoundary');
  });

  test('@avt-advanced-states with Custom context', async ({ page }) => {
    await visitStory(page, {
      component: 'ErrorBoundary',
      id: 'components-errorboundary--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'ErrorBoundary with Custom context'
    );
  });

  test('@avt-keyboard-state', async ({ page }) => {
    await visitStory(page, {
      component: 'ErrorBoundary',
      id: 'components-errorboundary--default',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: true,
      },
    });

    const errorBoundaryButton = page.getByRole('button', {
      name: 'Toggle throwing error',
    });
    const elementLocator = page.locator('div.cds--layout');

    // Testing ErrorBoundary
    await page.keyboard.press('Tab');
    await expect(errorBoundaryButton).toBeVisible();
    await expect(elementLocator).toContainText('Successfully rendered');
    await errorBoundaryButton.click();
    await expect(elementLocator).toContainText('Whoops');
  });
});
