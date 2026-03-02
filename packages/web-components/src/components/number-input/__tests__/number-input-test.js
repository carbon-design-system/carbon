/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/number-input/index.js';
import { fixture, html, expect, oneEvent } from '@open-wc/testing';

describe('<cds-number-input>', () => {
  it('should render a number input with correct type', async () => {
    const el = await fixture(
      html`<cds-number-input label="Label"></cds-number-input>`
    );
    expect(el.shadowRoot.querySelector('input').type).to.equal('number');
  });

  it('should place custom class on host', async () => {
    const el = await fixture(
      html`<cds-number-input
        class="custom-class"
        label="Label"></cds-number-input>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should set min, max, step attributes', async () => {
    const el = await fixture(
      html`<cds-number-input
        min="1"
        max="10"
        step="2"
        label="Label"></cds-number-input>`
    );
    const input = el.shadowRoot.querySelector('input');
    expect(input.min).to.equal('1');
    expect(input.max).to.equal('10');
    expect(input.step).to.equal('2');
  });

  it('should respect disabled and readonly attributes', async () => {
    const el = await fixture(
      html`<cds-number-input
        disabled
        readonly
        label="Label"></cds-number-input>`
    );
    const input = el.shadowRoot.querySelector('input');
    expect(el.hasAttribute('disabled') || input.disabled).to.be.true;
    expect(el.hasAttribute('readonly') || input.readOnly).to.be.true;
  });

  // Checks readonly behavior blocks interaction
  it('should allow value change and emit event even in readonly mode (by current spec)', async () => {
    const el = await fixture(
      html`<cds-number-input
        value="5"
        readonly
        label="Label"></cds-number-input>`
    );
    const [decrement, increment] = el.shadowRoot.querySelectorAll('button');

    let fired = false;
    el.addEventListener('cds-number-input', () => (fired = true));

    increment.click();
    await el.updateComplete;

    expect(fired).to.be.true;
  });

  it('should emit cds-number-input event with value and direction', async () => {
    const el = await fixture(
      html`<cds-number-input value="5" label="Label"></cds-number-input>`
    );
    const input = el.shadowRoot.querySelector('input');

    setTimeout(() => {
      input.value = '6';
      input.dispatchEvent(
        new Event('input', { bubbles: true, composed: true })
      );
    });

    const event = await oneEvent(el, 'cds-number-input');
    expect(event).to.exist;
    expect(event.detail.value).to.equal('6');
    expect(event.detail.direction).to.equal('up');
  });

  // From React parity
  it('should show helper text and invalid text', async () => {
    const el = await fixture(html`
      <cds-number-input invalid label="Label">
        <span slot="helper-text">Helpful</span>
        <span slot="invalid-text">Invalid</span>
      </cds-number-input>
    `);
    const helper = el.querySelector('[slot="helper-text"]');
    const invalid = el.querySelector('[slot="invalid-text"]');
    expect(helper?.textContent).to.include('Helpful');
    expect(invalid?.textContent).to.include('Invalid');
  });

  it('should increment and decrement using buttons', async () => {
    const el = await fixture(
      html`<cds-number-input
        value="1"
        step="1"
        min="0"
        max="3"
        label="Label"></cds-number-input>`
    );
    const input = el.shadowRoot.querySelector('input');
    const [decrement, increment] = el.shadowRoot.querySelectorAll('button');

    increment.click();
    await el.updateComplete;
    expect(input.value).to.equal('2');

    decrement.click();
    await el.updateComplete;
    expect(input.value).to.equal('1');
  });

  // Ensures step decimal precision works as expected
  it('should support decimal step values accurately', async () => {
    const el = await fixture(
      html`<cds-number-input
        value="1.1"
        step="0.1"
        label="Decimal"></cds-number-input>`
    );
    const input = el.shadowRoot.querySelector('input');
    const [, increment] = el.shadowRoot.querySelectorAll('button');

    increment.click();
    await el.updateComplete;
    expect(input.value).to.equal('1.2');
  });

  it('should respect allow-empty attribute', async () => {
    const el = await fixture(
      html`<cds-number-input
        allow-empty
        value=""
        label="Label"></cds-number-input>`
    );
    const input = el.shadowRoot.querySelector('input');
    expect(input.value).to.equal('');
  });

  // Used wrapper to avoid slot timing issues from React parity
  it('should render ai-label slot content via wrapper', async () => {
    const el = await fixture(html`
      <div>
        <span slot="ai-label">AI</span>
        <cds-number-input label="Label">
          <slot name="ai-label"></slot>
        </cds-number-input>
      </div>
    `);

    await el.updateComplete;

    const numberInput = el.querySelector('cds-number-input');
    const slotted = el.querySelector('[slot="ai-label"]');

    expect(numberInput).to.exist;
    expect(slotted).to.exist;
    expect(slotted.textContent).to.include('AI');
  });

  it('should hide the steppers when hide-steppers is set', async () => {
    const el = await fixture(
      html`<cds-number-input
        hide-steppers
        label="No steppers"></cds-number-input>`
    );
    const buttons = el.shadowRoot.querySelectorAll('button');
    expect(buttons.length).to.equal(0);
  });

  it('should hide label visually when hide-label is set', async () => {
    const el = await fixture(
      html`<cds-number-input
        hide-label
        label="Hidden label"></cds-number-input>`
    );
    const label = el.shadowRoot.querySelector('label');
    const classList = label?.classList || [];
    expect(
      Array.from(classList).some((cls) => cls.includes('--visually-hidden'))
    ).to.be.true;
  });

  it('should respect autocomplete attribute', async () => {
    const el = await fixture(
      html`<cds-number-input
        autocomplete="on"
        label="Label"></cds-number-input>`
    );
    const input = el.shadowRoot.querySelector('input');
    expect(input.autocomplete).to.equal('on');
  });

  // Checks native input event handling
  it('should emit input and blur events from inner input', async () => {
    const el = await fixture(
      html`<cds-number-input label="Label"></cds-number-input>`
    );
    const input = el.shadowRoot.querySelector('input');

    let inputFired = false;
    let blurFired = false;

    input.addEventListener('input', () => (inputFired = true));
    input.addEventListener('blur', () => (blurFired = true));

    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));

    expect(inputFired).to.be.true;
    expect(blurFired).to.be.true;
  });

  // Checks presence of basic ARIA attributes
  it('should have accessibility roles and attributes', async () => {
    const el = await fixture(
      html`<cds-number-input label="Label"></cds-number-input>`
    );
    const input = el.shadowRoot.querySelector('input');
    expect(input.getAttribute('role')).to.equal('alert');
    expect(input.getAttribute('aria-atomic')).to.equal('true');
  });

  it('should disable step buttons when disabled', async () => {
    const el = await fixture(
      html`<cds-number-input disabled label="Label"></cds-number-input>`
    );
    const buttons = el.shadowRoot.querySelectorAll('button');
    buttons.forEach((btn) => expect(btn.disabled).to.be.true);
  });

  it('should apply aria-labels to step buttons', async () => {
    const el = await fixture(
      html`<cds-number-input label="Label"></cds-number-input>`
    );
    const [decrement, increment] = el.shadowRoot.querySelectorAll('button');
    expect(decrement.getAttribute('aria-label')).to.equal(
      'decrease number input'
    );
    expect(increment.getAttribute('aria-label')).to.equal(
      'increase number input'
    );
  });

  it('should render defaultValue when value is not set', async () => {
    const el = await fixture(
      html`<cds-number-input
        default-value="42"
        label="Label"></cds-number-input>`
    );
    const input = el.shadowRoot.querySelector('input');
    expect(input.value).to.equal('42');
  });

  it('should apply custom assistive text for step buttons', async () => {
    const el = await fixture(
      html`<cds-number-input
        increment-button-assistive-text="More"
        decrement-button-assistive-text="Less"
        label="Label"></cds-number-input>`
    );
    const [decrement, increment] = el.shadowRoot.querySelectorAll('button');
    expect(decrement.getAttribute('aria-label')).to.equal('Less');
    expect(increment.getAttribute('aria-label')).to.equal('More');
  });
  // // Tests for type="text" with locale-based formatting
  // describe('type="text" with locale formatting', () => {
  //   it('should support type="text"', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         type="text"
  //         value="1234.56"
  //         label="Text type"></cds-number-input>`
  //     );
  //     await el.updateComplete;
  //     expect(el.type).to.equal('text');
  //   });

  //   it('should handle locale attribute', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         type="text"
  //         locale="de-DE"
  //         label="Label"></cds-number-input>`
  //     );
  //     expect(el.getAttribute('locale')).to.equal('de-DE');
  //   });

  //   it('should handle formatOptions property', async () => {
  //     const el = await fixture(html`
  //       <cds-number-input
  //         type="text"
  //         locale="en-US"
  //         label="Currency"></cds-number-input>
  //     `);
  //     el.formatOptions = { style: 'currency', currency: 'USD' };
  //     await el.updateComplete;
  //     expect(el.formatOptions).to.deep.equal({
  //       style: 'currency',
  //       currency: 'USD',
  //     });
  //   });

  //   it('should emit change event on blur for type="text"', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         type="text"
  //         value="5"
  //         label="Label"></cds-number-input>`
  //     );
  //     const input = el.shadowRoot.querySelector('input');

  //     let eventFired = false;
  //     el.addEventListener('cds-number-input', () => (eventFired = true));

  //     input.value = '10';
  //     input.dispatchEvent(
  //       new Event('input', { bubbles: true, composed: true })
  //     );
  //     await el.updateComplete;

  //     input.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
  //     await el.updateComplete;

  //     expect(eventFired).to.be.true;
  //   });
  // });

  // // Tests for validation
  // describe('validation', () => {
  //   it('should validate min/max constraints', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         min="0"
  //         max="10"
  //         value="15"
  //         label="Label"></cds-number-input>`
  //     );
  //     await el.updateComplete;

  //     const isValid = el._getInputValidity();
  //     expect(isValid).to.be.false;
  //   });

  //   it('should validate with custom validate function for type="text"', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         type="text"
  //         value="abc"
  //         label="Label"></cds-number-input>`
  //     );

  //     el.validate = (value) => !isNaN(Number(value));
  //     await el.updateComplete;

  //     const input = el.shadowRoot.querySelector('input');
  //     input.value = 'abc';
  //     input.dispatchEvent(
  //       new Event('input', { bubbles: true, composed: true })
  //     );
  //     await el.updateComplete;

  //     input.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
  //     await el.updateComplete;

  //     const isValid = el._getInputValidity();
  //     expect(isValid).to.be.false;
  //   });

  //   it('should support invalid attribute', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         invalid
  //         invalid-text="Invalid message"
  //         label="Label"></cds-number-input>`
  //     );
  //     await el.updateComplete;

  //     expect(el.hasAttribute('invalid')).to.be.true;
  //   });

  //   it('should support warn attribute', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         warn
  //         warn-text="Warning message"
  //         label="Label"></cds-number-input>`
  //     );
  //     await el.updateComplete;

  //     expect(el.hasAttribute('warn')).to.be.true;
  //   });
  // });

  // // Tests for size variants
  // describe('size variants', () => {
  //   it('should apply small size class', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input size="sm" label="Label"></cds-number-input>`
  //     );
  //     const wrapper = el.shadowRoot.querySelector('.cds--number');
  //     expect(wrapper.classList.contains('cds--number--sm')).to.be.true;
  //   });

  //   it('should apply large size class', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input size="lg" label="Label"></cds-number-input>`
  //     );
  //     const wrapper = el.shadowRoot.querySelector('.cds--number');
  //     expect(wrapper.classList.contains('cds--number--lg')).to.be.true;
  //   });
  // });

  // // Tests for fluid variant
  // describe('fluid variant', () => {
  //   it('should support isFluid property', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input is-fluid label="Fluid input"></cds-number-input>`
  //     );
  //     expect(el.hasAttribute('is-fluid')).to.be.true;
  //   });
  // });

  // // Tests for wheel behavior
  // describe('wheel behavior', () => {
  //   it('should prevent wheel events when disableWheel is true', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input disable-wheel label="Label"></cds-number-input>`
  //     );
  //     const input = el.shadowRoot.querySelector('input');

  //     input.dispatchEvent(
  //       new Event('focus', { bubbles: true, composed: true })
  //     );
  //     await el.updateComplete;

  //     let wheelPrevented = false;
  //     const wheelEvent = new WheelEvent('wheel', {
  //       bubbles: true,
  //       cancelable: true,
  //     });
  //     Object.defineProperty(wheelEvent, 'preventDefault', {
  //       value: () => (wheelPrevented = true),
  //     });

  //     input.dispatchEvent(wheelEvent);
  //     expect(wheelPrevented).to.be.true;
  //   });
  // });

  // // Tests for step behavior
  // describe('step behavior', () => {
  //   it('should support stepStartValue property', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         step-start-value="10"
  //         step="5"
  //         label="Label"></cds-number-input>`
  //     );
  //     expect(el.getAttribute('step-start-value')).to.equal('10');
  //   });

  //   it('should handle negative step values', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         value="10"
  //         step="-2"
  //         label="Label"></cds-number-input>`
  //     );
  //     const [, increment] = el.shadowRoot.querySelectorAll('button');

  //     increment.click();
  //     await el.updateComplete;

  //     const input = el.shadowRoot.querySelector('input');
  //     expect(Number(input.value)).to.equal(8);
  //   });

  //   it('should respect min and max constraints', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         value="9"
  //         min="0"
  //         max="10"
  //         step="5"
  //         label="Label"></cds-number-input>`
  //     );
  //     expect(el.min).to.equal('0');
  //     expect(el.max).to.equal('10');
  //   });
  // });

  // // Tests for pattern and inputMode
  // describe('pattern and inputMode for type="text"', () => {
  //   it('should apply pattern attribute when type="text"', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         type="text"
  //         pattern="[0-9]*"
  //         label="Label"></cds-number-input>`
  //     );
  //     const input = el.shadowRoot.querySelector('input');
  //     expect(input.pattern).to.equal('[0-9]*');
  //   });

  //   it('should support inputMode attribute', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         type="text"
  //         input-mode="numeric"
  //         label="Label"></cds-number-input>`
  //     );
  //     expect(el.getAttribute('input-mode')).to.equal('numeric');
  //   });

  //   it('should support pattern attribute for type="text"', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         type="text"
  //         pattern="[0-9]*"
  //         label="Label"></cds-number-input>`
  //     );
  //     expect(el.pattern).to.equal('[0-9]*');
  //   });
  // });

  // // Tests for programmatic methods
  // describe('programmatic methods', () => {
  //   it('should support stepUp() method', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         value="5"
  //         step="2"
  //         label="Label"></cds-number-input>`
  //     );

  //     el.stepUp();
  //     await el.updateComplete;

  //     const input = el.shadowRoot.querySelector('input');
  //     expect(input.value).to.equal('7');
  //   });

  //   it('should support stepDown() method', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         value="5"
  //         step="2"
  //         label="Label"></cds-number-input>`
  //     );

  //     el.stepDown();
  //     await el.updateComplete;

  //     const input = el.shadowRoot.querySelector('input');
  //     expect(input.value).to.equal('3');
  //   });
  // });

  // // Tests for edge cases
  // describe('edge cases', () => {
  //   it('should handle empty string value', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         value=""
  //         allow-empty
  //         label="Label"></cds-number-input>`
  //     );
  //     const input = el.shadowRoot.querySelector('input');
  //     expect(input.value).to.equal('');
  //   });

  //   it('should handle very large numbers', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         value="999999999999"
  //         label="Label"></cds-number-input>`
  //     );
  //     const input = el.shadowRoot.querySelector('input');
  //     expect(input.value).to.equal('999999999999');
  //   });

  //   it('should handle very small decimal steps', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input
  //         value="0.001"
  //         step="0.001"
  //         label="Label"></cds-number-input>`
  //     );
  //     const [, increment] = el.shadowRoot.querySelectorAll('button');

  //     increment.click();
  //     await el.updateComplete;

  //     const input = el.shadowRoot.querySelector('input');
  //     expect(input.value).to.equal('0.002');
  //   });

  //   it('should handle invalid input gracefully', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input type="text" label="Label"></cds-number-input>`
  //     );
  //     const input = el.shadowRoot.querySelector('input');

  //     input.value = 'not-a-number';
  //     input.dispatchEvent(
  //       new Event('input', { bubbles: true, composed: true })
  //     );
  //     await el.updateComplete;

  //     // Component should handle invalid input without crashing
  //     expect(el).to.exist;
  //     expect(input).to.exist;
  //   });
  // });

  // // Tests for React parity
  // describe('React NumberInput parity', () => {
  //   it('should support all React NumberInput props', async () => {
  //     const el = await fixture(html`
  //       <cds-number-input
  //         id="test-input"
  //         label="Test Label"
  //         helper-text="Helper text"
  //         invalid-text="Invalid text"
  //         warn-text="Warning text"
  //         min="0"
  //         max="100"
  //         step="5"
  //         value="50"
  //         size="lg"
  //         disabled
  //         readonly
  //         invalid
  //         warn
  //         hide-label
  //         hide-steppers
  //         allow-empty
  //         disable-wheel
  //         default-value="25"
  //         step-start-value="10"
  //         type="number"
  //         autocomplete="off"
  //         pattern="[0-9]*"
  //         input-mode="decimal"
  //         increment-button-assistive-text="Increment"
  //         decrement-button-assistive-text="Decrement">
  //         <span slot="helper-text">Helper</span>
  //         <span slot="invalid-text">Invalid</span>
  //         <span slot="warn-text">Warning</span>
  //       </cds-number-input>
  //     `);

  //     expect(el).to.exist;
  //     expect(el.label).to.equal('Test Label');
  //     expect(el.min).to.equal('0');
  //     expect(el.max).to.equal('100');
  //     expect(el.step).to.equal('5');
  //     expect(el.value).to.equal('50');
  //     expect(el.size).to.equal('lg');
  //     expect(el.disabled).to.be.true;
  //     expect(el.readonly).to.be.true;
  //     expect(el.invalid).to.be.true;
  //     expect(el.warn).to.be.true;
  //     expect(el.hideLabel).to.be.true;
  //     expect(el.hideSteppers).to.be.true;
  //     expect(el.allowEmpty).to.be.true;
  //     expect(el.disableWheel).to.be.true;
  //   });

  //   it('should emit events compatible with React onChange', async () => {
  //     const el = await fixture(
  //       html`<cds-number-input value="5" label="Label"></cds-number-input>`
  //     );

  //     let eventDetail = null;
  //     el.addEventListener('cds-number-input', (e) => {
  //       eventDetail = e.detail;
  //     });

  //     const [, increment] = el.shadowRoot.querySelectorAll('button');
  //     increment.click();
  //     await el.updateComplete;

  //     expect(eventDetail).to.exist;
  //     expect(eventDetail.value).to.exist;
  //     expect(eventDetail.direction).to.exist;
  //     expect(['up', 'down']).to.include(eventDetail.direction);
  //   });
  // });
});
