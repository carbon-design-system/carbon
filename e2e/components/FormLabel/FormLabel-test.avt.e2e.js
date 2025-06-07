/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt FormLabel', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FormLabel',
      id: 'components-formlabel--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FormLabel');
  });

  test('@avt-advanced-states FormLabel with toggletip', async ({ page }) => {
    await visitStory(page, {
      component: 'FormLabel',
      id: 'components-formlabel--with-toggletip',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FormLabel-with-toggletip');
  });

  test('@avt-keyboard-nav FormLabel with toggletip', async ({ page }) => {
    await visitStory(page, {
      component: 'FormLabel',
      id: 'components-formlabel--with-toggletip',
      globals: {
        theme: 'white',
      },
    });

    await expect(page.getByText('Form label with toggletip')).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(
      page
        .getByText(
          'This can be used to provide more information about a field.'
        )
        .last()
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(
      page
        .getByText(
          'This can be used to provide more information about a field.'
        )
        .last()
    ).toBeHidden();
  });
});
