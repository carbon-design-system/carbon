/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-header-description', () => {
  it('should render slotted content', async () => {
    const el = await fixture(html`
      <cds-table-header-description
        >Data table description</cds-table-header-description
      >
    `);

    expect(el.textContent?.trim()).to.equal('Data table description');
  });
});
