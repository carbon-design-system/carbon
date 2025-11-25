/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/fluid-password-input/index.js';
import { fixture, html, expect } from '@open-wc/testing';

describe('cds-fluid-password-input', () => {
  const defaultInput = html`
    <cds-fluid-password-input
      label="Password input label"
      placeholder="Placeholder text"
      helper-text="Helper text">
    </cds-fluid-password-input>
  `;

  it('should render', async () => {
    const el = await fixture(defaultInput);
    const input = el.shadowRoot.querySelector('input');
    expect(input).to.exist;
  });

  it('should support a custom class', async () => {
    const el = await fixture(
      html`<cds-fluid-password-input
        class="test-class"></cds-fluid-password-input>`
    );
    expect(el.classList.contains('test-class')).to.be.true;
  });

  it('should render label and placeholder', async () => {
    const el = await fixture(defaultInput);
    const label = el.shadowRoot.querySelector('label');
    const input = el.shadowRoot.querySelector('input');
    expect(label.textContent).to.include('Password input label');
    expect(input.placeholder).to.equal('Placeholder text');
  });

  it('should reflect value attribute to input', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input value="test123"> </cds-fluid-password-input>
    `);
    const input = el.shadowRoot.querySelector('input');
    expect(input.value).to.equal('test123');
  });

  it('should apply disabled attribute', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input disabled></cds-fluid-password-input>
    `);
    const input = el.shadowRoot.querySelector('input');
    expect(input.disabled).to.be.true;
  });

  it('should apply hide-label attribute', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input
        label="Password input label"
        hide-label></cds-fluid-password-input>
    `);
    const label = el.shadowRoot.querySelector('label');
    const classList = label?.classList || [];
    expect(
      Array.from(classList).some((cls) => cls.includes('--visually-hidden'))
    ).to.be.true;
  });

  it('should apply hide-password-label attribute', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input
        hide-password-label="Hide Password"></cds-fluid-password-input>
    `);

    const btn = el.shadowRoot.querySelector('button');
    btn.click();

    await el.updateComplete;
    const tooltipContent = el.shadowRoot.querySelector(
      'cds-tooltip-content#content'
    );
    expect(tooltipContent.textContent.trim()).to.equal('Hide Password');
  });

  it('should apply show-password-label attribute', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input
        show-password-label="Show Password"></cds-fluid-password-input>
    `);

    const tooltipContent = el.shadowRoot.querySelector(
      'cds-tooltip-content#content'
    );
    expect(tooltipContent.textContent.trim()).to.equal('Show Password');
  });

  it('should apply inline attribute', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input inline></cds-fluid-password-input>
    `);
    const wrapper = el.shadowRoot.querySelector('.cds--text-input-wrapper');
    const classList = wrapper?.classList || [];
    expect(
      Array.from(classList).some((cls) =>
        cls.includes('--text-input-wrapper--inline')
      )
    ).to.be.true;
  });

  it('should apply invalid attribute', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input
        invalid
        invalid-text="This is invalid text"></cds-fluid-password-input>
    `);

    const error = el.shadowRoot.querySelector('.cds--form-requirement');
    expect(error.textContent).to.include('This is invalid text');
  });

  it('should apply type attribute', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input type="text"></cds-fluid-password-input>
    `);

    expect(el.getAttribute('type')).to.equal('text');
  });

  it('should apply warn attribute', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input
        warn
        warn-text="This is warning text"></cds-fluid-password-input>
    `);

    const warning = el.shadowRoot.querySelector('.cds--form-requirement');
    expect(warning.textContent).to.include('This is warning text');
  });

  it('should call onTogglePasswordVisibility when visibility button is clicked', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input></cds-fluid-password-input>
    `);

    const tooltip = el.shadowRoot.querySelector('cds-tooltip-content#content');
    expect(tooltip.textContent.trim()).to.equal('Show password');

    const btn = el.shadowRoot.querySelector('button');
    btn.click();
    await el.updateComplete;

    expect(tooltip.textContent.trim()).to.equal('Hide password');
  });

  it('should apply readonly attribute', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input readonly></cds-fluid-password-input>
    `);
    const input = el.shadowRoot.querySelector('input');
    expect(input.readOnly).to.be.true;
  });

  it('should disable hide/show password toggle button when readonly is true', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input readonly></cds-fluid-password-input>
    `);
    await el.updateComplete;

    const toggleButton = el.shadowRoot.querySelector('button[type="button"]');
    expect(toggleButton.disabled).to.be.true;
  });

  it('should not allow input change when readOnly is true', async () => {
    const el = await fixture(html`
      <cds-fluid-password-input readonly></cds-fluid-password-input>
    `);
    await el.updateComplete;

    const inputElement = el.shadowRoot.querySelector('input');
    inputElement.focus();

    // simulate a user typing “a”
    inputElement.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'a',
        bubbles: true,
        cancelable: true,
      })
    );
    inputElement.dispatchEvent(
      new KeyboardEvent('keypress', {
        key: 'a',
        bubbles: true,
        cancelable: true,
      })
    );
    inputElement.dispatchEvent(
      new InputEvent('input', {
        data: 'a',
        bubbles: true,
        cancelable: true,
      })
    );

    await el.updateComplete;

    expect(el.value).to.equal('', 'host.value remains empty');
    expect(inputElement.value).to.equal('', 'input.value remains empty');
  });
});
