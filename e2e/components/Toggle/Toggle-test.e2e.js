/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test'); // eslint-disable-line
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook'); // eslint-disable-line

test.describe('Toggle', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Toggle',
          id: 'components-toggle--default',
          theme,
        });
      });

      test('small toggle @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Toggle',
          id: 'components-toggle--small-toggle',
          theme,
        });
      });
    });
  });

  // TODO: uncomment when https://github.com/IBMa/equal-access/issues/761 is resolved

  // test('accessibility-checker @avt', async ({ page }) => {
  //   await visitStory(page, {
  //     component: 'Toggle',
  //     id: 'components-toggle--default',
  //     globals: {
  //       theme: 'white',
  //     },
  //   });
  //   await expect(page).toHaveNoACViolations('Toggle');
  // });
});
