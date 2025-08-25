/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/text-input/index.js';
import { html, fixture, expect, oneEvent } from '@open-wc/testing';

describe('cds-text-input', () => {
  const defaultInput = html`
    <cds-text-input
      label-text="Text input label"
      placeholder="Placeholder text">
      <cds-text-input-label slot="label-text"
        >Text input label</cds-text-input-label
      >
    </cds-text-input>
  `;

  it('should render', async () => {
    const el = await fixture(defaultInput);
    const input = el.shadowRoot.querySelector('input');
    expect(input).to.exist;
  });

  it('should render label and placeholder', async () => {
    const el = await fixture(defaultInput);
    const label = el.shadowRoot.querySelector('label');
    const input = el.shadowRoot.querySelector('input');
    expect(label.textContent).to.include('Text input label');
    expect(input.placeholder).to.equal('Placeholder text');
  });

  it('should reflect value attribute to input', async () => {
    const el = await fixture(html`
      <cds-text-input value="hello" label-text="With value">
        <cds-text-input-label slot="label-text"
          >With value</cds-text-input-label
        >
      </cds-text-input>
    `);
    const input = el.shadowRoot.querySelector('input');
    expect(input.value).to.equal('hello');
  });

  it('should render helper text', async () => {
    const el = await fixture(html`
      <cds-text-input label-text="Text input" helper-text="Helpful info">
        <cds-text-input-label slot="label-text"
          >Text input</cds-text-input-label
        >
        <cds-text-input-helper slot="helper-text"
          >Helpful info</cds-text-input-helper
        >
      </cds-text-input>
    `);
    const helper = el.shadowRoot.querySelector('.cds--form__helper-text');
    expect(helper.textContent).to.include('Helpful info');
  });

  it('should apply disabled attribute', async () => {
    const el = await fixture(html`
      <cds-text-input disabled label-text="Disabled">
        <cds-text-input-label slot="label-text">Disabled</cds-text-input-label>
      </cds-text-input>
    `);
    const input = el.shadowRoot.querySelector('input');
    expect(input.disabled).to.be.true;
  });

  it('should apply readonly attribute', async () => {
    const el = await fixture(html`
      <cds-text-input readonly label-text="Readonly">
        <cds-text-input-label slot="label-text">Readonly</cds-text-input-label>
      </cds-text-input>
    `);
    const input = el.shadowRoot.querySelector('input');
    expect(input.readOnly).to.be.true;
  });

  it('should render invalid text', async () => {
    const el = await fixture(html`
      <cds-text-input
        invalid
        invalid-text="This is an error"
        label-text="Invalid input">
        <cds-text-input-label slot="label-text"
          >Invalid input</cds-text-input-label
        >
      </cds-text-input>
    `);
    const error = el.shadowRoot.querySelector('.cds--form-requirement');
    expect(error.textContent).to.include('This is an error');
  });

  it('should render warning text', async () => {
    const el = await fixture(html`
      <cds-text-input
        warn
        warn-text="This is a warning"
        label-text="Warn input">
        <cds-text-input-label slot="label-text"
          >Warn input</cds-text-input-label
        >
      </cds-text-input>
    `);
    const warning = el.shadowRoot.querySelector('.cds--form-requirement');
    expect(warning.textContent).to.include('This is a warning');
  });

  it('should reflect size attribute', async () => {
    const el = await fixture(html`
      <cds-text-input size="sm" label-text="Small input">
        <cds-text-input-label slot="label-text"
          >Small input</cds-text-input-label
        >
      </cds-text-input>
    `);
    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('should dispatch cds-text-input-input event', async () => {
    const el = await fixture(defaultInput);
    const input = el.shadowRoot.querySelector('input');

    setTimeout(() => {
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const event = await oneEvent(el, 'cds-text-input-input');
    expect(event).to.exist;
  });

  it('should reflect value set via attribute', async () => {
    // Setting the value property directly should update the internal input,
    // useful for controlled components (React-like behavior)
    const el = await fixture(html`
      <cds-text-input value="a" label-text="Controlled input">
        <cds-text-input-label slot="label-text"
          >Controlled input</cds-text-input-label
        >
      </cds-text-input>
    `);
    el.value = 'b';
    await el.updateComplete;
    const input = el.shadowRoot.querySelector('input');
    expect(input.value).to.equal('b');
  });

  it('should receive focus via keyboard', async () => {
    // This test is for parity with React keyboard behavior
    const el = await fixture(defaultInput);
    const input = el.shadowRoot.querySelector('input');
    input.focus();
    expect(document.activeElement.shadowRoot.activeElement).to.equal(input);
  });

  it('should apply class to outer host element', async () => {
    // For parity with React where className is forwarded
    const el = await fixture(html`
      <cds-text-input class="custom-class" label-text="Class test">
        <cds-text-input-label slot="label-text"
          >Class test</cds-text-input-label
        >
      </cds-text-input>
    `);
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should support data-* attributes', async () => {
    // Extra attributes are passed to host for parity with React
    const el = await fixture(html`
      <cds-text-input data-testid="my-input" label-text="Test ID">
        <cds-text-input-label slot="label-text">Test ID</cds-text-input-label>
      </cds-text-input>
    `);
    expect(el.getAttribute('data-testid')).to.equal('my-input');
  });

  it('should forward autocomplete attribute to input', async () => {
    // Ensures autocomplete prop is passed through for parity with React
    const el = await fixture(html`
      <cds-text-input autocomplete="on" label-text="Autocomplete">
        <cds-text-input-label slot="label-text"
          >Autocomplete</cds-text-input-label
        >
      </cds-text-input>
    `);
    const input = el.shadowRoot.querySelector('input');
    expect(input.autocomplete).to.equal('on');
  });

  it('should reflect password type on input', async () => {
    // Mirrors React parity — confirm password type is respected
    const el = await fixture(html`
      <cds-text-input type="password" label-text="Password">
        <cds-text-input-label slot="label-text">Password</cds-text-input-label>
      </cds-text-input>
    `);
    const input = el.shadowRoot.querySelector('input');
    expect(input.type).to.equal('password');
  });

  it('should be accessible', async () => {
    const el = await fixture(defaultInput);
    await expect(el).to.be.accessible();
  });

  it('should show password visibility toggle button and toggle type', async () => {
    const el = await fixture(html`
      <cds-text-input
        type="password"
        show-password-visibility-toggle
        label-text="Password">
        <cds-text-input-label slot="label-text">Password</cds-text-input-label>
      </cds-text-input>
    `);
    const button = el.shadowRoot.querySelector('button');
    const input = el.shadowRoot.querySelector('input');

    expect(button).to.exist;
    expect(input.type).to.equal('password');

    button.click();
    await el.updateComplete;

    expect(input.type).to.equal('text');
  });

  it('should not trigger click handler when disabled', async () => {
    let clicked = false;
    const el = await fixture(html`
      <cds-text-input
        disabled
        label-text="Disabled"
        @click=${() => {
          clicked = true;
        }}>
        <cds-text-input-label slot="label-text">Disabled</cds-text-input-label>
      </cds-text-input>
    `);
    const input = el.shadowRoot.querySelector('input');
    input.click();
    expect(clicked).to.be.false;
  });

  it('should render counter when enable-counter and max-count are set', async () => {
    const el = await fixture(html`
      <cds-text-input
        enable-counter
        max-count="10"
        value="1234"
        label-text="Counter test">
        <cds-text-input-label slot="label-text"
          >Counter test</cds-text-input-label
        >
      </cds-text-input>
    `);
    const counter = el.shadowRoot.querySelector(
      '.cds--text-input__label-counter'
    );
    expect(counter.textContent).to.include('4/10');
  });

  it('should apply hideLabel and visually hide the label', async () => {
    const el = await fixture(html`
      <cds-text-input hide-label label-text="Hidden label">
        <cds-text-input-label slot="label-text"
          >Hidden label</cds-text-input-label
        >
      </cds-text-input>
    `);
    const label = el.shadowRoot.querySelector('label');
    expect(label.classList.contains('cds--visually-hidden')).to.be.true;
  });

  it('should apply inline class', async () => {
    const el = await fixture(html`
      <cds-text-input inline label-text="Inline label">
        <cds-text-input-label slot="label-text"
          >Inline label</cds-text-input-label
        >
      </cds-text-input>
    `);
    const wrapper = el.shadowRoot.querySelector('.cds--text-input-wrapper');
    expect(wrapper.classList.contains('cds--text-input-wrapper--inline')).to.be
      .true;
  });
});
