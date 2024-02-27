/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt OrderedList', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'OrderedList',
      id: 'components-orderedlist--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-orderedlist--default');
  });

  test('@avt-advanced-states nested', async ({ page }) => {
    await visitStory(page, {
      component: 'OrderedList',
      id: 'components-orderedlist--nested',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-orderedlist--nested');
  });
});
