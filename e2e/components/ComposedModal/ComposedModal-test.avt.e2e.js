/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test, expect } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('ComposedModal', () => {
  const testCases = [
    {
      testName: '@avt-default-state ComposedModal',
      storyId: 'components-composedmodal--default',
    },
    {
      testName: '@avt-advanced-state ComposedModal Full Width',
      storyId: 'components-composedmodal--full-width',
    },
    // Skip the test with @avt-advanced-state ComposedModal Passive Modal
    // Add more test cases if needed
  ];

  testCases.forEach((testCase) => {
    const { testName, storyId } = testCase;

    test(testName, async ({ page }) => {
      await testComposedModal(page, testName, storyId);
    });
  });

  async function testComposedModal(page, testName, storyId) {
    await visitStory(page, {
      component: 'ComposedModal',
      id: storyId,
      globals: {
        theme: 'white',
      },
    });

    // Accessibility check
    await expect(page).toHaveNoACViolations(testName);

    // Additional tests can be added here
  }
});
