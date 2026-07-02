/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/fluid-time-picker/index.js';
import '@carbon/web-components/es/components/select/index.js';

describe('cds-fluid-time-picker', () => {
  describe('renders as expected - Component API', () => {
    it('should render as expected', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time"></cds-fluid-time-picker>
      `);

      expect(el.shadowRoot.querySelector('.cds--time-picker--fluid')).to.exist;
    });

    it('should support a custom className on the outermost element', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time" class="custom-class">
        </cds-fluid-time-picker>
      `);

      expect(el.classList.contains('custom-class')).to.be.true;
    });

    it('should respect invalidText attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker
          label-text="Time"
          invalid
          invalid-text="This is invalid text"></cds-fluid-time-picker>
      `);

      const invalidText = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(invalidText).to.exist;
      expect(invalidText.textContent).to.include('This is invalid text');
    });

    it('should respect warningText attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker
          label-text="Time"
          warning
          warning-text="This is warning text"></cds-fluid-time-picker>
      `);

      const warningText = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(warningText).to.exist;
      expect(warningText.textContent).to.include('This is warning text');
    });
  });

  describe('behaves as expected - Component API', () => {
    it('should not fire click events when disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time" disabled>
        </cds-fluid-time-picker>
      `);

      const input = el.shadowRoot.querySelector('input');
      let clickEventFired = false;

      el.addEventListener('click', () => {
        clickEventFired = true;
      });

      input.click();
      expect(clickEventFired).to.be.false;
    });

    it('should not display invalid message if disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker
          label-text="Time"
          disabled
          invalid
          invalid-text="Invalid time"></cds-fluid-time-picker>
      `);

      const error = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(error).to.not.exist;

      const wrapper = el.shadowRoot.querySelector('.cds--time-picker--fluid');
      expect(wrapper).to.not.have.class('cds--time-picker--fluid--invalid');
    });

    it('should not display invalid message if readonly', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker
          label-text="Time"
          readonly
          invalid
          invalid-text="Invalid time"></cds-fluid-time-picker>
      `);

      const error = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(error).to.not.exist;

      const wrapper = el.shadowRoot.querySelector('.cds--time-picker--fluid');
      expect(wrapper).to.not.have.class('cds--time-picker--fluid--invalid');
    });

    it('should not display warning message if disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker
          label-text="Time"
          disabled
          warning
          warning-text="Warning message"></cds-fluid-time-picker>
      `);

      const warning = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(warning).to.not.exist;

      const wrapper = el.shadowRoot.querySelector('.cds--time-picker--fluid');
      expect(wrapper).to.not.have.class('cds--time-picker--fluid--warning');
    });

    it('should not display warning message if readonly', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker
          label-text="Time"
          readonly
          warning
          warning-text="Warning message"></cds-fluid-time-picker>
      `);

      const warning = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(warning).to.not.exist;

      const wrapper = el.shadowRoot.querySelector('.cds--time-picker--fluid');
      expect(wrapper).to.not.have.class('cds--time-picker--fluid--warning');
    });

    it('should prioritize invalid over warning', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker
          label-text="Time"
          invalid
          invalid-text="Invalid"
          warning
          warning-text="Warning"></cds-fluid-time-picker>
      `);

      const message = el.shadowRoot.querySelector('.cds--form-requirement');
      expect(message).to.exist;
      expect(message.textContent).to.include('Invalid');
      expect(message.textContent).to.not.include('Warning');

      const wrapper = el.shadowRoot.querySelector('.cds--time-picker--fluid');
      expect(wrapper).to.have.class('cds--time-picker--fluid--invalid');
      expect(wrapper).to.not.have.class('cds--time-picker--fluid--warning');
    });
  });

  describe('slot support', () => {
    it('should render slotted label-text', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker>
          <span slot="label-text">Slotted Label</span>
        </cds-fluid-time-picker>
      `);

      const slot = el.shadowRoot.querySelector('slot[name="label-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Label');
    });

    it('should render slotted invalid-text', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker invalid>
          <span slot="invalid-text">Slotted Invalid</span>
        </cds-fluid-time-picker>
      `);

      const slot = el.shadowRoot.querySelector('slot[name="invalid-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Invalid');
    });

    it('should render slotted warning-text', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker warning>
          <span slot="warning-text">Slotted Warning</span>
        </cds-fluid-time-picker>
      `);

      const slot = el.shadowRoot.querySelector('slot[name="warning-text"]');
      const content = slot.assignedNodes({ flatten: true })[0];
      expect(content.textContent.trim()).to.equal('Slotted Warning');
    });

    it('should render slotted fluid-time-picker-select', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time">
          <cds-fluid-time-picker-select id="select-1" label-text="Clock">
            <cds-select-item value="am">AM</cds-select-item>
            <cds-select-item value="pm">PM</cds-select-item>
          </cds-fluid-time-picker-select>
        </cds-fluid-time-picker>
      `);

      const select = el.querySelector('cds-fluid-time-picker-select');
      expect(select).to.exist;
      expect(select.id).to.equal('select-1');
    });
  });

  describe('fluid-time-picker-select integration', () => {
    it('should sync disabled state to selects', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time" disabled>
          <cds-fluid-time-picker-select id="select-1" label-text="Clock">
            <cds-select-item value="am">AM</cds-select-item>
            <cds-select-item value="pm">PM</cds-select-item>
          </cds-fluid-time-picker-select>
        </cds-fluid-time-picker>
      `);

      await el.updateComplete;
      const select = el.querySelector('cds-fluid-time-picker-select');
      expect(select.disabled).to.be.true;
    });

    it('should sync readonly state to selects', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time" readonly>
          <cds-fluid-time-picker-select id="select-1" label-text="Clock">
            <cds-select-item value="am">AM</cds-select-item>
            <cds-select-item value="pm">PM</cds-select-item>
          </cds-fluid-time-picker-select>
        </cds-fluid-time-picker>
      `);

      await el.updateComplete;
      const select = el.querySelector('cds-fluid-time-picker-select');
      expect(select.readonly).to.be.true;
    });

    it('should sync invalid state to selects', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time" invalid>
          <cds-fluid-time-picker-select id="select-1" label-text="Clock">
            <cds-select-item value="am">AM</cds-select-item>
            <cds-select-item value="pm">PM</cds-select-item>
          </cds-fluid-time-picker-select>
        </cds-fluid-time-picker>
      `);

      await el.updateComplete;
      const select = el.querySelector('cds-fluid-time-picker-select');
      expect(select.hasAttribute('data-fluid-time-picker-invalid')).to.be.true;
    });

    it('should sync warning state to selects', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time" warning>
          <cds-fluid-time-picker-select id="select-1" label-text="Clock">
            <cds-select-item value="am">AM</cds-select-item>
            <cds-select-item value="pm">PM</cds-select-item>
          </cds-fluid-time-picker-select>
        </cds-fluid-time-picker>
      `);

      await el.updateComplete;
      const select = el.querySelector('cds-fluid-time-picker-select');
      expect(select.hasAttribute('data-fluid-time-picker-warn')).to.be.true;
    });

    it('should set position attribute on single select', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time">
          <cds-fluid-time-picker-select id="select-1" label-text="Clock">
            <cds-select-item value="am">AM</cds-select-item>
            <cds-select-item value="pm">PM</cds-select-item>
          </cds-fluid-time-picker-select>
        </cds-fluid-time-picker>
      `);

      await el.updateComplete;
      const select = el.querySelector('cds-fluid-time-picker-select');
      expect(select.getAttribute('data-fluid-time-picker-position')).to.equal(
        'last'
      );
    });

    it('should set position attributes on multiple selects', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time">
          <cds-fluid-time-picker-select id="select-1" label-text="Clock">
            <cds-select-item value="am">AM</cds-select-item>
            <cds-select-item value="pm">PM</cds-select-item>
          </cds-fluid-time-picker-select>
          <cds-fluid-time-picker-select id="select-2" label-text="Timezone">
            <cds-select-item value="et">ET</cds-select-item>
            <cds-select-item value="ct">CT</cds-select-item>
          </cds-fluid-time-picker-select>
        </cds-fluid-time-picker>
      `);

      await el.updateComplete;
      const selects = el.querySelectorAll('cds-fluid-time-picker-select');
      expect(
        selects[0].getAttribute('data-fluid-time-picker-position')
      ).to.equal('first');
      expect(
        selects[1].getAttribute('data-fluid-time-picker-position')
      ).to.equal('last');
    });

    it('should set position attributes on three selects', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time">
          <cds-fluid-time-picker-select id="select-1" label-text="Clock">
            <cds-select-item value="am">AM</cds-select-item>
            <cds-select-item value="pm">PM</cds-select-item>
          </cds-fluid-time-picker-select>
          <cds-fluid-time-picker-select id="select-2" label-text="Timezone">
            <cds-select-item value="et">ET</cds-select-item>
            <cds-select-item value="ct">CT</cds-select-item>
          </cds-fluid-time-picker-select>
          <cds-fluid-time-picker-select id="select-3" label-text="Region">
            <cds-select-item value="us">US</cds-select-item>
            <cds-select-item value="eu">EU</cds-select-item>
          </cds-fluid-time-picker-select>
        </cds-fluid-time-picker>
      `);

      await el.updateComplete;
      const selects = el.querySelectorAll('cds-fluid-time-picker-select');
      expect(
        selects[0].getAttribute('data-fluid-time-picker-position')
      ).to.equal('first');
      expect(
        selects[1].getAttribute('data-fluid-time-picker-position')
      ).to.equal('middle');
      expect(
        selects[2].getAttribute('data-fluid-time-picker-position')
      ).to.equal('last');
    });

    it('should apply equal-width class when not two selects', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time">
          <cds-fluid-time-picker-select id="select-1" label-text="Clock">
            <cds-select-item value="am">AM</cds-select-item>
            <cds-select-item value="pm">PM</cds-select-item>
          </cds-fluid-time-picker-select>
        </cds-fluid-time-picker>
      `);

      await el.updateComplete;
      const wrapper = el.shadowRoot.querySelector('.cds--time-picker--fluid');
      expect(wrapper).to.have.class('cds--time-picker--equal-width');
    });

    it('should not apply equal-width class when two selects', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker label-text="Time">
          <cds-fluid-time-picker-select id="select-1" label-text="Clock">
            <cds-select-item value="am">AM</cds-select-item>
            <cds-select-item value="pm">PM</cds-select-item>
          </cds-fluid-time-picker-select>
          <cds-fluid-time-picker-select id="select-2" label-text="Timezone">
            <cds-select-item value="et">ET</cds-select-item>
            <cds-select-item value="ct">CT</cds-select-item>
          </cds-fluid-time-picker-select>
        </cds-fluid-time-picker>
      `);

      await el.updateComplete;
      const wrapper = el.shadowRoot.querySelector('.cds--time-picker--fluid');
      expect(wrapper).to.not.have.class('cds--time-picker--equal-width');
    });
  });

  describe('form integration', () => {
    it('should participate in form data', async () => {
      const form = await fixture(html`
        <form>
          <cds-fluid-time-picker name="time-input" value="12:30">
          </cds-fluid-time-picker>
        </form>
      `);

      const formData = new FormData(form);
      expect(formData.get('time-input')).to.equal('12:30');
    });

    it('should not submit data when disabled', async () => {
      const form = await fixture(html`
        <form>
          <cds-fluid-time-picker name="time-input" value="12:30" disabled>
          </cds-fluid-time-picker>
        </form>
      `);

      const formData = new FormData(form);
      expect(formData.get('time-input')).to.be.null;
    });
  });
});

describe('cds-fluid-time-picker-select', () => {
  describe('renders as expected - Component API', () => {
    it('should render as expected', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker-select label-text="Clock">
          <cds-select-item value="am">AM</cds-select-item>
          <cds-select-item value="pm">PM</cds-select-item>
        </cds-fluid-time-picker-select>
      `);

      expect(el).to.exist;
      const select = el.shadowRoot.querySelector('select');
      expect(select).to.exist;
    });

    it('should respect default-value attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker-select label-text="Clock" default-value="pm">
          <cds-select-item value="am">AM</cds-select-item>
          <cds-select-item value="pm">PM</cds-select-item>
        </cds-fluid-time-picker-select>
      `);

      await el.updateComplete;
      expect(el.value).to.equal('pm');
    });

    it('should not override value with default-value if value is set', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker-select
          label-text="Clock"
          default-value="pm"
          value="am">
          <cds-select-item value="am">AM</cds-select-item>
          <cds-select-item value="pm">PM</cds-select-item>
        </cds-fluid-time-picker-select>
      `);

      await el.updateComplete;
      expect(el.value).to.equal('am');
    });

    it('should inherit fluid select behavior', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker-select label-text="Clock">
          <cds-select-item value="am">AM</cds-select-item>
          <cds-select-item value="pm">PM</cds-select-item>
        </cds-fluid-time-picker-select>
      `);

      expect(el.getAttribute('isFluid')).to.equal('true');
    });
  });
});
