/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/checkbox/index.js';

describe('cds-checkbox-group', function () {
  it('should render', async () => {
    const group = html`<cds-checkbox-group
      legend-text="Checkbox heading"></cds-checkbox-group>`;
    const el = await fixture(group);
    await expect(el).dom.to.equalSnapshot();
  });

  it('should render helper-text', async () => {
    const group = html`<cds-checkbox-group
      legend-text="Checkbox heading"
      helper-text="Helper text"></cds-checkbox-group>`;
    const el = await fixture(group);

    const helperText = el.shadowRoot.querySelector('.cds--form__helper-text');

    expect(helperText).to.exist;
    expect(helperText.textContent.trim()).to.equal('Helper text');
  });

  it('should set data-invalid when invalid attribute is true', async () => {
    const group = html` <cds-checkbox-group
      invalid
      legend-text="Checkbox heading">
      <cds-checkbox default-checked>Checkbox label</cds-checkbox>
      <cds-checkbox>Checkbox label</cds-checkbox>
    </cds-checkbox-group>`;
    const el = await fixture(group);

    const fieldsetElement = el.shadowRoot.querySelector('fieldset');
    expect(fieldsetElement.hasAttribute('data-invalid')).to.be.true;
  });

  it('should display invalid-text if invalid attribute is true', async () => {
    const group = html` <cds-checkbox-group
      invalid
      invalid-text="Invalid text"
      legend-text="Checkbox heading">
      <cds-checkbox default-checked>Checkbox label</cds-checkbox>
      <cds-checkbox>Checkbox label</cds-checkbox>
    </cds-checkbox-group>`;
    const el = await fixture(group);

    const invalidText = el.shadowRoot.querySelector('.cds--form-requirement');

    expect(invalidText).to.exist;
    expect(invalidText.textContent.trim()).to.equal('Invalid text');
  });

  it('should render legend-text', async () => {
    const group = html`<cds-checkbox-group
      legend-text="Checkbox heading"></cds-checkbox-group>`;
    const el = await fixture(group);

    const legend = el.shadowRoot.querySelector('legend');

    expect(legend).to.exist;
    expect(legend.textContent.trim()).to.equal('Checkbox heading');
  });

  it('should respect readOnly prop', async () => {
    const group = html` <cds-checkbox-group
      legend-text="Checkbox heading"
      readOnly>
      <cds-checkbox default-checked>Checkbox label</cds-checkbox>
      <cds-checkbox>Checkbox label</cds-checkbox>
    </cds-checkbox-group>`;
    const el = await fixture(group);

    const fieldsetElement = el.shadowRoot.querySelector('fieldset');
    expect(fieldsetElement.hasAttribute('aria-disabled')).to.be.true;
  });

  it('should respect warn prop', async () => {
    const group = html` <cds-checkbox-group legend-text="Checkbox heading" warn>
      <cds-checkbox default-checked>Checkbox label</cds-checkbox>
      <cds-checkbox>Checkbox label</cds-checkbox>
    </cds-checkbox-group>`;
    const el = await fixture(group);

    const warnIcon = el.shadowRoot.querySelector(
      '.cds--checkbox__invalid-icon--warning'
    );
    expect(warnIcon).to.exist;
  });

  it('should display warn-text if warn attribute is true', async () => {
    const group = html` <cds-checkbox-group
      legend-text="Checkbox heading"
      warn
      warn-text="Warn text">
      <cds-checkbox default-checked>Checkbox label</cds-checkbox>
      <cds-checkbox>Checkbox label</cds-checkbox>
    </cds-checkbox-group>`;
    const el = await fixture(group);

    const warnText = el.shadowRoot.querySelector('.cds--form-requirement');

    expect(warnText).to.exist;
    expect(warnText.textContent.trim()).to.equal('Warn text');
  });

  it('should respect deprecated slug prop', async () => {
    const group = html` <cds-checkbox-group legend-text="Checkbox heading">
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
    </cds-checkbox-group>`;
    const el = await fixture(group);

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
    const group = html` <cds-checkbox-group legend-text="Checkbox heading">
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
    </cds-checkbox-group>`;
    const el = await fixture(group);

    const slot = el.shadowRoot.querySelector('slot[name="decorator"]');
    const assigned = slot.assignedNodes({ flatten: true });

    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });

  it('should render checkboxes horizontally', async () => {
    const group = html` <cds-checkbox-group
      orientation="horizontal"
      legend-text="test-horizontal-prop">
      <cds-checkbox>Checkbox label 1</cds-checkbox>
      <cds-checkbox>Checkbox label 2</cds-checkbox>
      <cds-checkbox>Checkbox label 3</cds-checkbox>
    </cds-checkbox-group>`;

    const el = await fixture(group);

    const fieldsetElement = el.shadowRoot.querySelector('fieldset');
    expect(
      fieldsetElement.classList.contains('cds--checkbox-group--horizontal')
    ).to.be.true;
  });
});
