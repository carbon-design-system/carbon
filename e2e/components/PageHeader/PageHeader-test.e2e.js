/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
const { test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshot } = require('../../test-utils/snapshot');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

// TODO update once stories are visible
test.describe('PageHeader', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test.skip('page header @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'PageHeader',
          id: 'patterns-unstable-pageheader--content',
          theme,
        });
      });
      test.skip('page header with contextual actions @vrt', async ({
        page,
      }) => {
        await snapshotStory(page, {
          component: 'PageHeader',
          id: 'patterns-unstable-pageheader--content-with-contextual-actions',
          theme,
        });
      });
      test.skip('page header with contextual actions and page actions @vrt', async ({
        page,
      }) => {
        await snapshotStory(page, {
          component: 'PageHeader',
          id: 'patterns-unstable-pageheader--content-with-contextual-actions-and-page-actions',
          theme,
        });
      });
      test.skip('page header with hero image @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'PageHeader',
          id: 'patterns-unstable-pageheader--content-with-hero-image',
          theme,
        });
      });
      test.skip('page header with icon @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'PageHeader',
          id: 'patterns-unstable-pageheader--content-with-icon',
          theme,
        });
      });
    });
  });
});
