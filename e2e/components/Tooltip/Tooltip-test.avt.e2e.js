/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Tooltip', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Tooltip',
      id: 'components-tooltip--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tooltip');
  });

  test('@avt-advanced-states - tooltip alignment', async ({ page }) => {
    await visitStory(page, {
      component: 'Tooltip',
      id: 'components-tooltip--alignment',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tooltip - alignment');
  });

  test('@avt-advanced-states - tooltip duration', async ({ page }) => {
    await visitStory(page, {
      component: 'Tooltip',
      id: 'components-tooltip--duration',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tooltip - duration');
  });

  test('@avt-keyboard-nav - tooltip default', async ({ page }) => {
    await visitStory(page, {
      component: 'Tooltip',
      id: 'components-tooltip--default',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByRole('button')).toBeVisible();
    // Expect tooltip to be focused
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button')).toBeFocused();
    // Expect tooltip content to be visible
    await expect(page.locator('.cds--popover-container')).toBeVisible();
  });

  test('@avt-keyboard-nav - tooltip default Escape key on hover', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Tooltip',
      id: 'components-tooltip--default',
      globals: {
        theme: 'white',
      },
    });

    const tooltipTrigger = page.getByRole('button');
    await expect(tooltipTrigger).toBeVisible();

    await tooltipTrigger.hover();

    const tooltipContent = page.getByText('Options');
    await expect(tooltipContent).toBeVisible();
    // Press ESCAPE key while hover is active
    await page.keyboard.press('Escape');
    await expect(tooltipContent).toBeHidden();
  });
});
