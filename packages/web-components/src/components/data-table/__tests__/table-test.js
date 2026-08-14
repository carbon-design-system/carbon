/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table', () => {
  it('should set a default table role', async () => {
    const el = await fixture(html`
      <cds-table>
        <cds-table-head>
          <cds-table-header-row></cds-table-header-row>
        </cds-table-head>
        <cds-table-body></cds-table-body>
      </cds-table>
    `);
    expect(el.getAttribute('role')).to.equal('table');
  });

  it('should propagate size to rows and toolbar', async () => {
    const el = await fixture(html`
      <cds-table size="sm">
        <cds-table-toolbar></cds-table-toolbar>
        <cds-table-head>
          <cds-table-header-row></cds-table-header-row>
        </cds-table-head>
        <cds-table-body>
          <cds-table-row></cds-table-row>
        </cds-table-body>
      </cds-table>
    `);

    await el.updateComplete;

    const row = el.querySelector('cds-table-row');
    const toolbar = el.querySelector('cds-table-toolbar');

    expect(row?.getAttribute('size')).to.equal('sm');
    expect(toolbar?.getAttribute('size')).to.equal('sm');
  });

  it('should propagate zebra mode to table body', async () => {
    const el = await fixture(html`
      <cds-table use-zebra-styles>
        <cds-table-body>
          <cds-table-row></cds-table-row>
          <cds-table-row></cds-table-row>
        </cds-table-body>
      </cds-table>
    `);

    await el.updateComplete;

    const body = el.querySelector('cds-table-body');
    expect(body?.useZebraStyles).to.equal(true);
  });

  it('should sort rows when header sort event is fired', async () => {
    const el = await fixture(html`
      <cds-table is-sortable>
        <cds-table-head>
          <cds-table-header-row>
            <cds-table-header-cell>Name</cds-table-header-cell>
          </cds-table-header-row>
        </cds-table-head>
        <cds-table-body>
          <cds-table-row
            ><cds-table-cell>Field 2</cds-table-cell></cds-table-row
          >
          <cds-table-row
            ><cds-table-cell>Field 1</cds-table-cell></cds-table-row
          >
        </cds-table-body>
      </cds-table>
    `);

    const headerCell = el.querySelector('cds-table-header-cell');
    const sortedListener = oneEvent(el, 'cds-table-sorted');

    headerCell?.dispatchEvent(
      new CustomEvent('cds-table-header-cell-sort', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          oldSortDirection: 'none',
          sortDirection: 'ascending',
        },
      })
    );

    await sortedListener;
    await el.updateComplete;

    const firstCellText = el
      .querySelector('cds-table-body')
      ?.querySelector('cds-table-row cds-table-cell')
      ?.textContent?.trim();
    expect(firstCellText).to.equal('Field 1');
  });

  it('should filter rows when search input event is fired', async () => {
    const el = await fixture(html`
      <cds-table>
        <cds-table-toolbar>
          <cds-table-toolbar-content>
            <cds-table-toolbar-search></cds-table-toolbar-search>
          </cds-table-toolbar-content>
        </cds-table-toolbar>
        <cds-table-head>
          <cds-table-header-row>
            <cds-table-header-cell>Name</cds-table-header-cell>
          </cds-table-header-row>
        </cds-table-head>
        <cds-table-body>
          <cds-table-row
            ><cds-table-cell>Field 2</cds-table-cell></cds-table-row
          >
          <cds-table-row
            ><cds-table-cell>Field 1</cds-table-cell></cds-table-row
          >
        </cds-table-body>
      </cds-table>
    `);

    const search = el.querySelector('cds-table-toolbar-search');
    const filteredListener = oneEvent(el, 'cds-table-filtered');

    search?.dispatchEvent(
      new CustomEvent('cds-search-input', {
        bubbles: true,
        composed: true,
        detail: { value: 'Field 1' },
      })
    );

    await filteredListener;
    await el.updateComplete;

    const rows = el.querySelectorAll('cds-table-row');
    expect(rows[0].filtered).to.equal(true);
    expect(rows[1].filtered).to.equal(false);
  });

  it('should reset to ascending ordering when another header is sorted', async () => {
    const el = await fixture(html`
      <cds-table is-sortable>
        <cds-table-head>
          <cds-table-header-row>
            <cds-table-header-cell sort-direction="ascending">
              Field A
            </cds-table-header-cell>
            <cds-table-header-cell sort-direction="none">
              Field B
            </cds-table-header-cell>
          </cds-table-header-row>
        </cds-table-head>
        <cds-table-body>
          <cds-table-row>
            <cds-table-cell>Field 2:A</cds-table-cell>
            <cds-table-cell>Field 2:B</cds-table-cell>
          </cds-table-row>
          <cds-table-row>
            <cds-table-cell>Field 1:A</cds-table-cell>
            <cds-table-cell>Field 1:B</cds-table-cell>
          </cds-table-row>
          <cds-table-row>
            <cds-table-cell>Field 3:A</cds-table-cell>
            <cds-table-cell>Field 3:B</cds-table-cell>
          </cds-table-row>
        </cds-table-body>
      </cds-table>
    `);

    const headerCells = el.querySelectorAll('cds-table-header-cell');
    const firstHeader = headerCells[0];
    const secondHeader = headerCells[1];
    const sortedListener = oneEvent(el, 'cds-table-sorted');

    const secondSortButton =
      secondHeader?.shadowRoot?.querySelector('.cds--table-sort');
    secondSortButton?.click();

    await sortedListener;
    await el.updateComplete;

    expect(firstHeader?.getAttribute('sort-direction')).to.equal('none');
    expect(secondHeader?.getAttribute('sort-direction')).to.equal('ascending');
  });

  it('should have select-all default to unchecked if no rows are present', async () => {
    const el = await fixture(html`
      <cds-table is-selectable>
        <cds-table-head>
          <cds-table-header-row></cds-table-header-row>
        </cds-table-head>
        <cds-table-body></cds-table-body>
      </cds-table>
    `);

    await el.updateComplete;

    const headerCheckbox = el
      .querySelector('cds-table-header-row')
      ?.shadowRoot?.querySelector('cds-checkbox')
      ?.shadowRoot?.querySelector('.cds--checkbox');

    expect(headerCheckbox?.checked).to.equal(false);
    expect(headerCheckbox?.indeterminate).to.equal(false);
  });

  it('should select all rows when header row selection event is fired', async () => {
    const el = await fixture(html`
      <cds-table is-selectable>
        <cds-table-head>
          <cds-table-header-row></cds-table-header-row>
        </cds-table-head>
        <cds-table-body>
          <cds-table-row
            ><cds-table-cell>Field 2</cds-table-cell></cds-table-row
          >
          <cds-table-row
            ><cds-table-cell>Field 1</cds-table-cell></cds-table-row
          >
        </cds-table-body>
      </cds-table>
    `);

    const headerRow = el.querySelector('cds-table-header-row');
    const selectAllListener = oneEvent(el, 'cds-table-row-all-selected');

    headerRow?.dispatchEvent(
      new CustomEvent('cds-table-change-selection-all', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: { selected: true },
      })
    );

    await selectAllListener;
    await el.updateComplete;

    const rows = el.querySelectorAll('cds-table-row');
    expect(rows[0].selected).to.equal(true);
    expect(rows[1].selected).to.equal(true);
  });

  it('should select a specific row when row selection event is fired', async () => {
    const el = await fixture(html`
      <cds-table is-selectable>
        <cds-table-head>
          <cds-table-header-row></cds-table-header-row>
        </cds-table-head>
        <cds-table-body>
          <cds-table-row
            ><cds-table-cell>Field 2</cds-table-cell></cds-table-row
          >
          <cds-table-row
            ><cds-table-cell>Field 1</cds-table-cell></cds-table-row
          >
        </cds-table-body>
      </cds-table>
    `);

    const row = el.querySelector('cds-table-row');
    const rowSelectedListener = oneEvent(el, 'cds-table-row-selected');
    const rowCheckbox = row?.shadowRoot?.querySelector('cds-checkbox');
    rowCheckbox?.dispatchEvent(
      new CustomEvent('cds-checkbox-changed', {
        bubbles: true,
        composed: true,
        detail: { checked: true },
      })
    );

    await rowSelectedListener;
    await el.updateComplete;

    const headerCheckbox = el
      .querySelector('cds-table-header-row')
      ?.shadowRoot?.querySelector('cds-checkbox')
      ?.shadowRoot?.querySelector('.cds--checkbox');

    expect(row?.selected).to.equal(true);
    expect(headerCheckbox?.checked).to.equal(true);
    expect(headerCheckbox?.indeterminate).to.equal(true);
  });

  it('should only select all unfiltered rows', async () => {
    const el = await fixture(html`
      <cds-table is-selectable>
        <cds-table-toolbar>
          <cds-table-toolbar-content>
            <cds-table-toolbar-search></cds-table-toolbar-search>
          </cds-table-toolbar-content>
        </cds-table-toolbar>
        <cds-table-head>
          <cds-table-header-row>
            <cds-table-header-cell>Name</cds-table-header-cell>
          </cds-table-header-row>
        </cds-table-head>
        <cds-table-body>
          <cds-table-row
            ><cds-table-cell>Field 2</cds-table-cell></cds-table-row
          >
          <cds-table-row
            ><cds-table-cell>Field 1</cds-table-cell></cds-table-row
          >
          <cds-table-row
            ><cds-table-cell>Field 3</cds-table-cell></cds-table-row
          >
        </cds-table-body>
      </cds-table>
    `);

    const search = el.querySelector('cds-table-toolbar-search');
    const headerRow = el.querySelector('cds-table-header-row');

    const filteredListener = oneEvent(el, 'cds-table-filtered');
    search?.dispatchEvent(
      new CustomEvent('cds-search-input', {
        bubbles: true,
        composed: true,
        detail: { value: 'Field 1' },
      })
    );
    await filteredListener;

    const selectAllListener = oneEvent(el, 'cds-table-row-all-selected');
    headerRow?.dispatchEvent(
      new CustomEvent('cds-table-change-selection-all', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: { selected: true },
      })
    );

    await selectAllListener;
    await el.updateComplete;

    const rows = el.querySelectorAll('cds-table-row');
    expect(rows[0].selected).to.equal(false);
    expect(rows[1].selected).to.equal(true);
    expect(rows[2].selected).to.equal(false);
  });

  it('should only select rows that are not disabled even when filtered', async () => {
    const el = await fixture(html`
      <cds-table is-selectable>
        <cds-table-toolbar>
          <cds-table-toolbar-content>
            <cds-table-toolbar-search></cds-table-toolbar-search>
          </cds-table-toolbar-content>
        </cds-table-toolbar>
        <cds-table-head>
          <cds-table-header-row>
            <cds-table-header-cell>Name</cds-table-header-cell>
          </cds-table-header-row>
        </cds-table-head>
        <cds-table-body>
          <cds-table-row
            ><cds-table-cell>Field 2</cds-table-cell></cds-table-row
          >
          <cds-table-row
            ><cds-table-cell>Field 1</cds-table-cell></cds-table-row
          >
          <cds-table-row disabled
            ><cds-table-cell>Field 1 disabled</cds-table-cell></cds-table-row
          >
        </cds-table-body>
      </cds-table>
    `);

    const search = el.querySelector('cds-table-toolbar-search');
    const headerRow = el.querySelector('cds-table-header-row');
    const filteredListener = oneEvent(el, 'cds-table-filtered');

    search?.dispatchEvent(
      new CustomEvent('cds-search-input', {
        bubbles: true,
        composed: true,
        detail: { value: 'Field 1' },
      })
    );
    await filteredListener;

    const headerCheckbox = headerRow?.shadowRoot
      ?.querySelector('cds-checkbox')
      ?.shadowRoot?.querySelector('.cds--checkbox');

    const selectAllListener = oneEvent(el, 'cds-table-row-all-selected');
    headerCheckbox?.click();

    await selectAllListener;
    await el.updateComplete;

    const rows = el.querySelectorAll('cds-table-row');
    expect(rows[0].selected).to.equal(false);
    expect(rows[1].selected).to.equal(true);
    expect(rows[2].selected).to.equal(false);
    expect(headerCheckbox?.checked).to.equal(true);
    expect(headerCheckbox?.indeterminate).to.equal(false);
  });

  it('should deselect all other rows in radio mode when a row is selected', async () => {
    const el = await fixture(html`
      <cds-table is-selectable radio>
        <cds-table-head>
          <cds-table-header-row></cds-table-header-row>
        </cds-table-head>
        <cds-table-body>
          <cds-table-row
            ><cds-table-cell>Field 2</cds-table-cell></cds-table-row
          >
          <cds-table-row
            ><cds-table-cell>Field 1</cds-table-cell></cds-table-row
          >
        </cds-table-body>
      </cds-table>
    `);

    const rows = el.querySelectorAll('cds-table-row');

    const firstRadio = rows[0]?.shadowRoot?.querySelector('cds-radio-button');
    const secondRadio = rows[1]?.shadowRoot?.querySelector('cds-radio-button');

    const firstSelectionListener = oneEvent(el, 'cds-table-row-selected');
    firstRadio?.dispatchEvent(
      new CustomEvent('cds-radio-button-changed', {
        bubbles: true,
        composed: true,
        detail: { checked: true },
      })
    );
    await firstSelectionListener;

    const secondSelectionListener = oneEvent(el, 'cds-table-row-selected');
    secondRadio?.dispatchEvent(
      new CustomEvent('cds-radio-button-changed', {
        bubbles: true,
        composed: true,
        detail: { checked: true },
      })
    );
    await secondSelectionListener;
    await el.updateComplete;

    expect(rows[0].selected).to.equal(false);
    expect(rows[1].selected).to.equal(true);
  });

  it('should clear selected rows when batch action cancel is fired', async () => {
    const el = await fixture(html`
      <cds-table is-selectable>
        <cds-table-toolbar>
          <cds-table-toolbar-content></cds-table-toolbar-content>
          <cds-table-batch-actions></cds-table-batch-actions>
        </cds-table-toolbar>
        <cds-table-head>
          <cds-table-header-row></cds-table-header-row>
        </cds-table-head>
        <cds-table-body>
          <cds-table-row
            ><cds-table-cell>Field 2</cds-table-cell></cds-table-row
          >
          <cds-table-row
            ><cds-table-cell>Field 1</cds-table-cell></cds-table-row
          >
        </cds-table-body>
      </cds-table>
    `);

    const headerRow = el.querySelector('cds-table-header-row');
    const batchActions = el.querySelector('cds-table-batch-actions');
    const headerCheckbox = headerRow?.shadowRoot
      ?.querySelector('cds-checkbox')
      ?.shadowRoot?.querySelector('.cds--checkbox');

    const selectAllListener = oneEvent(el, 'cds-table-row-all-selected');
    headerCheckbox?.click();
    await selectAllListener;

    const cancelListener = oneEvent(el, 'cds-table-row-all-selected');
    batchActions?.dispatchEvent(
      new CustomEvent('cds-table-batch-actions-cancel-clicked', {
        bubbles: true,
        composed: true,
      })
    );
    await cancelListener;
    await el.updateComplete;

    const rows = el.querySelectorAll('cds-table-row');
    expect(rows[0].selected).to.equal(false);
    expect(rows[1].selected).to.equal(false);
    expect(batchActions?.selectedRowsCount).to.equal(0);
  });
});
