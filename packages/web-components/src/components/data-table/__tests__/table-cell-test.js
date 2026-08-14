/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-cell', () => {
  it('should set a default cell role', async () => {
    const el = await fixture(html`<cds-table-cell></cds-table-cell>`);
    expect(el.getAttribute('role')).to.equal('cell');
  });

  it('should reflect overflow-menu-on-hover attribute', async () => {
    const el = await fixture(
      html`<cds-table-cell overflow-menu-on-hover></cds-table-cell>`
    );

    expect(el.overflowMenuOnHover).to.equal(true);
  });
});
