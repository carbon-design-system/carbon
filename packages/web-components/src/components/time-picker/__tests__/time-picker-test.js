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
    await expect(el).shadowDom.to.equalSnapshot();
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
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });
});
