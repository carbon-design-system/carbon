/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-head', () => {
  it('should set a default rowgroup role', async () => {
    const el = await fixture(html`<cds-table-head></cds-table-head>`);
    expect(el.getAttribute('role')).to.equal('rowgroup');
  });
});
