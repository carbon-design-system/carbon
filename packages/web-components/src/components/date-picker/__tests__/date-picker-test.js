/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/date-picker/index.js';
import '@carbon/web-components/es/components/ai-label/index.js';
import '@carbon/web-components/es/components/slug/index.js';
import { fixture, html, expect } from '@open-wc/testing';

describe('cds-date-picker', () => {
  describe('Invalid and Warning States with Disabled/ReadOnly', () => {
    it('should not show invalid state when disabled', async () => {
      const el = await fixture(html`
        <cds-date-picker-input
          invalid
          invalid-text="Invalid date"
          disabled
          label-text="Date Input"></cds-date-picker-input>
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
        <cds-date-picker-input
          warn
          warn-text="Warning message"
          disabled
          label-text="Date Input"></cds-date-picker-input>
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
        <cds-date-picker-input
          invalid
          invalid-text="Invalid date"
          readonly
          label-text="Date Input"></cds-date-picker-input>
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
        <cds-date-picker-input
          warn
          warn-text="Warning message"
          readonly
          label-text="Date Input"></cds-date-picker-input>
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

  describe('Date Picker Functionality', () => {
    it('should render date picker with calendar', async () => {
      const el = await fixture(html`
        <cds-date-picker>
          <cds-date-picker-input
            kind="single"
            label-text="Date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
      `);
      await el.updateComplete;
      expect(el).to.exist;
    });

    it('should include the weekday in the calendar day aria-label', async () => {
      const el = await fixture(html`
        <cds-date-picker value="2026-04-15">
          <cds-date-picker-input
            kind="single"
            label-text="Date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
      `);
      await el.updateComplete;

      const day = el.calendar?.calendarContainer?.querySelector(
        '[aria-label="Wednesday, April 15, 2026"]'
      );

      expect(day).to.exist;
    });

    it('should handle value changes', async () => {
      const el = await fixture(html`
        <cds-date-picker value="2024-01-15">
          <cds-date-picker-input
            kind="single"
            label-text="Date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
      `);
      await el.updateComplete;
      expect(el.value).to.equal('2024-01-15');
    });

    it('should support range mode', async () => {
      const el = await fixture(html`
        <cds-date-picker>
          <cds-date-picker-input
            kind="from"
            label-text="Start date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
          <cds-date-picker-input
            kind="to"
            label-text="End date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
      `);
      await el.updateComplete;
      expect(el).to.exist;
    });

    it('should handle disabled state', async () => {
      const el = await fixture(html`
        <cds-date-picker disabled>
          <cds-date-picker-input
            kind="single"
            label-text="Date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
      `);
      await el.updateComplete;
      expect(el.disabled).to.be.true;
    });

    it('should handle readonly state', async () => {
      const el = await fixture(html`
        <cds-date-picker-input
          readonly
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      `);
      await el.updateComplete;
      expect(el.readonly).to.be.true;
    });

    it('should handle different sizes', async () => {
      const el = await fixture(html`
        <cds-date-picker-input
          size="lg"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      `);
      await el.updateComplete;
      expect(el.size).to.equal('lg');
    });

    it('should show invalid state with message', async () => {
      const invalidText = 'Invalid date format';
      const el = await fixture(html`
        <cds-date-picker-input
          invalid
          invalid-text="${invalidText}"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
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
        <cds-date-picker-input
          warn
          warn-text="${warnText}"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      `);
      await el.updateComplete;

      const formRequirement = el.shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.textContent?.trim()).to.equal(warnText);
    });
  });

  describe('AI label and slug slot', () => {
    it('should set ai-label attribute when cds-ai-label is slotted', async () => {
      const el = await fixture(html`
        <cds-date-picker-input label-text="Date" placeholder="mm/dd/yyyy">
          <cds-ai-label slot="ai-label"></cds-ai-label>
        </cds-date-picker-input>
      `);
      await el.updateComplete;

      expect(el.hasAttribute('ai-label')).to.be.true;
    });

    it('should resolve ai-label slot node via @query decorator', async () => {
      const el = await fixture(html`
        <cds-date-picker-input label-text="Date" placeholder="mm/dd/yyyy">
          <cds-ai-label slot="ai-label"></cds-ai-label>
        </cds-date-picker-input>
      `);
      await el.updateComplete;

      const slotNode = el.shadowRoot.querySelector("slot[name='ai-label']");
      expect(slotNode).to.exist;
    });

    it('should resolve slug slot node via @query decorator', async () => {
      const el = await fixture(html`
        <cds-date-picker-input label-text="Date" placeholder="mm/dd/yyyy">
          <cds-slug slot="slug"></cds-slug>
        </cds-date-picker-input>
      `);
      await el.updateComplete;

      const slotNode = el.shadowRoot.querySelector("slot[name='slug']");
      expect(slotNode).to.exist;
    });

    it('should toggle cds--slug--revert class on ai-label slot when revert-active is set', async () => {
      const el = await fixture(html`
        <cds-date-picker-input label-text="Date" placeholder="mm/dd/yyyy">
          <cds-ai-label slot="ai-label" revert-active></cds-ai-label>
        </cds-date-picker-input>
      `);
      await el.updateComplete;

      const aiLabelSlot = el.shadowRoot.querySelector("slot[name='ai-label']");
      expect(aiLabelSlot.classList.contains('cds--slug--revert')).to.be.true;
    });

    it('should not add cds--slug--revert to slug slot when only cds-slug is present (ai-label slot takes precedence in shadow DOM)', async () => {
      // The ai-label slot element always exists in shadow DOM, so the else-branch
      // for the slug slot is never reached when only cds-slug is slotted.
      const el = await fixture(html`
        <cds-date-picker-input label-text="Date" placeholder="mm/dd/yyyy">
          <cds-slug slot="slug" revert-active></cds-slug>
        </cds-date-picker-input>
      `);
      await el.updateComplete;

      const slugSlot = el.shadowRoot.querySelector("slot[name='slug']");
      expect(slugSlot.classList.contains('cds--slug--revert')).to.be.false;
    });

    it('should not set cds--slug--revert on ai-label slot when revert-active is absent', async () => {
      const el = await fixture(html`
        <cds-date-picker-input label-text="Date" placeholder="mm/dd/yyyy">
          <cds-ai-label slot="ai-label"></cds-ai-label>
        </cds-date-picker-input>
      `);
      await el.updateComplete;

      const aiLabelSlot = el.shadowRoot.querySelector("slot[name='ai-label']");
      expect(aiLabelSlot.classList.contains('cds--slug--revert')).to.be.false;
    });
  });
});
