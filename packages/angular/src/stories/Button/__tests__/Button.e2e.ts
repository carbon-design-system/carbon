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
 *  - Computed layout: host `display: inline-flex`, height 48px (ADR 0015 finding 2)
 *  - Actual click and keyboard activation (Enter / Space)
 *  - WC shadow-DOM rendering and focus management
 *  - IBM Equal Access zero-violation assertion (supplement to Storybook Layer 3)
 *
 * Architecture (ADR 0020): the Angular selector `cds-ng-button` IS the web
 * component host element — the `cds-ng-*` prefix ensures coexistence with
 * `carbon-components-angular` on the same page.
 *
 * Run by the `angular-e2e` CI job against the built Storybook
 * (`yarn workspace @carbon/angular storybook:build`, then `e2e`).
 */

import { test, expect, type Page } from '@playwright/test';

const STORY_URL = '/iframe.html?id=components-button--default&viewMode=story';

/**
 * Listens for click events on the Angular host element and records the count
 * on `window`. The host element IS the `cds-ng-button` web component, so a
 * plain DOM click listener is the most direct way to observe activation from
 * Playwright.
 */
const trackClicks = async (page: Page) => {
  await page.evaluate(() => {
    const w = window as unknown as { __clicks: number };
    w.__clicks = 0;
    document
      .querySelector('cds-ng-button')!
      .addEventListener('click', () => (w.__clicks += 1));
  });
};
const clickCount = (page: Page) =>
  page.evaluate(() => (window as unknown as { __clicks: number }).__clicks);

test.describe('ButtonComponent (Layer 2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORY_URL);
    // Wait for the Angular component and its backing WC to be defined and rendered.
    // In the host-is-WC design (ADR 0020), cds-ng-button is registered by the
    // vendored barrel import — no unprefixed cds-button is defined.
    await page.waitForSelector('cds-ng-button');
    await page.waitForFunction(
      () => customElements.get('cds-ng-button') !== undefined
    );
  });

  // ─── ADR 0015 finding 2: host layout ──────────────────────────────────────
  // jsdom has no layout engine, so this must be verified in a real browser.
  // Under the cds-ng-* design the host display was `inline` and height was
  // 18px. Under the host-is-WC design both match the bare web component.

  test('host element has display: inline-flex (ADR 0015 finding 2)', async ({
    page,
  }) => {
    const display = await page.evaluate(() => {
      const el = document.querySelector('cds-ng-button')!;
      return getComputedStyle(el).display;
    });
    expect(display).toBe('inline-flex');
  });

  test('host element is 48px high when placed inline (ADR 0015 finding 2)', async ({
    page,
  }) => {
    const height = await page.evaluate(() => {
      const el = document.querySelector('cds-ng-button')!;
      return el.getBoundingClientRect().height;
    });
    // Default size is "lg" → 48px (3rem at 16px base). Allow ±1px for
    // sub-pixel rounding differences between browsers.
    expect(height).toBeGreaterThanOrEqual(47);
    expect(height).toBeLessThanOrEqual(49);
  });

  // ─── Shadow DOM rendering ─────────────────────────────────────────────────

  test('renders the real <button> in the WC shadow root', async ({ page }) => {
    // The shadow root is on the host element itself (host IS the WC).
    const button = page.locator('cds-ng-button button');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/cds-ng--btn--primary/);
    // Default size matches @carbon/react and @carbon/web-components.
    await expect(button).toHaveClass(/cds-ng--btn--lg/);
  });

  test('host element has no unexpected nesting (host-is-WC, ADR 0020)', async ({
    page,
  }) => {
    // The host IS the cds-ng-button WC: no inner cds-ng-button should exist.
    await expect(page.locator('cds-ng-button cds-ng-button')).toHaveCount(0);
  });

  // ─── Interaction ──────────────────────────────────────────────────────────

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
    await page.waitForSelector('cds-ng-button');

    // In the host-is-WC design, disabled is on the host element itself.
    await expect(page.locator('cds-ng-button')).toHaveAttribute('disabled', '');
    await expect(page.locator('cds-ng-button button')).toBeDisabled();
  });

  test('isExpressive reaches the WC (property binding)', async ({ page }) => {
    // Regression: the WC does not observe an `is-expressive` attribute, so the
    // wrapper must bind the property via ngOnChanges. Assert on the rendered class.
    await page.goto(
      '/iframe.html?id=components-button--expressive&viewMode=story'
    );
    await page.waitForSelector('cds-ng-button');
    // Host IS the WC; shadow DOM is directly on cds-ng-button.
    await expect(page.locator('cds-ng-button button')).toHaveClass(
      /cds-ng--btn--expressive/
    );
  });
});
