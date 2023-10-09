/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('MenuButton @avt', () => {
  test('@avt-default-state MenuButton', async ({ page }) => {
    await visitStory(page, {
      component: 'MenuButton',
      id: 'components-menubutton--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('MenuButton');
  });

  test('@avt-advanced-state MenuButton with danger', async ({ page }) => {
    await visitStory(page, {
      component: 'MenuButton',
      id: 'components-menubutton--with-danger',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('MenuButton-with-danger');
  });

  test('@avt-advanced-state MenuButton with dividers', async ({ page }) => {
    await visitStory(page, {
      component: 'MenuButton',
      id: 'components-menubutton--with-dividers',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('MenuButton-with-dividers');
  });
});
