/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-header-row', () => {
  it('should fire select-all event namespace used by table', async () => {
    const row = await fixture(html`
      <cds-table-header-row
        selection-name="selection-name-foo"></cds-table-header-row>
    `);

    const listener = oneEvent(row, 'cds-table-change-selection-all');
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
  });
});
