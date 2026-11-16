/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

for (const direction of ['ltr', 'rtl']) {
  test.describe(`DataTable toolbar (${direction})`, () => {
    test('keeps overflowing controls reachable within the table', async ({
      page,
    }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-toolbar--persistent-toolbar',
      });
      await page.locator('html').evaluate((element, dir) => {
        element.dir = dir;
      }, direction);
      const container = page.locator('.cds--data-table-container');
      await container.evaluate((element) => {
        element.style.inlineSize = '200px';
      });

      const content = container.locator('.cds--toolbar-content');
      const search = content.getByRole('searchbox');
      const button = content.getByRole('button', { name: 'Primary Button' });
      const bounds = await content.boundingBox();

      await expect
        .poll(() => content.evaluate((element) => element.scrollWidth))
        .toBeGreaterThan(bounds.width);

      for (const control of [search, button]) {
        await control.scrollIntoViewIfNeeded();
        const controlBounds = await control.boundingBox();
        expect(controlBounds.x).toBeGreaterThanOrEqual(bounds.x - 1);
        expect(controlBounds.x + controlBounds.width).toBeLessThanOrEqual(
          bounds.x + bounds.width + 1
        );
      }

      await expect(search).toBeEditable();
      await content.getByRole('button', { name: 'Settings' }).click();
      await expect(
        page.getByRole('menuitem', { name: 'Action 1' })
      ).toBeVisible();
      await page.keyboard.press('Escape');

      // A visible scrollbar must not clip the controls vertically.
      expect(
        await content.evaluate(
          (element) => element.scrollHeight <= element.clientHeight
        )
      ).toBe(true);

      await container.evaluate((element) => {
        element.style.inlineSize = '800px';
      });
      const wideBounds = await content.boundingBox();
      const buttonBounds = await button.boundingBox();
      expect(
        await content.evaluate(
          (element) => element.scrollWidth === element.clientWidth
        )
      ).toBe(true);
      expect(wideBounds.height).toBe(48);
      if (direction === 'ltr') {
        expect(buttonBounds.x + buttonBounds.width).toBeCloseTo(
          wideBounds.x + wideBounds.width,
          0
        );
      } else {
        expect(buttonBounds.x).toBeCloseTo(wideBounds.x, 0);
      }
    });
  });
}
