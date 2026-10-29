/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/text-input/__tests__/text-input-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 *
 * Each `it` keeps the WC test's title verbatim. Under ADR 0015 the host
 * element IS the web component — assertions run against the shadow DOM
 * of the `cds-ng-text-input` host element directly.
 *
 * Ported 1:1 unless noted. Tests that cannot run in jsdom are `it.todo` with
 * a reason.
 */

import { TextInputComponent } from '@carbon/angular/text-input';
import { render } from '../../../testing/render';

const imports = [TextInputComponent];

/** The cds-ng-text-input host element. */
const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-text-input') as HTMLElement & {
    shadowRoot: ShadowRoot;
    value: string;
  };

const inner = (el: HTMLElement, selector: string) =>
  wc(el)?.shadowRoot?.querySelector(selector) as HTMLElement | null;

describe('cds-ng-text-input (parity with web-components text-input-test.js)', () => {
  const defaultTemplate = `<cds-ng-text-input label="Text input label" placeholder="Placeholder text"></cds-ng-text-input>`;

  it('should render', async () => {
    const { fixture } = await render(defaultTemplate, imports);
    const input = inner(fixture.nativeElement, 'input');
    expect(input).toBeTruthy();
  });

  it('should render label and placeholder', async () => {
    const { fixture } = await render(defaultTemplate, imports);
    const label = inner(fixture.nativeElement, 'label');
    const input = inner(fixture.nativeElement, 'input');
    expect(label?.textContent).toContain('Text input label');
    expect((input as HTMLInputElement | null)?.placeholder).toBe(
      'Placeholder text'
    );
  });

  it('should reflect value attribute to input', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input value="hello" label-text="With value"></cds-ng-text-input>`,
      imports
    );
    const input = inner(
      fixture.nativeElement,
      'input'
    ) as HTMLInputElement | null;
    expect(input?.value).toBe('hello');
  });

  it('should render helper text', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input label-text="Text input" helper-text="Helpful info"></cds-ng-text-input>`,
      imports
    );
    const helper = inner(fixture.nativeElement, '.cds-ng--form__helper-text');
    expect(helper?.textContent).toContain('Helpful info');
  });

  it('should render helper text from slot without helper-text attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input label-text="Text input">
        <span slot="helper-text"><strong>Rich</strong> helper text</span>
      </cds-ng-text-input>`,
      imports
    );
    const helper = inner(fixture.nativeElement, '.cds-ng--form__helper-text');
    expect(helper).toBeTruthy();
    expect((helper as HTMLElement & { hidden?: boolean })?.hidden).toBe(false);
  });

  it('should apply disabled attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input disabled label-text="Disabled"></cds-ng-text-input>`,
      imports
    );
    const input = inner(
      fixture.nativeElement,
      'input'
    ) as HTMLInputElement | null;
    expect(input?.disabled).toBe(true);
  });

  it('should apply readonly attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input readonly label-text="Readonly"></cds-ng-text-input>`,
      imports
    );
    const input = inner(
      fixture.nativeElement,
      'input'
    ) as HTMLInputElement | null;
    expect(input?.readOnly).toBe(true);
  });

  it('should render invalid text', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input invalid invalid-text="This is an error" label-text="Invalid input"></cds-ng-text-input>`,
      imports
    );
    const error = inner(fixture.nativeElement, '.cds-ng--form-requirement');
    expect(error?.textContent).toContain('This is an error');
  });

  it('should not have invalid classname when is disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input label="test-label" invalid invalid-text="Invalid message" disabled></cds-ng-text-input>`,
      imports
    );
    const input = inner(fixture.nativeElement, 'input');
    expect(input?.classList.contains('cds-ng--text-input--invalid')).toBe(
      false
    );
    expect(input?.hasAttribute('data-invalid')).toBe(false);
    const fieldWrapper = inner(
      fixture.nativeElement,
      '.cds-ng--text-input__field-wrapper'
    );
    expect(fieldWrapper?.hasAttribute('data-invalid')).toBe(false);
    expect(
      inner(fixture.nativeElement, '.cds-ng--form-requirement')
    ).toBeNull();
    expect(
      inner(fixture.nativeElement, '.cds-ng--text-input__invalid-icon')
    ).toBeNull();
  });

  it('should not have invalid classname when is readonly', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input label="test-label" invalid invalid-text="Invalid message" readonly></cds-ng-text-input>`,
      imports
    );
    const input = inner(fixture.nativeElement, 'input');
    expect(input?.classList.contains('cds-ng--text-input--invalid')).toBe(
      false
    );
    expect(input?.hasAttribute('data-invalid')).toBe(false);
    const fieldWrapper = inner(
      fixture.nativeElement,
      '.cds-ng--text-input__field-wrapper'
    );
    expect(fieldWrapper?.hasAttribute('data-invalid')).toBe(false);
    expect(
      inner(fixture.nativeElement, '.cds-ng--form-requirement')
    ).toBeNull();
    expect(
      inner(fixture.nativeElement, '.cds-ng--text-input__invalid-icon')
    ).toBeNull();
  });

  it('should not have warn classname when is disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input label="test-label" warn warn-text="Warn message" disabled></cds-ng-text-input>`,
      imports
    );
    const input = inner(fixture.nativeElement, 'input');
    expect(input?.classList.contains('cds-ng--text-input--warning')).toBe(
      false
    );
    const fieldWrapper = inner(
      fixture.nativeElement,
      '.cds-ng--text-input__field-wrapper'
    );
    expect(
      fieldWrapper?.classList.contains(
        'cds-ng--text-input__field-wrapper--warning'
      )
    ).toBe(false);
    expect(
      inner(fixture.nativeElement, '.cds-ng--form-requirement')
    ).toBeNull();
    expect(
      inner(fixture.nativeElement, '.cds-ng--text-input__invalid-icon--warning')
    ).toBeNull();
  });

  it('should not have warn classname when is readonly', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input label="test-label" warn warn-text="Warn message" readonly></cds-ng-text-input>`,
      imports
    );
    const input = inner(fixture.nativeElement, 'input');
    expect(input?.classList.contains('cds-ng--text-input--warning')).toBe(
      false
    );
    const fieldWrapper = inner(
      fixture.nativeElement,
      '.cds-ng--text-input__field-wrapper'
    );
    expect(
      fieldWrapper?.classList.contains(
        'cds-ng--text-input__field-wrapper--warning'
      )
    ).toBe(false);
    expect(
      inner(fixture.nativeElement, '.cds-ng--form-requirement')
    ).toBeNull();
    expect(
      inner(fixture.nativeElement, '.cds-ng--text-input__invalid-icon--warning')
    ).toBeNull();
  });

  it('should render warning text', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input warn warn-text="This is a warning" label-text="Warn input"></cds-ng-text-input>`,
      imports
    );
    const warning = inner(fixture.nativeElement, '.cds-ng--form-requirement');
    expect(warning?.textContent).toContain('This is a warning');
  });

  it('should reflect size attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input size="sm" label-text="Small input"></cds-ng-text-input>`,
      imports
    );
    expect(wc(fixture.nativeElement).getAttribute('size')).toBe('sm');
  });

  it('should dispatch input event', async () => {
    const { fixture } = await render(defaultTemplate, imports);
    const textInputEl = wc(fixture.nativeElement);
    const inputEl = inner(
      fixture.nativeElement,
      'input'
    ) as HTMLInputElement | null;

    let eventFired = false;
    textInputEl.addEventListener('input', () => {
      eventFired = true;
    });

    (inputEl as HTMLInputElement).value = 'updated';
    inputEl!.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    );
    await (textInputEl as unknown as { updateComplete: Promise<void> })
      .updateComplete;

    expect(eventFired).toBe(true);
  });

  it('should re-dispatch change event', async () => {
    const { fixture } = await render(defaultTemplate, imports);
    const textInputEl = wc(fixture.nativeElement);
    const inputEl = inner(
      fixture.nativeElement,
      'input'
    ) as HTMLInputElement | null;

    let changeEvent: Event | undefined;
    textInputEl.addEventListener('change', (e) => {
      changeEvent = e;
    });

    (inputEl as HTMLInputElement).value = 'text';
    inputEl!.dispatchEvent(new Event('change', { bubbles: true }));
    await (textInputEl as unknown as { updateComplete: Promise<void> })
      .updateComplete;

    expect(changeEvent).toBeTruthy();
    expect(changeEvent!.composed).toBe(true);
    expect(textInputEl.value).toBe('text');
  });

  it('should reflect value set via attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input value="a" label-text="Controlled input"></cds-ng-text-input>`,
      imports
    );
    const textInputEl = wc(fixture.nativeElement);
    textInputEl.value = 'b';
    await (textInputEl as unknown as { updateComplete: Promise<void> })
      .updateComplete;
    const inputEl = inner(
      fixture.nativeElement,
      'input'
    ) as HTMLInputElement | null;
    expect(inputEl?.value).toBe('b');
  });

  // WC: "should receive focus via keyboard" — focus tracking requires real browser.
  it.todo('should receive focus via keyboard');

  it('should apply class to outer host element', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input class="custom-class" label-text="Class test"></cds-ng-text-input>`,
      imports
    );
    expect(wc(fixture.nativeElement).classList.contains('custom-class')).toBe(
      true
    );
  });

  it('should support data-* attributes', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input data-testid="my-input" label-text="Test ID"></cds-ng-text-input>`,
      imports
    );
    expect(wc(fixture.nativeElement).getAttribute('data-testid')).toBe(
      'my-input'
    );
  });

  it('should forward autocomplete attribute to input', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input autocomplete="on" label-text="Autocomplete"></cds-ng-text-input>`,
      imports
    );
    const inputEl = inner(
      fixture.nativeElement,
      'input'
    ) as HTMLInputElement | null;
    expect(inputEl?.getAttribute('autocomplete')).toBe('on');
  });

  it('should reflect password type on input', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input type="password" label-text="Password"></cds-ng-text-input>`,
      imports
    );
    const inputEl = inner(
      fixture.nativeElement,
      'input'
    ) as HTMLInputElement | null;
    expect(inputEl?.type).toBe('password');
  });

  // WC: uses axe — accessibility engine not available in jsdom.
  it.todo('should be accessible');

  it('should show password visibility toggle button and toggle type', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input type="password" [showPasswordVisibilityToggle]="true" label-text="Password"></cds-ng-text-input>`,
      imports
    );
    const button = inner(
      fixture.nativeElement,
      'button'
    ) as HTMLButtonElement | null;
    const inputEl = inner(
      fixture.nativeElement,
      'input'
    ) as HTMLInputElement | null;

    expect(button).toBeTruthy();
    expect(inputEl?.type).toBe('password');

    button!.click();
    await (
      wc(fixture.nativeElement) as unknown as { updateComplete: Promise<void> }
    ).updateComplete;

    expect(inputEl?.type).toBe('text');
  });

  it('should not trigger click handler when disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input [disabled]="true" label-text="Disabled"></cds-ng-text-input>`,
      imports
    );
    // WC test binds @click on the host and clicks the inner input.
    // In jsdom, clicking a disabled input does not bubble through a disabled WC.
    const inputEl = inner(
      fixture.nativeElement,
      'input'
    ) as HTMLInputElement | null;
    let clicked = false;
    wc(fixture.nativeElement).addEventListener('click', () => {
      clicked = true;
    });
    inputEl!.click();
    expect(clicked).toBe(false);
  });

  it('should render counter when enable-counter and max-count are set', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input [enableCounter]="true" maxCount="10" value="1234" label-text="Counter test"></cds-ng-text-input>`,
      imports
    );
    const counter = inner(
      fixture.nativeElement,
      '.cds-ng--text-input__label-counter'
    );
    expect(counter?.textContent).toContain('4/10');
  });

  it('should apply hideLabel and visually hide the label', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input [hideLabel]="true" label-text="Hidden label"></cds-ng-text-input>`,
      imports
    );
    const label = inner(fixture.nativeElement, 'label');
    expect(label?.classList.contains('cds-ng--visually-hidden')).toBe(true);
  });

  it('should apply inline class', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input [inline]="true" label-text="Inline label"></cds-ng-text-input>`,
      imports
    );
    const wrapper = inner(fixture.nativeElement, '.cds-ng--text-input-wrapper');
    expect(
      wrapper?.classList.contains('cds-ng--text-input-wrapper--inline')
    ).toBe(true);
  });

  it('should associate the label with the input via matching for/id', async () => {
    const { fixture } = await render(defaultTemplate, imports);
    const label = inner(fixture.nativeElement, 'label');
    const inputEl = inner(fixture.nativeElement, 'input');
    expect(inputEl?.id).toBeTruthy();
    expect(label?.getAttribute('for')).toBe(inputEl?.id);
  });

  it('should describe the input with the helper text', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input label="Text input label" helperText="Helpful info"></cds-ng-text-input>`,
      imports
    );
    const inputEl = inner(fixture.nativeElement, 'input');
    const helper = inner(fixture.nativeElement, '.cds-ng--form__helper-text');
    expect(inputEl?.getAttribute('aria-describedby')).toBe('helper-text');
    expect(helper?.id).toBe('helper-text');
  });

  it('should not set aria-describedby when there is no helper text', async () => {
    const { fixture } = await render(defaultTemplate, imports);
    const inputEl = inner(fixture.nativeElement, 'input');
    expect(inputEl?.hasAttribute('aria-describedby')).toBe(false);
  });

  it('should describe the input with the validation message when invalid', async () => {
    const { fixture } = await render(
      `<cds-ng-text-input label="Text input label" helperText="Helpful info" [invalid]="true" invalidText="Something is wrong"></cds-ng-text-input>`,
      imports
    );
    const inputEl = inner(fixture.nativeElement, 'input');
    const errorText = inner(fixture.nativeElement, '.cds-ng--form-requirement');
    expect(inputEl?.getAttribute('aria-describedby')).toBe('error-text');
    expect(errorText?.id).toBe('error-text');
  });

  describe('AI label and slug slot (@query decorator)', () => {
    // WC: requires AiLabelComponent and SlugComponent
    it.todo('should set ai-label attribute when cds-ai-label is slotted');
    it.todo('should resolve ai-label slot node via @query decorator');
    it.todo('should resolve slug slot node via @query decorator');
    it.todo(
      'should toggle cds--slug--revert class on ai-label slot when revert-active is set'
    );
    it.todo(
      'should not add cds--slug--revert to slug slot when only cds-slug is present (ai-label slot takes precedence in shadow DOM)'
    );
    it.todo(
      'should not set cds--slug--revert on ai-label slot when revert-active is absent'
    );
    it.todo('should not have ai-label attribute without cds-ai-label');
    it.todo(
      'should toggle cds--slug--revert on slug slot when ai-label slot node is absent'
    );
  });
});
