/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/notification/index.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';

const prefix = 'cds';

describe('cds-inline-notification', () => {
  it('renders its content and default role', async () => {
    const el = await fixture(html`
      <cds-inline-notification title="A title" subtitle="A subtitle">
        <span>Additional content</span>
      </cds-inline-notification>
    `);

    expect(el).to.have.attribute('role', 'status');
    expect(
      el.shadowRoot
        ?.querySelector(`.${prefix}--inline-notification__title`)
        ?.textContent.trim()
    ).to.equal('A title');
    expect(
      el.shadowRoot
        ?.querySelector(`.${prefix}--inline-notification__subtitle`)
        ?.textContent.trim()
    ).to.equal('A subtitle');
    expect(el.querySelector('span')?.textContent).to.equal(
      'Additional content'
    );
  });

  it('preserves a custom role', async () => {
    const el = await fixture(html`
      <cds-inline-notification role="log"></cds-inline-notification>
    `);

    expect(el).to.have.attribute('role', 'log');
  });

  ['error', 'info', 'info-square', 'success', 'warning', 'warning-alt'].forEach(
    (kind) => {
      it(`supports kind="${kind}"`, async () => {
        const el = await fixture(html`
          <cds-inline-notification kind=${kind}></cds-inline-notification>
        `);

        expect(el).to.have.attribute('kind', kind);
        expect(
          el.shadowRoot?.querySelector(`.${prefix}--inline-notification__icon`)
        ).to.exist;
      });
    }
  );

  it('uses the status icon description as its accessible label', async () => {
    const el = await fixture(html`
      <cds-inline-notification status-icon-description="notification">
      </cds-inline-notification>
    `);
    const statusIcon = el.shadowRoot?.querySelector(
      `.${prefix}--inline-notification__icon`
    );

    expect(statusIcon).to.have.attribute('aria-label', 'notification');
    expect(statusIcon).to.not.have.attribute('aria-hidden');
  });

  it('uses the provided accessible label for the close button', async () => {
    const el = await fixture(html`
      <cds-inline-notification aria-label="Close notification">
      </cds-inline-notification>
    `);
    const closeButton = el.shadowRoot?.querySelector(
      `.${prefix}--inline-notification__close-button`
    );

    expect(closeButton).to.have.attribute('aria-label', 'Close notification');
    expect(closeButton).to.have.attribute('title', 'Close notification');
  });

  it('hides the close button when requested', async () => {
    const el = await fixture(html`
      <cds-inline-notification hide-close-button></cds-inline-notification>
    `);
    const closeButton = el.shadowRoot?.querySelector(
      `.${prefix}--inline-notification__close-button`
    );

    expect(closeButton.getClientRects()).to.have.lengthOf(0);
    closeButton.focus();
    expect(el.shadowRoot?.activeElement).to.not.equal(closeButton);
  });

  it('closes and reports the triggering element', async () => {
    const el = await fixture(html`
      <cds-inline-notification></cds-inline-notification>
    `);
    const closeButton = el.shadowRoot?.querySelector(
      `.${prefix}--inline-notification__close-button`
    );
    const closed = oneEvent(el, `${prefix}-notification-closed`);

    closeButton.click();
    const event = await closed;
    await el.updateComplete;

    expect(el.open).to.be.false;
    expect(event.detail.triggeredBy).to.equal(closeButton);
  });

  it('allows closing to be prevented', async () => {
    const el = await fixture(html`
      <cds-inline-notification></cds-inline-notification>
    `);
    const closeButton = el.shadowRoot?.querySelector(
      `.${prefix}--inline-notification__close-button`
    );
    el.addEventListener(`${prefix}-notification-beingclosed`, (event) => {
      event.preventDefault();
    });

    closeButton.click();
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('closes after the configured timeout', async () => {
    const el = await fixture(html`
      <cds-inline-notification></cds-inline-notification>
    `);
    const closed = oneEvent(el, `${prefix}-notification-closed`);

    el.timeout = 10;
    await closed;

    expect(el.open).to.be.false;
  });
});
