/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/checkbox/__tests__/checkbox-test.js
 *          (see also CheckboxGroup.parity.spec.ts, CheckboxForm.parity.spec.ts and
 *          CheckboxSkeleton.parity.spec.ts for the other three WC test files)
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 *
 * Each `it` keeps the WC test's title verbatim. The WC test renders
 * `<cds-checkbox ...>` with open-wc `fixture(html\`...\`)`. This test renders
 * the Angular `<cds-ng-checkbox>` wrapper. Under ADR 0015 and ADR 0020 the host element IS the
 * cds-ng-checkbox web component — assertions run against the shadow DOM of the `cds-ng-*` host
 * elements directly.
 *
 * Ported 1:1 unless noted. Tests that cannot run in jsdom are `it.todo` with
 * a reason. AI-Label / slug slot tests are `it.todo` (require AiLabelComponent).
 */

import { CheckboxComponent } from '@carbon/angular/checkbox';
import { render } from '../../../testing/render';

const imports = [CheckboxComponent];

/** The cds-ng-checkbox host element. */
const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-checkbox') as HTMLElement & {
    shadowRoot: ShadowRoot;
    updateComplete: Promise<void>;
  };

describe('cds-ng-checkbox (parity with web-components checkbox-test.js)', () => {
  it('should render', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox>Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    expect(wc(fixture.nativeElement)).toBeTruthy();
  });

  it('should set the `id` on the <input> element', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox id="test"></cds-ng-checkbox>`,
      imports
    );
    const input = wc(fixture.nativeElement).shadowRoot.querySelector('input');
    expect(input?.getAttribute('id')).toBe('test');
  });

  it('should label the input by the given label-text', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox>test label</cds-ng-checkbox>`,
      imports
    );
    expect(wc(fixture.nativeElement).textContent?.trim()).toBe('test label');
  });

  it('should use default-checked to set the default value of the checkbox', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox default-checked>Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    expect(wc(fixture.nativeElement).hasAttribute('checked')).toBe(true);
  });

  it('should disable the <input> if disabled is provided as an attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [disabled]="true">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const input = wc(fixture.nativeElement).shadowRoot.querySelector('input');
    expect(input?.hasAttribute('disabled')).toBe(true);
  });

  it('should set checked on the checkbox if checked is provided as a prop', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [checked]="true">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    expect(wc(fixture.nativeElement).hasAttribute('checked')).toBe(true);
  });

  it('should set checked on the checkbox if checked is provided as a prop (unchecked case)', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox>Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    expect(wc(fixture.nativeElement).hasAttribute('checked')).toBe(false);
  });

  it('should hide the label if hide-label is provided as an attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [hideLabel]="true">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const labelSpan = wc(fixture.nativeElement).shadowRoot.querySelector(
      'label span'
    );
    expect(labelSpan?.classList.contains('cds-ng--visually-hidden')).toBe(true);
  });

  it('should render helper-text', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox helperText="Helper text">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const helper = wc(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form__helper-text'
    );
    expect(helper).toBeTruthy();
    expect(helper?.textContent?.trim()).toBe('Helper text');
  });

  it('should display helper-text when invalid is true but disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [disabled]="true" [invalid]="true" helperText="Helper text">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const helper = wc(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form__helper-text'
    );
    expect(helper).toBeTruthy();
    expect(helper?.textContent?.trim()).toBe('Helper text');
  });

  it('should set data-invalid when invalid attribute is true', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [invalid]="true">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const input = wc(fixture.nativeElement).shadowRoot.querySelector('input');
    expect(input?.hasAttribute('data-invalid')).toBe(true);
  });

  it('should not set data-invalid when invalid attribute is true but readOnly', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [readonly]="true" [invalid]="true">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const input = wc(fixture.nativeElement).shadowRoot.querySelector('input');
    expect(input?.hasAttribute('data-invalid')).toBe(false);
  });

  it('should not set data-invalid when invalid attribute is true but disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [disabled]="true" [invalid]="true">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const input = wc(fixture.nativeElement).shadowRoot.querySelector('input');
    expect(input?.hasAttribute('data-invalid')).toBe(false);
  });

  it('should display invalid-text if invalid prop is true', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [invalid]="true" invalidText="Invalid text">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const invalidText = wc(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(invalidText).toBeTruthy();
    expect(invalidText?.textContent?.trim()).toBe('Invalid text');
  });

  it('should not display invalid-text if invalid prop is true but readOnly', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [readonly]="true" [invalid]="true" invalidText="Invalid text">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const invalidText = wc(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(invalidText).toBeNull();
  });

  it('should not display invalid-text if invalid prop is true but disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [disabled]="true" [invalid]="true" invalidText="Invalid text">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const invalidText = wc(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(invalidText).toBeNull();
  });

  it('should respect readOnly prop', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [readonly]="true">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const input = wc(fixture.nativeElement).shadowRoot.querySelector('input');
    expect(input?.hasAttribute('aria-readonly')).toBe(true);
  });

  it('should remain disabled when readOnly and disabled are both true', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [readonly]="true" [disabled]="true">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const input = wc(fixture.nativeElement).shadowRoot.querySelector('input');
    expect(input?.hasAttribute('disabled')).toBe(true);
  });

  it('should respect warn prop', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [warn]="true">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const warnIcon = wc(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--checkbox__invalid-icon--warning'
    );
    expect(warnIcon).toBeTruthy();
  });

  it('should display warn-text if warn prop is true', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox warn warn-text="Warn text">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const warnText = wc(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(warnText).toBeTruthy();
    expect(warnText?.textContent?.trim()).toBe('Warn text');
  });

  it('should not display warn-text if warn prop is true but readOnly', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox readonly warn warn-text="Warn text">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const warnText = wc(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(warnText).toBeNull();
  });

  it('should not display warn-text if warn prop is true but disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox disabled warn warn-text="Warn text">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const warnText = wc(fixture.nativeElement).shadowRoot.querySelector(
      '.cds-ng--form-requirement'
    );
    expect(warnText).toBeNull();
  });

  it('should fire cds-ng-checkbox-changed event when checkbox is changed', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox>Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const el = wc(fixture.nativeElement);
    await el.updateComplete;
    const input = el.shadowRoot.querySelector('input') as HTMLInputElement;

    let eventDetail: { checked: boolean; indeterminate: boolean } | null = null;
    el.addEventListener('cds-ng-checkbox-changed', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });
    input.click();

    expect(eventDetail).toBeTruthy();
    expect(eventDetail!.checked).toBe(true);
    expect(eventDetail!.indeterminate).toBe(false);
  });

  it('should NOT fire cds-ng-checkbox-changed event when readonly', async () => {
    const { fixture } = await render(
      `<cds-ng-checkbox [readonly]="true">Checkbox Label</cds-ng-checkbox>`,
      imports
    );
    const el = wc(fixture.nativeElement);
    await el.updateComplete;
    const input = el.shadowRoot.querySelector('input') as HTMLInputElement;

    let eventFired = false;
    el.addEventListener('cds-ng-checkbox-changed', () => {
      eventFired = true;
    });

    const result = await Promise.race([
      new Promise<string>((resolve) => {
        el.addEventListener('cds-ng-checkbox-changed', () => resolve('fired'));
      }),
      new Promise<string>((resolve) =>
        setTimeout(() => resolve('timeout'), 100)
      ),
    ]);
    input.click();

    // Give any pending events a tick to fire
    await new Promise((r) => setTimeout(r, 50));
    expect(eventFired).toBe(false);
    expect(result).toBe('timeout');
  });

  // WC event titles use cds-checkbox-changed; Angular equivalents above use
  // cds-ng-checkbox-changed (the prefixed event name under ADR 0020).
  it.todo('should fire cds-checkbox-changed event when checkbox is changed');
  it.todo('should NOT fire cds-checkbox-changed event when readonly');
  it.todo('should respect deprecated slug prop');
  it.todo('should respect decorator prop');
  it.todo('should set size to "md" when decorator kind is "inline"');
});
