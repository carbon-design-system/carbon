/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/dropdown/index.js';
import '@carbon/web-components/es/components/dropdown/dropdown-skeleton.js';
import '@carbon/web-components/es/components/ai-label/index.js';

const dropdown = html`
  <cds-dropdown title-text="Dropdown Label">
    <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
    <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
    <cds-dropdown-item value="option-3">Option 3</cds-dropdown-item>
  </cds-dropdown>
`;

describe('cds-dropdown', function () {
  it('should render', async () => {
    const el = await fixture(dropdown);
    expect(el).to.exist;
  });

  it('should have title text', async () => {
    const el = await fixture(dropdown);
    const titleText = el.shadowRoot.querySelector('.cds--label');
    expect(titleText.textContent.trim()).to.equal('Dropdown Label');
  });

  it('should have dropdown items', async () => {
    const el = await fixture(dropdown);
    const items = el.querySelectorAll('cds-dropdown-item');
    expect(items.length).to.equal(3);
  });

  describe('basic interaction', () => {
    it('should open on click', async () => {
      const el = await fixture(dropdown);
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');

      expect(el.open).to.be.false;

      triggerButton.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
    });

    it('should select item on click', async () => {
      const el = await fixture(dropdown);
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');

      // Open the dropdown
      triggerButton.click();
      await el.updateComplete;

      // Click on an item
      const items = el.querySelectorAll('cds-dropdown-item');
      items[1].click();
      await el.updateComplete;

      // Dropdown should close and value should be set
      expect(el.open).to.be.false;
      expect(el.value).to.equal('option-2');
      expect(items[1].selected).to.be.true;
    });
  });

  describe('keyboard interaction', () => {
    it('should close with escape', async () => {
      const el = await fixture(dropdown);
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');

      // Open the dropdown first by clicking
      triggerButton.click();
      await el.updateComplete;
      expect(el.open).to.be.true;

      // Focus the trigger button to ensure keyboard events are captured
      triggerButton.focus();

      // Now close with escape
      await sendKeys({ press: 'Escape' });
      await el.updateComplete;

      expect(el.open).to.be.false;
    });

    it('should navigate with arrow keys', async () => {
      const el = await fixture(dropdown);
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');

      // Open the dropdown
      triggerButton.click();
      await el.updateComplete;
      expect(el.open).to.be.true;

      // Focus the trigger button
      triggerButton.focus();

      // Navigate down
      await sendKeys({ press: 'ArrowDown' });
      await el.updateComplete;

      // Check that the first item is highlighted
      const items = el.querySelectorAll('cds-dropdown-item');
      expect(items[0].highlighted).to.be.true;

      // Navigate down again
      await sendKeys({ press: 'ArrowDown' });
      await el.updateComplete;

      // First item should no longer be highlighted, second item should be
      expect(items[0].highlighted).to.be.false;
      expect(items[1].highlighted).to.be.true;

      // Navigate up
      await sendKeys({ press: 'ArrowUp' });
      await el.updateComplete;

      // Second item should no longer be highlighted, first item should be again
      expect(items[1].highlighted).to.be.false;
      expect(items[0].highlighted).to.be.true;
    });
  });

  describe('properties and attributes', () => {
    it('should reflect the disabled state', async () => {
      const el = await fixture(html`
        <cds-dropdown disabled title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>
      `);

      expect(el.disabled).to.be.true;

      // Clicking should not open the dropdown
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');
      triggerButton.click();
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    it('should respect the readOnly property', async () => {
      const el = await fixture(html`
        <cds-dropdown read-only title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>
      `);

      expect(el.readOnly).to.be.true;

      // Clicking should not open the dropdown
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');
      triggerButton.click();
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    it('should display helper text', async () => {
      const el = await fixture(html`
        <cds-dropdown
          helper-text="This is helper text"
          title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>
      `);

      const helperText = el.shadowRoot.querySelector('.cds--form__helper-text');
      expect(helperText.textContent.trim()).to.equal('This is helper text');
    });

    it('should display invalid state and message', async () => {
      const el = await fixture(html`
        <cds-dropdown
          invalid
          invalid-text="This field is required"
          title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>
      `);

      expect(el.invalid).to.be.true;

      // Should show invalid icon
      const invalidIcon = el.shadowRoot.querySelector(
        '.cds--list-box__invalid-icon'
      );
      expect(invalidIcon).to.exist;

      // Should show invalid message
      const helperText = el.shadowRoot.querySelector('.cds--form__helper-text');
      expect(helperText.textContent.trim()).to.equal('This field is required');
    });

    it('should display warning state and message', async () => {
      const el = await fixture(html`
        <cds-dropdown
          warn
          warn-text="This is a warning"
          title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>
      `);

      expect(el.warn).to.be.true;

      // Should show warning icon
      const warningIcon = el.shadowRoot.querySelector(
        '.cds--list-box__invalid-icon--warning'
      );
      expect(warningIcon).to.exist;

      // Should show warning message
      const helperText = el.shadowRoot.querySelector('.cds--form__helper-text');
      expect(helperText.textContent.trim()).to.equal('This is a warning');
    });

    it('should support different sizes', async () => {
      const sizes = ['sm', 'md', 'lg'];

      for (const size of sizes) {
        const el = await fixture(html`
          <cds-dropdown size="${size}" title-text="Dropdown Label">
            <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          </cds-dropdown>
        `);
        expect(el.getAttribute('size')).to.equal(size);
      }
    });

    it('should support type attribute', async () => {
      const el = await fixture(html`
        <cds-dropdown type="inline" title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>
      `);
      expect(el.getAttribute('type')).to.equal('inline');
    });

    it('should display initially selected item', async () => {
      const el = await fixture(html`
        <cds-dropdown title-text="Dropdown Label" value="option-2">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
          <cds-dropdown-item value="option-3">Option 3</cds-dropdown-item>
        </cds-dropdown>
      `);

      await el.updateComplete;

      // The second item should be selected
      const items = el.querySelectorAll('cds-dropdown-item');
      expect(items[1].selected).to.be.true;

      // The label should show the selected item's text
      const label = el.shadowRoot.querySelector('.cds--list-box__label');
      expect(label.textContent.trim()).to.equal('Option 2');
    });

    it('should render when defaultItemToString passed with null value', async () => {
      const el = await fixture(html`
        <cds-dropdown title-text="Dropdown Label">
          <!-- No items or empty items array -->
        </cds-dropdown>
      `);

      await el.updateComplete;

      // Check that the label is empty
      const label = el.shadowRoot.querySelector('.cds--list-box__label');
      expect(label.textContent.trim()).to.equal('');

      // Verify no non-empty label exists
      const nonEmptyLabel = el.shadowRoot.querySelector(
        '.cds--list-box__label:not(:empty)'
      );
      expect(nonEmptyLabel).to.be.null;
    });

    it('should support AI Label decorator', async () => {
      const el = await fixture(html`
        <cds-dropdown title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-ai-label slot="ai-label">AI</cds-ai-label>
        </cds-dropdown>
      `);

      await el.updateComplete;

      // Should have the ai-label attribute
      expect(el.hasAttribute('ai-label')).to.be.true;

      // Should have the AI label in the slot
      const aiLabel = el.querySelector('cds-ai-label');
      expect(aiLabel).to.exist;
    });

    it('should have proper ARIA attributes', async () => {
      const el = await fixture(html`
        <cds-dropdown
          title-text="Dropdown Label"
          aria-label="Custom Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
        </cds-dropdown>
      `);

      await el.updateComplete;

      // Check trigger button ARIA attributes
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');
      expect(triggerButton).to.have.attribute('role', 'combobox');
      expect(triggerButton).to.have.attribute('aria-haspopup', 'listbox');
      expect(triggerButton).to.have.attribute('aria-expanded', 'false');
      expect(triggerButton).to.have.attribute('aria-controls', 'menu-body');

      // Check menu body ARIA attributes
      const menuBody = el.shadowRoot.querySelector('#menu-body');
      expect(menuBody).to.have.attribute('role', 'listbox');
      expect(menuBody).to.have.attribute('aria-label', 'Custom Dropdown Label');

      // Open the dropdown and check updated ARIA attributes
      triggerButton.click();
      await el.updateComplete;

      expect(triggerButton).to.have.attribute('aria-expanded', 'true');
    });

    it('should support custom toggle labels for accessibility', async () => {
      const el = await fixture(html`
        <cds-dropdown
          title-text="Dropdown Label"
          toggle-label-closed="Open dropdown"
          toggle-label-open="Close dropdown">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-dropdown>
      `);

      await el.updateComplete;

      // Check that the chevron icon has the correct aria-label when closed
      const chevronIconClosed =
        el.shadowRoot.querySelector('#trigger-caret svg');
      expect(chevronIconClosed).to.have.attribute(
        'aria-label',
        'Open dropdown'
      );

      // Open the dropdown
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');
      triggerButton.click();
      await el.updateComplete;

      // Check that the aria-label changes when open
      const chevronIconOpen = el.shadowRoot.querySelector('#trigger-caret svg');
      expect(chevronIconOpen).to.have.attribute('aria-label', 'Close dropdown');
    });
  });

  describe('events', () => {
    it('should fire cds-dropdown-selected event when item is selected', async () => {
      const el = await fixture(dropdown);
      let eventFired = false;
      let selectedItem;

      el.addEventListener('cds-dropdown-selected', (event) => {
        eventFired = true;
        selectedItem = event.detail.item;
      });

      // Open dropdown and select an item
      el.open = true;
      await el.updateComplete;

      const items = el.querySelectorAll('cds-dropdown-item');
      items[1].click();
      await el.updateComplete;

      expect(eventFired).to.be.true;
      expect(selectedItem).to.equal(items[1]);
      expect(el.value).to.equal('option-2');
    });

    it('should fire cds-dropdown-toggled event when dropdown is opened/closed', async () => {
      const el = await fixture(dropdown);
      let eventFired = false;
      let openState;

      el.addEventListener('cds-dropdown-toggled', (event) => {
        eventFired = true;
        openState = event.detail.open;
      });

      // Open dropdown
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');
      triggerButton.click();
      await el.updateComplete;

      expect(eventFired).to.be.true;
      expect(openState).to.be.true;
    });
  });
});

describe('Validation states with disabled/readonly', () => {
  it('should not show invalid state when readOnly is true', async () => {
    const el = await fixture(html`
      <cds-dropdown
        read-only
        invalid
        invalid-text="This field is required"
        title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.false;
  });

  it('should not show warning state when readOnly is true', async () => {
    const el = await fixture(html`
      <cds-dropdown
        read-only
        warn
        warn-text="This is a warning"
        title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;
  });

  it('should not show invalid state when disabled is true', async () => {
    const el = await fixture(html`
      <cds-dropdown
        disabled
        invalid
        invalid-text="This field is required"
        title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.false;
  });

  it('should not show warning state when disabled is true', async () => {
    const el = await fixture(html`
      <cds-dropdown
        disabled
        warn
        warn-text="This is a warning"
        title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;
  });

  it('should not show warning state when invalid is true', async () => {
    const el = await fixture(html`
      <cds-dropdown
        invalid
        warn
        invalid-text="This field is required"
        warn-text="This is a warning"
        title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.true;
    expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;

    const helperText = el.shadowRoot.querySelector('.cds--form__helper-text');
    expect(helperText.textContent.trim()).to.equal('This field is required');
  });

  it('should apply correct CSS classes based on normalized props', async () => {
    const el = await fixture(html`
      <cds-dropdown disabled invalid warn title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');

    expect(listBox.classList.contains('cds--list-box--disabled')).to.be.true;

    expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.false;

    expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;
  });

  it('should prevent interaction when readOnly is true', async () => {
    const el = await fixture(html`
      <cds-dropdown read-only title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>
    `);

    await el.updateComplete;

    const triggerButton = el.shadowRoot.querySelector('#trigger-button');
    triggerButton.click();
    await el.updateComplete;

    expect(el.open).to.be.false;
  });
});

describe('cds-dropdown-skeleton', function () {
  describe('Renders as expected', () => {
    it('should render with the expected classes', async () => {
      const el = await fixture(
        html`<cds-dropdown-skeleton></cds-dropdown-skeleton>`
      );
      expect(el).to.exist;
      const skeletonRoot = el.shadowRoot.querySelector('.cds--dropdown');
      expect(skeletonRoot).to.exist;
      expect(skeletonRoot.classList.contains('cds--skeleton')).to.be.true;
      expect(skeletonRoot.classList.contains('cds--list-box--md')).to.be.true;
      expect(el.shadowRoot.querySelector('.cds--label.cds--skeleton')).to.exist;
    });

    it('should respect size attribute', async () => {
      const sizes = ['sm', 'md', 'lg'];

      for (const size of sizes) {
        const el = await fixture(
          html`<cds-dropdown-skeleton size="${size}"></cds-dropdown-skeleton>`
        );
        expect(el.getAttribute('size')).to.equal(size);
      }
    });
  });
});
