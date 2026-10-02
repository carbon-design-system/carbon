/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('ContainedList action focus', () => {
  for (const dir of ['ltr', 'rtl']) {
    for (const size of ['sm', 'md', 'lg', 'xl']) {
      test(`separates primary and secondary focus in ${dir}, ${size}`, async ({
        page,
      }) => {
        await visitStory(page, {
          component: 'ContainedList',
          id: 'components-containedlist--with-interactive-items-and-actions',
          args: { size },
        });
        await page.locator('html').evaluate((element, dir) => {
          element.dir = dir;
        }, dir);
        const row = page.locator('.cds--contained-list-item').first();
        const primary = row.getByRole('button', {
          name: 'List item',
          exact: true,
        });
        const secondary = row.getByRole('button', {
          name: 'Dismiss',
          exact: true,
        });

        for (const width of [null, '7rem']) {
          if (width) {
            await secondary.evaluate((element, width) => {
              element.style.inlineSize = width;
              element.style.maxInlineSize = 'none';
            }, width);
          }
          await primary.focus();
          const bounds = await primary.boundingBox();
          const actionBounds = await secondary.boundingBox();
          const focusWidth = await primary.evaluate((element) =>
            parseFloat(getComputedStyle(element, '::after').width)
          );
          expect(focusWidth).toBeCloseTo(bounds.width, 0);
          if (dir === 'ltr') {
            expect(bounds.x + bounds.width).toBeLessThanOrEqual(
              actionBounds.x + 1
            );
          } else {
            expect(actionBounds.x + actionBounds.width).toBeLessThanOrEqual(
              bounds.x + 1
            );
          }
          await primary.press('Tab');
          await expect(secondary).toBeFocused();
          await secondary.press('Shift+Tab');
          await expect(primary).toBeFocused();
        }
      });
    }
  }
});
