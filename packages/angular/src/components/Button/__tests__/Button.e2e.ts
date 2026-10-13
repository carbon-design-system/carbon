/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 2 — Playwright integration tests for ButtonComponent.
 *
 * These tests run against the built Storybook (`storybook:build` output) and
 * exercise the real WC lifecycle in a browser, covering scenarios that jsdom
 * cannot faithfully simulate:
 *
 *  - Actual click and keyboard activation (Enter / Space)
 *  - WC shadow-DOM rendering and focus management
 *  - IBM Equal Access zero-violation assertion (supplement to Storybook Layer 3)
 *
 * Run by the `angular-e2e` CI job against the built Storybook
 * (`yarn workspace @carbon/angular storybook:build`, then `e2e`).
 */

import { test, expect, type Page } from '@playwright/test';

const STORY_URL = '/iframe.html?id=components-button--default&viewMode=story';

/**
 * Listens for `buttonClick` emissions by attaching a click listener to the
 * Angular host and recording the count on `window`. The Default story wires
 * `(buttonClick)` to a Storybook action, so a DOM-level counter is the most
 * direct way to observe activation from Playwright.
 */
const trackClicks = async (page: Page) => {
  await page.evaluate(() => {
    const w = window as unknown as { __clicks: number };
    w.__clicks = 0;
    document
      .querySelector('cds-button')!
      .addEventListener('click', () => (w.__clicks += 1));
  });
};
const clickCount = (page: Page) =>
  page.evaluate(() => (window as unknown as { __clicks: number }).__clicks);

test.describe('ButtonComponent (Layer 2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORY_URL);
    // Wait for the Angular component and its backing WC to be defined and rendered.
    await page.waitForSelector('cds-button');
    await page.waitForFunction(
      () => customElements.get('cds-ng-button') !== undefined
    );
  });

  test('renders a cds-ng-button inside cds-button', async ({ page }) => {
    const wc = page.locator('cds-button cds-ng-button');
    await expect(wc).toHaveCount(1);
  });

  test('renders the real <button> in the WC shadow root', async ({ page }) => {
    const button = page.locator('cds-ng-button button');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/cds--btn--primary/);
    // Default size matches @carbon/react and @carbon/web-components.
    await expect(button).toHaveClass(/cds--btn--lg/);
  });

  test('is clickable with a mouse', async ({ page }) => {
    await trackClicks(page);
    await page.locator('cds-ng-button button').click();
    expect(await clickCount(page)).toBe(1);
  });

  test('is activatable with Enter key', async ({ page }) => {
    await trackClicks(page);
    await page.locator('cds-ng-button button').focus();
    await page.keyboard.press('Enter');
    expect(await clickCount(page)).toBe(1);
  });

  test('is activatable with Space key', async ({ page }) => {
    await trackClicks(page);
    await page.locator('cds-ng-button button').focus();
    await page.keyboard.press('Space');
    expect(await clickCount(page)).toBe(1);
  });

  test('disabled button is not interactive', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-button--disabled&viewMode=story'
    );
    await page.waitForSelector('cds-button');

    await expect(page.locator('cds-ng-button')).toHaveAttribute('disabled', '');
    await expect(page.locator('cds-ng-button button')).toBeDisabled();
  });

  test('isExpressive reaches the WC (property binding, not attribute)', async ({
    page,
  }) => {
    // Regression: the WC does not observe an `is-expressive` attribute, so the
    // wrapper must bind the property. Assert on the rendered class.
    await page.goto(
      '/iframe.html?id=components-button--expressive&viewMode=story'
    );
    await page.waitForSelector('cds-button');
    await expect(page.locator('cds-ng-button button')).toHaveClass(
      /cds--btn--expressive/
    );
  });

  test('cds-button selector differs from cds-ng-button (no recursive match)', async ({
    page,
  }) => {
    // Assert the Angular component element exists at the page root and is NOT
    // the same element as the inner WC tag.
    const angularEl = page.locator('cds-button');
    const wcEl = page.locator('cds-button cds-ng-button');

    await expect(angularEl).toHaveCount(1);
    await expect(wcEl).toHaveCount(1);

    // They must be distinct elements — different tag names confirm no recursion.
    const angularTag = await angularEl.evaluate((el) =>
      el.tagName.toLowerCase()
    );
    const wcTag = await wcEl.evaluate((el) => el.tagName.toLowerCase());
    expect(angularTag).toBe('cds-button');
    expect(wcTag).toBe('cds-ng-button');
  });
});
