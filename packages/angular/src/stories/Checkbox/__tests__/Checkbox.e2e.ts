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

import { test, expect, type Page } from '@playwright/test';

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

  // Browser coverage for the WC `checkbox-form-test.js` tests (listed as
  // `it.todo` in CheckboxForm.parity.spec.ts because jsdom has no form
  // association). Titles match the WC tests.
  test.describe('form association', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(story('components-checkbox--form-association'));
      await page.waitForSelector('cds-ng-checkbox');
    });

    const entries = (page: Page, id: string) =>
      page
        .getByTestId(id)
        .evaluate((form: HTMLFormElement) =>
          [...new FormData(form)].map(([k, v]) => `${k}=${v}`).join('|')
        );

    test('should submit its value when checked', async ({ page }) => {
      expect(await entries(page, 'checked')).toBe('a=v');
    });

    test('should default the submitted value to `on`', async ({ page }) => {
      expect(await entries(page, 'default-value')).toBe('a=on');
    });

    test('should submit nothing when unchecked or disabled', async ({
      page,
    }) => {
      expect(await entries(page, 'unchecked-or-disabled')).toBe('');
    });

    test('should submit exactly one entry, not one per mechanism', async ({
      page,
    }) => {
      const count = await page
        .getByTestId('checked')
        .evaluate((form: HTMLFormElement) => [...new FormData(form)].length);
      expect(count).toBe(1);
    });

    test('should submit under a name set as a property', async ({ page }) => {
      const result = await page
        .getByTestId('name-property')
        .evaluate((form: HTMLFormElement) => {
          (form.querySelector('cds-ng-checkbox') as any).name = 'viaProperty';
          return [...new FormData(form)].map(([k, v]) => `${k}=${v}`).join('|');
        });
      expect(result).toBe('viaProperty=v');
    });

    test('should keep the submitted value in step synchronously', async ({
      page,
    }) => {
      const result = await page
        .getByTestId('sync')
        .evaluate((form: HTMLFormElement) => {
          (form.querySelector('cds-ng-checkbox') as any).checked = true;
          // No await: a native control is never stale.
          return [...new FormData(form)].map(([k, v]) => `${k}=${v}`).join('|');
        });
      expect(result).toBe('a=v');
    });

    test('should appear in form.elements', async ({ page }) => {
      const result = await page
        .getByTestId('elements')
        .evaluate((form: HTMLFormElement) => {
          const el = form.querySelector('cds-ng-checkbox') as any;
          return {
            inElements: [...form.elements].includes(el),
            sameForm: el.form === form,
          };
        });
      expect(result).toEqual({ inElements: true, sameForm: true });
    });

    test('should associate with a <label for>', async ({ page }) => {
      const result = await page
        .getByTestId('label-for')
        .evaluate((form: HTMLFormElement) => {
          const el = form.querySelector('cds-ng-checkbox') as any;
          const label = form.querySelector('#lbl-label-for') as any;
          return {
            control: label.control === el,
            labels: [...el.labels].includes(label),
          };
        });
      expect(result).toEqual({ control: true, labels: true });
    });

    test('should restore the default checked state on form.reset()', async ({
      page,
    }) => {
      const result = await page
        .getByTestId('reset')
        .evaluate((form: HTMLFormElement) => {
          const [a, b] = Array.from(
            form.querySelectorAll('cds-ng-checkbox')
          ) as any[];
          a.checked = false;
          b.checked = true;
          form.reset();
          return {
            a: a.checked,
            b: b.checked,
            entries: [...new FormData(form)]
              .map(([k, v]) => `${k}=${v}`)
              .join('|'),
          };
        });
      expect(result).toEqual({ a: true, b: false, entries: 'a=v' });
    });

    test('should not submit from inside a disabled fieldset', async ({
      page,
    }) => {
      expect(await entries(page, 'fieldset-submit')).toBe('');
    });

    test('should distinguish its own disabled state from an ancestor fieldset', async ({
      page,
    }) => {
      const result = await page
        .getByTestId('fieldset-state')
        .evaluate(async (form: HTMLFormElement) => {
          const [a, b] = Array.from(
            form.querySelectorAll('cds-ng-checkbox')
          ) as any[];
          await a.updateComplete;
          const before = {
            aDisabled: a.disabled,
            bDisabled: b.disabled,
            aMatches: a.matches(':disabled'),
            bMatches: b.matches(':disabled'),
          };
          (form.querySelector('fieldset') as HTMLFieldSetElement).disabled =
            false;
          await a.updateComplete;
          await b.updateComplete;
          return {
            before,
            after: {
              aMatches: a.matches(':disabled'),
              bMatches: b.matches(':disabled'),
            },
          };
        });
      expect(result.before).toEqual({
        aDisabled: false,
        bDisabled: true,
        aMatches: true,
        bMatches: true,
      });
      expect(result.after).toEqual({ aMatches: false, bMatches: true });
    });

    test('should report a valid state', async ({ page }) => {
      const result = await page
        .getByTestId('validity')
        .evaluate((form: HTMLFormElement) => ({
          valid: (form.querySelector('cds-ng-checkbox') as any).validity.valid,
          form: form.checkValidity(),
        }));
      expect(result).toEqual({ valid: true, form: true });
    });
  });
});
