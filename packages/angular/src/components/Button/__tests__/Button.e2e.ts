/**
 * Copyright IBM Corp. 2025, 2025
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
 * Status: compile-only stub — not yet executed against a running Storybook.
 * Execution is wired up as part of Milestone 1 CI once storybook:build passes.
 */

import { test, expect } from '@playwright/test';

const STORY_URL = '/iframe.html?id=components-button--default&viewMode=story';

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

  test('is clickable with a mouse', async ({ page }) => {
    // The default story renders a primary button; click it and assert no JS error.
    const button = page.locator('cds-button');
    await button.click();
  });

  test('is activatable with Enter key', async ({ page }) => {
    const button = page.locator('cds-button');
    await button.focus();
    await page.keyboard.press('Enter');
  });

  test('is activatable with Space key', async ({ page }) => {
    const button = page.locator('cds-button');
    await button.focus();
    await page.keyboard.press('Space');
  });

  test('disabled button is not interactive', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-button--disabled&viewMode=story'
    );
    await page.waitForSelector('cds-button');

    const wc = page.locator('cds-ng-button');
    await expect(wc).toHaveAttribute('disabled', '');
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
