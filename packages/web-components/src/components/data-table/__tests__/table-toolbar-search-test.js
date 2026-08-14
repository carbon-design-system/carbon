/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-toolbar-search', () => {
  it('should set a default search role', async () => {
    const el = await fixture(
      html`<cds-table-toolbar-search></cds-table-toolbar-search>`
    );

    expect(el.getAttribute('role')).to.equal('search');
  });

  it('should reflect size attribute', async () => {
    const el = await fixture(html`
      <cds-table-toolbar-search size="sm"></cds-table-toolbar-search>
    `);

    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('should expand on focus in', async () => {
    const el = await fixture(
      html`<cds-table-toolbar-search></cds-table-toolbar-search>`
    );

    el.dispatchEvent(new CustomEvent('focusin', { bubbles: true }));
    await el.updateComplete;

    expect(el.expanded).to.equal(true);
  });

  it('should collapse on focus out when empty and not persistent', async () => {
    const el = await fixture(
      html`<cds-table-toolbar-search expanded></cds-table-toolbar-search>`
    );

    el.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    await el.updateComplete;

    expect(el.expanded).to.equal(false);
  });

  it('should stay expanded when persistent', async () => {
    const el = await fixture(
      html`<cds-table-toolbar-search persistent></cds-table-toolbar-search>`
    );

    await el.updateComplete;

    expect(el.expanded).to.equal(true);
  });
});
