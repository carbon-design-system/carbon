/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/multi-select/index.js';

const generateItems = (count, itemGenerator) => {
  return Array.from({ length: count }, (_, i) => itemGenerator(i));
};

const generateGenericItem = (index) => ({
  value: `item-${index}`,
  label: `Item ${index}`,
  text: `Item ${index}`,
});

describe('cds-multi-select', function () {
  let mockItems;

  beforeEach(() => {
    mockItems = generateItems(5, generateGenericItem);
  });

  const multiSelect = html`
    <cds-multi-select label="Test label">
      <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
      <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
      <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
      <cds-multi-select-item value="item-3">Item 3</cds-multi-select-item>
    </cds-multi-select>
  `;

  it('should render', async () => {
    const el = await fixture(multiSelect);
    expect(el).to.exist;
  });

  it('should initially render with a given label', async () => {
    const el = await fixture(html`
      <cds-multi-select label="test-label">
        <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
      </cds-multi-select>
    `);

    expect(el.label).to.equal('test-label');
    expect(el.hasAttribute('open')).to.be.false;
  });

  it('should open the menu when a user clicks on the trigger', async () => {
    const el = await fixture(multiSelect);

    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.click();
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('should open the menu when a user hits space while the field is focused', async () => {
    const el = await fixture(multiSelect);
    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.focus();
    const event = new KeyboardEvent('keypress', { key: ' ', bubbles: true });
    trigger.dispatchEvent(event);
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('should open the menu when a user hits enter while the field is focused', async () => {
    const el = await fixture(multiSelect);
    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.focus();
    const event = new KeyboardEvent('keypress', {
      key: 'Enter',
      bubbles: true,
    });
    trigger.dispatchEvent(event);
    await el.updateComplete;
    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('should let the user toggle item selection with a mouse', async () => {
    const el = await fixture(multiSelect);

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
      <cds-multi-select label="test-label" value="item-0">
        <cds-multi-select-item value="item-0" selected
          >Item 0</cds-multi-select-item
        >
        <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
      </cds-multi-select>
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
      <cds-multi-select label="test-label" disabled>
        <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
      </cds-multi-select>
    `);

    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.click();
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should not be interactive if readonly', async () => {
    const el = await fixture(html`
      <cds-multi-select label="test-label" read-only>
        <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
      </cds-multi-select>
    `);

    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.click();
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('does not render items with undefined values', async () => {
    const el = await fixture(html`
      <cds-multi-select label="test-label">
        <cds-multi-select-item value="item-0">joey</cds-multi-select-item>
        <cds-multi-select-item value="item-1">johnny</cds-multi-select-item>
        <cds-multi-select-item value="item-2"
          >${undefined}</cds-multi-select-item
        >
      </cds-multi-select>
    `);
    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.click();
    await el.updateComplete;

    const items = el.querySelectorAll('cds-multi-select-item');
    items.forEach((item) => {
      expect(item.textContent.trim()).to.not.equal('undefined');
    });
  });

  it('should render with initial selected items if selected is added in any item(s)', async () => {
    const el = await fixture(html`
      <cds-multi-select label="Test label">
        <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        <cds-multi-select-item selected value="item-1"
          >Item 1</cds-multi-select-item
        >
        <cds-multi-select-item selected="" value="item-2"
          >Item 2</cds-multi-select-item
        >
        <cds-multi-select-item value="item-3">Item 3</cds-multi-select-item>
      </cds-multi-select>
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

    // Optionally check UI state
    selectedItems.forEach((item) => {
      expect(item.hasAttribute('selected')).to.be.true;
    });
  });

  describe('Component API', () => {
    it('should trigger selection events when items are selected', async () => {
      const el = await fixture(multiSelect);

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
        <cds-multi-select id="custom-id" label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.id).to.equal('custom-id');
    });

    it('should support different feedback modes with selection-feedback', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" selection-feedback="top">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-multi-select>
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

    it('should respect decorator slot', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-ai-label slot="decorator"></cds-ai-label>
        </cds-multi-select>
      `);

      const decoratorSlot = el.shadowRoot.querySelector(
        'slot[name="decorator"]'
      );
      if (decoratorSlot) {
        const assigned = decoratorSlot.assignedNodes({ flatten: true });
        const aiLabel = assigned.find(
          (node) =>
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName.toLowerCase() === 'cds-ai-label'
        );
        expect(aiLabel).to.exist;
      }
    });

    it('should respect deprecated slug slot', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-ai-label slot="slug"></cds-ai-label>
        </cds-multi-select>
      `);

      const slugSlot = el.shadowRoot.querySelector('slot[name="slug"]');
      if (slugSlot) {
        const assigned = slugSlot.assignedNodes({ flatten: true });
        const slug = assigned.find(
          (node) =>
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName.toLowerCase() === 'cds-ai-label'
        );
        expect(slug).to.exist;
      }
    });

    it('should support a custom itemToString with object items', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0"
            >Custom joey</cds-multi-select-item
          >
          <cds-multi-select-item value="item-1"
            >Custom johnny</cds-multi-select-item
          >
          <cds-multi-select-item value="item-2"
            >Custom tommy</cds-multi-select-item
          >
        </cds-multi-select>
      `);
      await el.updateComplete;
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;
      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[0].textContent.trim()).to.equal('Custom joey');
      expect(items[1].textContent.trim()).to.equal('Custom johnny');
      expect(items[2].textContent.trim()).to.equal('Custom tommy');
    });

    it('should support a custom itemToElement', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">
            <span class="test-element">test-item 🔥</span>
          </cds-multi-select-item>
        </cds-multi-select>
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

  describe('Filterable MultiSelect', () => {
    it('should filter items when filterable is enabled', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
          <cds-multi-select-item value="cherry">Cherry</cds-multi-select-item>
        </cds-multi-select>
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
        <cds-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
        </cds-multi-select>
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

    it('should open the menu with arrow down and close with escape', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
        </cds-multi-select>
      `);
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.focus();
      const arrowDown = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
      });
      trigger.dispatchEvent(arrowDown);
      await el.updateComplete;
      expect(el.open).to.be.true;
      const escape = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      trigger.dispatchEvent(escape);
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    it('should move focus with arrow keys', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
          <cds-multi-select-item value="cherry">Cherry</cds-multi-select-item>
        </cds-multi-select>
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
      const arrowUp = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
      });
      trigger.dispatchEvent(arrowUp);
      await el.updateComplete;
      expect(items[0].hasAttribute('highlighted')).to.be.true;
    });

    it('should toggle selection with enter key on highlighted item', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
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

      const firstItem = el.querySelector(
        'cds-multi-select-item[value="item-0"]'
      );
      expect(firstItem.selected).to.be.false;
      expect(firstItem.hasAttribute('highlighted')).to.be.true;

      let enterEvent = new KeyboardEvent('keypress', {
        key: 'Enter',
        bubbles: true,
      });
      trigger.dispatchEvent(enterEvent);
      await el.updateComplete;

      expect(firstItem.selected).to.be.true;

      expect(el.open).to.be.true;
      const highlighted = el.querySelector(
        'cds-multi-select-item[highlighted]'
      );
      expect(highlighted).to.equal(firstItem);
      enterEvent = new KeyboardEvent('keypress', {
        key: 'Enter',
        bubbles: true,
      });
      trigger.dispatchEvent(enterEvent);
      await el.updateComplete;

      expect(firstItem.selected).to.be.false;
    });

    it('should toggle selection with space key on highlighted item (non-filterable)', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
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

      const firstItem = el.querySelector(
        'cds-multi-select-item[value="item-0"]'
      );
      expect(firstItem.selected).to.be.false;
      expect(firstItem.hasAttribute('highlighted')).to.be.true;

      let spaceEvent = new KeyboardEvent('keypress', {
        key: ' ',
        bubbles: true,
      });
      trigger.dispatchEvent(spaceEvent);
      await el.updateComplete;

      expect(firstItem.selected).to.be.true;
      expect(el.open).to.be.true;
      const highlighted = el.querySelector(
        'cds-multi-select-item[highlighted]'
      );
      expect(highlighted).to.equal(firstItem);
      spaceEvent = new KeyboardEvent('keypress', {
        key: ' ',
        bubbles: true,
      });
      trigger.dispatchEvent(spaceEvent);
      await el.updateComplete;

      expect(firstItem.selected).to.be.false;
    });

    it('should handle keyboard events properly for navigation', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');

      expect(el.open).to.be.false;
      trigger.click();
      await el.updateComplete;

      expect(el.open).to.be.true;

      const arrowDown = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
      });

      trigger.dispatchEvent(arrowDown);
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[0].hasAttribute('highlighted')).to.be.true;
    });

    it('should lose focus when clicking outside', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
        </cds-multi-select>
      `);
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.focus();
      trigger.click();
      await el.updateComplete;
      document.body.click();
      await el.updateComplete;
      expect(document.activeElement).to.not.equal(trigger);
    });

    it('should not steal focus from other inputs', async () => {
      const el = await fixture(html`
        <div>
          <cds-multi-select label="test-label" filterable>
            <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          </cds-multi-select>
          <input id="other-input" type="text" value="" />
        </div>
      `);
      const multi = el.querySelector('cds-multi-select');
      const trigger = multi.shadowRoot.querySelector('.cds--list-box__field');
      trigger.focus();
      trigger.click();
      await multi.updateComplete;
      const otherInput = el.querySelector('#other-input');
      otherInput.focus();
      otherInput.value = 'test';
      otherInput.dispatchEvent(new Event('input', { bubbles: true }));
      expect(document.activeElement).to.equal(otherInput);
    });

    it('should have correct accessibility attributes', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
        </cds-multi-select>
      `);
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;
      const input = el.shadowRoot.querySelector('input');
      input.focus();
      await el.updateComplete;
      const inputExpanded = input.getAttribute('aria-expanded');
      const triggerExpanded = trigger.getAttribute('aria-expanded');
      expect(inputExpanded === 'true' || triggerExpanded === 'true').to.be.true;
      if (input.hasAttribute('aria-haspopup')) {
        expect(input.getAttribute('aria-haspopup')).to.equal('listbox');
      }
      expect(el.open).to.be.true;
      const listbox = el.shadowRoot.querySelector('[part="menu-body"]');
      expect(listbox).to.exist;
    });
  });

  describe('State Management and Events', () => {
    it('should trigger selection event with selected items', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
      `);

      let changeEventData = null;
      el.addEventListener('cds-multi-select-selected', (event) => {
        changeEventData = event.detail;
      });

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const firstItem = el.querySelector(
        'cds-multi-select-item[value="item-0"]'
      );
      firstItem.click();
      await el.updateComplete;

      expect(changeEventData).to.not.be.null;
      expect(el.value).to.include('item-0');
    });

    it('should update value when multiple items are selected', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const firstItem = el.querySelector(
        'cds-multi-select-item[value="item-0"]'
      );
      firstItem.click();
      await el.updateComplete;

      expect(el.value).to.equal('item-0');

      const secondItem = el.querySelector(
        'cds-multi-select-item[value="item-1"]'
      );
      secondItem.click();
      await el.updateComplete;

      expect(el.value).to.equal('item-0,item-1');
    });

    it('should not trigger change event on initial render', async () => {
      let changeEventTriggered = false;

      const el = await fixture(html`
        <cds-multi-select label="test-label" value="item-0">
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
        </cds-multi-select>
      `);

      el.addEventListener('cds-multi-select-selected', () => {
        changeEventTriggered = true;
      });

      await el.updateComplete;

      expect(changeEventTriggered).to.be.false;
    });
  });
  describe('Select All Functionality', () => {
    it('should render select-all item when select-all attribute is present', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.selectAll).to.be.true;
      expect(el.hasAttribute('select-all')).to.be.true;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      expect(selectAllItem).to.exist;
      expect(selectAllItem.hasAttribute('is-select-all')).to.be.true;
    });

    it('should select all items when select-all is clicked', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all value=""
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-multi-select>
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

      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      regularItems.forEach((item) => {
        expect(item.hasAttribute('selected')).to.be.false;
      });

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
        <cds-multi-select
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
        </cds-multi-select>
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

      expect(selectAllItem.hasAttribute('selected')).to.be.true;
      regularItems.forEach((item) => {
        expect(item.hasAttribute('selected')).to.be.true;
      });

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
        <cds-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-multi-select>
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
      expect(firstItem.hasAttribute('selected')).to.be.true;
      expect(el.value).to.equal('item-0');
    });

    it('should clear indeterminate state and clear all when select-all is clicked in indeterminate state', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all value=""
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-multi-select>
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
      const regularItems = el.querySelectorAll(
        'cds-multi-select-item:not([is-select-all])'
      );

      firstItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('indeterminate')).to.be.true;

      selectAllItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;
      regularItems.forEach((item) => {
        expect(item.hasAttribute('selected')).to.be.false;
      });

      expect(el.value).to.equal('');
    });

    it('should not select disabled items when select-all is clicked', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all value=""
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1" disabled
            >Item 1 (disabled)</cds-multi-select-item
          >
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      const enabledItems = el.querySelectorAll(
        'cds-multi-select-item:not([is-select-all]):not([disabled])'
      );
      const disabledItem = el.querySelector('cds-multi-select-item[disabled]');

      selectAllItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.true;
      enabledItems.forEach((item) => {
        expect(item.hasAttribute('selected')).to.be.true;
      });
      expect(disabledItem.hasAttribute('selected')).to.be.false;

      const cleanValue = el.value.replace(/^,/, '');
      expect(cleanValue).to.equal('item-0,item-2');
    });

    it('should update select-all state when individual items are selected/deselected', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
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
      const secondItem = el.querySelector(
        'cds-multi-select-item[value="item-1"]'
      );

      firstItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.true;

      secondItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.true;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;

      firstItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.true;

      secondItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;
    });

    it('should handle select-all with keyboard navigation', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
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

      const arrowDown = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
      });
      trigger.dispatchEvent(arrowDown);
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('highlighted')).to.be.true;

      const enterEvent = new KeyboardEvent('keypress', {
        key: 'Enter',
        bubbles: true,
      });
      trigger.dispatchEvent(enterEvent);
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.true;
      regularItems.forEach((item) => {
        expect(item.hasAttribute('selected')).to.be.true;
      });
    });

    it('should trigger selection events when select-all is used', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all value=""
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
      `);

      let selectionEventData = null;
      el.addEventListener('cds-multi-select-selected', (event) => {
        selectionEventData = event.detail;
      });

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      selectAllItem.click();
      await el.updateComplete;

      expect(selectionEventData).to.not.be.null;

      const cleanValue = el.value.replace(/^,/, '');
      expect(cleanValue).to.equal('item-0,item-1');
    });

    it('should maintain select-all position at top of list', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" select-all>
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[0].hasAttribute('is-select-all')).to.be.true;
    });

    it('should clear all selections when select-all is clicked in indeterminate state', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" select-all>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-multi-select>
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
      const regularItems = el.querySelectorAll(
        'cds-multi-select-item:not([is-select-all])'
      );

      firstItem.click();
      await el.updateComplete;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.true;

      selectAllItem.click();
      await el.updateComplete;

      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;
      regularItems.forEach((item) => {
        expect(item.hasAttribute('selected')).to.be.false;
      });
      expect(el.value).to.equal('');
    });

    it('should recalculate select-all state when items are dynamically added', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" select-all value="item-0">
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
        </cds-multi-select>
      `);

      await el.updateComplete;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );

      expect(selectAllItem.hasAttribute('selected')).to.be.true;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;

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
  describe('Validation States', () => {
    it('should handle invalid state with invalid-text', async () => {
      const el = await fixture(html`
        <cds-multi-select
          label="test-label"
          invalid
          invalid-text="Selection is required">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.invalid).to.be.true;
      expect(el.invalidText).to.equal('Selection is required');

      const listbox = el.shadowRoot.querySelector('.cds--multi-select');
      expect(listbox.classList.contains('cds--multi-select--invalid')).to.be
        .true;
    });

    it('should handle warning state with warn-text', async () => {
      const el = await fixture(html`
        <cds-multi-select
          label="test-label"
          warn
          warn-text="Consider selecting more options">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.warn).to.be.true;
      expect(el.warnText).to.equal('Consider selecting more options');

      const listbox = el.shadowRoot.querySelector('.cds--multi-select');
      expect(listbox.classList.contains('cds--multi-select--warn')).to.be.true;
    });

    it('should display error messages correctly', async () => {
      const el = await fixture(html`
        <cds-multi-select
          label="test-label"
          invalid
          invalid-text="This field is required">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.invalidText).to.equal('This field is required');
      expect(el.getAttribute('invalid-text')).to.equal(
        'This field is required'
      );
    });
  });

  describe('Selection Feedback Modes', () => {
    it('should support "top" selection feedback', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" selection-feedback="top">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-multi-select>
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

    it('should support "fixed" selection feedback', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" selection-feedback="fixed">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.selectionFeedback).to.equal('fixed');

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const thirdItem = el.querySelector(
        'cds-multi-select-item[value="item-2"]'
      );
      thirdItem.click();
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[2].value).to.equal('item-2');
      expect(items[2].selected).to.be.true;
    });

    it('should support "top-after-reopen" selection feedback', async () => {
      const el = await fixture(html`
        <cds-multi-select
          label="test-label"
          selection-feedback="top-after-reopen">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.selectionFeedback).to.equal('top-after-reopen');

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const thirdItem = el.querySelector(
        'cds-multi-select-item[value="item-2"]'
      );
      thirdItem.click();
      await el.updateComplete;

      document.body.click();
      await el.updateComplete;

      trigger.click();
      await el.updateComplete;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items[0].value).to.equal('item-2');
    });
  });

  describe('Controlled behavior', () => {
    it('should maintain state when value changes externally', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" value="">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
      `);

      el.value = 'item-0,item-1';
      await el.updateComplete;

      const allItems = el.querySelectorAll('cds-multi-select-item');
      allItems.forEach((item) => {
        expect(item.selected).to.be.true;
      });

      el.value = '';
      await el.updateComplete;

      allItems.forEach((item) => {
        expect(item.selected).to.be.false;
      });
    });
  });

  describe('Size Variations', () => {
    it('should handle small size variant', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" size="sm">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.size).to.equal('sm');

      const listbox = el.shadowRoot.querySelector('.cds--list-box');
      expect(listbox.classList.contains('cds--list-box--sm')).to.be.true;
    });

    it('should handle large size variant', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" size="lg">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.size).to.equal('lg');

      const listbox = el.shadowRoot.querySelector('.cds--list-box');
      expect(listbox.classList.contains('cds--list-box--lg')).to.be.true;
    });
  });

  describe('Focus Management', () => {
    it('should maintain proper focus when menu opens', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      expect(el.open).to.be.true;

      const items = el.querySelectorAll('cds-multi-select-item');
      expect(items.length).to.be.greaterThan(0);
      expect(el.shadowRoot.querySelector('[part="menu-body"]')).to.exist;
    });

    it('should handle focus properly with filterable multiselect', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" filterable>
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const filterInput = el.shadowRoot.querySelector('input');
      expect(filterInput).to.exist;
      expect(el.open).to.be.true;
    });
  });

  describe('Enhanced Keyboard Interactions', () => {
    it('should clear selection when clear button is focused and Enter is pressed', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" value="item-0">
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
        </cds-multi-select>
      `);

      await el.updateComplete;
      expect(el.value).to.equal('item-0');

      const clearButton = el.shadowRoot.querySelector('#selection-button');
      expect(clearButton).to.exist;

      const enterEvent = new KeyboardEvent('keypress', {
        key: 'Enter',
        bubbles: true,
      });
      clearButton.dispatchEvent(enterEvent);
      await el.updateComplete;

      expect(el.value).to.equal('');
    });

    it('should handle navigation with disabled items', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1" disabled
            >Item 1 (disabled)</cds-multi-select-item
          >
          <cds-multi-select-item value="item-2">Item 2</cds-multi-select-item>
        </cds-multi-select>
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

  describe('Helper Text and Labels', () => {
    it('should display title-text properly', async () => {
      const el = await fixture(html`
        <cds-multi-select
          label="test-label"
          title-text="Select multiple options">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.titleText).to.equal('Select multiple options');
      expect(el.getAttribute('title-text')).to.equal('Select multiple options');
    });

    it('should handle hide-label properly', async () => {
      const el = await fixture(html`
        <cds-multi-select
          label="test-label"
          title-text="Hidden Label"
          hide-label>
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
        </cds-multi-select>
      `);

      expect(el.hideLabel).to.be.true;
      expect(el.hasAttribute('hide-label')).to.be.true;
    });

    it('should display clear selection labels correctly', async () => {
      const el = await fixture(html`
        <cds-multi-select
          label="test-label"
          clear-selection-label="Clear all selections"
          value="item-0">
          <cds-multi-select-item value="item-0" selected
            >Item 0</cds-multi-select-item
          >
        </cds-multi-select>
      `);

      expect(el.clearSelectionLabel).to.equal('Clear all selections');

      await el.updateComplete;

      const clearButton = el.shadowRoot.querySelector('#selection-button');
      expect(clearButton).to.exist;
      expect(clearButton.getAttribute('title')).to.equal(
        'Clear all selections'
      );
    });
  });

  describe('Advanced Filtering Features', () => {
    it('should support custom filtering with complex content', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" filterable>
          <cds-multi-select-item value="react"
            >React Framework</cds-multi-select-item
          >
          <cds-multi-select-item value="vue"
            >Vue.js Framework</cds-multi-select-item
          >
          <cds-multi-select-item value="angular"
            >Angular Framework</cds-multi-select-item
          >
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const filterInput = el.shadowRoot.querySelector('input');
      filterInput.value = 'react';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      const visibleItems = el.querySelectorAll(
        'cds-multi-select-item:not([filtered])'
      );
      expect(visibleItems.length).to.equal(1);
      expect(visibleItems[0].textContent.trim()).to.equal('React Framework');
    });

    it('should handle filterable multiselect with select-all', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" filterable select-all>
          <cds-multi-select-item value="select-all" is-select-all
            >All items</cds-multi-select-item
          >
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-multi-select-item value="item-1">Item 1</cds-multi-select-item>
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const filterInput = el.shadowRoot.querySelector('input');
      filterInput.value = 'item';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      expect(selectAllItem.hasAttribute('filtered')).to.be.false;

      const visibleItems = el.querySelectorAll(
        'cds-multi-select-item:not([filtered])'
      );
      expect(visibleItems.length).to.equal(3);
    });

    it('should maintain focus during filtering operations', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label" filterable>
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
        </cds-multi-select>
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
    });
  });

  describe('Select All Behaviours with Filterable MultiSelect', () => {
    it('should only select visible item when filtering', async () => {
      const el = await fixture(html`
        <cds-multi-select select-all filterable>
          <cds-multi-select-item is-select-all
            >Select All</cds-multi-select-item
          >
          <cds-multi-select-item value="apple">Apple</cds-multi-select-item>
          <cds-multi-select-item value="banana">Banana</cds-multi-select-item>
          <cds-multi-select-item value="cherry">Cherry</cds-multi-select-item>
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const filterInput = el.shadowRoot.querySelector('input');
      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );

      filterInput.value = 'a';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      selectAllItem.click();
      await el.updateComplete;

      const appleItem = el.querySelector(
        'cds-multi-select-item[value="apple"]'
      );
      const bananaItem = el.querySelector(
        'cds-multi-select-item[value="banana"]'
      );
      const cherryItem = el.querySelector(
        'cds-multi-select-item[value="cherry"]'
      );

      expect(selectAllItem.hasAttribute('selected')).to.be.true;
      expect(appleItem.hasAttribute('selected')).to.be.true;
      expect(bananaItem.hasAttribute('selected')).to.be.true;
      expect(cherryItem.hasAttribute('selected')).to.be.false;
    });
    it('should hide the select-all item when there are no items visible', async () => {
      const el = await fixture(html`
        <cds-multi-select filterable select-all>
          <cds-multi-select-item is-select-all>All</cds-multi-select-item>
          <cds-multi-select-item value="enabled">Enabled</cds-multi-select-item>
          <cds-multi-select-item value="disabled-a" disabled
            >Disabled A</cds-multi-select-item
          >
          <cds-multi-select-item value="disabled-b" disabled
            >Disabled B</cds-multi-select-item
          >
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;
      const selectAll = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      expect(selectAll.hasAttribute('filtered')).to.be.false;

      // filter that matches nothing
      const input = el.shadowRoot.querySelector('input');
      input.value = 'xyz';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(selectAll.hasAttribute('filtered')).to.be.true;
    });

    it('should hide the select-all item when there are only disabled items visible', async () => {
      const el = await fixture(html`
        <cds-multi-select filterable select-all>
          <cds-multi-select-item is-select-all>All</cds-multi-select-item>
          <cds-multi-select-item value="enabled">Enabled</cds-multi-select-item>
          <cds-multi-select-item value="disabled-a" disabled
            >Disabled A</cds-multi-select-item
          >
          <cds-multi-select-item value="disabled-b" disabled
            >Disabled B</cds-multi-select-item
          >
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;
      const selectAll = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );
      expect(selectAll.hasAttribute('filtered')).to.be.false;

      // filter that matches disabled items
      const input = el.shadowRoot.querySelector('input');
      input.value = 'Disabled';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(selectAll.hasAttribute('filtered')).to.be.true;
    });

    it('should correctly compute checked/indeterminate state depending on filter ', async () => {
      const el = await fixture(html`
        <cds-multi-select filterable select-all>
          <cds-multi-select-item is-select-all>All</cds-multi-select-item>
          <cds-multi-select-item value="foo">foo</cds-multi-select-item>
          <cds-multi-select-item value="bar">bar</cds-multi-select-item>
        </cds-multi-select>
      `);

      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;
      const input = el.shadowRoot.querySelector('input');
      const selectAllItem = el.querySelector(
        'cds-multi-select-item[is-select-all]'
      );

      // no items are selected
      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;

      // filter to “foo”
      input.value = 'foo';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;
      // no selected items visible: neither
      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;

      // click select all
      selectAllItem.click();
      await el.updateComplete;
      // all visible items (foo) are selected: selected
      expect(selectAllItem.hasAttribute('selected')).to.be.true;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;

      // filter to “bar”
      input.value = 'bar';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;
      // no selected items visible: neither
      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.false;

      // Remove filter
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;
      // only some visible items are selected: indeterminate
      expect(selectAllItem.hasAttribute('selected')).to.be.false;
      expect(selectAllItem.hasAttribute('indeterminate')).to.be.true;
    });
  });
});
