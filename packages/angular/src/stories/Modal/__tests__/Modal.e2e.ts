/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 2 — Playwright checks for Modal child registration (ADR 0020
 * verification 3), `ModalFooter.hasThreeButtons`, the close button, and event
 * delivery.
 */

import { test, expect } from '@playwright/test';

const story = (id: string) => `/iframe.html?id=${id}&viewMode=story`;

test.describe('ModalComponent (Layer 2)', () => {
  test('defines the modal and every child, and no unprefixed tag', async ({
    page,
  }) => {
    await page.goto(story('components-modal--two-buttons'));
    await page.waitForSelector('cds-ng-modal');
    const tags = [
      'cds-ng-modal',
      'cds-ng-dialog',
      'cds-ng-modal-header',
      'cds-ng-modal-body',
      'cds-ng-modal-footer',
      'cds-ng-modal-footer-button',
      'cds-ng-modal-close-button',
    ];
    const result = await page.evaluate(
      (names) =>
        Object.fromEntries(
          names.map((n) => [n, customElements.get(n) !== undefined])
        ),
      tags
    );
    expect(result).toEqual(Object.fromEntries(tags.map((t) => [t, true])));
    expect(
      await page.evaluate(() => customElements.get('cds-modal') === undefined)
    ).toBe(true);
  });

  test('opens and renders styled content', async ({ page }) => {
    await page.goto(story('components-modal--two-buttons'));
    await page.waitForSelector('cds-ng-modal');
    await expect(page.locator('cds-ng-modal')).toHaveAttribute('open', '');
    await expect(page.locator('cds-ng-modal-heading')).toBeVisible();
    await expect(
      page.locator('cds-ng-modal-footer-button').first()
    ).toBeVisible();
    const box = await page.locator('cds-ng-modal-footer').boundingBox();
    expect(box!.height).toBeGreaterThan(0);
  });

  test('hasThreeButtons is false for two buttons', async ({ page }) => {
    await page.goto(story('components-modal--two-buttons'));
    await page.waitForSelector('cds-ng-modal-footer');
    await expect(page.locator('cds-ng-modal-footer')).not.toHaveAttribute(
      'has-three-buttons',
      /.*/
    );
  });

  test('hasThreeButtons is true for three buttons', async ({ page }) => {
    await page.goto(story('components-modal--three-buttons'));
    await page.waitForSelector('cds-ng-modal-footer');
    await expect(page.locator('cds-ng-modal-footer')).toHaveAttribute(
      'has-three-buttons',
      ''
    );
  });

  test('the close button closes the modal and fires the DOM event and the @Output once each', async ({
    page,
  }) => {
    await page.goto(story('components-modal--two-buttons'));
    await page.waitForSelector('cds-ng-modal');
    await page.locator('cds-ng-modal-close-button').click();
    await expect(page.locator('cds-ng-modal')).not.toHaveAttribute(
      'open',
      /.*/
    );
    await expect(page.getByTestId('dom-count')).toHaveText('1');
    // The generated `modalClosed` @Output must fire once as well.
    await expect(page.getByTestId('output-count')).toHaveText('1');
  });
});
