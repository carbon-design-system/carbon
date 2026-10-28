/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 2 — Playwright checks for ActionSet: slotted-button reordering
 * (`slotchange`), the `actions` property, and stacking.
 */

import { test, expect } from '@playwright/test';

const story = (id: string) => `/iframe.html?id=${id}&viewMode=story`;

test.describe('ActionSetComponent (Layer 2)', () => {
  test('orders slotted buttons and styles them via slotchange', async ({
    page,
  }) => {
    await page.goto(story('utilities-actionset--slotted-buttons'));
    await page.waitForSelector('cds-ng-action-set cds-ng-button');
    await expect(
      page.locator(
        'cds-ng-action-set cds-ng-button.cds-ng--action-set__action-button'
      )
    ).toHaveCount(3);
    await expect(
      page.locator('cds-ng-button.cds-ng--action-set__action-button--ghost')
    ).toHaveCount(1);
  });

  test('renders buttons from the actions property', async ({ page }) => {
    await page.goto(story('utilities-actionset--actions-property'));
    await page.waitForSelector('cds-ng-action-set');
    const buttons = page.locator('cds-ng-action-set cds-ng-button');
    await expect(buttons).toHaveCount(2);
    // Sorted: secondary first, primary last (row layout at size lg).
    await expect(buttons.nth(0)).toHaveAttribute('kind', 'secondary');
    await expect(buttons.nth(1)).toHaveAttribute('kind', 'primary');
  });

  test('stacks three buttons at md, and disableStacking prevents it', async ({
    page,
  }) => {
    await page.goto(story('utilities-actionset--stacking'));
    await page.waitForSelector('cds-ng-action-set');
    const stacked = page.getByTestId('stacked');
    const unstacked = page.getByTestId('unstacked');
    await expect(stacked.locator('cds-ng-button')).toHaveCount(3);
    expect(await stacked.evaluate((el: any) => el.stacked)).toBe(true);
    expect(await unstacked.evaluate((el: any) => el.stacked)).toBe(false);
  });

  // Browser coverage for the `_hideSiblingMargin` parity tests that jsdom cannot
  // run (`:focus-within` and `blur()`): "removes hide-margin when focus is lost"
  // and "works with actions prop rendered buttons".
  test('hides margin on the focused button and its next sibling, and clears it on blur', async ({
    page,
  }) => {
    await page.goto(story('utilities-actionset--slotted-buttons'));
    await page.waitForSelector('cds-ng-action-set cds-ng-button');
    const buttons = page.locator('cds-ng-action-set cds-ng-button');
    await buttons.nth(0).focus();
    await expect(buttons.nth(0)).toHaveAttribute('hide-margin', '');
    await expect(buttons.nth(1)).toHaveAttribute('hide-margin', '');
    await expect(buttons.nth(2)).not.toHaveAttribute('hide-margin', '');
    await buttons.nth(0).evaluate((el: HTMLElement) => el.blur());
    await expect(buttons.nth(0)).not.toHaveAttribute('hide-margin', '');
    await expect(buttons.nth(1)).not.toHaveAttribute('hide-margin', '');
  });

  test('hides margin for buttons rendered by the actions property', async ({
    page,
  }) => {
    await page.goto(story('utilities-actionset--actions-property'));
    await page.waitForSelector('cds-ng-action-set');
    const buttons = page.locator('cds-ng-action-set cds-ng-button');
    await buttons.nth(0).focus();
    await expect(buttons.nth(0)).toHaveAttribute('hide-margin', '');
    await expect(buttons.nth(1)).toHaveAttribute('hide-margin', '');
  });
});
