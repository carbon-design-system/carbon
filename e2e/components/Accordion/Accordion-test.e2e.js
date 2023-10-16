/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { themes } from '../../test-utils/env';
import { snapshotStory } from '../../test-utils/storybook';
import { test } from '@playwright/test';

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
