/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/guide-banner/index.js';
import '@carbon/web-components/es/components/button/index.js';
import CDSGuideBanner, {
  blockClass,
} from '@carbon/web-components/es/components/guide-banner/guide-banner.js';
import { prefix } from '@carbon/web-components/es/globals/settings.js';

describe(`${prefix}-guide-banner`, () => {
  it('renders', async () => {
    const el = await fixture(html` <cds-guide-banner></cds-guide-banner> `);
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-guide-banner');
  });

  it('reflects titleText attribute to property', async () => {
    const el = await fixture(html`
      <cds-guide-banner title-text="Test title"></cds-guide-banner>
    `);
    expect(el.titleText).to.equal('Test title');
  });

  it('renders the title in shadow DOM when titleText is set', async () => {
    const el = await fixture(html`
      <cds-guide-banner title-text="My title"></cds-guide-banner>
    `);
    await el.updateComplete;
    const titleEl = el.shadowRoot?.querySelector(`.${blockClass}__title`);
    expect(titleEl).to.exist;
    expect(titleEl?.textContent?.trim()).to.equal('My title');
  });

  it('does not render title element when titleText is empty', async () => {
    const el = await fixture(html`
      <cds-guide-banner title-text=""></cds-guide-banner>
    `);
    await el.updateComplete;
    const titleEl = el.shadowRoot?.querySelector(`.${blockClass}__title`);
    expect(titleEl).to.be.null;
  });

  it('reflects open attribute to property', async () => {
    const el = await fixture(html`
      <cds-guide-banner ?open=${true}></cds-guide-banner>
    `);
    expect(el.open).to.be.true;
  });

  it('renders the header slot', async () => {
    const el = await fixture(html`
      <cds-guide-banner>
        <div slot="header">header content</div>
      </cds-guide-banner>
    `);
    await el.updateComplete;
    const slot = el.shadowRoot?.querySelector('slot[name="header"]');
    expect(slot).to.exist;
    const node = slot.assignedNodes()[0];
    expect(node?.textContent?.trim()).to.equal('header content');
  });

  it('renders the body slot', async () => {
    const el = await fixture(html`
      <cds-guide-banner ?open=${true}>
        <div slot="body">body content</div>
      </cds-guide-banner>
    `);
    await el.updateComplete;
    const slot = el.shadowRoot?.querySelector('slot[name="body"]');
    expect(slot).to.exist;
    const node = slot.assignedNodes()[0];
    expect(node?.textContent?.trim()).to.equal('body content');
  });

  it('renders the footer slot', async () => {
    const el = await fixture(html`
      <cds-guide-banner ?open=${true}>
        <div slot="footer">footer content</div>
      </cds-guide-banner>
    `);
    await el.updateComplete;
    const slot = el.shadowRoot?.querySelector('slot[name="footer"]');
    expect(slot).to.exist;
    const node = slot.assignedNodes()[0];
    expect(node?.textContent?.trim()).to.equal('footer content');
  });

  it('fires toggle event and toggles open state when close button area is clicked', async () => {
    const el = await fixture(html`
      <cds-guide-banner
        collapse-text="Collapse"
        expand-text="Expand"
        ?open=${false}></cds-guide-banner>
    `);
    await el.updateComplete;

    const listener = oneEvent(el, CDSGuideBanner.eventToggle);
    // The default footer renders a ghost button when no footer slot is provided
    const toggleBtn = el.shadowRoot?.querySelector(
      `.${blockClass}__toggle-button`
    );
    expect(toggleBtn).to.exist;
    toggleBtn?.click();

    const { detail } = await listener;
    expect(detail).to.exist;
    expect(el.open).to.be.true;
  });

  it('fires close event when close button is clicked', async () => {
    const el = await fixture(html`
      <cds-guide-banner ?open=${true}></cds-guide-banner>
    `);
    await el.updateComplete;

    const listener = oneEvent(el, CDSGuideBanner.eventOnClose);
    const closeBtn = el.shadowRoot?.querySelector(
      `.${blockClass}__close-button`
    );
    expect(closeBtn).to.exist;
    closeBtn?.click();

    const { detail } = await listener;
    expect(detail).to.exist;
  });

  it('exposes static event name constants', () => {
    expect(CDSGuideBanner.eventToggle).to.be.a('string');
    expect(CDSGuideBanner.eventOnClose).to.be.a('string');
    expect(CDSGuideBanner.eventToggle).to.include('guidebanner');
    expect(CDSGuideBanner.eventOnClose).to.include('guidebanner');
  });
});
