/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/radio-button/index.js';
import { html, fixture, expect } from '@open-wc/testing';

describe('cds-radio-button', () => {
  const basicRadioButton = html` <cds-radio-button></cds-radio-button> `;

  it('should render', async () => {
    const el = await fixture(basicRadioButton);
    expect(el).to.exist;
  });

  it('should render with <input type="radio">', async () => {
    const el = await fixture(basicRadioButton);
    const input = el.shadowRoot.querySelector('input[type="radio"]');
    expect(input).to.exist;
  });

  it('should support a custom class', async () => {
    const el = await fixture(
      html`<cds-radio-button class="test-class"></cds-radio-button>`
    );
    expect(el.classList.contains('test-class')).to.be.true;
  });

  it('should reflect checked state when attribute is set', async () => {
    const el = await fixture(html`
      <cds-radio-button checked></cds-radio-button>
    `);
    const input = el.shadowRoot.querySelector('input[type="radio"]');
    expect(input.checked).to.be.true;
  });

  it('should label the <input> with label-text', async () => {
    const el = await fixture(html`
      <cds-radio-button label-text="test-label"></cds-radio-button>
    `);
    const labelNode = el.shadowRoot?.querySelector(
      '.cds--radio-button__label-text'
    );
    expect(labelNode?.textContent).to.contain('test-label');
  });

  it('should set the "required" attribute on the <input>', async () => {
    const el = await fixture(
      html`<cds-radio-button required></cds-radio-button>`
    );
    expect(el).to.have.attribute('required');
  });

  it('should update AILabel size', async () => {
    const el = await fixture(html`
      <cds-radio-button>
        <cds-ai-label slot="ai-label" kind="inline"> </cds-ai-label>
      </cds-radio-button>
    `);

    const aiLabel = el.querySelector(`cds-ai-label`);
    expect(aiLabel?.getAttribute('size')).to.equal('md');

    const btn = aiLabel?.shadowRoot?.querySelector(`.cds--ai-label__button`);
    if (btn) {
      const classList = btn?.classList || [];
      expect(
        Array.from(classList).some((cls) =>
          cls.includes('--text-input-wrapper--inline')
        )
      ).to.be.true;
    }
  });

  it('should not toggle when readonly radio is clicked', async () => {
    const el = await fixture(
      html`<cds-radio-button readOnly value="test-value"></cds-radio-button>`
    );
    const input = el.shadowRoot.querySelector('input[type="radio"]');

    el.click();
    await el.updateComplete;

    expect(el.checked).to.be.false;
    expect(input?.checked).to.be.false;
  });

  it('should not toggle when readonly radio receives keyboard activation', async () => {
    const el = await fixture(
      html`<cds-radio-button readOnly value="test-value"></cds-radio-button>`
    );
    const keyboardEvent = new KeyboardEvent('keydown', {
      key: ' ',
      bubbles: true,
      composed: true,
    });

    el.dispatchEvent(keyboardEvent);
    await el.updateComplete;

    expect(el.checked).to.be.false;
  });

  it('should set aria-readonly on the inner input when readonly', async () => {
    const el = await fixture(
      html`<cds-radio-button readOnly value="test-value"></cds-radio-button>`
    );
    const input = el.shadowRoot.querySelector('input[type="radio"]');

    expect(input?.getAttribute('aria-readonly')).to.equal('true');
  });
});
