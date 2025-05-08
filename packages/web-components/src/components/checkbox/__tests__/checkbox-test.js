/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/checkbox/index.js';

describe('cds-checkbox', function () {
  it('should render', async () => {
    const checkbox = html`<cds-checkbox>Checkbox Label</cds-checkbox>`;
    const el = await fixture(checkbox);
    await expect(el).dom.to.equalSnapshot();
  });

  it('should set the `id` on the <input> element', async () => {
    const checkbox = html`<cds-checkbox id="test"></cds-checkbox>`;
    const el = await fixture(checkbox);
    const inputElement = el.shadowRoot.querySelector('input');

    expect(inputElement.getAttribute('id')).to.equal('test');
  });

  it('should label the input by the given label-text', async () => {
    const checkbox = html`<cds-checkbox>test label</cds-checkbox>`;
    const el = await fixture(checkbox);

    expect(el.textContent.trim()).to.equal('test label');
  });

  it('should use default-checked to set the default value of the <input> checkbox', async () => {
    const checkbox = html`<cds-checkbox default-checked
      >Checkbox Label</cds-checkbox
    >`;
    const el = await fixture(checkbox);

    const inputElement = el.shadowRoot.querySelector('input');

    expect(inputElement.hasAttribute('checked')).to.be.true;
  });

  it('should disable the <input> if disabled is provided as an attribute', async () => {
    const checkbox = html`<cds-checkbox disabled>Checkbox Label</cds-checkbox>`;
    const el = await fixture(checkbox);

    const inputElement = el.shadowRoot.querySelector('input');
    expect(inputElement.hasAttribute('disabled')).to.be.true;
  });

  it('should set checked on the <input> if checked is provided as a prop', async () => {
    const checked = html`<cds-checkbox checked>Checkbox Label</cds-checkbox>`;
    const el = await fixture(checked);

    const inputElement = el.shadowRoot.querySelector('input');
    expect(inputElement.hasAttribute('checked')).to.be.true;

    const notChecked = html`<cds-checkbox>Checkbox Label</cds-checkbox>`;
    const elem = await fixture(notChecked);

    const inputElem = elem.shadowRoot.querySelector('input');
    expect(inputElem.hasAttribute('checked')).to.be.false;
  });

  it('should hide the label if hide-label is provided as an attribute', async () => {
    const checkbox = html`<cds-checkbox hide-label
      >Checkbox Label</cds-checkbox
    >`;
    const el = await fixture(checkbox);

    const labelSpanElement = el.shadowRoot.querySelector('label span');
    expect(labelSpanElement.classList.contains('cds--visually-hidden')).to.be
      .true;
  });

  it('should render helper-text', async () => {
    const checkbox = html`<cds-checkbox helper-text="Helper text"
      >Checkbox Label</cds-checkbox
    >`;
    const el = await fixture(checkbox);

    const helper = el.shadowRoot.querySelector('.cds--form__helper-text');

    expect(helper).to.exist;
    expect(helper.textContent.trim()).to.equal('Helper text');
  });

  it('should set data-invalid when invalid attribute is true', async () => {
    const checkbox = html`<cds-checkbox invalid>Checkbox Label</cds-checkbox>`;
    const el = await fixture(checkbox);

    const inputElement = el.shadowRoot.querySelector('input');
    expect(inputElement.hasAttribute('data-invalid')).to.be.true;
  });

  it('should display invalid-text if invalid prop is true', async () => {
    const checkbox = html`<cds-checkbox invalid invalid-text="Invalid text"
      >Checkbox Label</cds-checkbox
    >`;
    const el = await fixture(checkbox);

    const invalidText = el.shadowRoot.querySelector('.cds--form-requirement');

    expect(invalidText).to.exist;
    expect(invalidText.textContent.trim()).to.equal('Invalid text');
  });

  it('should respect readOnly prop', async () => {
    const checkbox = html`<cds-checkbox readOnly>Checkbox Label</cds-checkbox>`;
    const el = await fixture(checkbox);

    const inputElement = el.shadowRoot.querySelector('input');
    expect(inputElement.hasAttribute('aria-readonly')).to.be.true;
  });

  it('should respect warn prop', async () => {
    const checkbox = html`<cds-checkbox warn>Checkbox Label</cds-checkbox>`;
    const el = await fixture(checkbox);

    const warnIcon = el.shadowRoot.querySelector(
      '.cds--checkbox__invalid-icon--warning'
    );
    expect(warnIcon).to.exist;
  });

  it('should display warn-text if warn prop is true', async () => {
    const checkbox = html`<cds-checkbox warn warn-text="Warn text"
      >Checkbox Label</cds-checkbox
    >`;
    const el = await fixture(checkbox);

    const warnText = el.shadowRoot.querySelector('.cds--form-requirement');

    expect(warnText).to.exist;
    expect(warnText.textContent.trim()).to.equal('Warn text');
  });

  it('should fire cds-checkbox-changed event when checkbox is changed', async () => {
    const checkbox = html`<cds-checkbox>Checkbox Label</cds-checkbox>`;
    const el = await fixture(checkbox);

    await el.updateComplete;

    const inputElement = el.shadowRoot.querySelector('input');
    const listener = oneEvent(el, 'cds-checkbox-changed');
    inputElement.click();
    const event = await listener;

    expect(event).to.exist;
    expect(event.detail).to.deep.equal({
      checked: true,
      indeterminate: false,
    });
  });

  it('should NOT fire cds-checkbox-changed event when readonly', async () => {
    const checkbox = html`<cds-checkbox readOnly>Checkbox Label</cds-checkbox>`;
    const el = await fixture(checkbox);

    await el.updateComplete;

    const inputElement = el.shadowRoot.querySelector('input');

    const eventPromise = oneEvent(el, 'cds-checkbox-changed');
    inputElement.click();

    // Resolves if no event is fired and rejects if event is fired to prevent
    // the test from hanging.
    const result = await Promise.race([
      eventPromise.then(() => 'cds-checkbox-changed event fired'),
      new Promise((resolve) => setTimeout(() => resolve('timeout'), 100)),
    ]);

    expect(result).to.equal(
      'timeout',
      'cds-checkbox-changed event should not fire when readonly'
    );
  });

  it('should respect deprecated slug prop', async () => {
    const checkbox = html` <cds-checkbox>
      <cds-ai-label slot="slug" alignment="bottom-left">
        <div slot="body-text">
          <p class="secondary">AI Explained</p>
          <h2 class="ai-label-heading">84%</h2>
          <p class="secondary bold">Confidence score</p>
          <p class="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p class="secondary">Model type</p>
          <p class="bold">Foundation model</p>
        </div>
      </cds-ai-label>
    </cds-checkbox>`;
    const el = await fixture(checkbox);

    const slot = el.shadowRoot.querySelector('slot[name="slug"]');
    const assigned = slot.assignedNodes({ flatten: true });

    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });

  it('should respect decorator prop', async () => {
    const checkbox = html` <cds-checkbox>
      <cds-ai-label slot="decorator" alignment="bottom-left">
        <div slot="body-text">
          <p class="secondary">AI Explained</p>
          <h2 class="ai-label-heading">84%</h2>
          <p class="secondary bold">Confidence score</p>
          <p class="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p class="secondary">Model type</p>
          <p class="bold">Foundation model</p>
        </div>
      </cds-ai-label>
    </cds-checkbox>`;
    const el = await fixture(checkbox);

    const slot = el.shadowRoot.querySelector('slot[name="decorator"]');
    const assigned = slot.assignedNodes({ flatten: true });

    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });

  it('should set size to "md" when decorator kind is "inline"', async () => {
    const checkbox = html` <cds-checkbox>
      <cds-ai-label slot="decorator" kind="inline" alignment="bottom-left">
        <div slot="body-text">
          <p class="secondary">AI Explained</p>
          <h2 class="ai-label-heading">84%</h2>
          <p class="secondary bold">Confidence score</p>
          <p class="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p class="secondary">Model type</p>
          <p class="bold">Foundation model</p>
        </div>
      </cds-ai-label>
    </cds-checkbox>`;
    const el = await fixture(checkbox);

    const slot = el.shadowRoot.querySelector('slot[name="decorator"]');
    const assigned = slot.assignedNodes({ flatten: true });

    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
    expect(aiLabel.getAttribute('size')).to.equal('md');
  });
});
