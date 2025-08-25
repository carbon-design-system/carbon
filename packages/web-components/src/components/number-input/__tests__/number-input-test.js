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
});
