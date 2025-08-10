/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/breadcrumb/index.js';

describe('cds-breadcrumb', () => {
  it('should accept an `aria-label` for nav element', async () => {
    const el = await fixture(html`
      <cds-breadcrumb aria-label="test-label"></cds-breadcrumb>
    `);

    expect(el.getAttribute('aria-label')).to.equal('test-label');
  });

  it('should provide a default `aria-label` for nav element', async () => {
    const el = await fixture(html` <cds-breadcrumb></cds-breadcrumb> `);

    expect(el.getAttribute('aria-label')).to.equal('Breadcrumb');
  });

  it('should accept children of cds-breadcrumb-item', async () => {
    const el = await fixture(html`
      <cds-breadcrumb>
        <cds-breadcrumb-item href="#a">A</cds-breadcrumb-item>
        <cds-breadcrumb-item href="#b">B</cds-breadcrumb-item>
        <cds-breadcrumb-item href="#c">C</cds-breadcrumb-item>
      </cds-breadcrumb>
    `);

    const items = el.querySelectorAll('cds-breadcrumb-item');
    expect(items.length).to.equal(3);
    expect(items[0].textContent.trim()).to.equal('A');
    expect(items[1].textContent.trim()).to.equal('B');
    expect(items[2].textContent.trim()).to.equal('C');
  });

  it('should accept a `no-trailing-slash` and omit the trailing slash', async () => {
    const el = await fixture(html`
      <cds-breadcrumb no-trailing-slash>
        <cds-breadcrumb-item href="#a">A</cds-breadcrumb-item>
        <cds-breadcrumb-item href="#b">B</cds-breadcrumb-item>
        <cds-breadcrumb-item href="#c">C</cds-breadcrumb-item>
      </cds-breadcrumb>
    `);

    const lastItem = el.querySelector('cds-breadcrumb-item:last-of-type');
    const lastItemStyle = window.getComputedStyle(lastItem, ':after');
    expect(lastItemStyle.content).to.equal('""');
  });

  it('should respect the `size` attribute', async () => {
    const el = await fixture(
      html`<cds-breadcrumb size="sm">
        <cds-breadcrumb-item>
          <cds-breadcrumb-link href="#a">A</cds-breadcrumb-link>
        </cds-breadcrumb-item>
      </cds-breadcrumb>`
    );

    const item = el.querySelector('cds-breadcrumb-item');
    const link = item.querySelector('cds-breadcrumb-link');
    expect(link.shadowRoot.querySelector('a.cds--link--sm')).to.exist;
  });

  it('should apply additional attributes to the outermost element', async () => {
    const el = await fixture(html`
      <cds-breadcrumb data-testid="test"></cds-breadcrumb>
    `);

    expect(el.getAttribute('data-testid')).to.equal('test');
  });

  describe('automated verification testing', () => {
    it('should have no aXe violations', async () => {
      const el = await fixture(html`
        <cds-breadcrumb>
          <cds-breadcrumb-item href="#a">A</cds-breadcrumb-item>
          <cds-breadcrumb-item href="#b">B</cds-breadcrumb-item>
          <cds-breadcrumb-item href="#c">C</cds-breadcrumb-item>
        </cds-breadcrumb>
      `);

      await expect(el).to.be.accessible();
    });
  });
});
