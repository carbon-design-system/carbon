/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Toggle @avt', () => {
  test('accessibility-checker', async ({ page }) => {
    await visitStory(page, {
      component: 'Toggle',
      id: 'components-toggle--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Toggle');
  });

  test('accessibility-checker skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-toggle--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Toggle-skeleton');
  });

  test('accessibility-checker small toggle', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-toggle--small-toggle',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Toggle-small');
  });

  test('accessibility-checker with accessible labels', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-toggle--with-accessible-labels',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Toggle-accessible-labels');
  });

  test('default Toggle state - keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-toggle--default',
      globals: {
        theme: 'white',
      },
    });
    await page.keyboard.press('Tab');
    await expect(page.getByRole('switch')).toBeVisible();
    await page.keyboard.press('Space');
    await page.getByText('Off');
    await page.keyboard.press('Space');
    await page.getByText('On');
  });
});
