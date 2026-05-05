/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/fluid-combo-box/index.js';
import '@carbon/web-components/es/components/ai-label/index.js';

const fluidComboBox = html`
  <cds-fluid-combo-box title-text="Combo box Label">
    <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
    <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
    <cds-combo-box-item value="option-3">Option 3</cds-combo-box-item>
  </cds-fluid-combo-box>
`;

const fluidComboBoxWithValue = (value) => html`
  <cds-fluid-combo-box title-text="Combo box Label" value="${value}">
    <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
    <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
    <cds-combo-box-item value="option-3">Option 3</cds-combo-box-item>
  </cds-fluid-combo-box>
`;

const getInput = (el) => el.shadowRoot.querySelector('#trigger-button');
const getItems = (el) => el.querySelectorAll('cds-combo-box-item');
const getListBox = (el) => el.shadowRoot.querySelector('.cds--list-box');

const waitForUpdates = async (el) => {
  await el.updateComplete;
  await Promise.resolve();
};

const openMenu = async (el) => {
  getInput(el).click();
  await waitForUpdates(el);
};

const setInputValue = async (el, value) => {
  const input = getInput(el);
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  await waitForUpdates(el);
};

describe('cds-fluid-combo-box', function () {
  it('should render', async () => {
    const el = await fixture(fluidComboBox);
    expect(el).to.exist;
  });

  it('should render title text', async () => {
    const el = await fixture(fluidComboBox);
    const titleText = el.shadowRoot.querySelector('.cds--label');
    expect(titleText.textContent.trim()).to.equal('Combo box Label');
  });

  it('should have combo box items', async () => {
    const el = await fixture(fluidComboBox);
    const items = getItems(el);
    expect(items.length).to.equal(3);
  });

  it('should open when clicking the input', async () => {
    const el = await fixture(fluidComboBox);

    expect(el.open).to.be.false;
    await openMenu(el);
    expect(el.open).to.be.true;
  });

  it('should call cds-combo-box-selected when selection is cleared', async () => {
    const el = await fixture(fluidComboBoxWithValue('option-1'));
    await waitForUpdates(el);
    const selectedEvents = [];

    el.addEventListener('cds-combo-box-selected', (event) => {
      selectedEvents.push(event.detail);
    });

    await setInputValue(el, 'Option 1');
    await waitForUpdates(el);

    const clearButton = el.shadowRoot.querySelector('#selection-button');
    expect(clearButton).to.exist;
    clearButton.click();
    await waitForUpdates(el);

    expect(el.value).to.equal('');
    expect(getInput(el).value).to.equal('');
    expect(selectedEvents.length).to.equal(1);
    expect(selectedEvents[0].item).to.equal(undefined);
  });

  it('should not allow selecting a disabled option on click', async () => {
    const el = await fixture(html`
      <cds-fluid-combo-box title-text="Combo box Label">
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="option-2" disabled
          >Option 2</cds-combo-box-item
        >
      </cds-fluid-combo-box>
    `);

    await openMenu(el);
    el.querySelector('cds-combo-box-item[value="option-2"]').click();
    await waitForUpdates(el);

    expect(el.value).to.equal('');
  });

  it('should not let the user expand the menu when disabled', async () => {
    const el = await fixture(html`
      <cds-fluid-combo-box title-text="Combo box Label" disabled>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-fluid-combo-box>
    `);
    const input = getInput(el);

    expect(input.disabled).to.be.true;
    input.click();
    await waitForUpdates(el);

    expect(el.open).to.be.false;
  });

  it('should not let the user expand the menu when readonly', async () => {
    const el = await fixture(html`
      <cds-fluid-combo-box title-text="Combo box Label" read-only>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-fluid-combo-box>
    `);
    const input = getInput(el);

    expect(input.readOnly).to.be.true;
    input.click();
    await waitForUpdates(el);

    expect(el.open).to.be.false;
  });

  it('should clear input on blur when no selected item exists and allow-custom-value is false', async () => {
    const el = await fixture(fluidComboBox);

    await setInputValue(el, 'no-match');
    getInput(el).dispatchEvent(
      new FocusEvent('focusout', {
        bubbles: true,
        composed: true,
        relatedTarget: document.body,
      })
    );
    await waitForUpdates(el);

    expect(el.value).to.equal('');
    expect(getInput(el).value).to.equal('');
  });

  it('should clear input when closing with trigger if no item matches and allow-custom-value is false', async () => {
    const el = await fixture(fluidComboBox);

    await setInputValue(el, 'xyz');
    expect(el.open).to.be.true;
    expect(getInput(el).value).to.equal('xyz');

    getInput(el).click();
    await waitForUpdates(el);

    expect(el.open).to.be.false;
    expect(el.value).to.equal('');
    expect(getInput(el).value).to.equal('');
  });

  it('should restore filtered items visibility after closing the menu', async () => {
    const el = await fixture(html`
      <cds-fluid-combo-box title-text="Combo box Label" should-filter-item>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
      </cds-fluid-combo-box>
    `);
    const items = getItems(el);

    await setInputValue(el, '2');
    expect(items[0].style.display).to.equal('none');
    expect(items[1].style.display).to.equal('');

    getInput(el).click();
    await waitForUpdates(el);

    expect(items[0].style.display).to.equal('');
    expect(items[1].style.display).to.equal('');
  });

  it('should open the menu when Enter is pressed with an empty input', async () => {
    const el = await fixture(fluidComboBox);
    const items = getItems(el);

    getInput(el).focus();
    await sendKeys({ press: 'Enter' });
    await waitForUpdates(el);

    expect(el.open).to.be.true;
    items.forEach((item) => {
      expect(item.selected).to.be.false;
    });
  });

  it('should support should-filter-item=true filtering and highlight the first match', async () => {
    const el = await fixture(html`
      <cds-fluid-combo-box title-text="Combo box Label" should-filter-item>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
        <cds-combo-box-item value="option-3">Option 3</cds-combo-box-item>
      </cds-fluid-combo-box>
    `);
    const items = getItems(el);

    await setInputValue(el, '3');

    expect(el.open).to.be.true;
    expect(items[0].style.display).to.equal('none');
    expect(items[1].style.display).to.equal('none');
    expect(items[2].style.display).to.equal('');
    expect(items[2].highlighted).to.be.true;
  });

  it('should close the menu on Escape when open', async () => {
    const el = await fixture(fluidComboBox);

    await openMenu(el);
    getInput(el).focus();
    await sendKeys({ press: 'Escape' });
    await waitForUpdates(el);

    expect(el.open).to.be.false;
  });

  it('should keep custom value on Enter when allow-custom-value is set', async () => {
    const el = await fixture(html`
      <cds-fluid-combo-box title-text="Combo box Label" allow-custom-value>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
      </cds-fluid-combo-box>
    `);

    await setInputValue(el, 'Apple');
    getInput(el).focus();
    await sendKeys({ press: 'Enter' });
    await waitForUpdates(el);

    expect(el.open).to.be.false;
    expect(el.value).to.equal('Apple');
    expect(getInput(el).value).to.equal('Apple');
  });

  it('should keep custom value on blur when allow-custom-value is set', async () => {
    const el = await fixture(html`
      <cds-fluid-combo-box title-text="Combo box Label" allow-custom-value>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-fluid-combo-box>
    `);

    await setInputValue(el, 'Apple');
    getInput(el).dispatchEvent(
      new FocusEvent('focusout', {
        bubbles: true,
        composed: true,
        relatedTarget: document.body,
      })
    );
    await waitForUpdates(el);

    expect(el.value).to.equal('Apple');
    expect(getInput(el).value).to.equal('Apple');
  });

  it('should emit custom value through cds-combo-box-selected when allow-custom-value is set', async () => {
    const el = await fixture(html`
      <cds-fluid-combo-box title-text="Combo box Label" allow-custom-value>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-fluid-combo-box>
    `);
    let latestDetail;

    el.addEventListener('cds-combo-box-selected', (event) => {
      latestDetail = event.detail;
    });

    await setInputValue(el, 'Apple');
    getInput(el).focus();
    await sendKeys({ press: 'Enter' });
    await waitForUpdates(el);

    expect(latestDetail.item).to.equal(null);
    expect(latestDetail.value).to.equal('Apple');
  });

  it('should support AI Label decorator', async () => {
    const el = await fixture(html`
      <cds-fluid-combo-box title-text="Combo box Label">
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-ai-label slot="ai-label">AI</cds-ai-label>
      </cds-fluid-combo-box>
    `);

    await el.updateComplete;

    expect(el.hasAttribute('ai-label')).to.be.true;

    const aiLabel = el.querySelector('cds-ai-label');
    expect(aiLabel).to.exist;
  });

  describe('condensed mode', () => {
    it('should apply condensed attribute when is-condensed is set', async () => {
      const el = await fixture(html`
        <cds-fluid-combo-box is-condensed title-text="Combo box Label">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-fluid-combo-box>
      `);

      await el.updateComplete;

      expect(el.isCondensed).to.be.true;
      expect(el.hasAttribute('is-condensed')).to.be.true;
    });

    it('should not apply condensed attribute by default', async () => {
      const el = await fixture(fluidComboBox);

      await el.updateComplete;

      expect(el.isCondensed).to.be.false;
      expect(el.hasAttribute('is-condensed')).to.be.false;
    });
  });

  describe('invalid and warn states', () => {
    it('should not display invalid state when readonly', async () => {
      const el = await fixture(html`
        <cds-fluid-combo-box read-only invalid invalid-text="Invalid text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-fluid-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.false;
      expect(el.shadowRoot.textContent).not.to.contain('Invalid text');
    });

    it('should not display invalid state when disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-combo-box disabled invalid invalid-text="Invalid text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-fluid-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.false;
      expect(el.shadowRoot.textContent).not.to.contain('Invalid text');
    });

    it('should not display warn state when readonly', async () => {
      const el = await fixture(html`
        <cds-fluid-combo-box read-only warn warn-text="Warning text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-fluid-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;
      expect(el.shadowRoot.textContent).not.to.contain('Warning text');
    });

    it('should not display warn state when disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-combo-box disabled warn warn-text="Warning text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-fluid-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;
      expect(el.shadowRoot.textContent).not.to.contain('Warning text');
    });

    it('should display invalid state when not readonly or disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-combo-box invalid invalid-text="Invalid text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-fluid-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.true;
      expect(el.shadowRoot.textContent).to.contain('Invalid text');
    });

    it('should display warn state when not readonly or disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-combo-box warn warn-text="Warning text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-fluid-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--warn')).to.be.true;
      expect(el.shadowRoot.textContent).to.contain('Warning text');
    });
  });

  describe('cds-fluid-combo-box-skeleton', function () {
    it('should render with the expected classes', async () => {
      const el = await fixture(
        html`<cds-fluid-combo-box-skeleton></cds-fluid-combo-box-skeleton>`
      );
      expect(el).to.exist;

      const wrapperFluid = el.shadowRoot.querySelector(
        '.cds--list-box__wrapper--fluid'
      );
      expect(wrapperFluid).to.exist;

      const skeleton = el.shadowRoot.querySelector(
        '.cds--skeleton.cds--list-box'
      );
      expect(skeleton).to.exist;

      const label = el.shadowRoot.querySelector('.cds--list-box__label');
      expect(label).to.exist;

      const field = el.shadowRoot.querySelector('.cds--list-box__field');
      expect(field).to.exist;
    });
  });
});
