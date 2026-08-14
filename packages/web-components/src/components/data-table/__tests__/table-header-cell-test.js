/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';
import {
  TABLE_SORT_CYCLE,
  TABLE_SORT_DIRECTION,
} from '@carbon/web-components/es/components/data-table/table-header-cell.js';

describe('cds-table-header-cell', () => {
  it('should set a default columnheader role', async () => {
    const el = await fixture(
      html`<cds-table-header-cell></cds-table-header-cell>`
    );
    expect(el.getAttribute('role')).to.equal('columnheader');
  });

  it('should render slotted children text', async () => {
    const el = await fixture(html`
      <cds-table-header-cell>Header</cds-table-header-cell>
    `);

    expect(el).to.have.text('Header');
  });

  it('should respect colspan attribute', async () => {
    const el = await fixture(html`
      <cds-table-header-cell colspan="4"></cds-table-header-cell>
    `);

    expect(el.getAttribute('colspan')).to.equal('4');
  });

  it('should respect id attribute', async () => {
    const el = await fixture(html`
      <cds-table-header-cell id="header-id"></cds-table-header-cell>
    `);

    expect(el.getAttribute('id')).to.equal('header-id');
  });

  it('should respect scope attribute', async () => {
    const el = await fixture(html`
      <cds-table-header-cell scope="row"></cds-table-header-cell>
    `);

    expect(el.getAttribute('scope')).to.equal('row');
  });

  it('should initialize sort direction to none when sortable', async () => {
    const el = await fixture(html`
      <cds-table-header-cell is-sortable></cds-table-header-cell>
    `);

    await el.updateComplete;

    expect(el.sortDirection).to.equal(TABLE_SORT_DIRECTION.NONE);
  });

  it('should render sort button when sortable', async () => {
    const el = await fixture(html`
      <cds-table-header-cell is-sortable></cds-table-header-cell>
    `);

    const button = el.shadowRoot?.querySelector('.cds--table-sort');
    expect(button).to.exist;
  });

  it('should update sort direction when sort button is clicked', async () => {
    const el = await fixture(html`
      <cds-table-header-cell
        is-sortable
        sort-active
        sort-cycle="${TABLE_SORT_CYCLE.BI_STATES_FROM_ASCENDING}"
        sort-direction="${TABLE_SORT_DIRECTION.NONE}">
        Name
      </cds-table-header-cell>
    `);

    const button = el.shadowRoot?.querySelector('.cds--table-sort');
    button?.click();
    await el.updateComplete;

    expect(el.sortDirection).to.equal(TABLE_SORT_DIRECTION.ASCENDING);
  });

  it('should keep sort direction when sort event is canceled', async () => {
    const el = await fixture(html`
      <cds-table-header-cell
        is-sortable
        sort-active
        sort-cycle="${TABLE_SORT_CYCLE.BI_STATES_FROM_ASCENDING}"
        sort-direction="${TABLE_SORT_DIRECTION.NONE}">
        Name
      </cds-table-header-cell>
    `);

    el.addEventListener('cds-table-header-cell-sort', (event) => {
      event.preventDefault();
    });

    const button = el.shadowRoot?.querySelector('.cds--table-sort');
    button?.click();
    await el.updateComplete;

    expect(el.sortDirection).to.equal(TABLE_SORT_DIRECTION.NONE);
  });
});
