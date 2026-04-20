/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/fluid-dropdown/index.js';
import '@carbon/web-components/es/components/ai-label/index.js';

const fluidDropdown = html`
  <cds-fluid-dropdown title-text="Dropdown Label">
    <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
    <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
    <cds-dropdown-item value="option-3">Option 3</cds-dropdown-item>
  </cds-fluid-dropdown>
`;

describe('cds-fluid-dropdown', function () {
  it('should render', async () => {
    const el = await fixture(fluidDropdown);
    expect(el).to.exist;
  });

  it('should have title text', async () => {
    const el = await fixture(fluidDropdown);
    const titleText = el.shadowRoot.querySelector('.cds--label');
    expect(titleText.textContent.trim()).to.equal('Dropdown Label');
  });

  it('should have dropdown items', async () => {
    const el = await fixture(fluidDropdown);
    const items = el.querySelectorAll('cds-dropdown-item');
    expect(items.length).to.equal(3);
  });

  describe('basic interaction', () => {
    it('should open on click', async () => {
      const el = await fixture(fluidDropdown);
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');

      expect(el.open).to.be.false;

      triggerButton.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
    });

    it('should not apply hover state to next item when hovering disabled item', async () => {
      const el = await fixture(html`
        <cds-fluid-dropdown title-text="Dropdown Label" open>
          <cds-dropdown-item value="option-1" disabled
            >Option 1</cds-dropdown-item
          >
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
        </cds-fluid-dropdown>
      `);

      await el.updateComplete;

      const items = el.querySelectorAll('cds-dropdown-item');
      items[0].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await el.updateComplete;

      expect(items[1].hasAttribute('hovered-next-sibling')).to.be.false;
    });
  });

  describe('keyboard interaction', () => {
    it('should close with escape', async () => {
      const el = await fixture(fluidDropdown);
      const triggerButton = el.shadowRoot.querySelector('#trigger-button');

      triggerButton.click();
      await el.updateComplete;
      expect(el.open).to.be.true;

      triggerButton.focus();

      await sendKeys({ press: 'Escape' });
      await el.updateComplete;

      expect(el.open).to.be.false;
    });
  });

  describe('properties and attributes', () => {
    it('should reflect the disabled state', async () => {
      const el = await fixture(html`
        <cds-fluid-dropdown disabled title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-fluid-dropdown>
      `);

      expect(el.disabled).to.be.true;

      const triggerButton = el.shadowRoot.querySelector('#trigger-button');
      triggerButton.click();
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    it('should respect the readOnly property', async () => {
      const el = await fixture(html`
        <cds-fluid-dropdown read-only title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-fluid-dropdown>
      `);

      expect(el.readOnly).to.be.true;

      const triggerButton = el.shadowRoot.querySelector('#trigger-button');
      triggerButton.click();
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    it('should display invalid state and message', async () => {
      const el = await fixture(html`
        <cds-fluid-dropdown
          invalid
          invalid-text="This field is required"
          title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-fluid-dropdown>
      `);

      expect(el.invalid).to.be.true;

      const invalidIcon = el.shadowRoot.querySelector(
        '.cds--list-box__invalid-icon'
      );
      expect(invalidIcon).to.exist;

      const helperText = el.shadowRoot.querySelector('.cds--form__helper-text');
      expect(helperText.textContent.trim()).to.equal('This field is required');
    });

    it('should display warning state and message', async () => {
      const el = await fixture(html`
        <cds-fluid-dropdown
          warn
          warn-text="This is a warning"
          title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
        </cds-fluid-dropdown>
      `);

      expect(el.warn).to.be.true;

      const warningIcon = el.shadowRoot.querySelector(
        '.cds--list-box__invalid-icon--warning'
      );
      expect(warningIcon).to.exist;

      const helperText = el.shadowRoot.querySelector('.cds--form__helper-text');
      expect(helperText.textContent.trim()).to.equal('This is a warning');
    });

    it('should support AI Label decorator', async () => {
      const el = await fixture(html`
        <cds-fluid-dropdown title-text="Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-ai-label slot="ai-label">AI</cds-ai-label>
        </cds-fluid-dropdown>
      `);

      await el.updateComplete;

      expect(el.hasAttribute('ai-label')).to.be.true;

      const aiLabel = el.querySelector('cds-ai-label');
      expect(aiLabel).to.exist;
    });

    it('should have proper ARIA attributes', async () => {
      const el = await fixture(html`
        <cds-fluid-dropdown
          title-text="Dropdown Label"
          aria-label="Custom Dropdown Label">
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
        </cds-fluid-dropdown>
      `);

      await el.updateComplete;

      const triggerButton = el.shadowRoot.querySelector('#trigger-button');
      expect(triggerButton).to.have.attribute('role', 'combobox');
      expect(triggerButton).to.have.attribute('aria-haspopup', 'listbox');
      expect(triggerButton).to.have.attribute('aria-expanded', 'false');
      expect(triggerButton).to.have.attribute('aria-controls', 'menu-body');

      const menuBody = el.shadowRoot.querySelector('#menu-body');
      expect(menuBody).to.have.attribute('role', 'listbox');
      expect(menuBody).to.have.attribute('aria-label', 'Custom Dropdown Label');

      triggerButton.click();
      await el.updateComplete;

      expect(triggerButton).to.have.attribute('aria-expanded', 'true');
    });
  });

  describe('events', () => {
    it('should fire cds-dropdown-toggled event when dropdown is opened/closed', async () => {
      const el = await fixture(fluidDropdown);
      let eventFired = false;
      let openState;

      el.addEventListener('cds-dropdown-toggled', (event) => {
        eventFired = true;
        openState = event.detail.open;
      });

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
      <cds-fluid-dropdown
        read-only
        invalid
        invalid-text="This field is required"
        title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-fluid-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.false;
  });

  it('should not show warning state when readOnly is true', async () => {
    const el = await fixture(html`
      <cds-fluid-dropdown
        read-only
        warn
        warn-text="This is a warning"
        title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-fluid-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;
  });

  it('should not show invalid state when disabled is true', async () => {
    const el = await fixture(html`
      <cds-fluid-dropdown
        disabled
        invalid
        invalid-text="This field is required"
        title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-fluid-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.false;
  });

  it('should not show warning state when disabled is true', async () => {
    const el = await fixture(html`
      <cds-fluid-dropdown
        disabled
        warn
        warn-text="This is a warning"
        title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-fluid-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');
    expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;
  });

  it('should not show warning state when invalid is true', async () => {
    const el = await fixture(html`
      <cds-fluid-dropdown
        invalid
        warn
        invalid-text="This field is required"
        warn-text="This is a warning"
        title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-fluid-dropdown>
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
      <cds-fluid-dropdown disabled invalid warn title-text="Dropdown Label">
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-fluid-dropdown>
    `);

    await el.updateComplete;

    const listBox = el.shadowRoot.querySelector('.cds--list-box');

    expect(listBox.classList.contains('cds--list-box--disabled')).to.be.true;
    expect(listBox.classList.contains('cds--dropdown--invalid')).to.be.false;
    expect(listBox.classList.contains('cds--dropdown--warn')).to.be.false;
  });
});

describe('cds-fluid-dropdown-skeleton', function () {
  describe('Renders as expected', () => {
    it('should render with the expected classes', async () => {
      const el = await fixture(
        html`<cds-fluid-dropdown-skeleton></cds-fluid-dropdown-skeleton>`
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
