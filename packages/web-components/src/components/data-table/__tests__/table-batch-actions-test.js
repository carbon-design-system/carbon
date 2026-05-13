/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-batch-actions', () => {
  it('should render singular and plural selected item messages', async () => {
    const singular = await fixture(html`
      <cds-table-batch-actions
        active
        selected-rows-count="1"></cds-table-batch-actions>
    `);

    const plural = await fixture(html`
      <cds-table-batch-actions
        active
        selected-rows-count="2"></cds-table-batch-actions>
    `);

    expect(
      singular.shadowRoot?.querySelector('.cds--batch-summary__para')
        ?.textContent
    ).to.contain('1 item selected');
    expect(
      plural.shadowRoot?.querySelector('.cds--batch-summary__para')?.textContent
    ).to.contain('2 items selected');
  });

  it('should fire cancel click event', async () => {
    const el = await fixture(html`
      <cds-table-batch-actions
        active
        selected-rows-count="2"></cds-table-batch-actions>
    `);

    const listener = oneEvent(el, 'cds-table-batch-actions-cancel-clicked');
    const cancel = el.shadowRoot?.querySelector('.cds--batch-summary__cancel');
    cancel?.click();
    await listener;
  });

  it('should fire select all click event when select all button is rendered', async () => {
    const el = await fixture(html`
      <cds-table-batch-actions
        active
        selected-rows-count="2"
        total-rows-count="10"></cds-table-batch-actions>
    `);

    const listener = oneEvent(el, 'cds-table-batch-actions-select-all-clicked');
    const selectAll = el.shadowRoot?.querySelector(
      '.cds--batch-summary__select-all'
    );
    selectAll?.click();
    await listener;
  });
});
