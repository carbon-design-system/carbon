/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/interstitial-screen/index.js';

const prefix = 'cds';
const blockClass = `${prefix}--interstitial-screen`;

describe(`${prefix}-interstitial-screen`, () => {
  it('renders', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen></cds-interstitial-screen>
    `);
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-interstitial-screen');
  });

  it('reflects open attribute to property', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen open></cds-interstitial-screen>
    `);
    expect(el.open).to.be.true;
  });

  it('reflects fullscreen attribute to property', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen fullscreen></cds-interstitial-screen>
    `);
    expect(el.isFullScreen).to.be.true;
  });

  it('renders modal variant when open and not fullscreen', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen open></cds-interstitial-screen>
    `);
    await el.updateComplete;
    const modal = el.shadowRoot?.querySelector('cds-modal');
    expect(modal).to.exist;
  });

  it('renders fullscreen variant when open and fullscreen', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen open fullscreen></cds-interstitial-screen>
    `);
    await el.updateComplete;
    const container = el.shadowRoot?.querySelector(`.${blockClass}--container`);
    expect(container).to.exist;
  });

  it('renders nothing when not open', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen></cds-interstitial-screen>
    `);
    await el.updateComplete;
    // shadowRoot should have no cds-modal when closed
    const modal = el.shadowRoot?.querySelector('cds-modal');
    expect(modal).to.be.null;
  });

  it('renders header slot', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen open>
        <cds-interstitial-screen-header
          slot="header"
          header-title="Test Title"></cds-interstitial-screen-header>
      </cds-interstitial-screen>
    `);
    await el.updateComplete;
    const header = el.querySelector('cds-interstitial-screen-header');
    expect(header).to.exist;
    expect(header.headerTitle).to.equal('Test Title');
  });

  it('renders body and footer slots', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen open>
        <cds-interstitial-screen-body slot="body">
          <cds-interstitial-screen-body-item>
            <p>Content</p>
          </cds-interstitial-screen-body-item>
        </cds-interstitial-screen-body>
        <cds-interstitial-screen-footer
          slot="footer"></cds-interstitial-screen-footer>
      </cds-interstitial-screen>
    `);
    await el.updateComplete;
    const body = el.querySelector('cds-interstitial-screen-body');
    const footer = el.querySelector('cds-interstitial-screen-footer');
    expect(body).to.exist;
    expect(footer).to.exist;
  });

  it('dispatches cds-interstitial-opened event on open', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen></cds-interstitial-screen>
    `);

    const eventPromise = oneEvent(el, 'cds-interstitial-opened');
    el.open = true;
    await el.updateComplete;

    const event = await eventPromise;
    expect(event).to.exist;
    expect(event.type).to.equal('cds-interstitial-opened');
  });

  it('closes and dispatches cds-interstitial-closed when handleClose is triggered', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen open>
        <cds-interstitial-screen-header
          slot="header"></cds-interstitial-screen-header>
        <cds-interstitial-screen-footer
          slot="footer"></cds-interstitial-screen-footer>
      </cds-interstitial-screen>
    `);
    await el.updateComplete;

    const beforeClosePromise = oneEvent(el, 'cds-interstitial-beingclosed');
    const closePromise = oneEvent(el, 'cds-interstitial-closed');

    // Simulate close via the internal handler
    el._handleClose({
      stopPropagation: () => {},
      detail: { triggeredBy: el },
    });
    await el.updateComplete;

    const beforeClose = await beforeClosePromise;
    expect(beforeClose.type).to.equal('cds-interstitial-beingclosed');

    const closeEvent = await closePromise;
    expect(closeEvent.type).to.equal('cds-interstitial-closed');

    expect(el.open).to.be.false;
  });

  it('renders step title content in body-item', async () => {
    const el = await fixture(html`
      <cds-interstitial-screen open>
        <cds-interstitial-screen-body slot="body">
          <cds-interstitial-screen-body-item step-title="Step 1">
            <p class="step-content">Step one content</p>
          </cds-interstitial-screen-body-item>
        </cds-interstitial-screen-body>
      </cds-interstitial-screen>
    `);
    await el.updateComplete;
    const bodyItem = el.querySelector('cds-interstitial-screen-body-item');
    expect(bodyItem).to.exist;
    const content = bodyItem.querySelector('.step-content');
    expect(content).to.exist;
    expect(content.textContent.trim()).to.equal('Step one content');
  });
});
