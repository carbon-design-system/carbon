/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/combo-box/index.js';

const comboBox = ({ value } = {}) => html`
  <cds-combo-box title-text="Combo box Label" value="${value ?? ''}">
    <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
    <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
    <cds-combo-box-item value="option-3">Option 3</cds-combo-box-item>
  </cds-combo-box>
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

describe('cds-combo-box', function () {
  it('should render title text', async () => {
    const el = await fixture(comboBox());
    const titleText = el.shadowRoot.querySelector('.cds--label');

    expect(titleText.textContent.trim()).to.equal('Combo box Label');
  });

  it('should open when clicking the input', async () => {
    const el = await fixture(comboBox());

    expect(el.open).to.be.false;
    await openMenu(el);
    expect(el.open).to.be.true;
  });

  it('should select item on click and close menu', async () => {
    const el = await fixture(comboBox());
    const items = getItems(el);

    await openMenu(el);
    items[1].click();
    await waitForUpdates(el);

    expect(el.open).to.be.false;
    expect(el.value).to.equal('option-2');
    expect(items[1].selected).to.be.true;
    expect(getInput(el).value).to.equal('Option 2');
  });

  it('should call cds-combo-box-selected when selection is cleared', async () => {
    const el = await fixture(comboBox({ value: 'option-1' }));
    const selectedEvents = [];

    el.addEventListener('cds-combo-box-selected', (event) => {
      selectedEvents.push(event.detail);
    });

    const clearButton = el.shadowRoot.querySelector('#selection-button');
    clearButton.click();
    await waitForUpdates(el);

    expect(el.value).to.equal('');
    expect(getInput(el).value).to.equal('');
    expect(selectedEvents.length).to.equal(1);
    expect(selectedEvents[0].item).to.equal(undefined);
  });

  it('should fire cds-combo-box-selected with a defined item when selecting options', async () => {
    const el = await fixture(comboBox());
    const items = getItems(el);
    const selectedDetails = [];

    el.addEventListener('cds-combo-box-selected', (event) => {
      selectedDetails.push(event.detail);
    });

    for (let i = 0; i < items.length; i++) {
      await openMenu(el);
      items[i].click();
      await waitForUpdates(el);
    }

    expect(selectedDetails.length).to.equal(items.length);
    selectedDetails.forEach((detail, i) => {
      expect(detail.item).to.equal(items[i]);
      expect(detail.item).to.not.equal(undefined);
    });
  });

  it('should not fire cds-combo-box-selected when selecting the current item again', async () => {
    const el = await fixture(comboBox({ value: 'option-2' }));
    let selectedCount = 0;

    el.addEventListener('cds-combo-box-selected', () => {
      selectedCount += 1;
    });

    await openMenu(el);
    el.querySelector('cds-combo-box-item[value="option-2"]').click();
    await waitForUpdates(el);

    expect(el.value).to.equal('option-2');
    expect(selectedCount).to.equal(0);
  });

  it('should restore selected label and close when the same selected item is re-selected after typing', async () => {
    const el = await fixture(comboBox({ value: 'option-2' }));

    await setInputValue(el, 'opt');
    expect(el.open).to.be.true;

    el.querySelector('cds-combo-box-item[value="option-2"]').click();
    await waitForUpdates(el);

    expect(el.open).to.be.false;
    expect(el.value).to.equal('option-2');
    expect(getInput(el).value).to.equal('Option 2');
  });

  it('should not allow selecting a disabled option on click', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label">
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="option-2" disabled
          >Option 2</cds-combo-box-item
        >
      </cds-combo-box>
    `);

    await openMenu(el);
    el.querySelector('cds-combo-box-item[value="option-2"]').click();
    await waitForUpdates(el);

    expect(el.value).to.equal('');
  });

  it('should not select a disabled highlighted option on Enter', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label">
        <cds-combo-box-item value="ibm-cloud" disabled
          >IBM Cloud</cds-combo-box-item
        >
        <cds-combo-box-item value="ibm-quantum">IBM Quantum</cds-combo-box-item>
      </cds-combo-box>
    `);

    await setInputValue(el, 'IBM ');
    getInput(el).focus();
    await sendKeys({ press: 'Enter' });
    await waitForUpdates(el);

    expect(el.value).to.equal('');
    expect(el.open).to.be.true;
  });

  it('should not let the user expand the menu when disabled', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label" disabled>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-combo-box>
    `);
    const input = getInput(el);

    expect(input.disabled).to.be.true;
    input.click();
    await waitForUpdates(el);

    expect(el.open).to.be.false;
  });

  it('should not let the user expand the menu when readonly', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label" read-only>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-combo-box>
    `);
    const input = getInput(el);

    expect(input.readOnly).to.be.true;
    input.click();
    await waitForUpdates(el);

    expect(el.open).to.be.false;
  });

  it('should not commit selection when beingselected is prevented', async () => {
    const el = await fixture(comboBox({ value: 'option-1' }));
    const items = getItems(el);

    el.addEventListener('cds-combo-box-beingselected', (event) => {
      event.preventDefault();
    });

    items[1].click();
    await el.updateComplete;

    expect(el.value).to.equal('option-1');
    expect(items[0].selected).to.be.true;
    expect(items[1].selected).to.be.false;
  });

  it('should not clear selection when beingselected is prevented', async () => {
    const el = await fixture(comboBox({ value: 'option-1' }));

    el.addEventListener('cds-combo-box-beingselected', (event) => {
      event.preventDefault();
    });

    const initialInput = el.shadowRoot.querySelector('#trigger-button');
    expect(initialInput.value).to.equal('Option 1');

    const clearButton = el.shadowRoot.querySelector('#selection-button');
    clearButton.click();
    await el.updateComplete;
    await el.updateComplete;

    const input = el.shadowRoot.querySelector('#trigger-button');
    expect(el.value).to.equal('option-1');
    expect(input.value).to.equal('Option 1');
  });

  it('should clear input on blur when no selected item exists and allow-custom-value is false', async () => {
    const el = await fixture(comboBox());

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

  it('should restore selected label on blur when input does not match and a selection exists', async () => {
    const el = await fixture(comboBox({ value: 'option-2' }));

    await setInputValue(el, 'no-match');
    getInput(el).dispatchEvent(
      new FocusEvent('focusout', {
        bubbles: true,
        composed: true,
        relatedTarget: document.body,
      })
    );
    await waitForUpdates(el);

    expect(el.value).to.equal('option-2');
    expect(getInput(el).value).to.equal('Option 2');
  });

  it('should clear input when closing with trigger if no item matches and allow-custom-value is false', async () => {
    const el = await fixture(comboBox());

    await setInputValue(el, 'xyz');
    expect(el.open).to.be.true;
    expect(getInput(el).value).to.equal('xyz');

    getInput(el).click();
    await waitForUpdates(el);

    expect(el.open).to.be.false;
    expect(el.value).to.equal('');
    expect(getInput(el).value).to.equal('');
  });

  it('should not clear selected value when opening then closing without input changes', async () => {
    const el = await fixture(comboBox({ value: 'option-2' }));

    expect(getInput(el).value).to.equal('Option 2');

    await openMenu(el);
    getInput(el).click();
    await waitForUpdates(el);

    expect(el.open).to.be.false;
    expect(el.value).to.equal('option-2');
    expect(getInput(el).value).to.equal('Option 2');
  });

  it('should clear typed input when there is no selected value', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label">
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
      </cds-combo-box>
    `);

    const input = el.shadowRoot.querySelector('#trigger-button');
    input.value = 'Option';
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    await el.updateComplete;

    const clearButton = el.shadowRoot.querySelector('#selection-button');
    clearButton.click();
    await el.updateComplete;

    expect(el.value).to.equal('');
    expect(input.value).to.equal('');
  });

  it('should clear typed input when clear button receives Enter keypress', async () => {
    const el = await fixture(comboBox({ value: 'option-1' }));

    await setInputValue(el, 'Option');
    const clearButton = el.shadowRoot.querySelector('#selection-button');
    clearButton.dispatchEvent(
      new KeyboardEvent('keypress', {
        key: 'Enter',
        bubbles: true,
        composed: true,
      })
    );
    await waitForUpdates(el);

    expect(el.value).to.equal('');
    expect(getInput(el).value).to.equal('');
    expect(el.open).to.be.false;
  });

  it('should restore filtered items visibility after closing the menu', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label" should-filter-item>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
      </cds-combo-box>
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
    const el = await fixture(comboBox());
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
      <cds-combo-box title-text="Combo box Label" should-filter-item>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
        <cds-combo-box-item value="option-3">Option 3</cds-combo-box-item>
      </cds-combo-box>
    `);
    const items = getItems(el);

    await setInputValue(el, '3');

    expect(el.open).to.be.true;
    expect(items[0].style.display).to.equal('none');
    expect(items[1].style.display).to.equal('none');
    expect(items[2].style.display).to.equal('');
    expect(items[2].highlighted).to.be.true;
  });

  it('should select the correct item from the filtered list after text input on click', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label">
        <cds-combo-box-item value="create">Create</cds-combo-box-item>
        <cds-combo-box-item value="construct">Construct</cds-combo-box-item>
        <cds-combo-box-item value="destroy">Destroy</cds-combo-box-item>
      </cds-combo-box>
    `);

    await setInputValue(el, 'struct');
    el.querySelector('cds-combo-box-item[value="construct"]').click();
    await waitForUpdates(el);

    expect(el.value).to.equal('construct');
    expect(getInput(el).value).to.equal('Construct');
  });

  it('should select the correct item from the filtered list after text input on Enter', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label">
        <cds-combo-box-item value="create">Create</cds-combo-box-item>
        <cds-combo-box-item value="construct">Construct</cds-combo-box-item>
        <cds-combo-box-item value="destroy">Destroy</cds-combo-box-item>
      </cds-combo-box>
    `);

    await setInputValue(el, 'struct');
    getInput(el).focus();
    await sendKeys({ press: 'Enter' });
    await waitForUpdates(el);

    expect(el.value).to.equal('construct');
    expect(getInput(el).value).to.equal('Construct');
  });

  it('should set should-filter-item when typeahead is enabled and use typeahead matching', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label" typeahead>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="orange">Orange</cds-combo-box-item>
        <cds-combo-box-item value="banana">Banana</cds-combo-box-item>
      </cds-combo-box>
    `);
    const items = getItems(el);

    expect(el.shouldFilterItem).to.be.true;
    expect(el.hasAttribute('should-filter-item')).to.be.true;

    await setInputValue(el, 'or');

    expect(items[0].style.display).to.equal('none');
    expect(items[1].style.display).to.equal('');
    expect(items[2].style.display).to.equal('none');
    expect(items[1].highlighted).to.be.true;
  });

  it('should suggest and select typeahead completion text during insert input', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label" typeahead>
        <cds-combo-box-item value="apple">Apple</cds-combo-box-item>
        <cds-combo-box-item value="banana">Banana</cds-combo-box-item>
      </cds-combo-box>
    `);
    const input = getInput(el);

    input.value = 'Ap';
    input.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        composed: true,
        inputType: 'insertText',
        data: 'p',
      })
    );
    await waitForUpdates(el);

    expect(input.value).to.equal('Apple');
    expect(input.selectionStart).to.equal(2);
    expect(input.selectionEnd).to.equal(5);
    expect(el.open).to.be.true;
  });

  it('should remove typeahead completion when navigating with arrow keys', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label" typeahead>
        <cds-combo-box-item value="apple">Apple</cds-combo-box-item>
        <cds-combo-box-item value="banana">Banana</cds-combo-box-item>
      </cds-combo-box>
    `);
    const input = getInput(el);

    input.value = 'Ap';
    input.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        composed: true,
        inputType: 'insertText',
        data: 'p',
      })
    );
    await waitForUpdates(el);

    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        composed: true,
      })
    );
    await waitForUpdates(el);

    expect(input.value).to.equal('Ap');
    expect(input.selectionStart).to.equal(2);
    expect(input.selectionEnd).to.equal(2);
  });

  it('should call shouldFilterItem callback and select the filtered item', async () => {
    const el = await fixture(comboBox());

    el.shouldFilterItem = ({ item, inputValue }) =>
      inputValue === 'custom-filter' && item.value === 'option-2';

    await setInputValue(el, 'custom-filter');
    const eventPromise = oneEvent(el, 'cds-combo-box-selected');

    el.querySelector('cds-combo-box-item[value="option-2"]').click();
    const event = await eventPromise;
    await waitForUpdates(el);

    expect(event.detail.item.value).to.equal('option-2');
    expect(el.value).to.equal('option-2');
  });

  it('should set custom aria-label on the combobox input', async () => {
    const el = await fixture(html`
      <cds-combo-box input-label="custom aria-label" title-text="Combo box">
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-combo-box>
    `);

    expect(getInput(el).getAttribute('aria-label')).to.equal(
      'custom aria-label'
    );
  });

  it('should keep custom value on Enter when allow-custom-value is set', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label" allow-custom-value>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
      </cds-combo-box>
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
      <cds-combo-box title-text="Combo box Label" allow-custom-value>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-combo-box>
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
      <cds-combo-box title-text="Combo box Label" allow-custom-value>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-combo-box>
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

  it('should pass inputProps to the input element', async () => {
    const el = await fixture(html`
      <cds-combo-box title-text="Combo box Label">
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-combo-box>
    `);

    el.inputProps = {
      maxlength: 10,
      placeholder: 'Type here',
      required: true,
      spellcheck: false,
    };
    await waitForUpdates(el);

    const input = getInput(el);

    expect(input.getAttribute('maxlength')).to.equal('10');
    expect(input.getAttribute('placeholder')).to.equal('Type here');
    expect(input.hasAttribute('required')).to.be.true;
    expect(input.hasAttribute('spellcheck')).to.be.false;
  });

  it('should set aria-controls on the combobox input to the listbox id', async () => {
    const el = await fixture(comboBox());

    await openMenu(el);

    const input = getInput(el);
    const listbox = el.shadowRoot.querySelector('#menu-body');

    expect(listbox.id).to.equal('menu-body');
    expect(input.getAttribute('aria-controls')).to.equal(listbox.id);
  });

  it('should close the menu on Escape when open', async () => {
    const el = await fixture(comboBox());

    await openMenu(el);
    getInput(el).focus();
    await sendKeys({ press: 'Escape' });
    await waitForUpdates(el);

    expect(el.open).to.be.false;
  });

  describe('invalid and warn states', () => {
    it('should not display invalid state when readonly', async () => {
      const el = await fixture(html`
        <cds-combo-box read-only invalid invalid-text="Invalid text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.false;
      expect(el.shadowRoot.textContent).not.to.contain('Invalid text');
    });

    it('should not display invalid state when disabled', async () => {
      const el = await fixture(html`
        <cds-combo-box disabled invalid invalid-text="Invalid text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.false;
      expect(el.shadowRoot.textContent).not.to.contain('Invalid text');
    });

    it('should not display warn state when readonly', async () => {
      const el = await fixture(html`
        <cds-combo-box read-only warn warn-text="Warning text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;
      expect(el.shadowRoot.textContent).not.to.contain('Warning text');
    });

    it('should not display warn state when disabled', async () => {
      const el = await fixture(html`
        <cds-combo-box disabled warn warn-text="Warning text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;
      expect(el.shadowRoot.textContent).not.to.contain('Warning text');
    });

    it('should display invalid state when not readonly or disabled', async () => {
      const el = await fixture(html`
        <cds-combo-box invalid invalid-text="Invalid text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.true;
      expect(el.shadowRoot.textContent).to.contain('Invalid text');
    });

    it('should display warn state when not readonly or disabled', async () => {
      const el = await fixture(html`
        <cds-combo-box warn warn-text="Warning text">
          <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
        </cds-combo-box>
      `);
      const listBox = getListBox(el);

      expect(listBox.classList.contains('cds--dropdown--warn')).to.be.true;
      expect(el.shadowRoot.textContent).to.contain('Warning text');
    });
  });
});
