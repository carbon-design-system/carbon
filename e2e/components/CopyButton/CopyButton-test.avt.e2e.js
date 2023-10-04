/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('CopyButton @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'CopyButton',
      id: 'components-copybutton--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('CopyButton @avt-default-state');
  });

  test('@avt-keyboard-nav default', async ({ page }) => {
    await visitStory(page, {
      component: 'CopyButton',
      id: 'components-copybutton--default',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: true,
      },
    });
    const primaryButton = page.getByRole('button');

    // Testing CopyButton
    await expect(primaryButton).toBeVisible();
  });
});
