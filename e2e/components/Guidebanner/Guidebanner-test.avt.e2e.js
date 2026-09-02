/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test, expect } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Guidebanner', () => {
  test.skip('@avt-collapsible-state', async ({ page }) => {
    await visitStory(page, {
      component: 'preview__Guidebanner',
      id: 'preview-guidebanner--collapsible',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'Guidebanner @avt-collapsible-state'
    );
  });
});
