/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 2 — Playwright checks for the Checkbox `ControlValueAccessor`, which
 * is bound to `checked` and driven by `cds-ng-checkbox-changed`.
 */

import { test, expect } from '@playwright/test';

const story = (id: string) => `/iframe.html?id=${id}&viewMode=story`;

test.describe('CheckboxComponent (Layer 2)', () => {
  test('ngModel: clicking updates the model', async ({ page }) => {
    await page.goto(story('components-checkbox--ng-model'));
    await page.waitForSelector('cds-ng-checkbox');
    await expect(page.getByTestId('model')).toHaveText('false');
    await page.locator('cds-ng-checkbox label').click();
    await expect(page.getByTestId('model')).toHaveText('true');
    await page.locator('cds-ng-checkbox label').click();
    await expect(page.getByTestId('model')).toHaveText('false');
  });

  test.describe('reactive forms', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(story('components-checkbox--reactive-form'));
      await page.waitForSelector('cds-ng-checkbox');
    });

    test('writes the initial value to the web component', async ({ page }) => {
      await expect(page.locator('cds-ng-checkbox input')).toBeChecked();
    });

    test('setValue reaches the input', async ({ page }) => {
      await page.getByTestId('set').click();
      await expect(page.locator('cds-ng-checkbox input')).not.toBeChecked();
    });

    test('disable reaches the input', async ({ page }) => {
      await page.getByTestId('disable').click();
      await expect(page.locator('cds-ng-checkbox input')).toBeDisabled();
    });
  });
});
