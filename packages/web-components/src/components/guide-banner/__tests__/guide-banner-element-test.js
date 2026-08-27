/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, expect } from '@open-wc/testing';
import '@carbon/web-components/es/components/guide-banner/index.js';
import CDSGuideBannerElement, {
  blockClass,
} from '@carbon/web-components/es/components/guide-banner/guide-banner-element.js';

describe('cds-guide-banner-element', () => {
  it('renders', async () => {
    const el = await fixture(html`
      <cds-guide-banner-element></cds-guide-banner-element>
    `);
    expect(el).to.exist;
    expect(el).to.be.instanceOf(CDSGuideBannerElement);
    expect(el.tagName.toLowerCase()).to.equal('cds-guide-banner-element');
  });

  it('has a shadow root', async () => {
    const el = await fixture(html`
      <cds-guide-banner-element></cds-guide-banner-element>
    `);
    expect(el.shadowRoot).to.exist;
  });

  it('renders the title slot', async () => {
    const el = await fixture(html`
      <cds-guide-banner-element>
        <div slot="title">My title</div>
      </cds-guide-banner-element>
    `);
    await el.updateComplete;
    const slot = el.shadowRoot?.querySelector('slot[name="title"]');
    expect(slot).to.exist;
    const node = slot.assignedNodes()[0];
    expect(node?.textContent?.trim()).to.equal('My title');
  });

  it('renders the description slot', async () => {
    const el = await fixture(html`
      <cds-guide-banner-element>
        <div slot="description">My description</div>
      </cds-guide-banner-element>
    `);
    await el.updateComplete;
    const slot = el.shadowRoot?.querySelector('slot[name="description"]');
    expect(slot).to.exist;
    const node = slot.assignedNodes()[0];
    expect(node?.textContent?.trim()).to.equal('My description');
  });

  it('renders default slot children in light DOM', async () => {
    const el = await fixture(html`
      <cds-guide-banner-element>
        <div class="cta">Click me</div>
      </cds-guide-banner-element>
    `);
    const child = el.querySelector('.cta');
    expect(child).to.exist;
    expect(child?.textContent?.trim()).to.equal('Click me');
  });

  it('renders the inner block div in shadow DOM', async () => {
    const el = await fixture(html`
      <cds-guide-banner-element></cds-guide-banner-element>
    `);
    const inner = el.shadowRoot?.querySelector(`.${blockClass}`);
    expect(inner).to.exist;
  });
});
