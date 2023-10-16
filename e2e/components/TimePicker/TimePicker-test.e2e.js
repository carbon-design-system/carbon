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

test.describe('TimePicker', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'TimePicker',
          id: 'components-timepicker--default',
          theme,
        });
      });

      test('with layer @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'TimePicker',
          id: 'components-timepicker--with-layer',
          theme,
        });
      });
    });
  });
});
