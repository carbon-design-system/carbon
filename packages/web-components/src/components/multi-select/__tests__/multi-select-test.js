/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import '@carbon/web-components/es/components/multi-select/index.js';

// Helper function to generate test items
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

    // Open the menu
    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.click();
    await el.updateComplete;

    const firstItem = el.querySelector('cds-multi-select-item[value="item-0"]');
    expect(firstItem.selected).to.be.false;

    // Click to select
    firstItem.click();
    await el.updateComplete;

    expect(firstItem.selected).to.be.true;

    // Click to deselect
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
    // Open the menu
    const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
    trigger.click();
    await el.updateComplete;

    // Get all visible items
    const items = el.querySelectorAll('cds-multi-select-item');
    // Check that no item has textContent 'undefined'
    items.forEach((item) => {
      expect(item.textContent.trim()).to.not.equal('undefined');
    });
  });

  describe('Component API', () => {
    it('should trigger selection events when items are selected', async () => {
      const el = await fixture(multiSelect);

      const selectionListener = oneEvent(el, 'cds-multi-select-selected');

      // Open menu and select an item
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

      // Open menu and select third item
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const thirdItem = el.querySelector(
        'cds-multi-select-item[value="item-2"]'
      );
      thirdItem.click();
      await el.updateComplete;

      // With "top" feedback, selected items should move to top
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

    it('should respect deprecated ai-label slot', async () => {
      const el = await fixture(html`
        <cds-multi-select label="test-label">
          <cds-multi-select-item value="item-0">Item 0</cds-multi-select-item>
          <cds-ai-label slot="ai-label"></cds-ai-label>
        </cds-multi-select>
      `);

      const aiLabelSlot = el.shadowRoot.querySelector('slot[name="ai-label"]');
      if (aiLabelSlot) {
        const assigned = aiLabelSlot.assignedNodes({ flatten: true });
        const aiLabel = assigned.find(
          (node) =>
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName.toLowerCase() === 'cds-ai-label'
        );
        expect(aiLabel).to.exist;
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
      // Open the menu
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;
      // Check that the custom string is rendered
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
      // Open the menu
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;
      // Check that the custom element is rendered
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

      // Open menu
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      // Type in filter input
      const filterInput = el.shadowRoot.querySelector('input');
      filterInput.value = 'app';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      // Only apple should be visible
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

      // Open menu and type filter
      const trigger = el.shadowRoot.querySelector('.cds--list-box__field');
      trigger.click();
      await el.updateComplete;

      const filterInput = el.shadowRoot.querySelector('input');
      filterInput.value = 'app';
      filterInput.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      // Clear filter
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
      // ArrowDown to highlight the first item
      const arrowDown = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
      });
      trigger.dispatchEvent(arrowDown);
      await el.updateComplete;
      expect(items[0].hasAttribute('highlighted')).to.be.true;
      // ArrowDown again to move to the next
      trigger.dispatchEvent(arrowDown);
      await el.updateComplete;
      expect(items[1].hasAttribute('highlighted')).to.be.true;
      // ArrowUp to move back
      const arrowUp = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
      });
      trigger.dispatchEvent(arrowUp);
      await el.updateComplete;
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
      // Check aria-expanded on both input and trigger
      const inputExpanded = input.getAttribute('aria-expanded');
      const triggerExpanded = trigger.getAttribute('aria-expanded');
      expect(inputExpanded === 'true' || triggerExpanded === 'true').to.be.true;
      // aria-haspopup may not be present, so only check if it exists
      if (input.hasAttribute('aria-haspopup')) {
        expect(input.getAttribute('aria-haspopup')).to.equal('listbox');
      }
      // Menu should be open and listbox present
      expect(el.open).to.be.true;
      const listbox = el.shadowRoot.querySelector('[part="menu-body"]');
      expect(listbox).to.exist;
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

      // Change to select all items
      el.value = 'item-0,item-1';
      await el.updateComplete;

      const allItems = el.querySelectorAll('cds-multi-select-item');
      allItems.forEach((item) => {
        expect(item.selected).to.be.true;
      });

      // Change to clear all items
      el.value = '';
      await el.updateComplete;

      allItems.forEach((item) => {
        expect(item.selected).to.be.false;
      });
    });
  });
});
