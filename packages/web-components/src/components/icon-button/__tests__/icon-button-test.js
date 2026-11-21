/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/icon-button/index.js';
import '@carbon/web-components/es/components/badge-indicator/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-icon-button', () => {
  describe('badge indicator', () => {
    it('should place the badge indicator slot inside the positioned button', async () => {
      const el = await fixture(html`
        <cds-icon-button kind="ghost" size="lg">
          <svg slot="icon"></svg>
          <span slot="tooltip-content">Notifications</span>
          <cds-badge-indicator
            slot="badge-indicator"
            count="4"></cds-badge-indicator>
        </cds-icon-button>
      `);

      await el.updateComplete;

      const button = el.shadowRoot?.querySelector('button');
      const badgeSlot = button?.querySelector('slot[name="badge-indicator"]');

      expect(button).to.exist;
      expect(badgeSlot).to.exist;
      expect(badgeSlot.assignedElements()[0].tagName.toLowerCase()).to.equal(
        'cds-badge-indicator'
      );
      // Ensure the badge is not a sibling of the button (detached positioning).
      expect(
        el.shadowRoot?.querySelector(
          'button ~ slot[name="badge-indicator"], a ~ slot[name="badge-indicator"]'
        )
      ).to.not.exist;
    });

    it('should place the badge indicator slot inside the link button', async () => {
      const el = await fixture(html`
        <cds-icon-button kind="ghost" size="lg" href="https://www.example.com">
          <svg slot="icon"></svg>
          <span slot="tooltip-content">Notifications</span>
          <cds-badge-indicator
            slot="badge-indicator"
            count="4"></cds-badge-indicator>
        </cds-icon-button>
      `);

      await el.updateComplete;

      const link = el.shadowRoot?.querySelector('a');
      const badgeSlot = link?.querySelector('slot[name="badge-indicator"]');

      expect(link).to.exist;
      expect(badgeSlot).to.exist;
      expect(badgeSlot.assignedElements()[0].tagName.toLowerCase()).to.equal(
        'cds-badge-indicator'
      );
      expect(el.shadowRoot?.querySelector('a ~ slot[name="badge-indicator"]'))
        .to.not.exist;
    });

    it('should not render the badge indicator slot when disabled', async () => {
      const el = await fixture(html`
        <cds-icon-button kind="ghost" size="lg" disabled>
          <svg slot="icon"></svg>
          <span slot="tooltip-content">Notifications</span>
          <cds-badge-indicator
            slot="badge-indicator"
            count="4"></cds-badge-indicator>
        </cds-icon-button>
      `);

      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('slot[name="badge-indicator"]')).to
        .not.exist;
    });
  });
});
