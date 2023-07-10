/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('TextInput @avt', () => {
  test('default state', async ({ page }) => {
    await visitStory(page, {
      component: 'TextInput',
      id: 'components-textinput--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('TextInput');
  });

  test('disabled state', async ({ page }) => {
    await visitStory(page, {
      component: 'TextInput',
      id: 'components-textinput--playground',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: 'true',
      },
    });

    await expect(page.getByRole('textbox')).toBeDisabled();
    await expect(page).toHaveNoACViolations('TextInput-Disabled');
  });
});
