/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-toolbar', () => {
  it('should set a default toolbar role', async () => {
    const el = await fixture(html`<cds-table-toolbar></cds-table-toolbar>`);
    expect(el.getAttribute('role')).to.equal('toolbar');
  });

  it('should propagate size to toolbar content and batch actions', async () => {
    const el = await fixture(html`
      <cds-table-toolbar size="sm">
        <cds-table-toolbar-content></cds-table-toolbar-content>
        <cds-table-batch-actions></cds-table-batch-actions>
      </cds-table-toolbar>
    `);

    await el.updateComplete;

    const content = el.querySelector('cds-table-toolbar-content');
    const actions = el.querySelector('cds-table-batch-actions');

    expect(content?.getAttribute('size')).to.equal('sm');
    expect(actions?.getAttribute('size')).to.equal('sm');
  });
});
