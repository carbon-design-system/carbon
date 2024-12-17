/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('@avt IconIndicator', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'IconIndicator',
      id: 'experimental-statusindicators-unstable-iconindicator--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('IconIndicator');
  });
});
