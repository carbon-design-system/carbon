/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, expect } from '@open-wc/testing';
import '@carbon/web-components/es/components/big-number/index.js';
import { Characters } from '@carbon/web-components/es/components/big-number/constants.js';

const prefix = 'cds';
const blockClass = `${prefix}--big-number`;

describe('cds-big-number', () => {
  describe('Default rendering', () => {
    it('renders with default properties', async () => {
      const el = await fixture(html`
        <cds-big-number
          fraction-digits="1"
          label="Test Label"
          locale="en-US"
          size="lg"
          ?trending=${true}
          ?truncate=${true}
          .value=${12345.678}
          .total=${1000000}></cds-big-number>
      `);
      expect(el).to.exist;
      expect(el.tagName.toLowerCase()).to.equal('cds-big-number');

      const shadow = el.shadowRoot;
      // Render value
      expect(
        shadow?.querySelector(`.${blockClass}__value`)?.textContent?.trim()
      ).to.equal('12.3K');
      // Render total
      expect(
        shadow?.querySelector(`.${blockClass}__total`)?.textContent?.trim()
      ).to.equal(`${Characters.Slash}1.0M`);
      // Render trending icon
      const trendingIcon = shadow?.querySelector(`.${blockClass}__trend`);
      expect(trendingIcon).to.exist;
    });
  });

  describe('Percentage prop', () => {
    it('displays percentage symbol and hides total when percentage is true', async () => {
      const el = await fixture(html`
        <cds-big-number
          ?trending=${true}
          ?truncate=${true}
          .value=${12345.678}
          .total=${1000000}></cds-big-number>
      `);
      el.percentage = true;
      await el.updateComplete;

      const shadow = el.shadowRoot;
      // Render percentage mark
      expect(
        shadow
          ?.querySelector(`.${blockClass}__percentage-mark`)
          ?.textContent?.trim()
      ).to.equal(Characters.Percentage);

      // Hide total
      const denominator = shadow?.querySelector(`.${blockClass}__total`);
      expect(denominator).to.be.null;
    });
  });

  describe('Locale formatting', () => {
    it('formats value correctly with specified locale', async () => {
      const el = await fixture(html`
        <cds-big-number
          locale="en-US"
          ?truncate=${true}
          .value=${12345.678}
          .total=${1000000}></cds-big-number>
      `);
      el.locale = 'fr-CA';
      await el.updateComplete;

      const shadow = el.shadowRoot;
      expect(
        shadow?.querySelector(`.${blockClass}__value`)?.textContent?.trim()
      ).to.equal('12,3 k');
      expect(
        // eslint-disable-next-line no-irregular-whitespace
        shadow?.querySelector(`.${blockClass}__total`)?.textContent?.trim()
      ).to.equal(`${Characters.Slash}1,0 M`);
    });
  });

  describe('Loading state', () => {
    it('hides value when loading is true', async () => {
      const el = await fixture(html`
        <cds-big-number .value=${12345.678}></cds-big-number>
      `);
      el.loading = true;
      await el.updateComplete;

      const shadow = el.shadowRoot;
      expect(shadow?.querySelector(`.${blockClass}__value`)).to.be.null;
    });
  });

  describe('Fraction digits', () => {
    it('formats value with specified fractionDigits', async () => {
      const el = await fixture(html`
        <cds-big-number
          fraction-digits="1"
          ?truncate=${true}
          .value=${12345.678}></cds-big-number>
      `);
      el.fractionDigits = 2;
      await el.updateComplete;

      const shadow = el.shadowRoot;
      expect(
        shadow?.querySelector(`.${blockClass}__value`)?.textContent?.trim()
      ).to.equal('12.35K');
    });
  });

  describe('Truncation', () => {
    it('does not truncate value when truncate is false', async () => {
      const el = await fixture(html`
        <cds-big-number ?truncate=${true} .value=${12345.678}></cds-big-number>
      `);
      el.truncate = false;
      await el.updateComplete;

      const shadow = el.shadowRoot;
      expect(
        shadow?.querySelector(`.${blockClass}__value`)?.textContent?.trim()
      ).to.equal('12,345.678');
    });
  });

  describe('Denominator display', () => {
    it('displays denominator when total is greater than value', async () => {
      const el = await fixture(html`
        <cds-big-number
          ?truncate=${true}
          .value=${12345.678}
          .total=${1000000}></cds-big-number>
      `);
      el.total = 15000;
      await el.updateComplete;

      const shadow = el.shadowRoot;
      expect(
        shadow?.querySelector(`.${blockClass}__total`)?.textContent?.trim()
      ).to.equal(`${Characters.Slash}15.0K`);
    });

    it('does not display denominator when total is not greater than value', async () => {
      const el = await fixture(html`
        <cds-big-number
          ?truncate=${true}
          .value=${12345.678}
          .total=${1000000}></cds-big-number>
      `);
      el.total = 12000;
      await el.updateComplete;

      const shadow = el.shadowRoot;
      expect(shadow?.querySelector(`.${blockClass}__total`)).to.be.null;
    });
  });

  describe('Size variants', () => {
    it('applies xl modifier class and renders value for xl size', async () => {
      const el = await fixture(html`
        <cds-big-number
          size="lg"
          ?truncate=${true}
          .value=${12345.678}></cds-big-number>
      `);
      el.size = 'xl';
      await el.updateComplete;

      const shadow = el.shadowRoot;
      expect(
        shadow?.querySelector(`.${blockClass}__value`)?.textContent?.trim()
      ).to.equal('12.3K');
      expect(shadow?.querySelector(`.${blockClass}--xl`)).to.exist;
    });
  });

  describe('Shadow DOM structure', () => {
    it('renders the root figure element in shadow DOM', async () => {
      const el = await fixture(html`<cds-big-number></cds-big-number>`);
      const figure = el.shadowRoot?.querySelector(`figure.${blockClass}`);
      expect(figure).to.exist;
    });

    it('reflects fraction-digits attribute to property', async () => {
      const el = await fixture(html`
        <cds-big-number fraction-digits="3"></cds-big-number>
      `);
      expect(el.fractionDigits).to.equal(3);
    });

    it('reflects size attribute to property', async () => {
      const el = await fixture(html`
        <cds-big-number size="lg"></cds-big-number>
      `);
      expect(el.size).to.equal('lg');
    });
  });
});
