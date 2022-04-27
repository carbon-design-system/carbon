/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const snapshot = require('@percy/playwright');
const { test } = require('@playwright/test');
const { themes, visitStory } = require('../../test-utils/storybook');

test.describe('accordion', () => {
  themes.forEach((theme) => {
    test(theme, async ({ page }, testInfo) => {
      await visitStory(page, {
        component: 'accordion',
        story: 'accordion-story',
        globals: {
          theme,
        },
      });
      const id = [
        testInfo.project.name,
        theme,
        'component',
        'accordion',
        testInfo.snapshotSuffix,
      ].join('.');
      await snapshot(page, id);
    });
  });
});
