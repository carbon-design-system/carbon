/**
 * Copyright IBM Corp.2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/multi-select/index.js';
import '@carbon/web-components/es/components/fluid-multi-select/index.js';

describe('cds-fluid-multi-select', function () {
  const fluidMultiSelect = html`
    <cds-fluid-multi-select label="Test label">
      <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
      <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
      <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
      <cds-multi-select-item value="item-3">Item 3</cds-multi-select-item>
    </cds-fluid-multi-select>
  `;

  it('should render', async () => {
    const el = await fixture(fluidMultiSelect);
    expect(el).to.exist;
  });

  it('should have isFluid attribute set', async () => {
    const el = await fixture(fluidMultiSelect);
    expect(el.isFluid).to.be.true;
  });

  it('should render the fluid wrapper div with correct classes', async () => {
    const el = await fixture(fluidMultiSelect);
    await el.updateComplete;
    const wrapper = el.shadowRoot.querySelector(
      '.cds--list-box__wrapper--fluid'
    );
    expect(wrapper).to.exist;
  });

  it('should initially render with a given label', async () => {
    const el = await fixture(html`
      <cds-fluid-multi-select label="test-label">
        <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
      </cds-fluid-multi-select>
    `);

    expect(el.label).to.equal('test-label');
    expect(el.hasAttribute('open')).to.be.false;
  });

  it('should open the menu when a user clicks on the trigger', async () => {
    const el = await fixture(fluidMultiSelect);

    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.click();
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('should open the menu when a user hits space while the field is focused', async () => {
    const el = await fixture(fluidMultiSelect);
    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.focus();
    const event = new KeyboardEvent('keypress', { key: ' ', bubbles: true });
    trigger.dispatchEvent(event);
    await el.updateComplete;
    expect(el.open).to.be.true;
  });

  it('should open the menu when a user hits enter while the field is focused', async () => {
    const el = await fixture(fluidMultiSelect);
    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.focus();
    const event = new KeyboardEvent('keypress', {
      key: 'Enter',
      bubbles: true,
    });
    trigger.dispatchEvent(event);
    await el.updateComplete;
    expect(el.open).to.be.true;
  });

  it('should let the user toggle item selection with a mouse', async () => {
    const el = await fixture(fluidMultiSelect);

    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.click();
    await el.updateComplete;

    const firstItem = el.querySelector('cds-multi-select-item[value="item-0"]');
    expect(firstItem.selected).to.be.false;

    firstItem.click();
    await el.updateComplete;
    expect(firstItem.selected).to.be.true;

    firstItem.click();
    await el.updateComplete;
    expect(firstItem.selected).to.be.false;
  });

  it('should clear selected items when the user clicks the clear selection button', async () => {
    const el = await fixture(html`
      <cds-fluid-multi-select label="test-label" value="item-0">
        <cds-multi-select-item value="item-0" selected
          >Item 0</cds-multi-select-item
        >
        <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
      </cds-fluid-multi-select>
    `);

    await el.updateComplete;

    const clearButton = el.shadowRoot.querySelector('#selection-button');
    expect(clearButton).to.exist;

    clearButton.click();
    await el.updateComplete;

    expect(el.value).to.equal('');
    const selectedItems = el.querySelectorAll(
      'cds-multi-select-item[selected]'
    );
    expect(selectedItems.length).to.equal(0);
  });

  it('should not be interactive if disabled', async () => {
    const el = await fixture(html`
      <cds-fluid-multi-select label="test-label" disabled>
        <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
      </cds-fluid-multi-select>
    `);

    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.click();
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should not be interactive if readonly', async () => {
    const el = await fixture(html`
      <cds-fluid-multi-select label="test-label" read-only>
        <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
      </cds-fluid-multi-select>
    `);

    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.click();
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('does not render items with undefined values', async () => {
    const el = await fixture(html`
      <cds-fluid-multi-select label="test-label">
        <cds-multi-select-item value="item-0">joey</cds-multi-select-item>
        <cds-multi-select-item value="item-1">johnny</cds-multi-select-item>
        <cds-multi-select-item value="item-2"
          >${undefined}</cds-multi-select-item
        >
      </cds-fluid-multi-select>
    `);

    const items = el.querySelectorAll('cds-multi-select-item');
    items.forEach((item) => {
      expect(item.textContent.trim()).to.not.equal('undefined');
    });
  });

  it('should render with initial selected items if selected is added in any item(s)', async () => {
    const el = await fixture(html`
      <cds-fluid-multi-select label="Test label">
        <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        <cds-multi-select-item selected value="item-1"
          >Item 1</cds-multi-select-item
        >
        <cds-multi-select-item selected="" value="item-2"
          >Item 2</cds-multi-select-item
        >
        <cds-multi-select-item value="item-3">Item 3</cds-multi-select-item>
      </cds-fluid-multi-select>
    `);

    const selectedItems = el.querySelectorAll(
      'cds-multi-select-item[selected]'
    );
    expect(selectedItems.length).to.equal(2);

    const values = Array.from(selectedItems).map((i) =>
      i.getAttribute('value')
    );
    expect(values.includes('item-1')).to.be.true;
    expect(values.includes('item-2')).to.be.true;
  });

  describe('Component API', () => {
    it('should trigger selection events when items are selected', async () => {
      const el = await fixture(fluidMultiSelect);

      const selectionListener = oneEvent(el, 'cds-multi-select-selected');

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const firstItem = el.querySelector(
        'cds-multi-select-item[value="item-0"]'
      );
      firstItem.click();

      const event = await selectionListener;
      expect(event.type).to.equal('cds-multi-select-selected');
    });

    it('should place the given id on the element when passed as attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select id="custom-id" label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      expect(el.id).to.equal('custom-id');
    });

    it('should support different feedback modes with selection-feedback', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" selection-feedback="top">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      expect(el.selectionFeedback).to.equal('top');

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const thirdItem = el.querySelector(
        'cds-multi-select-item[value="item-2"]'
      );
      thirdItem.click();
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[0].value).to.equal('item-2');
    });

    it('should support a custom itemToElement', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label">
          <cds-multi-select-item value="item-0">
            <span class="test-element">test-item 🔥</span>
          </cds-multi-select-item>
        </cds-fluid-multi-select>
      `);
      await el.updateComplete;
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;
      const item = el.querySelector('cds-multi-select-item');
      const custom = item.querySelector('.test-element');
      expect(custom).to.exist;
      expect(custom.textContent).to.include('test-item');
      expect(custom.textContent).to.include('🔥');
    });
  });

  describe('Filterable FluidMultiSelect', () => {
    it('should filter items when filterable is enabled', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
          <cds-multi-select-item value="cherry">Cherry</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const filterInput = el.shadowRoot.querySelector('input');
      filterInput.value = 'app';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      const visibleItems = el.querySelectorAll(
        'cds-multi-select-item:not([filtered])'
      );
      expect(visibleItems.length).to.equal(1);
      expect(visibleItems[0].textContent.trim()).to.equal('Apple');
    });

    it('should clear filter when clear button is clicked', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const filterInput = el.shadowRoot.querySelector('input');
      filterInput.value = 'app';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      const clearButton = el.shadowRoot.querySelector('#clear-button');
      if (clearButton) {
        clearButton.click();
        await el.updateComplete;

        expect(filterInput.value).to.equal('');
        const visibleItems = el.querySelectorAll(
          'cds-multi-select-item:not([filtered])'
        );
        expect(visibleItems.length).to.equal(2);
      }
    });

    it('should render the clear button with tabindex="-1"', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const filterInput = el.shadowRoot.querySelector('input');
      filterInput.value = 'app';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      const clearButton = el.shadowRoot.querySelector('#clear-button');
      expect(clearButton).to.exist;
      expect(clearButton.getAttribute('tabindex')).to.equal('-1');
    });

    it('should clear the input on blur', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const filterInput = el.shadowRoot.querySelector('input');
      filterInput.value = 'app';

      await sendKeys({ press: 'Tab' });
      await el.updateComplete;

      expect(filterInput.value).to.equal('');
      const clearButton = el.shadowRoot.querySelector('#clear-button');
      expect(clearButton).to.not.exist;
    });

    it('should open the menu with arrow down and close with escape', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.focus();
      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      await el.updateComplete;
      expect(el.open).to.be.true;

      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      );
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    it('should move focus with arrow keys', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
          <cds-multi-select-item value="cherry">Cherry</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.focus();
      trigger.click();
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      const arrowDown = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
      });
      trigger.dispatchEvent(arrowDown);
      await el.updateComplete;
      expect(items[0].hasAttribute('highlighted')).to.be.true;

      trigger.dispatchEvent(arrowDown);
      await el.updateComplete;
      expect(items[1].hasAttribute('highlighted')).to.be.true;

      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
      );
      await el.updateComplete;
      expect(items[0].hasAttribute('highlighted')).to.be.true;
    });

    it('should toggle selection with enter key on highlighted item', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      await el.updateComplete;

      const firstItem = el.querySelector(
        'cds-multi-select-item[value="item-0"]'
      );
      expect(firstItem.selected).to.be.false;
      expect(firstItem.hasAttribute('highlighted')).to.be.true;

      trigger.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter', bubbles: true })
      );
      await el.updateComplete;
      expect(firstItem.selected).to.be.true;
      expect(el.open).to.be.true;

      trigger.dispatchEvent(
        new KeyboardEvent('keypress', { key: 'Enter', bubbles: true })
      );
      await el.updateComplete;
      expect(firstItem.selected).to.be.false;
    });

    it('should toggle selection with space key on highlighted item (non-filterable)', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      );
      await el.updateComplete;

      const firstItem = el.querySelector(
        'cds-multi-select-item[value="item-0"]'
      );
      expect(firstItem.selected).to.be.false;
      expect(firstItem.hasAttribute('highlighted')).to.be.true;

      trigger.dispatchEvent(
        new KeyboardEvent('keypress', { key: ' ', bubbles: true })
      );
      await el.updateComplete;
      expect(firstItem.selected).to.be.true;
      expect(el.open).to.be.true;

      trigger.dispatchEvent(
        new KeyboardEvent('keypress', { key: ' ', bubbles: true })
      );
      await el.updateComplete;
      expect(firstItem.selected).to.be.false;
    });

    it('should clear input on Escape', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const filterInput = el.shadowRoot.querySelector('input');
      const escapeClick = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });

      filterInput.value = 'test';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;
      expect(filterInput.value).to.equal('test');
      expect(el.open).to.be.true;

      filterInput.dispatchEvent(escapeClick);
      await el.updateComplete;
      expect(el.open).to.be.false;

      filterInput.dispatchEvent(escapeClick);
      await el.updateComplete;
      expect(filterInput.value).to.equal('');
    });

    it('should clear selections on Escape (filterable)', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" filterable value="item-0">
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
        </cds-fluid-multi-select>
      `);

      await el.updateComplete;
      expect(el.value).to.equal('item-0');

      const filterInput = el.shadowRoot.querySelector('input');
      const escapeClick = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });

      filterInput.dispatchEvent(escapeClick);
      await el.updateComplete;
      expect(el.open).to.be.false;

      filterInput.dispatchEvent(escapeClick);
      await el.updateComplete;
      expect(el.value).to.equal('');
    });
  });

  describe('State Management and Events', () => {
    it('should trigger selection event with selected items', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      let changeEventData = null;
      el.addEventListener('cds-multi-select-selected', (event) => {
        changeEventData = event.detail;
      });

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      el.querySelector('cds-multi-select-item[value="item-0"]').click();
      await el.updateComplete;

      expect(changeEventData).to.not.be.null;
      expect(el.value).to.include('item-0');
    });

    it('should update value when multiple items are selected', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      el.querySelector('cds-multi-select-item[value="item-0"]').click();
      await el.updateComplete;
      expect(el.value).to.equal('item-0');

      el.querySelector('cds-multi-select-item[value="item-1"]').click();
      await el.updateComplete;
      expect(el.value).to.equal('item-0,item-1');
    });

    it('should not trigger change event on initial render', async () => {
      let changeEventTriggered = false;

      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" value="item-0">
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
        </cds-fluid-multi-select>
      `);

      el.addEventListener('cds-multi-select-selected', () => {
        changeEventTriggered = true;
      });

      await el.updateComplete;
      expect(changeEventTriggered).to.be.false;
    });
  });

  describe('Validation States', () => {
    it('should handle invalid state with invalid-text', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          invalid
          invalid-text="Selection is required">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      expect(el.invalid).to.be.true;
      expect(el.invalidText).to.equal('Selection is required');

      const listbox = el.shadowRoot.querySelector('.cds--multi-select');
      expect(listbox.classList.contains('cds--multi-select--invalid')).to.be
        .true;
    });

    it('should render the divider when in invalid state', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          invalid
          invalid-text="Selection is required">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      await el.updateComplete;
      const divider = el.shadowRoot.querySelector('.cds--list-box__divider');
      expect(divider).to.exist;
    });

    it('should render the divider when in warn state', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          warn
          warn-text="Consider selecting more options">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      await el.updateComplete;
      const divider = el.shadowRoot.querySelector('.cds--list-box__divider');
      expect(divider).to.exist;
    });

    it('should not render the divider when not in invalid or warn state', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      await el.updateComplete;
      const divider = el.shadowRoot.querySelector('.cds--list-box__divider');
      expect(divider).to.not.exist;
    });

    it('should handle warning state with warn-text', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          warn
          warn-text="Consider selecting more options">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      expect(el.warn).to.be.true;
      expect(el.warnText).to.equal('Consider selecting more options');

      const listbox = el.shadowRoot.querySelector('.cds--multi-select');
      expect(listbox.classList.contains('cds--multi-select--warn')).to.be.true;
    });

    it('should apply fluid invalid wrapper class when invalid', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" invalid invalid-text="Error">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      await el.updateComplete;
      const wrapper = el.shadowRoot.querySelector(
        '.cds--list-box__wrapper--fluid--invalid'
      );
      expect(wrapper).to.exist;
    });

    it('should not have invalid classname when disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          invalid
          invalid-text="Invalid message"
          disabled>
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const multiSelectDropdown =
        el.shadowRoot.querySelector('.cds--multi-select');
      expect(multiSelectDropdown.className).not.to.contain(
        'cds--multi-select--invalid'
      );
    });

    it('should not have invalid classname when readOnly', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          invalid
          invalid-text="Invalid message"
          read-only>
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const multiSelectDropdown =
        el.shadowRoot.querySelector('.cds--multi-select');
      expect(multiSelectDropdown.className).not.to.contain(
        'cds--multi-select--invalid'
      );
    });

    it('should not have warn classname when disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          warn
          warn-text="Warn message"
          disabled>
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const multiSelectDropdown =
        el.shadowRoot.querySelector('.cds--multi-select');
      expect(multiSelectDropdown.className).not.to.contain(
        'cds--multi-select--warn'
      );
    });

    it('should not have warn classname when readOnly', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          warn
          warn-text="Warn message"
          read-only>
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const multiSelectDropdown =
        el.shadowRoot.querySelector('.cds--multi-select');
      expect(multiSelectDropdown.className).not.to.contain(
        'cds--multi-select--warn'
      );
    });
  });

  describe('Select All Functionality', () => {
    it('should render select-all item when select-all attribute is present', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      expect(el.selectAll).to.be.true;
      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      expect(selectAllItem).to.exist;
    });

    it('should select all items when select-all is clicked', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all value=""
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      const regularItems = el.querySelectorAll(
        'cds-multi-select-item:not([is-select-all])'
      );

      selectAllItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.true;
      regularItems.forEach((item) => {
        expect(item.hasAttribute('selected')).to.be.true;
      });

      const cleanValue = el.value.replace(/^,/, '');
      expect(cleanValue).to.equal('item-0,item-1,item-2');
    });

    it('should deselect all items when select-all is clicked while all are selected', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          select-all
          value="item-0,item-1,item-2">
          <cds-multi-select-item is-select-all selected
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
          <cds-multi-select-item value="item-1" selected
            >Item 1</cds-multi-select-item
          >
          <cds-multi-select-item value="item-2" selected
            >Item 2</cds-multi-select-item
          >
        </cds-fluid-multi-select>
      `);

      await el.updateComplete;

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      const regularItems = el.querySelectorAll(
        'cds-multi-select-item:not([is-select-all])'
      );

      selectAllItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      regularItems.forEach((item) => {
        expect(item.hasAttribute('selected')).to.be.false;
      });
      expect(el.value).to.equal('');
    });

    it('should show indeterminate state when some but not all items are selected', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      const firstItem = el.querySelector(
        'cds-multi-select-item[value="item-0"]'
      );

      firstItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.true;
      expect(el.value).to.equal('item-0');
    });

    it('should not select disabled items when select-all is clicked', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all value=""
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1" disabled
            >Item 1 (disabled)</cds-multi-select-item
          >
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      const disabledItem = el.querySelector('cds-multi-select-item[disabled]');

      selectAllItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.true;
      expect(disabledItem.hasAttribute('selected')).to.be.false;

      const cleanValue = el.value.replace(/^,/, '');
      expect(cleanValue).to.equal('item-0,item-2');
    });

    it('should maintain select-all position at top of list', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" select-all>
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[0].hasAttribute('is-select-all')).to.be.true;
    });

    it('should recalculate select-all state when items are dynamically added', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" select-all value="item-0">
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
        </cds-fluid-multi-select>
      `);

      await el.updateComplete;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      expect(selectAllItem.hasAttribute('selected')).to.be.true;

      const newItem = document.createElement('cds-multi-select-item');
      newItem.setAttribute('value', 'item-1');
      newItem.textContent = 'Item 1';
      el.appendChild(newItem);

      await el.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.true;
    });
  });

  describe('Selection Feedback Modes', () => {
    it('should support "top" selection feedback', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" selection-feedback="top">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      expect(el.selectionFeedback).to.equal('top');

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      el.querySelector('cds-multi-select-item[value="item-2"]').click();
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[0].value).to.equal('item-2');
    });

    it('should support "fixed" selection feedback', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" selection-feedback="fixed">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      el.querySelector('cds-multi-select-item[value="item-2"]').click();
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[2].value).to.equal('item-2');
      expect(items[2].selected).to.be.true;
    });

    it('should support "top-after-reopen" selection feedback', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          selection-feedback="top-after-reopen">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      el.querySelector('cds-multi-select-item[value="item-2"]').click();
      await el.updateComplete;

      document.body.click();
      await el.updateComplete;

      trigger.click();
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[0].value).to.equal('item-2');
    });
  });

  describe('Controlled Behavior', () => {
    it('should maintain state when value changes externally', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" value="">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      el.value = 'item-0,item-1';
      await el.updateComplete;

      el.querySelectorAll('cds-multi-select-item').forEach((item) => {
        expect(item.selected).to.be.true;
      });

      el.value = '';
      await el.updateComplete;

      el.querySelectorAll('cds-multi-select-item').forEach((item) => {
        expect(item.selected).to.be.false;
      });
    });
  });

  describe('Size Variations', () => {
    it('should handle small size variant', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" size="sm">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      expect(el.size).to.equal('sm');
      const listbox = el.shadowRoot.querySelector('.cds--list-box');
      expect(listbox.classList.contains('cds--list-box--sm')).to.be.true;
    });

    it('should handle large size variant', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" size="lg">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      expect(el.size).to.equal('lg');
      const listbox = el.shadowRoot.querySelector('.cds--list-box');
      expect(listbox.classList.contains('cds--list-box--lg')).to.be.true;
    });
  });

  describe('Focus Management', () => {
    it('should maintain proper focus when menu opens', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
      expect(el.shadowRoot.querySelector('[part="menu-body"]')).to.exist;
    });

    it('should handle focus properly with filterable fluid multiselect', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" filterable>
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      expect(el.shadowRoot.querySelector('input')).to.exist;
      expect(el.open).to.be.true;
    });

    it('should lose focus when clicking outside', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.focus();
      trigger.click();
      await el.updateComplete;
      document.body.click();
      await el.updateComplete;
      expect(document.activeElement).to.not.equal(trigger);
    });
  });

  describe('Enhanced Keyboard Interactions', () => {
    it('should clear selection when selection-button is clicked', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" value="item-0">
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
        </cds-fluid-multi-select>
      `);

      await el.updateComplete;
      expect(el.value).to.equal('item-0');

      const clearButton = el.shadowRoot.querySelector('#selection-button');
      expect(clearButton).to.exist;

      clearButton.click();
      await el.updateComplete;
      expect(el.value).to.equal('');
    });

    it('should clear selections on Escape (non-filterable)', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label" value="item-0">
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
        </cds-fluid-multi-select>
      `);

      await el.updateComplete;
      expect(el.value).to.equal('item-0');

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      );
      await el.updateComplete;

      expect(el.value).to.equal('');
    });

    it('should handle navigation with disabled items', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1" disabled
            >Item 1 (disabled)</cds-multi-select-item
          >
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const arrowDown = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
      });
      trigger.dispatchEvent(arrowDown);
      await el.updateComplete;
      trigger.dispatchEvent(arrowDown);
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[2].hasAttribute('highlighted')).to.be.true;
    });
  });

  describe('Title Text and Labels', () => {
    it('should display title-text properly', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          title-text="Select multiple options">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      expect(el.titleText).to.equal('Select multiple options');
    });

    it('should display clear selection labels correctly', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select
          label="test-label"
          clear-selection-label="Clear all selections"
          value="item-0">
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
        </cds-fluid-multi-select>
      `);

      await el.updateComplete;
      const clearButton = el.shadowRoot.querySelector('#selection-button');
      expect(clearButton).to.exist;
      expect(clearButton.getAttribute('title')).to.equal(
        'Clear all selections'
      );
    });
  });

  describe('Select All Behaviours with Filterable FluidMultiSelect', () => {
    it('should only select visible items when filtering', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select select-all filterable>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
          <cds-multi-select-item value="cherry">Cherry</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const filterInput = el.shadowRoot.querySelector('input');
      filterInput.value = 'a';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      selectAllItem.click();
      await el.updateComplete;

      expect(
        el
          .querySelector('cds-multi-select-item[value="apple"]')
          .hasAttribute('selected')
      ).to.be.true;
      expect(
        el
          .querySelector('cds-multi-select-item[value="banana"]')
          .hasAttribute('selected')
      ).to.be.true;
      expect(
        el
          .querySelector('cds-multi-select-item[value="cherry"]')
          .hasAttribute('selected')
      ).to.be.false;
    });

    it('should hide the select-all item when there are no visible items', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select filterable select-all>
          <cds-multi-select-item is-select-all>All</cds-multi-select-item>
          <cds-multi-select-item value="enabled">Enabled</cds-multi-select-item>
          <cds-multi-select-item value="disabled-a" disabled
            >Disabled A</cds-multi-select-item
          >
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const input = el.shadowRoot.querySelector('input');
      input.value = 'xyz';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      const selectAll = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      expect(selectAll.hasAttribute('filtered')).to.be.true;
    });

    it('should hide the select-all item when only disabled items are visible', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select filterable select-all>
          <cds-multi-select-item is-select-all>All</cds-multi-select-item>
          <cds-multi-select-item value="enabled">Enabled</cds-multi-select-item>
          <cds-multi-select-item value="disabled-a" disabled
            >Disabled A</cds-multi-select-item
          >
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const input = el.shadowRoot.querySelector('input');
      input.value = 'Disabled';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      const selectAll = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      expect(selectAll.hasAttribute('filtered')).to.be.true;
    });

    it('should correctly compute checked/indeterminate state depending on filter', async () => {
      const el = await fixture(html`
        <cds-fluid-multi-select filterable select-all>
          <cds-multi-select-item is-select-all>All</cds-multi-select-item>
          <cds-multi-select-item value="foo">foo</cds-multi-select-item>
          <cds-multi-select-item value="bar">bar</cds-multi-select-item>
        </cds-fluid-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const input = el.shadowRoot.querySelector('input');
      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );

      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;

      input.value = 'foo';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;
      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;

      selectAllItem.click();
      await el.updateComplete;
      expect(selectAllItem.hasAttribute('selected')).to.be.true;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;

      input.value = 'bar';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;
      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;

      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;
      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.true;
    });
  });
});
