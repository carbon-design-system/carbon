/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Modal long strings', () => {
  [320, 1280].forEach((width) => {
    ['xs', 'sm', 'md', 'lg'].forEach((size) => {
      test(`wraps without horizontal overflow at ${width}px with size ${size}`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 900 });
        await visitStory(page, {
          component: 'modal',
          story: 'with-long-strings',
          args: { size },
        });

        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.locator('.cds--modal-container')).toHaveClass(
          new RegExp(`cds--modal-container--${size}`)
        );

        for (const selector of [
          '.cds--modal-container',
          '.cds--modal-header',
          '.cds--modal-header__label',
          '.cds--modal-header__heading',
          '.cds--modal-content',
        ]) {
          const element = page.locator(selector);
          await expect(element).toBeVisible();
          await expect
            .poll(async () => {
              return element.evaluate((node) => {
                return node.scrollWidth - node.clientWidth;
              });
            })
            .toBeLessThanOrEqual(1);
        }
      });
    });
  });
});
