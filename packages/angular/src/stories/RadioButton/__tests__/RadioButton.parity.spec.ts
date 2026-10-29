/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/radio-button/__tests__/radio-button-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 */

import { RadioButtonComponent } from '../../../generated/RadioButton';
import { AiLabelComponent } from '../../../generated/AiLabel';
import { render } from '../../../testing/render';

const imports = [RadioButtonComponent, AiLabelComponent];

const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-radio-button') as HTMLElement & {
    checked: boolean;
    shadowRoot: ShadowRoot;
    updateComplete: Promise<void>;
  };

describe('cds-ng-radio-button (parity with web-components radio-button-test.js)', () => {
  it('should render', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button></cds-ng-radio-button>`,
      imports
    );
    expect(wc(fixture.nativeElement)).toBeTruthy();
  });

  it('should render with <input type="radio">', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button></cds-ng-radio-button>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input[type="radio"]');
    expect(input).toBeTruthy();
  });

  it('should support a custom class', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button class="test-class"></cds-ng-radio-button>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    expect(host.classList.contains('test-class')).toBe(true);
  });

  it('should reflect checked state when attribute is set', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button checked></cds-ng-radio-button>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('should label the <input> with label-text', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button labelText="test-label"></cds-ng-radio-button>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    (host as any).labelText = 'test-label';
    await host.updateComplete;
    const labelNode = host.shadowRoot?.querySelector(
      '.cds-ng--radio-button__label-text, .cds--radio-button__label-text'
    );
    const slot = labelNode?.querySelector('slot');
    const text = (slot?.textContent || labelNode?.textContent || '').trim();
    expect(text).toContain('test-label');
  });

  it('should set the "required" attribute on the <input>', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button required></cds-ng-radio-button>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    expect(host.hasAttribute('required')).toBe(true);
  });

  it('should update AILabel size', async () => {
    const { fixture } = await render(
      `
      <cds-ng-radio-button>
        <cds-ng-ai-label slot="ai-label" kind="inline"></cds-ng-ai-label>
      </cds-ng-radio-button>
      `,
      imports
    );
    const host = wc(fixture.nativeElement);
    const aiLabel = host.querySelector('cds-ng-ai-label');
    expect(aiLabel?.getAttribute('size')).toBe('md');
  });

  it('should not toggle when readonly radio is clicked', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button [readOnly]="true" value="test-value"></cds-ng-radio-button>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement;

    host.click();
    await host.updateComplete;

    expect(host.checked).toBe(false);
    expect(input?.checked).toBe(false);
  });

  it('should not toggle when readonly radio receives keyboard activation', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button [readOnly]="true" value="test-value"></cds-ng-radio-button>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const keyboardEvent = new KeyboardEvent('keydown', {
      key: ' ',
      bubbles: true,
      composed: true,
    });

    host.dispatchEvent(keyboardEvent);
    await host.updateComplete;

    expect(host.checked).toBe(false);
  });

  it('should set aria-readonly on the inner input when readonly', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button [readOnly]="true" value="test-value"></cds-ng-radio-button>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input[type="radio"]');
    expect(input?.getAttribute('aria-readonly')).toBe('true');
  });

  it('should associate the label with the input via matching for/id', async () => {
    const { fixture } = await render(
      `<cds-ng-radio-button></cds-ng-radio-button>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input[type="radio"]');
    const label = host.shadowRoot.querySelector('label');

    expect(input?.id).toBeTruthy();
    expect(label?.getAttribute('for')).toBe(input?.id);
  });
});
