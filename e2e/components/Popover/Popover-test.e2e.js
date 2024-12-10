/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test, expect } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshot } = require('../../test-utils/snapshot');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('Popover', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('Popover @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Popover',
          id: 'components-popover--playground',
          theme,
        });
      });

      test('Popover - isTabTip @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Popover',
          id: 'components-popover--tab-tip',
          theme,
        });
      });
      // test experimental autoAlign
      test('popover - expermental autoAlign scroll to left @vrt', async ({
        page,
      }) => {
        await visitStory(page, {
          component: 'popover',
          story: 'experimental-auto-align',
          theme,
        });
        await page.evaluate(() => {
          window.scrollBy(-500, 0); // Scroll 500px to the left
        });

        await expect
          .poll(
            async () => {
              const scrollPosition = await page.evaluate(() => {
                return window.scrollX;
              });
              return scrollPosition;
            },
            {
              timeout: 2000,
            }
          )
          .toBe(1376);

        await snapshot(page, {
          component: 'popover',
          story: 'experimental-auto-align-left',
          theme,
        });
      });

      test('popover - expermental autoAlign scroll to right @vrt', async ({
        page,
      }) => {
        await visitStory(page, {
          component: 'popover',
          story: 'experimental-auto-align',
          theme,
        });
        await page.evaluate(() => {
          window.scrollBy(500, 0); // Scroll 500px to the right
        });

        await expect
          .poll(
            async () => {
              const scrollPosition = await page.evaluate(() => {
                return window.scrollX;
              });
              return scrollPosition;
            },
            {
              timeout: 2000,
            }
          )
          .toBe(2376);

        await snapshot(page, {
          component: 'popover',
          story: 'experimental-auto-align-right',
          theme,
        });
      });

      test('popover - expermental autoAlign scroll to top @vrt', async ({
        page,
      }) => {
        await visitStory(page, {
          component: 'popover',
          story: 'experimental-auto-align',
          theme,
        });
        await page.evaluate(() => {
          window.scrollBy(0, -350); // Scroll 350px to the top
        });

        await expect
          .poll(
            async () => {
              const scrollPosition = await page.evaluate(() => {
                return window.scrollY;
              });
              return scrollPosition;
            },
            {
              timeout: 2000,
            }
          )
          .toBe(1806);

        await snapshot(page, {
          component: 'popover',
          story: 'experimental-auto-align-top',
          theme,
        });
      });

      test('popover - expermental autoAlign scroll to bottom @vrt', async ({
        page,
      }) => {
        await visitStory(page, {
          component: 'popover',
          story: 'experimental-auto-align',
          theme,
        });
        await page.evaluate(() => {
          window.scrollBy(0, 350); // Scroll 350px to the bottom
        });

        await expect
          .poll(
            async () => {
              const scrollPosition = await page.evaluate(() => {
                return window.scrollY;
              });
              return scrollPosition;
            },
            {
              timeout: 2000,
            }
          )
          .toBe(2506);

        await snapshot(page, {
          component: 'popover',
          story: 'experimental-auto-align-bottom',
          theme,
        });
      });
    });
  });
});
