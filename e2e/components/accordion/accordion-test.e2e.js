/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test');
const { themes, snapshotStory } = require('../../test-utils/storybook');

test.describe('accordion @vrt', () => {
  themes.forEach((theme) => {
    test(theme, async ({ page }, testInfo) => {
      await snapshotStory(page, testInfo, {
        component: 'accordion',
        story: 'accordion-story',
        theme,
      });
    });
  });
});
