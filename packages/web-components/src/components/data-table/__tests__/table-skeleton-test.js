/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-skeleton', () => {
  describe('renders as expected - Component API', () => {
    it('should set a default table role', async () => {
      const el = await fixture(html`<cds-table-skeleton></cds-table-skeleton>`);
      expect(el.getAttribute('role')).to.equal('table');
    });

    it('should render with skeleton and data-table classes', async () => {
      const el = await fixture(html`<cds-table-skeleton></cds-table-skeleton>`);
      const table = el.shadowRoot?.querySelector('table');
      expect(table?.classList.contains('cds--skeleton')).to.equal(true);
      expect(table?.classList.contains('cds--data-table')).to.equal(true);
    });

    it('should support custom class and extra attributes on the host', async () => {
      const el = await fixture(html`
        <cds-table-skeleton
          class="custom-class"
          data-testid="test-id"></cds-table-skeleton>
      `);
      expect(el.classList.contains('custom-class')).to.equal(true);
      expect(el.getAttribute('data-testid')).to.equal('test-id');
    });

    it('should respect row-count and column-count', async () => {
      const el = await fixture(html`
        <cds-table-skeleton row-count="3" column-count="4"></cds-table-skeleton>
      `);

      await el.updateComplete;

      const rows = el.shadowRoot?.querySelectorAll('tbody tr');
      const cols = el.shadowRoot?.querySelectorAll('thead th');

      expect(rows?.length).to.equal(3);
      expect(cols?.length).to.equal(4);
    });

    it('should respect the zebra prop', async () => {
      const el = await fixture(
        html`<cds-table-skeleton zebra></cds-table-skeleton>`
      );
      const table = el.shadowRoot?.querySelector('table');
      expect(table?.classList.contains('cds--data-table--zebra')).to.equal(
        true
      );
    });

    it('should respect show-header=false', async () => {
      const el = await fixture(html`<cds-table-skeleton></cds-table-skeleton>`);
      el.showHeader = false;
      await el.updateComplete;

      const header = el.shadowRoot?.querySelector('.cds--data-table-header');
      expect(header).to.equal(null);
    });

    it('should respect show-toolbar=false', async () => {
      const el = await fixture(html`<cds-table-skeleton></cds-table-skeleton>`);
      el.showToolbar = false;
      await el.updateComplete;

      const toolbar = el.shadowRoot?.querySelector('.cds--table-toolbar');
      expect(toolbar).to.equal(null);
    });

    it('should respect headers property', async () => {
      const el = await fixture(html`<cds-table-skeleton></cds-table-skeleton>`);
      el.headers = ['Name', 'Protocol', 'Port'];
      await el.updateComplete;

      const headerLabels = Array.from(
        el.shadowRoot?.querySelectorAll('thead th .cds--table-header-label') ??
          []
      ).map((node) => node.textContent?.trim());

      expect(headerLabels.slice(0, 3)).to.deep.equal([
        'Name',
        'Protocol',
        'Port',
      ]);
    });
  });
});
