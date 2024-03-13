/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('@avt Tag', () => {
  test('@avt-default-state Tag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'components-tag--read-only',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tag');
  });

  test('@avt-advanced-states Tag skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'components-tag--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tag-skeleton');
  });
});
