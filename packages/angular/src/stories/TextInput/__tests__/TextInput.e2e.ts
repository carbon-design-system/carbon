/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Layer 2 — Playwright checks for the generated `ControlValueAccessor` and
 * named-slot projection on TextInputComponent. jsdom cannot cover these: the
 * value lives on the web component and changes through real `input` events
 * from its shadow root.
 */

import { test, expect } from '@playwright/test';

const story = (id: string) => `/iframe.html?id=${id}&viewMode=story`;

test.describe('TextInputComponent (Layer 2)', () => {
  test.describe('ngModel', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(story('components-textinput--ng-model'));
      await page.waitForSelector('cds-ng-text-input');
    });

    test('writes the model value to the web component', async ({ page }) => {
      await expect(page.locator('cds-ng-text-input input')).toHaveValue(
        'initial'
      );
    });

    test('typing updates the model', async ({ page }) => {
      await page.locator('cds-ng-text-input input').fill('typed');
      await expect(page.getByTestId('model')).toHaveText('typed');
    });
  });

  test.describe('reactive forms', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(story('components-textinput--reactive-form'));
      await page.waitForSelector('cds-ng-text-input');
    });

    test('typing updates the FormControl', async ({ page }) => {
      await page.locator('cds-ng-text-input input').fill('typed');
      await expect(page.getByTestId('value')).toHaveText('typed');
    });

    test('setValue reaches the input', async ({ page }) => {
      await page.getByTestId('set').click();
      await expect(page.locator('cds-ng-text-input input')).toHaveValue(
        'programmatic'
      );
    });

    test('disable and enable reach the input', async ({ page }) => {
      await page.getByTestId('disable').click();
      await expect(page.locator('cds-ng-text-input input')).toBeDisabled();
      await page.getByTestId('enable').click();
      await expect(page.locator('cds-ng-text-input input')).toBeEnabled();
    });

    test('leaving the field marks the control touched', async ({ page }) => {
      await expect(page.getByTestId('touched')).toHaveText('false');
      await page.locator('cds-ng-text-input input').focus();
      await page.getByTestId('set').focus();
      await expect(page.getByTestId('touched')).toHaveText('true');
    });
  });

  test('projects named slots into the shadow root', async ({ page }) => {
    await page.goto(story('components-textinput--slots'));
    await page.waitForSelector('cds-ng-text-input');
    await expect(page.getByTestId('label-slot')).toBeVisible();
    await expect(page.getByTestId('helper-slot')).toBeVisible();

    const assigned = await page.evaluate(() => {
      const host = document.querySelector('cds-ng-text-input')!;
      const names = (name: string) =>
        (
          host.shadowRoot!.querySelector(
            `slot[name="${name}"]`
          ) as HTMLSlotElement
        )
          .assignedElements()
          .map((el) => el.getAttribute('data-testid'));
      return {
        label: names('label-text'),
        helper: names('helper-text'),
      };
    });
    expect(assigned).toEqual({
      label: ['label-slot'],
      helper: ['helper-slot'],
    });
  });
});
