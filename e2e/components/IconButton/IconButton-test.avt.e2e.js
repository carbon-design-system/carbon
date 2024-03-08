/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('@avt IconButton', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'IconButton',
      id: 'components-iconbutton--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('IconButton');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'IconButton',
      id: 'components-iconbutton--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('button')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button')).toBeFocused();
    await expect(page.getByLabel('label')).toBeVisible();
  });
});
