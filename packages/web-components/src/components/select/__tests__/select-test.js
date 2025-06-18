/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/select/index.js';
import { html, fixture, expect, oneEvent } from '@open-wc/testing';

describe('cds-select', () => {
  const basicSelect = html`
    <cds-form-item>
      <cds-select label-text="Select label" helper-text="Helper text">
        <cds-select-item value="">Choose an option</cds-select-item>
        <cds-select-item value="option-1">Option 1</cds-select-item>
        <cds-select-item value="option-2" selected>Option 2</cds-select-item>
      </cds-select>
    </cds-form-item>
  `;

  it('should render default markup correctly', async () => {
    const el = await fixture(basicSelect);
    const select = el.querySelector('cds-select');
    expect(select).to.exist;
  });

  it('should reflect selected option value', async () => {
    const el = await fixture(basicSelect);
    const select = el.querySelector('cds-select');
    const internalSelect = select.shadowRoot.querySelector('select');
    expect(internalSelect.value).to.equal('option-2');
  });

  it('should render helper and label text', async () => {
    const el = await fixture(basicSelect);
    const select = el.querySelector('cds-select');
    const helper = select.shadowRoot.querySelector('.cds--form__helper-text');
    const label = select.shadowRoot.querySelector('label');
    expect(helper.textContent).to.include('Helper text');
    expect(label.textContent).to.include('Select label');
  });

  it('should support disabled', async () => {
    const el = await fixture(html`
      <cds-select disabled label-text="Select label">
        <cds-select-item value="option-1">Option 1</cds-select-item>
      </cds-select>
    `);
    const select = el.shadowRoot.querySelector('select');
    expect(select).to.have.attribute('disabled');
  });

  it('should support hide-label', async () => {
    const el = await fixture(html`
      <cds-select label-text="Hidden label" hide-label>
        <cds-select-item value="option-1">Option 1</cds-select-item>
      </cds-select>
    `);
    const label = el.shadowRoot.querySelector('label');
    expect(label).to.be.null;
  });

  it('should render invalid text', async () => {
    const el = await fixture(html`
      <cds-select label-text="Select" invalid invalid-text="This is an error">
        <cds-select-item value="1">One</cds-select-item>
      </cds-select>
    `);
    const error = el.shadowRoot.querySelector('.cds--form-requirement');
    expect(error).to.exist;
    expect(error.textContent).to.include('This is an error');
  });

  it('should render warning text', async () => {
    const el = await fixture(html`
      <cds-select label-text="Select" warn warn-text="This is a warning">
        <cds-select-item value="1">One</cds-select-item>
      </cds-select>
    `);
    const warning = el.shadowRoot.querySelector('.cds--form-requirement');
    expect(warning).to.exist;
    expect(warning.textContent).to.include('This is a warning');
  });

  it('should dispatch cds-select-selected when changed', async () => {
    const el = await fixture(html`
      <cds-select label-text="Select">
        <cds-select-item value="a">A</cds-select-item>
        <cds-select-item value="b">B</cds-select-item>
      </cds-select>
    `);

    const select = el.shadowRoot.querySelector('select');
    let receivedValue = null;
    el.addEventListener('cds-select-selected', (e) => {
      receivedValue = e.detail.value;
    });

    select.value = 'b';
    select.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(receivedValue).to.equal('b');
  });

  it('should apply inline style when "inline" is set', async () => {
    const el = await fixture(html`
      <cds-select label-text="Inline select" inline>
        <cds-select-item value="1">One</cds-select-item>
      </cds-select>
    `);
    expect(el.hasAttribute('inline')).to.be.true;
  });

  it('should render cds-select-skeleton correctly', async () => {
    const el = await fixture(html`<cds-select-skeleton></cds-select-skeleton>`);
    expect(el).to.exist;
  });

  it('should support AI label slot and apply slug', async () => {
    const el = await fixture(html`
      <cds-select label-text="With AI">
        <cds-ai-label slot="ai-label">AI Confidence</cds-ai-label>
        <cds-select-item value="1">One</cds-select-item>
      </cds-select>
    `);
    expect(el.hasAttribute('slug')).to.be.true;
    const ai = el.querySelector('cds-ai-label');
    expect(ai).to.exist;
    expect(ai.textContent).to.include('AI Confidence');
  });

  it('should support size property', async () => {
    const el = await fixture(html`
      <cds-select label-text="Sized select" size="sm">
        <cds-select-item value="1">One</cds-select-item>
      </cds-select>
    `);
    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('should receive focus via tab', async () => {
    const el = await fixture(html`
      <cds-select label-text="Focusable">
        <cds-select-item value="1">One</cds-select-item>
      </cds-select>
    `);
    const internalSelect = el.shadowRoot.querySelector('select');
    internalSelect.focus();
    expect(document.activeElement.shadowRoot.activeElement).to.equal(
      internalSelect
    );
  });

  it('should handle default value via property', async () => {
    const el = await fixture(html`
      <cds-select label-text="Default value">
        <cds-select-item value="a">A</cds-select-item>
        <cds-select-item value="b">B</cds-select-item>
      </cds-select>
    `);
    el.value = 'b';
    await el.updateComplete;

    const internalSelect = el.shadowRoot.querySelector('select');
    expect(internalSelect.value).to.equal('b');
  });

  it('should be accessible', async () => {
    const el = await fixture(basicSelect);
    await expect(el).to.be.accessible();
  });
});
