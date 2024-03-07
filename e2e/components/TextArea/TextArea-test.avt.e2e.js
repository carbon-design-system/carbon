/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt TextArea', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'TextArea',
      id: 'components-textarea--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('TextArea');
  });

  test('@avt-advanced-states invalid', async ({ page }) => {
    await visitStory(page, {
      component: 'TextArea',
      id: 'components-textarea--playground',
      globals: {
        theme: 'white',
      },
      args: {
        invalid: 'true',
      },
    });
    await expect(page).toHaveNoACViolations('TextArea invalid');
  });

  test('@avt-advanced-states warn', async ({ page }) => {
    await visitStory(page, {
      component: 'TextArea',
      id: 'components-textarea--playground',
      globals: {
        theme: 'white',
      },
      args: {
        warn: 'true',
      },
    });
    await expect(page).toHaveNoACViolations('TextArea warn');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'TextArea',
      id: 'components-textarea--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('TextArea skeleton');
  });

  test('@avt-keyboard-nav TextArea keyboard counter', async ({ page }) => {
    await visitStory(page, {
      component: 'TextArea',
      id: 'components-textarea--playground',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByText('0/500')).toBeVisible();
    await page.getByRole('textbox').fill('test');
    await expect(page.getByText('4/500')).toBeVisible();
    await expect(page).toHaveNoACViolations('TextArea keyboard counter');
  });
});
