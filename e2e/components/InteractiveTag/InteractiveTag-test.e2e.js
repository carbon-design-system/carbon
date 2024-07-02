/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { test } from '@playwright/test';
import { themes } from '../../test-utils/env';
import { snapshotStory } from '../../test-utils/storybook';

test.describe('InteractiveTag', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('DismissibleTag @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'DismissibleTag',
          id: 'experimental-unstable-interactivetag--dismissible',
          theme,
        });
      });

      test('OperationalTag @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'OperationalTag',
          id: 'experimental-unstable-interactivetag--operational',
          theme,
        });
      });

      test('SelectableTag @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'SelectableTag',
          id: 'experimental-unstable-interactivetag--selectable',
          theme,
        });
      });
    });
  });
});
