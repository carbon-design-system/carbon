/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-body', () => {
  it('should set a default rowgroup role', async () => {
    const el = await fixture(html`<cds-table-body></cds-table-body>`);
    expect(el.getAttribute('role')).to.equal('rowgroup');
  });

  it('should fire content change event on slot change', async () => {
    const el = await fixture(html`<cds-table-body></cds-table-body>`);

    const listener = oneEvent(el, 'cds-table-body-content-change');
    const row = document.createElement('cds-table-row');
    el.append(row);

    await listener;
  });

  it('should apply zebra even/odd flags to rows', async () => {
    const el = await fixture(html`
      <cds-table-body use-zebra-styles>
        <cds-table-row></cds-table-row>
        <cds-table-row></cds-table-row>
      </cds-table-body>
    `);

    await el.updateComplete;

    const rows = el.querySelectorAll('cds-table-row');
    expect(rows[0].odd).to.equal(true);
    expect(rows[0].even).to.equal(false);
    expect(rows[1].even).to.equal(true);
    expect(rows[1].odd).to.equal(false);
  });
});
