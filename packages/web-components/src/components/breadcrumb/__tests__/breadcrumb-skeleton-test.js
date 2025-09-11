/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/breadcrumb/breadcrumb-skeleton.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-toggle', () => {
  it('should support a custom class on the host', async () => {
    const el = await fixture(
      html`<cds-breadcrumb-skeleton
        class="custom-class"></cds-breadcrumb-skeleton>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should spread additional attributes on the host element', async () => {
    const el = await fixture(
      html`<cds-breadcrumb-skeleton
        data-testid="skeleton"></cds-breadcrumb-skeleton>`
    );
    expect(el.getAttribute('data-testid')).to.equal('skeleton');
  });

  it('should render the specified number of skeleton items', async () => {
    const el = await fixture(
      html`<cds-breadcrumb-skeleton items="5"></cds-breadcrumb-skeleton>`
    );
    const items = el.shadowRoot?.querySelectorAll('.cds--breadcrumb-item');
    expect(items.length).to.equal(5);
  });

  it('should respect the `size` attribute', async () => {
    const el = await fixture(
      html`<cds-breadcrumb-skeleton size="sm"> </cds-breadcrumb-skeleton>`
    );

    const container = el.shadowRoot?.querySelector('.cds--breadcrumb');
    const classList = container?.classList || [];
    expect(
      Array.from(classList).some((cls) => cls.includes('--breadcrumb--sm'))
    ).to.be.true;
  });

  it('should accept a `no-trailing-slash` and omit the trailing slash', async () => {
    const el = await fixture(html`
      <cds-breadcrumb-skeleton no-trailing-slash> </cds-breadcrumb-skeleton>
    `);

    const container = el.shadowRoot?.querySelector('.cds--breadcrumb');
    const items = container.querySelectorAll('.cds--breadcrumb-item');
    expect(items.length).to.be.greaterThan(0);

    const lastItem = items[items.length - 1];

    const lastItemStyle = window.getComputedStyle(lastItem, ':after');
    expect(lastItemStyle.content).to.equal('""');
  });
});
