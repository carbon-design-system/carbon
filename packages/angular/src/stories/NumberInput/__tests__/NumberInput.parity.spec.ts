/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/number-input/__tests__/number-input-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 */

import { NumberInputComponent } from '../../../generated/NumberInput';
import { render } from '../../../testing/render';

const imports = [NumberInputComponent];

const wc = (el: HTMLElement) =>
  el.querySelector('cds-ng-number-input') as HTMLElement & {
    value: string;
    type: string;
    locale: string;
    invalid: boolean;
    formatOptions: any;
    validate: (value: string, locale: string) => boolean | undefined;
    _getInputValidity: () => boolean;
    shadowRoot: ShadowRoot;
    updateComplete: Promise<void>;
  };

describe('cds-ng-number-input (parity with web-components number-input-test.js)', () => {
  it('should render a number input with correct type', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('number');
  });

  it('should place custom class on host', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input class="custom-class" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    expect(host.classList.contains('custom-class')).toBe(true);
  });

  it('should set min, max, step attributes', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input min="1" max="10" step="2" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(input.min).toBe('1');
    expect(input.max).toBe('10');
    expect(input.step).toBe('2');
  });

  it('should respect disabled and readonly attributes', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input [disabled]="true" [readonly]="true" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(host.hasAttribute('disabled') || input.disabled).toBe(true);
    expect(host.hasAttribute('readonly') || input.readOnly).toBe(true);
  });

  it('should not allow value change or emit event in readonly mode', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input value="5" [readonly]="true" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const [decrement, increment] = Array.from(
      host.shadowRoot.querySelectorAll('button')
    ) as HTMLButtonElement[];

    let fired = false;
    host.addEventListener('cds-ng-number-input', () => (fired = true));

    expect(increment.disabled).toBe(true);
    expect(decrement.disabled).toBe(true);

    increment.click();
    expect(fired).toBe(false);
  });

  it('should emit cds-number-input event with value and direction', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input value="5" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;

    const eventPromise = new Promise<CustomEvent>((resolve) => {
      host.addEventListener(
        'cds-ng-number-input',
        (e) => resolve(e as CustomEvent),
        { once: true }
      );
    });

    input.value = '6';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    const event = await eventPromise;
    expect(event).toBeTruthy();
    expect(event.detail.value).toBe('6');
    expect(event.detail.direction).toBe('up');
  });

  it('should reflect typed value changes to the host attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input value="5" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;

    input.value = '6';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await host.updateComplete;

    expect(host.value).toBe('6');
    expect(host.getAttribute('value')).toBe('6');
  });

  it('should show helper text and invalid text', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input [invalid]="true" label="Label">
        <span slot="helper-text">Helpful</span>
        <span slot="invalid-text">Invalid</span>
      </cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const helper = host.querySelector('[slot="helper-text"]');
    const invalid = host.querySelector('[slot="invalid-text"]');
    expect(helper?.textContent).toContain('Helpful');
    expect(invalid?.textContent).toContain('Invalid');
  });

  it('should increment and decrement using buttons', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input value="1" step="1" min="0" max="3" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
    const [decrement, increment] = Array.from(
      host.shadowRoot.querySelectorAll('button')
    ) as HTMLButtonElement[];

    increment.click();
    expect(input.value).toBe('2');

    decrement.click();
    expect(input.value).toBe('1');
  });

  it('should support decimal step values accurately', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input value="1.1" step="0.1" label="Decimal"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
    const [, increment] = Array.from(
      host.shadowRoot.querySelectorAll('button')
    ) as HTMLButtonElement[];

    increment.click();
    expect(input.value).toBe('1.2');
  });

  it('should respect allow-empty attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input [allowEmpty]="true" value="" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('should render ai-label slot content via wrapper', async () => {
    const { fixture } = await render(
      `<div>
        <span slot="ai-label">AI</span>
        <cds-ng-number-input label="Label">
          <slot name="ai-label"></slot>
        </cds-ng-number-input>
      </div>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const slotted = fixture.nativeElement.querySelector('[slot="ai-label"]');
    expect(host).toBeTruthy();
    expect(slotted).toBeTruthy();
    expect(slotted?.textContent).toContain('AI');
  });

  it('should hide the steppers when hide-steppers is set', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input [hideSteppers]="true" label="No steppers"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const buttons = host.shadowRoot.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  it('should hide label visually when hide-label is set', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input [hideLabel]="true" label="Hidden label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const label = host.shadowRoot.querySelector('label');
    const classList = Array.from(label?.classList || []);
    expect(classList.some((cls) => cls.includes('--visually-hidden'))).toBe(
      true
    );
  });

  it('should respect autocomplete attribute', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input autocomplete="on" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(input.autocomplete).toBe('on');
  });

  it('should emit input and blur events from inner input', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;

    let inputFired = false;
    let blurFired = false;

    input.addEventListener('input', () => (inputFired = true));
    input.addEventListener('blur', () => (blurFired = true));

    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));

    expect(inputFired).toBe(true);
    expect(blurFired).toBe(true);
  });

  it('should have accessibility roles and attributes', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('role')).toBe('alert');
    expect(input.getAttribute('aria-atomic')).toBe('true');
  });

  it('should disable step buttons when disabled', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input [disabled]="true" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const buttons = host.shadowRoot.querySelectorAll(
      'button'
    ) as NodeListOf<HTMLButtonElement>;
    buttons.forEach((btn) => expect(btn.disabled).toBe(true));
  });

  it('should apply aria-labels to step buttons', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const [decrement, increment] = Array.from(
      host.shadowRoot.querySelectorAll('button')
    ) as HTMLButtonElement[];
    expect(decrement.getAttribute('aria-label')).toBe('decrease number input');
    expect(increment.getAttribute('aria-label')).toBe('increase number input');
  });

  it('should render defaultValue when value is not set', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input defaultValue="42" label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('42');
  });

  it('should apply custom assistive text for step buttons', async () => {
    const { fixture } = await render(
      `<cds-ng-number-input
        incrementButtonAssistiveText="More"
        decrementButtonAssistiveText="Less"
        label="Label"></cds-ng-number-input>`,
      imports
    );
    const host = wc(fixture.nativeElement);
    const [decrement, increment] = Array.from(
      host.shadowRoot.querySelectorAll('button')
    ) as HTMLButtonElement[];
    expect(decrement.getAttribute('aria-label')).toBe('Less');
    expect(increment.getAttribute('aria-label')).toBe('More');
  });

  describe('size', () => {
    it('should apply size class', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input size="xs" label="Label"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const wrapper = host.shadowRoot.querySelector(
        '.cds-ng--number, .cds--number'
      ) as HTMLElement;
      expect(
        wrapper.classList.contains('cds-ng--number--xs') ||
          wrapper.classList.contains('cds--number--xs')
      ).toBe(true);
      expect(
        wrapper.classList.contains('cds-ng--layout--size-xs') ||
          wrapper.classList.contains('cds--layout--size-xs')
      ).toBe(true);
    });

    it('should render without a size class by default', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input label="Label"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const wrapper = host.shadowRoot.querySelector(
        '.cds-ng--number, .cds--number'
      ) as HTMLElement;
      expect(
        Array.from(wrapper.classList).some(
          (name) =>
            name.startsWith('cds-ng--number--') ||
            name.startsWith('cds--number--') ||
            name.startsWith('cds-ng--layout--size-') ||
            name.startsWith('cds--layout--size-')
        )
      ).toBe(false);
    });
  });

  describe('with type="text"', () => {
    it('should render an <input> with type="text"', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.type).toBe('text');
    });

    it('should set `disabled` on the underlying <input>', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label" [disabled]="true"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('should set the defaultValue of the <input> with `default-value`', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label" defaultValue="5"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('5');
    });

    it('should set the given `value` on <input> when value > min', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label" min="0"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      host.value = '5';
      await host.updateComplete;
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('5');
    });

    it('should allow an empty string as input to the underlying <input>', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label" value="" [invalid]="true">
          <span slot="invalid-text">test-invalid-text</span>
        </cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should set the input as invalid when value < min', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label" min="10" [invalid]="true">
          <span slot="invalid-text">test-invalid-text</span>
        </cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      host.value = '5';
      await host.updateComplete;
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      const invalidText = host.querySelector('[slot="invalid-text"]');
      expect(input.value).toBe('5');
      expect(invalidText?.textContent).toContain('test-invalid-text');
      expect(host.hasAttribute('invalid')).toBe(true);
    });

    it('should not render invalidText when value is empty string', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label" value="">
          <span slot="invalid-text">test-invalid-text</span>
        </cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('');
      expect(host.hasAttribute('invalid')).toBe(false);
    });

    it('should describe the <input> through `helper-text`', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label">
          <span slot="helper-text">test-helper-text</span>
        </cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const helperText = host.querySelector('[slot="helper-text"]');
      expect(helperText?.textContent).toContain('test-helper-text');
    });

    it('should call event handler when the <input> is clicked', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label" min="0" value="10" max="100"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;

      let clicked = false;
      input.addEventListener('click', () => (clicked = true));
      input.click();
      expect(clicked).toBe(true);
    });

    it('should not call event handler when the <input> is clicked but disabled', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" [disabled]="true" label="test-label" min="0" value="10" max="100"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;

      let clicked = false;
      input.addEventListener('click', () => (clicked = true));
      input.click();
      expect(clicked).toBe(false);
    });

    it('should emit cds-number-input event when the value changes', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label" min="0" max="100"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      host.value = '10';
      await host.updateComplete;
      const [decrement, increment] = Array.from(
        host.shadowRoot.querySelectorAll('button')
      ) as HTMLButtonElement[];

      let eventCount = 0;
      let lastEvent: any;
      host.addEventListener('cds-ng-number-input', (e) => {
        eventCount++;
        lastEvent = e;
      });

      increment.click();
      expect(eventCount).toBe(1);
      expect(lastEvent.detail.value).toBe(11);
      expect(lastEvent.detail.direction).toBe('up');

      decrement.click();
      expect(eventCount).toBe(2);
    });

    describe('steppers', () => {
      it('should call event handler when up or down arrows are clicked', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input type="text" label="test-label" min="0" max="100"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        host.value = '10';
        await host.updateComplete;
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;
        const [decrement, increment] = Array.from(
          host.shadowRoot.querySelectorAll('button')
        ) as HTMLButtonElement[];

        let clickCount = 0;
        host.addEventListener('cds-ng-number-input', () => clickCount++);

        increment.click();
        await host.updateComplete;
        expect(clickCount).toBe(1);
        expect(input.value).toBe('11');

        decrement.click();
        await host.updateComplete;
        expect(clickCount).toBe(2);
        expect(input.value).toBe('10');
      });

      it('should set up and down arrows as disabled if `disabled` is true', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input type="text" label="test-label" min="0" value="10" max="100" [disabled]="true"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        const [decrement, increment] = Array.from(
          host.shadowRoot.querySelectorAll('button')
        ) as HTMLButtonElement[];
        expect(increment.disabled).toBe(true);
        expect(decrement.disabled).toBe(true);
      });

      it('should not call event handler when up or down arrows are clicked but the <input> is disabled', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input type="text" label="test-label" min="0" value="10" max="100" [disabled]="true"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        host.value = '10';
        await host.updateComplete;
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;
        const [decrement, increment] = Array.from(
          host.shadowRoot.querySelectorAll('button')
        ) as HTMLButtonElement[];

        let clickCount = 0;
        host.addEventListener('cds-ng-number-input', () => clickCount++);

        increment.click();
        expect(clickCount).toBe(0);
        expect(input.value).toBe('10');

        decrement.click();
        expect(clickCount).toBe(0);
        expect(input.value).toBe('10');
      });

      it('should clamp values at min/max boundaries and only emit events when value changes', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input type="text" label="test-label" min="0" max="10" step="5"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        host.value = '5';
        await host.updateComplete;
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;
        const [decrement, increment] = Array.from(
          host.shadowRoot.querySelectorAll('button')
        ) as HTMLButtonElement[];

        let eventCount = 0;
        host.addEventListener('cds-ng-number-input', () => {
          eventCount++;
        });

        expect(input.value).toBe('5');

        increment.click();
        await host.updateComplete;
        expect(input.value).toBe('10');
        expect(eventCount).toBe(1);

        increment.click();
        await host.updateComplete;
        expect(input.value).toBe('10');
        expect(eventCount).toBe(1);

        decrement.click();
        await host.updateComplete;
        expect(input.value).toBe('5');
        expect(eventCount).toBe(2);

        decrement.click();
        await host.updateComplete;
        expect(input.value).toBe('0');
        expect(eventCount).toBe(3);

        decrement.click();
        await host.updateComplete;
        expect(input.value).toBe('0');
        expect(eventCount).toBe(3);
      });
    });

    it('should increase by the value of large step and format to the default locale', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label" min="-9999" max="10000" step="1000"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      host.value = '1000';
      await host.updateComplete;
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      const [, increment] = Array.from(
        host.shadowRoot.querySelectorAll('button')
      ) as HTMLButtonElement[];

      expect(input.value).toBe('1,000');

      increment.click();
      await host.updateComplete;
      expect(input.value).toBe('2,000');
    });

    it('should decrease by the value of large step and format to the default locale', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="test-label" min="-9999" max="10000" step="1000"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      host.value = '1000';
      await host.updateComplete;
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      const [decrement] = Array.from(
        host.shadowRoot.querySelectorAll('button')
      ) as HTMLButtonElement[];

      expect(input.value).toBe('1,000');

      decrement.click();
      await host.updateComplete;
      expect(input.value).toBe('0');
    });

    it('should respect readonly prop', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" label="Number label" value="10" [readonly]="true"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      const [decrement, increment] = Array.from(
        host.shadowRoot.querySelectorAll('button')
      ) as HTMLButtonElement[];

      let changeCount = 0;
      host.addEventListener('cds-ng-number-input', () => changeCount++);

      expect(input.readOnly).toBe(true);
      expect(increment.disabled).toBe(true);
      expect(decrement.disabled).toBe(true);

      increment.click();
      decrement.click();
      expect(changeCount).toBe(0);
    });

    it('should not update value via keyboard arrows when readonly', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input type="text" value="10" [readonly]="true"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;

      let changeCount = 0;
      host.addEventListener('cds-ng-number-input', () => changeCount++);

      const arrowUpEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        composed: true,
      });
      input.dispatchEvent(arrowUpEvent);
      await host.updateComplete;
      expect(input.value).toBe('10');

      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        composed: true,
      });
      input.dispatchEvent(arrowDownEvent);
      await host.updateComplete;
      expect(changeCount).toBe(0);
    });

    it('should update value to empty when allow-empty is true & input value becomes empty', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input
          type="text"
          min="-100"
          max="100"
          label="NumberInput label"
          [allowEmpty]="true">
          <span slot="helper-text">Optional helper text.</span>
          <span slot="invalid-text">Number is not valid</span>
        </cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      host.value = '50';
      await host.updateComplete;
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;

      let lastEvent: any;
      host.addEventListener('cds-ng-number-input', (e) => {
        lastEvent = e;
      });

      input.value = '';
      input.dispatchEvent(
        new Event('input', { bubbles: true, composed: true })
      );
      input.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
      await host.updateComplete;

      expect(input.value).toBe('');
      expect(
        lastEvent?.detail.value === '' || isNaN(lastEvent?.detail.value)
      ).toBe(true);
    });

    describe('locale parsing and formatting', () => {
      it('should parse and format numbers based on the default locale', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input type="text" label="NumberInput label" min="0" step="1" max="100"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        host.value = '15.01';
        await host.updateComplete;
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;
        const [decrement, increment] = Array.from(
          host.shadowRoot.querySelectorAll('button')
        ) as HTMLButtonElement[];

        expect(input.value).toBe('15.01');
        increment.click();
        await host.updateComplete;
        expect(input.value).toBe('16.01');

        decrement.click();
        await host.updateComplete;
        expect(input.value).toBe('15.01');

        input.value = '3';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        expect(input.value).toBe('3');

        input.value = '34';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        expect(input.value).toBe('34');

        input.value = '34,';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        expect(input.value).toBe('34,');

        input.value = '34,8';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        expect(input.value).toBe('34,8');

        input.value = '34,89';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        expect(input.value).toBe('34,89');

        input.dispatchEvent(
          new Event('blur', { bubbles: true, composed: true })
        );
        await host.updateComplete;
        expect(input.value).toBe('3,489');

        input.value = '1234,567';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        input.dispatchEvent(
          new Event('blur', { bubbles: true, composed: true })
        );
        await host.updateComplete;
        expect(input.value).toBe('1,234,567');

        input.value = '34.56';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        input.dispatchEvent(
          new Event('blur', { bubbles: true, composed: true })
        );
        await host.updateComplete;
        expect(input.value).toBe('34.56');
      });

      // Browser sendKeys / focus interaction is handled in E2E tests
      it.todo('should parse and format numbers based on the given locale');

      it('should not emit event until onBlur when input is parsed and formatted', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input type="text" label="NumberInput label" min="0" step="1" max="100"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        host.value = '15.01';
        await host.updateComplete;
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;
        const [decrement, increment] = Array.from(
          host.shadowRoot.querySelectorAll('button')
        ) as HTMLButtonElement[];

        let eventCount = 0;
        let lastEvent: any;
        host.addEventListener('cds-ng-number-input', (e) => {
          eventCount++;
          lastEvent = e;
        });

        expect(input.value).toBe('15.01');

        input.value = '15.019';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        expect(eventCount).toBe(0);

        input.value = '15.0199';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        expect(eventCount).toBe(0);

        input.dispatchEvent(
          new Event('blur', { bubbles: true, composed: true })
        );
        await host.updateComplete;
        expect(input.value).toBe('15.02');
        expect(lastEvent.detail.value).toBe(15.02);
        expect(lastEvent.detail.direction).toBe('up');
        expect(eventCount).toBe(1);

        increment.click();
        await host.updateComplete;
        expect(input.value).toBe('16.02');
        expect(lastEvent.detail.value).toBe(16.02);
        expect(lastEvent.detail.direction).toBe('up');
        expect(eventCount).toBe(2);

        decrement.click();
        await host.updateComplete;
        expect(lastEvent.detail.value).toBe(15.02);
        expect(lastEvent.detail.direction).toBe('down');
        expect(input.value).toBe('15.02');
        expect(eventCount).toBe(3);
      });

      it('supports format-options attribute', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input
            type="text"
            [allowEmpty]="true"
            label="Percentage format test"
            min="0"
            step="0.05"
            max="100"
            helperText="formatOptions: {style: 'percent'} - Should display as 15%"
            [formatOptions]="formatOptions">
          </cds-ng-number-input>`,
          imports,
          { formatOptions: { style: 'percent' } }
        );
        const host = wc(fixture.nativeElement);
        host.value = '15';
        await host.updateComplete;
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;
        const [, increment] = Array.from(
          host.shadowRoot.querySelectorAll('button')
        ) as HTMLButtonElement[];

        expect(input.value).toBe('15%');

        increment.click();
        await host.updateComplete;
        expect(input.value).toBe('20%');
      });

      it('should handle custom validate function with all return values (undefined/false/true)', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input
            type="text"
            label="NumberInput label"
            min="0"
            max="100"
            value="50">
          </cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;

        host.validate = (value) => {
          expect(typeof value).toBe('string');
          return false;
        };
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        await host.updateComplete;
        expect(host._getInputValidity()).toBe(false);
        expect(input.hasAttribute('data-invalid')).toBe(true);

        host.validate = () => true;
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        await host.updateComplete;
        expect(host._getInputValidity()).toBe(true);
        expect(input.hasAttribute('data-invalid')).toBe(false);

        host.validate = () => undefined;
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        await host.updateComplete;
        expect(host._getInputValidity()).toBe(true);
        expect(input.hasAttribute('data-invalid')).toBe(false);
      });

      it('should support custom validation with specific pattern rejection', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input
            type="text"
            label="NumberInput label"
            invalidText="only support 0-499 and 501-1000. you cannot select 500."
            min="0"
            max="1000">
          </cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;

        host.validate = (value) => {
          if (value === '500') {
            return false;
          }
          return true;
        };

        input.value = '500';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        await host.updateComplete;
        expect(host._getInputValidity()).toBe(false);
        expect(input.hasAttribute('data-invalid')).toBe(true);

        input.value = '499';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        expect(host.invalid).toBe(false);

        input.value = '501';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        expect(host.invalid).toBe(false);

        host.validate = () => undefined;
        input.value = '500';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        expect(host.invalid).toBe(false);
      });

      it('should emit numeric values in event detail for type="text" (steppers and blur)', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input
            type="text"
            label="NumberInput label"
            min="0"
            max="100"
            value="50">
          </cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;
        const [decrement, increment] = Array.from(
          host.shadowRoot.querySelectorAll('button')
        ) as HTMLButtonElement[];

        let lastEvent: any;
        host.addEventListener('cds-ng-number-input', (e) => {
          lastEvent = e;
        });

        increment.click();
        expect(typeof lastEvent.detail.value).toBe('number');
        expect(lastEvent.detail.value).toBe(51);

        decrement.click();
        expect(typeof lastEvent.detail.value).toBe('number');
        expect(lastEvent.detail.value).toBe(50);

        input.value = '75';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        input.dispatchEvent(
          new Event('blur', { bubbles: true, composed: true })
        );
        expect(typeof lastEvent.detail.value).toBe('number');
        expect(lastEvent.detail.value).toBe(75);
      });

      [
        { value: '1234', expected: '1,234', description: 'integer value' },
        {
          value: '1234.56',
          expected: '1,234.56',
          description: 'decimal value',
        },
        { value: '', expected: '', description: 'empty value' },
      ].forEach(({ value, expected, description }) => {
        it(`should preserve and format ${description} when switching from type="number" to type="text"`, async () => {
          const { fixture } = await render(
            `<cds-ng-number-input
              type="number"
              label="NumberInput label"
              value="${value}"></cds-ng-number-input>`,
            imports
          );
          const host = wc(fixture.nativeElement);
          const input = host.shadowRoot.querySelector(
            'input'
          ) as HTMLInputElement;

          expect(input.type).toBe('number');
          expect(input.value).toBe(value);

          host.type = 'text';
          await host.updateComplete;

          expect(input.type).toBe('text');
          expect(input.value).toBe(expected);
        });
      });

      it('should handle switching from text back to number type', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input
            type="number"
            value="1234.56"
            label="Label"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;

        expect(input.value).toBe('1234.56');

        host.type = 'text';
        await host.updateComplete;
        expect(input.value).toBe('1,234.56');

        host.type = 'number';
        await host.updateComplete;
        expect(input.value).toBe('1234.56');
        expect(host.value).toBe('1234.56');
      });

      it('should correctly format percentage on initial render', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input
            type="text"
            value="0.15"
            label="Percentage"
            [formatOptions]="formatOptions"></cds-ng-number-input>`,
          imports,
          { formatOptions: { style: 'percent' } }
        );
        const host = wc(fixture.nativeElement);
        await host.updateComplete;
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;
        expect(input.value).toBe('15%');
      });

      it('should correctly format percentage when formatOptions is set after value', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input
            type="text"
            value="0.15"
            label="Percentage"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        await host.updateComplete;

        host.formatOptions = { style: 'percent' };
        await host.updateComplete;

        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;
        expect(input.value).toBe('15%');
      });

      it('should preserve user-edited value when locale changes after editing', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input
            type="text"
            value="1000"
            locale="en-US"
            label="Number"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        await host.updateComplete;
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;

        expect(input.value).toBe('1,000');

        input.value = '2000';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        await host.updateComplete;

        input.dispatchEvent(
          new Event('blur', { bubbles: true, composed: true })
        );
        await host.updateComplete;

        expect(input.value).toBe('2,000');

        host.locale = 'de-DE';
        await host.updateComplete;
        expect(input.value).toBe('2.000');
      });

      it('should preserve user-edited value when formatOptions change after editing', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input
            type="text"
            value="50"
            label="Number"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        await host.updateComplete;
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;

        expect(input.value).toBe('50');

        input.value = '75';
        input.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
        await host.updateComplete;

        input.dispatchEvent(
          new Event('blur', { bubbles: true, composed: true })
        );
        await host.updateComplete;

        expect(input.value).toBe('75');

        host.formatOptions = { minimumFractionDigits: 2 };
        await host.updateComplete;
        expect(input.value).toBe('75.00');
      });

      it('should emit cds-number-input event when using keyboard arrows (ArrowUp/ArrowDown)', async () => {
        const { fixture } = await render(
          `<cds-ng-number-input
            type="text"
            value="50"
            label="Number"></cds-ng-number-input>`,
          imports
        );
        const host = wc(fixture.nativeElement);
        await host.updateComplete;
        const input = host.shadowRoot.querySelector(
          'input'
        ) as HTMLInputElement;

        let eventCount = 0;
        let lastEvent: any;
        host.addEventListener('cds-ng-number-input', (e) => {
          eventCount++;
          lastEvent = e;
        });

        const arrowUpEvent = new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          bubbles: true,
          composed: true,
        });
        input.dispatchEvent(arrowUpEvent);
        await host.updateComplete;

        expect(eventCount).toBe(1);
        expect(lastEvent.detail.value).toBe(51);
        expect(lastEvent.detail.direction).toBe('up');
        expect(input.value).toBe('51');
        expect(host.getAttribute('value')).toBe('51');

        const arrowDownEvent = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
          composed: true,
        });
        input.dispatchEvent(arrowDownEvent);
        await host.updateComplete;

        expect(eventCount).toBe(2);
        expect(lastEvent.detail.value).toBe(50);
        expect(lastEvent.detail.direction).toBe('down');
        expect(input.value).toBe('50');
        expect(host.getAttribute('value')).toBe('50');
      });
    });

    it('should not revert to defaultValue when deleting characters with type="text"', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input
          type="text"
          defaultValue="50"
          [allowEmpty]="true"
          label="NumberInput label"
          min="0"
          max="100"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;
      await host.updateComplete;

      expect(input.value).toBe('50');

      input.value = '5';
      input.dispatchEvent(
        new Event('input', { bubbles: true, composed: true })
      );
      await host.updateComplete;
      expect(input.value).toBe('5');

      input.value = '';
      input.dispatchEvent(
        new Event('input', { bubbles: true, composed: true })
      );
      await host.updateComplete;
      expect(input.value).toBe('');

      input.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
      await host.updateComplete;
      expect(input.value).toBe('');
    });
  });

  describe('Min/max validation for type="number"', () => {
    it('should show invalid state when value exceeds max', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input
          type="number"
          value="50"
          min="0"
          max="100"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;

      expect(host._getInputValidity()).toBe(true);
      expect(input.hasAttribute('data-invalid')).toBe(false);

      input.value = '5023';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await host.updateComplete;

      expect(host._getInputValidity()).toBe(false);
      expect(input.hasAttribute('data-invalid')).toBe(true);
      expect(host.value).toBe('5023');
    });

    it('should show invalid state when value is below min', async () => {
      const { fixture } = await render(
        `<cds-ng-number-input
          type="number"
          value="50"
          min="0"
          max="100"></cds-ng-number-input>`,
        imports
      );
      const host = wc(fixture.nativeElement);
      const input = host.shadowRoot.querySelector('input') as HTMLInputElement;

      input.value = '-10';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await host.updateComplete;

      expect(host._getInputValidity()).toBe(false);
      expect(input.hasAttribute('data-invalid')).toBe(true);
      expect(host.value).toBe('-10');
    });
  });
});
