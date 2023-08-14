/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Link @avt', () => {
  test('accessibility-checker default', async ({ page }) => {
    await visitStory(page, {
      component: 'Link',
      id: 'components-link--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-link--default');
  });

  test('accessibility-checker inline', async ({ page }) => {
    await visitStory(page, {
      component: 'Link',
      id: 'components-link--inline',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-link--inline');
  });

  test('accessibility-checker paired with icon', async ({ page }) => {
    await visitStory(page, {
      component: 'Link',
      id: 'components-link--paired-with-icon',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'components-link--paired-with-icon'
    );
  });
});
