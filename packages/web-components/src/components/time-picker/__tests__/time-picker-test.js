/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/time-picker/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-time-picker', () => {
  describe('input', () => {
    it('renders as expected', async () => {
      const el = await fixture(
        html`<cds-time-picker id="time-picker"></cds-time-picker>`
      );
      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.exist;
    });

    it('passes classNames as expected', async () => {
      const el = await fixture(html`
        <cds-time-picker id="time-picker" class="time-picker"></cds-time-picker>
      `);
      expect(el).to.have.class('time-picker');
    });

    it('should set type as expected', async () => {
      const el = await fixture(
        html`<cds-time-picker id="time-picker"></cds-time-picker>`
      );
      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('type', 'text');
    });

    it('should set value as expected', async () => {
      const el = await fixture(html`
        <cds-time-picker id="time-picker" value="12:30"></cds-time-picker>
      `);
      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.property('value', '12:30');
    });

    it('should set disabled as expected', async () => {
      let clicked = false;
      const el = await fixture(html`
        <cds-time-picker
          id="time-picker"
          disabled
          @click=${() => {
            clicked = true;
          }}>
        </cds-time-picker>
      `);

      const input = el.shadowRoot?.querySelector('input');
      input?.click();
      await el.updateComplete;
      expect(clicked).to.be.false;
    });

    it('should set placeholder as expected', async () => {
      const el = await fixture(html`
        <cds-time-picker
          id="time-picker"
          placeholder="Select Time"></cds-time-picker>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('placeholder', 'Select Time');
    });
  });

  it('should set readonly as expected', async () => {
    const el = await fixture(html`
      <cds-time-picker id="time-picker" readonly></cds-time-picker>
    `);

    const input = el.shadowRoot?.querySelector('input');
    expect(input).to.have.attribute('readonly');
  });

  it('should not call onBlur when disabled', async () => {
    let blurred = false;
    const el = await fixture(html`
      <cds-time-picker
        id="time-picker"
        disabled
        @blur=${() => {
          blurred = true;
        }}>
      </cds-time-picker>
    `);

    const input = el.shadowRoot?.querySelector('input');
    const blurEvent = new Event('blur', { bubbles: true });
    input?.dispatchEvent(blurEvent);
    await el.updateComplete;

    expect(blurred).to.be.false;
  });

  describe('label', () => {
    it('renders a label as expected', async () => {
      const el = await fixture(html`
        <cds-time-picker id="time-picker" label-text="🐳"></cds-time-picker>
      `);

      const label = el.shadowRoot?.querySelector('label');
      expect(label?.textContent?.trim()).to.equal('🐳');
    });
  });

  describe('events', () => {
    it('should write text inside the textbox', async () => {
      const el = await fixture(
        html`<cds-time-picker id="time-picker"></cds-time-picker>`
      );
      const input = el.shadowRoot?.querySelector('input');

      // Simulate typing
      if (input) {
        input.value = '🧛';
        const inputEvent = new Event('input', { bubbles: true });
        input.dispatchEvent(inputEvent);
        await el.updateComplete;

        expect(input).to.have.property('value', '🧛');
      }
    });
  });
  describe('invalid and warning states', () => {
    it('should show invalid state when invalid is true', async () => {
      const el = await fixture(html`
        <cds-time-picker
          id="time-picker"
          invalid
          invalid-text="Invalid time"></cds-time-picker>
      `);

      const errorIcon = el.shadowRoot?.querySelector(
        '.cds--time-picker__error__icon'
      );
      const formRequirement = el.shadowRoot?.querySelector(
        '.cds--form-requirement'
      );

      expect(errorIcon).to.exist;
      expect(formRequirement).to.exist;
      expect(formRequirement?.textContent?.trim()).to.equal('Invalid time');
    });

    it('should show warning state when warning is true', async () => {
      const el = await fixture(html`
        <cds-time-picker
          id="time-picker"
          warning
          warning-text="Warning message"></cds-time-picker>
      `);

      const errorIcon = el.shadowRoot?.querySelector(
        '.cds--time-picker__error__icon'
      );
      const formRequirement = el.shadowRoot?.querySelector(
        '.cds--form-requirement'
      );

      expect(errorIcon).to.exist;
      expect(formRequirement).to.exist;
      expect(formRequirement?.textContent?.trim()).to.equal('Warning message');
    });

    it('should not show invalid state when disabled', async () => {
      const el = await fixture(html`
        <cds-time-picker
          id="time-picker"
          invalid
          invalid-text="Invalid time"
          disabled></cds-time-picker>
      `);

      const errorIcon = el.shadowRoot?.querySelector(
        '.cds--time-picker__error__icon'
      );
      const formRequirement = el.shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      const timePickerEl = el.shadowRoot?.querySelector('.cds--time-picker');
      const inputEl = el.shadowRoot?.querySelector('input');

      expect(errorIcon).to.not.exist;
      expect(formRequirement).to.not.exist;
      expect(timePickerEl).to.not.have.class('cds--time-picker--invalid');
      expect(inputEl).to.not.have.class('cds--time-picker__input-field-error');
      // data-invalid attribute should not be present when disabled
      expect(inputEl).to.not.have.attribute('data-invalid');
    });

    it('should not show warning state when disabled', async () => {
      const el = await fixture(html`
        <cds-time-picker
          id="time-picker"
          warning
          warning-text="Warning message"
          disabled></cds-time-picker>
      `);

      const errorIcon = el.shadowRoot?.querySelector(
        '.cds--time-picker__error__icon'
      );
      const formRequirement = el.shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      const timePickerEl = el.shadowRoot?.querySelector('.cds--time-picker');
      const inputEl = el.shadowRoot?.querySelector('input');

      expect(errorIcon).to.not.exist;
      expect(formRequirement).to.not.exist;
      expect(timePickerEl).to.not.have.class('cds--time-picker--warning');
      expect(inputEl).to.not.have.class('cds--time-picker__input-field-error');
    });

    it('should not show invalid state when readonly', async () => {
      const el = await fixture(html`
        <cds-time-picker
          id="time-picker"
          invalid
          invalid-text="Invalid time"
          readonly></cds-time-picker>
      `);

      const errorIcon = el.shadowRoot?.querySelector(
        '.cds--time-picker__error__icon'
      );
      const formRequirement = el.shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      const timePickerEl = el.shadowRoot?.querySelector('.cds--time-picker');
      const inputEl = el.shadowRoot?.querySelector('input');

      expect(errorIcon).to.not.exist;
      expect(formRequirement).to.not.exist;
      expect(timePickerEl).to.not.have.class('cds--time-picker--invalid');
      expect(inputEl).to.not.have.class('cds--time-picker__input-field-error');
      // data-invalid attribute should not be present when readonly
      expect(inputEl).to.not.have.attribute('data-invalid');
    });

    it('should not show warning state when readonly', async () => {
      const el = await fixture(html`
        <cds-time-picker
          id="time-picker"
          warning
          warning-text="Warning message"
          readonly></cds-time-picker>
      `);

      const errorIcon = el.shadowRoot?.querySelector(
        '.cds--time-picker__error__icon'
      );
      const formRequirement = el.shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      const timePickerEl = el.shadowRoot?.querySelector('.cds--time-picker');
      const inputEl = el.shadowRoot?.querySelector('input');

      expect(errorIcon).to.not.exist;
      expect(formRequirement).to.not.exist;
      expect(timePickerEl).to.not.have.class('cds--time-picker--warning');
      expect(inputEl).to.not.have.class('cds--time-picker__input-field-error');
    });
  });
});
