/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt ProgressBar', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressBar',
      id: 'components-progressbar--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ProgressBar');
  });

  test('@avt-advanced-states ProgressBar indeterminate', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressBar',
      id: 'components-progressbar--indeterminate',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ProgressBar indeterminate');
  });

  test('@avt-advanced-states ProgressBar determinate', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressBar',
      id: 'components-progressbar--determinate',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ProgressBar determinate');
  });

  test('@avt-advanced-states ProgressBar layer', async ({ page }) => {
    await visitStory(page, {
      component: 'ProgressBar',
      id: 'components-progressbar--with-layer',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ProgressBar layer');
  });
});
