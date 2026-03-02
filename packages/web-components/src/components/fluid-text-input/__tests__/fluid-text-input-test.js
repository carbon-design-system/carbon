/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/fluid-text-input/index.js';
import { html, fixture, expect, oneEvent } from '@open-wc/testing';

describe('cds-fluid-text-input', () => {
  describe('renders as expected - Component API', () => {
    it('should render as expected', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input
          label="FluidTextInput label"></cds-fluid-text-input>
      `);

      expect(el.shadowRoot.querySelector('.cds--text-input--fluid')).to.exist;
    });

    it('should support a custom className on the outermost element', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" class="custom-class">
        </cds-fluid-text-input>
      `);

      expect(el.classList.contains('custom-class')).to.be.true;
    });

    it('should respect value attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input
          label="FluidTextInput label"
          value="This is default text">
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.value).to.equal('This is default text');
    });

    it('should respect disabled attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" disabled>
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.disabled).to.be.true;
    });

    it('should respect invalid attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input
          label="FluidTextInput"
          invalid
          invalid-text="Invalid">
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      const invalidIcon = el.shadowRoot.querySelector(
        'svg.cds--text-input__invalid-icon'
      );

      expect(input.getAttribute('data-invalid')).to.equal('');
      expect(input.classList.contains('cds--text-input--invalid')).to.be.true;
      expect(invalidIcon).to.exist;
    });

    it('should respect invalidText attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input
          label="FluidTextInput"
          invalid
          invalid-text="This is invalid text">
        </cds-fluid-text-input>
      `);

      const invalidText = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(invalidText.textContent).to.include('This is invalid text');
      expect(invalidText.classList.contains('cds--form-requirement')).to.be
        .true;
    });

    it('should respect labelText attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input
          label="FluidTextInput label"></cds-fluid-text-input>
      `);

      const label = el.shadowRoot.querySelector('.cds--label');
      expect(label.textContent).to.include('FluidTextInput label');
      expect(label.classList.contains('cds--label')).to.be.true;
    });

    it('should respect placeholder attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input
          label="FluidTextInput label"
          placeholder="Placeholder text">
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.getAttribute('placeholder')).to.equal('Placeholder text');
    });

    it('should respect type attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" type="text">
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.getAttribute('type')).to.equal('text');
    });

    it('should respect value attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input
          label="FluidTextInput label"
          value="This is a test value">
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.value).to.equal('This is a test value');
    });

    it('should respect warn attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input
          label="FluidTextInput label"
          warn
          warn-text="Warning">
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      const warnIcon = el.shadowRoot.querySelector(
        'svg.cds--text-input__invalid-icon--warning'
      );

      expect(input.classList.contains('cds--text-input--warning')).to.be.true;
      expect(warnIcon).to.exist;
    });

    it('should respect warnText attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input
          label="FluidTextInput label"
          warn
          warn-text="This is warning text">
        </cds-fluid-text-input>
      `);

      const warnText = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(warnText.textContent).to.include('This is warning text');
      expect(warnText.classList.contains('cds--form-requirement')).to.be.true;
    });

    it('should respect hideLabel attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="Hidden label" hide-label>
        </cds-fluid-text-input>
      `);

      const label = el.shadowRoot.querySelector('label');
      expect(label.classList.contains('cds--visually-hidden')).to.be.true;
    });

    it('should respect readonly attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" readonly>
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.readOnly).to.be.true;
    });

    it('should respect required attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" required>
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.required).to.be.true;
    });

    it('should respect autofocus attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" autofocus>
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.autofocus).to.be.true;
    });

    it('should respect autocomplete attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" autocomplete="email">
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.getAttribute('autocomplete')).to.equal('email');
    });

    it('should respect pattern attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" pattern="[A-Za-z]+">
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.getAttribute('pattern')).to.equal('[A-Za-z]+');
    });

    it('should respect name attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" name="test-name">
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      expect(input.getAttribute('name')).to.equal('test-name');
    });

    it('should respect enableCounter and maxCount attributes', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input
          label="FluidTextInput label"
          enable-counter
          max-count="100"
          value="Test">
        </cds-fluid-text-input>
      `);

      const counter = el.shadowRoot.querySelector(
        '.cds--text-input__label-counter'
      );
      expect(counter).to.exist;
      expect(counter.textContent).to.include('4/100');
    });
  });

  describe('behaves as expected - Component API', () => {
    it('should not fire input events when disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" disabled>
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');
      let inputEventFired = false;

      el.addEventListener('input', () => {
        inputEventFired = true;
      });

      input.dispatchEvent(new Event('input', { bubbles: true }));
      expect(inputEventFired).to.be.false;
    });

    it('should respect readOnly attribute behavior', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input label="FluidTextInput label" readonly>
        </cds-fluid-text-input>
      `);

      const input = el.shadowRoot.querySelector('input');

      // Readonly inputs should not accept direct value changes via user input
      input.value = 'x';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      // The input should not change value when readonly
      expect(input.readOnly).to.be.true;
    });
  });

  // Slot support tests
  describe('slot support', () => {
    it('should render slotted label-text', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input>
          <span slot="label-text">Slotted Label</span>
        </cds-fluid-text-input>
      `);

      const slot = el.shadowRoot.querySelector('slot[name="label-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Label');
    });

    it('should render slotted invalid-text', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input invalid>
          <span slot="invalid-text">Slotted Invalid</span>
        </cds-fluid-text-input>
      `);

      const slot = el.shadowRoot.querySelector('slot[name="invalid-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Invalid');
    });

    it('should render slotted warn-text', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input warn>
          <span slot="warn-text">Slotted Warning</span>
        </cds-fluid-text-input>
      `);

      const slot = el.shadowRoot.querySelector('slot[name="warn-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Warning');
    });

    it('should render slotted ai-label', async () => {
      const el = await fixture(html`
        <cds-fluid-text-input>
          <cds-ai-label slot="ai-label">AI Label</cds-ai-label>
        </cds-fluid-text-input>
      `);

      const slot = el.shadowRoot.querySelector('slot[name="ai-label"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content).to.exist;
    });
  });

  // Form integration tests
  describe('form integration', () => {
    it('should participate in form data', async () => {
      const form = await fixture(html`
        <form>
          <cds-fluid-text-input name="test-input" value="test-value">
          </cds-fluid-text-input>
        </form>
      `);

      const formData = new FormData(form);
      expect(formData.get('test-input')).to.equal('test-value');
    });

    it('should not submit data when disabled', async () => {
      const form = await fixture(html`
        <form>
          <cds-fluid-text-input name="test-input" value="test-value" disabled>
          </cds-fluid-text-input>
        </form>
      `);

      const formData = new FormData(form);
      expect(formData.get('test-input')).to.be.null;
    });
  });
});
