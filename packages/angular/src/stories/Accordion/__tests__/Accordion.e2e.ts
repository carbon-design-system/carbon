/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 2 — Playwright checks for Accordion child registration, property
 * forwarding, and event delivery.
 */

import { test, expect } from '@playwright/test';

const story = (id: string) => `/iframe.html?id=${id}&viewMode=story`;

test.describe('AccordionComponent (Layer 2)', () => {
  test('defines the accordion and its item', async ({ page }) => {
    await page.goto(story('components-accordion--default'));
    await page.waitForSelector('cds-ng-accordion-item');
    const defined = await page.evaluate(() => [
      customElements.get('cds-ng-accordion') !== undefined,
      customElements.get('cds-ng-accordion-item') !== undefined,
      customElements.get('cds-accordion-item') !== undefined,
    ]);
    expect(defined).toEqual([true, true, false]);
  });

  test('forwards open and disabled to the items', async ({ page }) => {
    await page.goto(story('components-accordion--default'));
    await page.waitForSelector('cds-ng-accordion-item');
    const items = page.locator('cds-ng-accordion-item');
    await expect(items.nth(0)).not.toHaveAttribute('open', /.*/);
    await expect(items.nth(1)).toHaveAttribute('open', '');
    await expect(items.nth(2)).toHaveAttribute('disabled', '');
  });

  test('clicking the header toggles the item', async ({ page }) => {
    await page.goto(story('components-accordion--default'));
    await page.waitForSelector('cds-ng-accordion-item');
    const first = page.locator('cds-ng-accordion-item').first();
    await first.locator('button').click();
    await expect(first).toHaveAttribute('open', '');
  });

  test('toggle fires the DOM event once; reports whether the @Output fires', async ({
    page,
  }) => {
    await page.goto(story('components-accordion--events'));
    await page.waitForSelector('cds-ng-accordion-item');
    await page.locator('cds-ng-accordion-item button').click();
    await expect(page.getByTestId('dom-count')).toHaveText('1');
    // The generated `accordionItemToggled` @Output must fire once as well, not
    // twice and not zero times.
    await expect(page.getByTestId('output-count')).toHaveText('1');
  });
});
