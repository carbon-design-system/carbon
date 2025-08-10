/**
 * Copyright IBM Corp.  2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/inline-loading/index.js';

describe('cds-inline-loading', function () {
  const inlineLoading = html`<cds-inline-loading></cds-inline-loading>`;

  it('should render', async () => {
    const el = await fixture(inlineLoading);
    expect(el).to.exist;
  });

  it('should render a loader by default', async () => {
    const el = await fixture(inlineLoading);
    await el.updateComplete;

    const loadingIcon = el.shadowRoot.querySelector('.cds--loading');
    expect(loadingIcon).to.exist;
  });

  it('should set aria-live attribute automatically', async () => {
    const el = await fixture(inlineLoading);
    expect(el.getAttribute('aria-live')).to.equal('assertive');
  });

  it('should pass in extra classes that are passed via class', async () => {
    const el = await fixture(
      html`<cds-inline-loading class="custom-class"></cds-inline-loading>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should not render any text by default', async () => {
    const el = await fixture(inlineLoading);
    await el.updateComplete;

    const textElement = el.shadowRoot.querySelector(
      '.cds--inline-loading__text'
    );
    const slot = textElement.querySelector('slot');
    const assigned = slot.assignedNodes({ flatten: true });

    // Check if there's any meaningful text content
    const hasText = assigned.some(
      (node) => node.textContent && node.textContent.trim().length > 0
    );

    expect(hasText).to.be.false;
  });

  it('should render text when content is provided via slot', async () => {
    const el = await fixture(
      html`<cds-inline-loading>Loading</cds-inline-loading>`
    );
    await el.updateComplete;

    const textElement = el.shadowRoot.querySelector(
      '.cds--inline-loading__text'
    );
    const slot = textElement.querySelector('slot');
    const assigned = slot.assignedNodes({ flatten: true });

    const textNode = assigned.find(
      (node) => node.textContent && node.textContent.trim() === 'Loading'
    );

    expect(textNode).to.exist;
  });

  it('should allow users to override the onSuccess timeout with successDelay', async function () {
    this.timeout(4000);
    const el = await fixture(
      html`<cds-inline-loading
        status="finished"
        success-delay="500"></cds-inline-loading>`
    );
    await el.updateComplete;

    expect(el.successDelay).to.equal('500');

    const listener = oneEvent(el, 'cds-inline-loading-onsuccess');
    const event = await listener;

    expect(event).to.exist;
    expect(event.type).to.equal('cds-inline-loading-onsuccess');
  });

  it('should call the onSuccess event after a delay when status is finished', async function () {
    this.timeout(3000);
    const el = await fixture(
      html`<cds-inline-loading status="finished"></cds-inline-loading>`
    );
    await el.updateComplete;

    const listener = oneEvent(el, 'cds-inline-loading-onsuccess');
    const event = await listener;

    expect(event).to.exist;
    expect(event.type).to.equal('cds-inline-loading-onsuccess');
  });

  it('should respect the icon-description attribute', async () => {
    const el = await fixture(
      html`<cds-inline-loading
        icon-description="Custom loading text"></cds-inline-loading>`
    );
    await el.updateComplete;

    expect(el.iconDescription).to.equal('Custom loading text');

    const title = el.shadowRoot.querySelector('title');
    expect(title.textContent).to.equal('Custom loading text');
  });

  it('should render different states correctly', async () => {
    const states = ['active', 'inactive', 'finished', 'error'];

    for (const state of states) {
      const el = await fixture(
        html`<cds-inline-loading status="${state}"></cds-inline-loading>`
      );
      await el.updateComplete;

      expect(el.status).to.equal(state);

      switch (state) {
        case 'active':
          expect(el.shadowRoot.querySelector('.cds--loading')).to.exist;
          expect(el.shadowRoot.querySelector('.cds--loading--stop')).to.not
            .exist;
          break;
        case 'inactive':
          expect(el.shadowRoot.querySelector('.cds--loading--stop')).to.exist;
          break;
        case 'finished':
          expect(
            el.shadowRoot.querySelector(
              '.cds--inline-loading__checkmark-container'
            )
          ).to.exist;
          break;
        case 'error':
          expect(el.shadowRoot.querySelector('.cds--inline-loading--error')).to
            .exist;
          break;
      }
    }
  });
});
