/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-row', () => {
  it('should set a default row role', async () => {
    const row = await fixture(html`<cds-table-row></cds-table-row>`);
    expect(row.getAttribute('role')).to.equal('row');
  });

  it('should support custom classes on the host element', async () => {
    const row = await fixture(html`
      <cds-table-row class="custom-class"></cds-table-row>
    `);

    expect(row).to.have.class('custom-class');
  });

  it('should render radio selection control when radio is set', async () => {
    const row = await fixture(html`
      <cds-table-row radio selection-name="selection-name-foo"></cds-table-row>
    `);

    const radio = row.shadowRoot?.querySelector('cds-radio-button');
    expect(radio).to.exist;
  });

  it('should fire selection event and update selected state', async () => {
    const row = await fixture(html`
      <cds-table-row selection-name="selection-name-foo"></cds-table-row>
    `);

    const listener = oneEvent(row, 'cds-table-row-change-selection');
    const checkbox = row.shadowRoot?.querySelector('cds-checkbox');
    checkbox?.dispatchEvent(
      new CustomEvent('cds-checkbox-changed', {
        bubbles: true,
        composed: true,
        detail: { checked: true },
      })
    );

    const event = await listener;
    expect(event.detail.selected).to.equal(true);
    expect(row.selected).to.equal(true);
  });

  it('should not update selected state if selection event is canceled', async () => {
    const row = await fixture(html`
      <cds-table-row selection-name="selection-name-foo"></cds-table-row>
    `);

    row.addEventListener('cds-table-row-change-selection', (event) => {
      event.preventDefault();
    });

    const checkbox = row.shadowRoot?.querySelector('cds-checkbox');
    checkbox?.dispatchEvent(
      new CustomEvent('cds-checkbox-changed', {
        bubbles: true,
        composed: true,
        detail: { checked: true },
      })
    );

    await row.updateComplete;
    expect(row.selected).to.equal(false);
  });

  it('should expand row and paired expanded row on toggle button click', async () => {
    const el = await fixture(html`
      <cds-table expandable>
        <cds-table-body>
          <cds-table-row expandable></cds-table-row>
          <cds-table-expanded-row></cds-table-expanded-row>
        </cds-table-body>
      </cds-table>
    `);

    const row = el.querySelector('cds-table-row');
    const expandedRow = el.querySelector('cds-table-expanded-row');
    const button = row?.shadowRoot?.querySelector('.cds--table-expand__button');

    button?.click();
    await row?.updateComplete;
    await expandedRow?.updateComplete;

    expect(row?.expanded).to.equal(true);
    expect(expandedRow?.expanded).to.equal(true);
  });
});
