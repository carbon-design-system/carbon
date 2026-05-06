/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/data-table/index.js';

describe('cds-table-expanded-row', () => {
  it('should render with a default colspan of 1', async () => {
    const el = await fixture(
      html`<cds-table-expanded-row></cds-table-expanded-row>`
    );

    const cell = el.shadowRoot?.querySelector('td');
    expect(cell?.getAttribute('colspan')).to.equal('1');
  });

  it('should toggle previous row highlight on mouse events', async () => {
    const el = await fixture(html`
      <cds-table>
        <cds-table-body>
          <cds-table-row></cds-table-row>
          <cds-table-expanded-row></cds-table-expanded-row>
        </cds-table-body>
      </cds-table>
    `);

    const row = el.querySelector('cds-table-row');
    const expanded = el.querySelector('cds-table-expanded-row');

    expanded?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    expect(row?.highlighted).to.equal(true);

    expanded?.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    expect(row?.highlighted).to.equal(false);
  });

  it('should not throw when there is no previous sibling row', async () => {
    const expanded = await fixture(
      html`<cds-table-expanded-row></cds-table-expanded-row>`
    );

    expect(() =>
      expanded.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    ).to.not.throw();
    expect(() =>
      expanded.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }))
    ).to.not.throw();
  });
});
