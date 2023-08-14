/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { themes } = require('../../test-utils/env');
const { snapshotStory } = require('../../test-utils/storybook');

test.describe('accordion', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('snapshot @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'accordion',
          story: 'default',
          theme,
        });
      });
    });
  });
});
