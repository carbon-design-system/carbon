/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/overflow-menu/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-overflow-menu', () => {
  const basicOverflowMenu = html`<cds-overflow-menu>
    <span slot="tooltip-content">Options</span>
    <cds-overflow-menu-body>
      <cds-overflow-menu-item>Filter A</cds-overflow-menu-item>
      <cds-overflow-menu-item>Filter B</cds-overflow-menu-item>
    </cds-overflow-menu-body>
  </cds-overflow-menu>`;

  it('should render', async () => {
    const el = await fixture(basicOverflowMenu);
    expect(el);
  });

  describe('supports size', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`size="${size}"`, async () => {
        const el = await fixture(html`
          <cds-overflow-menu size=${size}>
            <span slot="tooltip-content">Options</span>
            <cds-overflow-menu-body>
              <cds-overflow-menu-item>Filter A</cds-overflow-menu-item>
              <cds-overflow-menu-item>Filter B</cds-overflow-menu-item>
            </cds-overflow-menu-body>
          </cds-overflow-menu>
        `);

        expect(el).to.have.attribute('size', size);

        const button = el.shadowRoot?.querySelector('button');

        expect(button).to.have.class(`cds--overflow-menu--${size}`);
      });
    });
  });
});
