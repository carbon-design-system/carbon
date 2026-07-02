/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt AILabel', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'AILabel',
      id: 'components-ailabel--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('AILabel');
  });

  test('@avt-advanced-states open state', async ({ page }) => {
    await visitStory(page, {
      component: 'AILabel',
      id: 'components-ailabel--default',
      globals: {
        theme: 'white',
      },
    });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveNoACViolations('AILabel-open');
  });

  test('@avt-advanced-states ai form', async ({ page }) => {
    await visitStory(page, {
      component: 'AILabel',
      id: 'components-form--with-ai-label',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('AILabel-form');
  });

  test('@avt-default-state inline', async ({ page }) => {
    await visitStory(page, {
      component: 'AILabel',
      id: 'components-ailabel--inline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('AILabel-inline');
  });

  test('@avt-default-state inline with content', async ({ page }) => {
    await visitStory(page, {
      component: 'AILabel',
      id: 'components-ailabel--inline-with-content',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('AILabel-inline-with-content');
  });
});
