/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/fluid-date-picker/index.js';
import '@carbon/web-components/es/components/feature-flags/index.js';
import { fixture, html, expect } from '@open-wc/testing';

describe('cds-fluid-date-picker', () => {
  describe('Invalid and Warning States with Disabled/ReadOnly', () => {
    it('should not show invalid state when disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker-input
          invalid
          invalid-text="Invalid date"
          disabled
          label-text="Date Input"></cds-fluid-date-picker-input>
      `);
      await el.updateComplete;

      const shadowRoot = el.shadowRoot;

      // Check that form requirement is not displayed
      const formRequirement = shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.hasAttribute('hidden')).to.be.true;

      // Check that invalid icon is not displayed
      const invalidIcon = shadowRoot?.querySelector(
        '.cds--date-picker__icon--invalid'
      );
      expect(invalidIcon).not.to.exist;
    });

    it('should not show warning state when disabled', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker-input
          warn
          warn-text="Warning message"
          disabled
          label-text="Date Input"></cds-fluid-date-picker-input>
      `);
      await el.updateComplete;

      const shadowRoot = el.shadowRoot;

      // Check that form requirement is not displayed
      const formRequirement = shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.hasAttribute('hidden')).to.be.true;

      // Check that warning icon is not displayed
      const warnIcon = shadowRoot?.querySelector(
        '.cds--date-picker__icon--warn'
      );
      expect(warnIcon).not.to.exist;
    });

    it('should not show invalid state when readonly', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker-input
          invalid
          invalid-text="Invalid date"
          readonly
          label-text="Date Input"></cds-fluid-date-picker-input>
      `);
      await el.updateComplete;

      const shadowRoot = el.shadowRoot;

      // Check that form requirement is not displayed
      const formRequirement = shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.hasAttribute('hidden')).to.be.true;

      // Check that invalid icon is not displayed
      const invalidIcon = shadowRoot?.querySelector(
        '.cds--date-picker__icon--invalid'
      );
      expect(invalidIcon).not.to.exist;
    });

    it('should not show warning state when readonly', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker-input
          warn
          warn-text="Warning message"
          readonly
          label-text="Date Input"></cds-fluid-date-picker-input>
      `);
      await el.updateComplete;

      const shadowRoot = el.shadowRoot;

      // Check that form requirement is not displayed
      const formRequirement = shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.hasAttribute('hidden')).to.be.true;

      // Check that warning icon is not displayed
      const warnIcon = shadowRoot?.querySelector(
        '.cds--date-picker__icon--warn'
      );
      expect(warnIcon).not.to.exist;
    });
  });

  describe('Fluid Date Picker Functionality', () => {
    it('should render fluid date picker with calendar', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker>
          <cds-fluid-date-picker-input
            kind="single"
            label-text="Date"
            placeholder="mm/dd/yyyy">
          </cds-fluid-date-picker-input>
        </cds-fluid-date-picker>
      `);
      await el.updateComplete;
      expect(el).to.exist;
    });

    it('should handle value changes', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker value="2024-01-15">
          <cds-fluid-date-picker-input
            kind="single"
            label-text="Date"
            placeholder="mm/dd/yyyy">
          </cds-fluid-date-picker-input>
        </cds-fluid-date-picker>
      `);
      await el.updateComplete;
      expect(el.value).to.equal('2024-01-15');
    });

    it('should support range mode', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker>
          <cds-fluid-date-picker-input
            kind="from"
            label-text="Start date"
            placeholder="mm/dd/yyyy">
          </cds-fluid-date-picker-input>
          <cds-fluid-date-picker-input
            kind="to"
            label-text="End date"
            placeholder="mm/dd/yyyy">
          </cds-fluid-date-picker-input>
        </cds-fluid-date-picker>
      `);
      await el.updateComplete;
      expect(el).to.exist;
    });

    it('should handle disabled state', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker disabled>
          <cds-fluid-date-picker-input
            kind="single"
            label-text="Date"
            placeholder="mm/dd/yyyy">
          </cds-fluid-date-picker-input>
        </cds-fluid-date-picker>
      `);
      await el.updateComplete;
      expect(el.disabled).to.be.true;
    });

    it('should handle readonly state', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker-input
          readonly
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-fluid-date-picker-input>
      `);
      await el.updateComplete;
      expect(el.readonly).to.be.true;
    });

    it('should handle different sizes', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker-input
          size="lg"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-fluid-date-picker-input>
      `);
      await el.updateComplete;
      expect(el.size).to.equal('lg');
    });

    it('should show invalid state with message', async () => {
      const invalidText = 'Invalid date format';
      const el = await fixture(html`
        <cds-fluid-date-picker-input
          invalid
          invalid-text="${invalidText}"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-fluid-date-picker-input>
      `);
      await el.updateComplete;

      const formRequirement = el.shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.textContent?.trim()).to.equal(invalidText);
    });

    it('should show warning state with message', async () => {
      const warnText = 'Date is in the past';
      const el = await fixture(html`
        <cds-fluid-date-picker-input
          warn
          warn-text="${warnText}"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-fluid-date-picker-input>
      `);
      await el.updateComplete;

      const formRequirement = el.shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.textContent?.trim()).to.equal(warnText);
    });
  });

  describe('enable-v12-release — input state mirroring', () => {
    it('should set/remove data-input-disabled when simple input is disabled', async () => {
      const el = await fixture(html`
        <feature-flags enable-v12-release>
          <cds-fluid-date-picker>
            <cds-fluid-date-picker-input
              kind="simple"
              label-text="Date"
              disabled></cds-fluid-date-picker-input>
          </cds-fluid-date-picker>
        </feature-flags>
      `);
      const picker = el.querySelector('cds-fluid-date-picker');
      const input = el.querySelector('cds-fluid-date-picker-input');

      await picker.updateComplete;
      expect(picker.hasAttribute('data-input-disabled')).to.be.true;

      input.removeAttribute('disabled');
      await new Promise((r) => setTimeout(r, 0));

      expect(picker.hasAttribute('data-input-disabled')).to.be.false;
    });

    it('should set/remove data-input-readonly when simple input is readonly', async () => {
      const el = await fixture(html`
        <feature-flags enable-v12-release>
          <cds-fluid-date-picker>
            <cds-fluid-date-picker-input
              kind="simple"
              label-text="Date"
              readonly></cds-fluid-date-picker-input>
          </cds-fluid-date-picker>
        </feature-flags>
      `);
      const picker = el.querySelector('cds-fluid-date-picker');
      const input = el.querySelector('cds-fluid-date-picker-input');

      await picker.updateComplete;
      expect(picker.hasAttribute('data-input-readonly')).to.be.true;

      input.removeAttribute('readonly');
      await new Promise((r) => setTimeout(r, 0));

      expect(picker.hasAttribute('data-input-readonly')).to.be.false;
    });

    it('should not set data-input-disabled or data-input-readonly when flag is not enabled', async () => {
      const el = await fixture(html`
        <cds-fluid-date-picker>
          <cds-fluid-date-picker-input
            kind="simple"
            label-text="Date"
            disabled
            readonly></cds-fluid-date-picker-input>
        </cds-fluid-date-picker>
      `);
      await el.updateComplete;
      expect(el.hasAttribute('data-input-disabled')).to.be.false;
      expect(el.hasAttribute('data-input-readonly')).to.be.false;
    });
  });
});

describe('cds-fluid-date-picker-skeleton', () => {
  it('should render with default type (single)', async () => {
    const el = await fixture(html`
      <cds-fluid-date-picker-skeleton></cds-fluid-date-picker-skeleton>
    `);
    await el.updateComplete;

    expect(el).to.exist;
    expect(el.datePickerType).to.equal('single');
    expect(el.getAttribute('date-picker-type')).to.equal('single');
  });

  it('should render a single container without range class for single type', async () => {
    const el = await fixture(html`
      <cds-fluid-date-picker-skeleton
        date-picker-type="single"></cds-fluid-date-picker-skeleton>
    `);
    await el.updateComplete;

    const wrapper = el.shadowRoot?.querySelector(
      '.cds--date-picker--fluid__skeleton'
    );
    expect(wrapper).to.exist;
    expect(
      wrapper?.classList.contains('cds--date-picker--fluid__skeleton--range')
    ).to.be.false;

    const containers = el.shadowRoot?.querySelectorAll(
      '.cds--date-picker--fluid__skeleton--container'
    );
    expect(containers?.length).to.equal(1);
  });

  it('should show the calendar icon for single type', async () => {
    const el = await fixture(html`
      <cds-fluid-date-picker-skeleton
        date-picker-type="single"></cds-fluid-date-picker-skeleton>
    `);
    await el.updateComplete;

    const icon = el.shadowRoot?.querySelector('.cds--date-picker__icon');
    expect(icon).to.exist;
  });

  it('should not show the calendar icon for simple type', async () => {
    const el = await fixture(html`
      <cds-fluid-date-picker-skeleton
        date-picker-type="simple"></cds-fluid-date-picker-skeleton>
    `);
    await el.updateComplete;

    const icon = el.shadowRoot?.querySelector('.cds--date-picker__icon');
    expect(icon).not.to.exist;
  });

  it('should render two containers with the range class for range type', async () => {
    const el = await fixture(html`
      <cds-fluid-date-picker-skeleton
        date-picker-type="range"></cds-fluid-date-picker-skeleton>
    `);
    await el.updateComplete;

    expect(el.getAttribute('date-picker-type')).to.equal('range');

    const wrapper = el.shadowRoot?.querySelector(
      '.cds--date-picker--fluid__skeleton'
    );
    expect(
      wrapper?.classList.contains('cds--date-picker--fluid__skeleton--range')
    ).to.be.true;

    const containers = el.shadowRoot?.querySelectorAll(
      '.cds--date-picker--fluid__skeleton--container'
    );
    expect(containers?.length).to.equal(2);
  });

  it('should show calendar icons in both containers for range type', async () => {
    const el = await fixture(html`
      <cds-fluid-date-picker-skeleton
        date-picker-type="range"></cds-fluid-date-picker-skeleton>
    `);
    await el.updateComplete;

    const icons = el.shadowRoot?.querySelectorAll('.cds--date-picker__icon');
    expect(icons?.length).to.equal(2);
  });
});
