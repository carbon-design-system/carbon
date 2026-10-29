/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 2 — Playwright checks for the Dropdown `ControlValueAccessor`, which
 * is driven by `cds-ng-dropdown-selected`, with slotted `cds-ng-dropdown-item`
 * children.
 */

import { test, expect } from '@playwright/test';

test.describe('DropdownComponent (Layer 2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-dropdown--reactive-form&viewMode=story'
    );
    await page.waitForSelector('cds-ng-dropdown');
  });

  test('registers the child item element', async ({ page }) => {
    expect(
      await page.evaluate(
        () => customElements.get('cds-ng-dropdown-item') !== undefined
      )
    ).toBe(true);
  });

  test('writes the initial control value to the web component', async ({
    page,
  }) => {
    const value = await page.evaluate(
      () => (document.querySelector('cds-ng-dropdown') as any).value
    );
    expect(value).toBe('1.1');
  });

  test('setValue selects the matching item', async ({ page }) => {
    await page.getByTestId('set').click();
    const value = await page.evaluate(
      () => (document.querySelector('cds-ng-dropdown') as any).value
    );
    expect(value).toBe('1.2');
  });

  test('selecting an item updates the FormControl', async ({ page }) => {
    await page.locator('cds-ng-dropdown').getByRole('combobox').click();
    await page.locator('cds-ng-dropdown-item[value="1.0"]').click();
    await expect(page.getByTestId('value')).toHaveText('1.0');
  });
});
