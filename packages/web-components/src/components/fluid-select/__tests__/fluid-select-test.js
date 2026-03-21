/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/fluid-select/index.js';
import '@carbon/web-components/es/components/select/index.js';
import '@carbon/web-components/es/components/toggle-tip/index.js';

describe('cds-fluid-select', () => {
  describe('renders as expected - Component API', () => {
    it('should set the fluid mode flag', async () => {
      const el = await fixture(
        html`<cds-fluid-select
          label-text="Fluid select label"></cds-fluid-select>`
      );
      expect(el.getAttribute('isFluid')).to.equal('true');
    });

    it('should render the internal select', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Label">
          <cds-select-item value="a">A</cds-select-item>
        </cds-fluid-select>
      `);

      const internalSelect = el.shadowRoot.querySelector('select');
      expect(internalSelect).to.exist;
      expect(el.shadowRoot.firstElementChild).to.have.class('cds--select');
    });

    it('should support a custom class on the host', async () => {
      const el = await fixture(html`
        <cds-fluid-select
          class="custom-class"
          label-text="Label"></cds-fluid-select>
      `);
      expect(el.classList.contains('custom-class')).to.be.true;
    });

    it('should render helper text', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Select label" helper-text="Helper text">
          <cds-select-item value="a">A</cds-select-item>
        </cds-fluid-select>
      `);
      const helper = el.shadowRoot.querySelector('.cds--form__helper-text');
      expect(helper).to.exist;
      expect(helper.textContent).to.include('Helper text');
    });

    it('should support the hide-label attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Hidden label" hide-label>
          <cds-select-item value="a">A</cds-select-item>
        </cds-fluid-select>
      `);
      const label = el.shadowRoot.querySelector('label');
      expect(label).to.exist;
      expect(label.classList.contains('cds--visually-hidden')).to.be.true;
    });

    it('should support the placeholder attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Select" placeholder="Choose an option">
          <cds-select-item value="a">A</cds-select-item>
        </cds-fluid-select>
      `);

      const internalSelect = el.shadowRoot.querySelector('select');
      const firstOption = internalSelect.options[0];
      expect(firstOption.disabled).to.be.true;
      expect(firstOption.hidden).to.be.true;
      expect(firstOption.textContent).to.include('Choose an option');
      expect(firstOption.value).to.match(/^__cds-select-placeholder_/);
    });

    it('should support the size attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Sized select" size="sm">
          <cds-select-item value="a">A</cds-select-item>
        </cds-fluid-select>
      `);
      const internalSelect = el.shadowRoot.querySelector('select');
      expect(internalSelect).to.have.class('cds--select-input--sm');
    });

    it('should reflect the selected option', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Select label">
          <cds-select-item value="option-1">Option 1</cds-select-item>
          <cds-select-item value="option-2" selected>Option 2</cds-select-item>
        </cds-fluid-select>
      `);
      const internalSelect = el.shadowRoot.querySelector('select');
      expect(internalSelect.value).to.equal('option-2');
    });

    it('should reflect the value attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Select label" value="b">
          <cds-select-item value="a">A</cds-select-item>
          <cds-select-item value="b">B</cds-select-item>
        </cds-fluid-select>
      `);
      const internalSelect = el.shadowRoot.querySelector('select');
      expect(internalSelect.value).to.equal('b');
    });

    it('should be focusable', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Focusable">
          <cds-select-item value="a">A</cds-select-item>
        </cds-fluid-select>
      `);
      const internalSelect = el.shadowRoot.querySelector('select');

      el.focus();
      expect(document.activeElement).to.equal(el);
      expect(el.shadowRoot.activeElement).to.equal(internalSelect);
    });

    it('should not apply field focus style when focusing a toggletip in the label', async () => {
      const root = await fixture(html`
        <div>
          <cds-fluid-select>
            <span slot="label-text">
              Clock
              <cds-toggletip button-label="Show information"
                >Help</cds-toggletip
              >
            </span>
            <cds-select-item value="a">A</cds-select-item>
          </cds-fluid-select>
        </div>
      `);

      const el = root.querySelector('cds-fluid-select');
      expect(el).to.exist;
      const wrapper = el.shadowRoot.querySelector('.cds--select');
      expect(wrapper).to.exist;
      const select = el.shadowRoot.querySelector('select');
      expect(select).to.exist;
      const toggletip = el.querySelector('cds-toggletip');
      expect(toggletip).to.exist;

      await toggletip.updateComplete;
      toggletip.focus();
      await el.updateComplete;
      expect(wrapper).not.to.have.class('cds--select--fluid--focus');

      select.focus();
      await el.updateComplete;
      expect(wrapper).to.have.class('cds--select--fluid--focus');
    });
  });

  describe('behaves as expected', () => {
    it('should emit cds-select-selected when changed', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Select">
          <cds-select-item value="a">A</cds-select-item>
          <cds-select-item value="b">B</cds-select-item>
        </cds-fluid-select>
      `);

      const select = el.shadowRoot.querySelector('select');
      setTimeout(() => {
        select.value = 'b';
        select.dispatchEvent(
          new Event('input', { bubbles: true, composed: true })
        );
      });

      const event = await oneEvent(el, 'cds-select-selected');
      expect(event.detail.value).to.equal('b');
    });

    it('should render fluid divider', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Select label">
          <cds-select-item value="a">A</cds-select-item>
        </cds-fluid-select>
      `);
      const divider = el.shadowRoot.querySelector('.cds--select__divider');
      expect(divider).to.exist;
    });

    it('should render invalid text inside the fluid wrapper', async () => {
      const el = await fixture(html`
        <cds-fluid-select
          label-text="Select"
          invalid
          invalid-text="This is an error">
          <cds-select-item value="1">One</cds-select-item>
        </cds-fluid-select>
      `);

      const divider = el.shadowRoot.querySelector('.cds--select__divider');
      const error = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(divider).to.exist;
      expect(error).to.exist;
      expect(error.textContent).to.include('This is an error');
    });

    it('should render warn text inside the fluid wrapper', async () => {
      const el = await fixture(html`
        <cds-fluid-select
          label-text="Select"
          warn
          warn-text="This is a warning">
          <cds-select-item value="1">One</cds-select-item>
        </cds-fluid-select>
      `);

      const warning = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(warning).to.exist;
      expect(warning.textContent).to.include('This is a warning');
    });

    it('should prioritize invalid over warn', async () => {
      const el = await fixture(html`
        <cds-fluid-select
          label-text="Select"
          invalid
          invalid-text="Invalid"
          warn
          warn-text="Warn">
          <cds-select-item value="1">One</cds-select-item>
        </cds-fluid-select>
      `);

      const message = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(message).to.exist;
      expect(message.textContent).to.include('Invalid');
      expect(message.textContent).to.not.include('Warn');
    });

    it('should not display invalid message if disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-select
          label-text="Select"
          disabled
          invalid
          invalid-text="This is an error">
          <cds-select-item value="1">One</cds-select-item>
        </cds-fluid-select>
      `);

      const error = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(error).to.not.exist;

      const internalSelect = el.shadowRoot.querySelector('select');
      expect(internalSelect.getAttribute('aria-invalid')).to.equal('false');
    });

    it('should not display invalid message if readonly', async () => {
      const el = await fixture(html`
        <cds-fluid-select
          label-text="Select"
          readonly
          invalid
          invalid-text="This is an error">
          <cds-select-item value="1">One</cds-select-item>
        </cds-fluid-select>
      `);

      const error = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(error).to.not.exist;

      const internalSelect = el.shadowRoot.querySelector('select');
      expect(internalSelect.getAttribute('aria-invalid')).to.equal('false');
    });

    it('should reflect required state', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Select" required>
          <cds-select-item value="a">A</cds-select-item>
        </cds-fluid-select>
      `);
      expect(el.required).to.be.true;
      expect(el.hasAttribute('required')).to.be.true;
    });

    it('should be accessible', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="Select label" helper-text="Helper text">
          <cds-select-item value="option-1">Option 1</cds-select-item>
        </cds-fluid-select>
      `);
      await expect(el).to.be.accessible();
    });
  });

  describe('slot support', () => {
    it('should render slotted label-text', async () => {
      const el = await fixture(html`
        <cds-fluid-select>
          <span slot="label-text">Slotted Label</span>
          <cds-select-item value="a">A</cds-select-item>
        </cds-fluid-select>
      `);
      const slot = el.shadowRoot.querySelector('slot[name="label-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Label');
    });

    it('should render slotted helper-text', async () => {
      const el = await fixture(html`
        <cds-fluid-select helper-text="Helper text">
          <span slot="helper-text">Slotted Helper</span>
          <cds-select-item value="a">A</cds-select-item>
        </cds-fluid-select>
      `);
      const slot = el.shadowRoot.querySelector('slot[name="helper-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Helper');
    });

    it('should support AI label slot and apply slug', async () => {
      const el = await fixture(html`
        <cds-fluid-select label-text="With AI">
          <cds-ai-label slot="ai-label">AI Confidence</cds-ai-label>
          <cds-select-item value="1">One</cds-select-item>
        </cds-fluid-select>
      `);
      expect(el.hasAttribute('slug')).to.be.true;

      const ai = el.querySelector('cds-ai-label');
      expect(ai).to.exist;
      expect(ai.textContent).to.include('AI Confidence');
      expect(ai.getAttribute('size')).to.equal('mini');
    });
  });

  describe('form integration', () => {
    it('should participate in form data', async () => {
      const form = await fixture(html`
        <form>
          <cds-fluid-select name="test-select" value="b" label-text="Select">
            <cds-select-item value="a">A</cds-select-item>
            <cds-select-item value="b">B</cds-select-item>
          </cds-fluid-select>
        </form>
      `);

      const formData = new FormData(form);
      expect(formData.get('test-select')).to.equal('b');
    });

    it('should not submit data when disabled', async () => {
      const form = await fixture(html`
        <form>
          <cds-fluid-select
            name="test-select"
            value="b"
            label-text="Select"
            disabled>
            <cds-select-item value="a">A</cds-select-item>
            <cds-select-item value="b">B</cds-select-item>
          </cds-fluid-select>
        </form>
      `);

      const formData = new FormData(form);
      expect(formData.get('test-select')).to.be.null;
    });
  });
});
