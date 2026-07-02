/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/notification/index.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';

const prefix = 'cds';

describe('cds-toast-notification', () => {
  it('renders its title, subtitle, caption, and default role', async () => {
    const el = await fixture(html`
      <cds-toast-notification
        title="A title"
        subtitle="A subtitle"
        caption="00:00:00 AM">
      </cds-toast-notification>
    `);

    expect(el).to.have.attribute('role', 'alert');
    expect(
      el.shadowRoot?.querySelector(`.${prefix}--toast-notification__title`)
        ?.textContent
    ).to.contain('A title');
    expect(
      el.shadowRoot?.querySelector(`.${prefix}--toast-notification__subtitle`)
        ?.textContent
    ).to.contain('A subtitle');
    expect(
      el.shadowRoot?.querySelector(`.${prefix}--toast-notification__caption`)
        ?.textContent
    ).to.contain('00:00:00 AM');
  });

  it('renders a slotted caption', async () => {
    const el = await fixture(html`
      <cds-toast-notification>
        <span slot="caption">Slotted caption</span>
      </cds-toast-notification>
    `);

    expect(
      el.shadowRoot?.querySelector(`.${prefix}--toast-notification__caption`)
    ).to.exist;
    expect(el.textContent).to.contain('Slotted caption');
  });

  it('does not render an empty caption container', async () => {
    const el = await fixture(html`
      <cds-toast-notification></cds-toast-notification>
    `);

    expect(
      el.shadowRoot?.querySelector(`.${prefix}--toast-notification__caption`)
    ).to.not.exist;
  });

  it('uses toast-specific classes for its controls and icon', async () => {
    const el = await fixture(html`
      <cds-toast-notification></cds-toast-notification>
    `);

    expect(el.shadowRoot?.querySelector(`.${prefix}--toast-notification__icon`))
      .to.exist;
    expect(
      el.shadowRoot?.querySelector(
        `.${prefix}--toast-notification__close-button`
      )
    ).to.exist;
  });

  it('uses the status icon description as its accessible label', async () => {
    const el = await fixture(html`
      <cds-toast-notification status-icon-description="notification">
      </cds-toast-notification>
    `);
    const statusIcon = el.shadowRoot?.querySelector(
      `.${prefix}--toast-notification__icon`
    );

    expect(statusIcon).to.have.attribute('aria-label', 'notification');
    expect(statusIcon).to.not.have.attribute('aria-hidden');
  });

  it('reflects kind and low contrast state', async () => {
    const el = await fixture(html`
      <cds-toast-notification kind="warning" low-contrast>
      </cds-toast-notification>
    `);

    expect(el).to.have.attribute('kind', 'warning');
    expect(el).to.have.attribute('low-contrast');
  });

  it('hides the close button when requested', async () => {
    const el = await fixture(html`
      <cds-toast-notification hide-close-button></cds-toast-notification>
    `);
    const closeButton = el.shadowRoot?.querySelector(
      `.${prefix}--toast-notification__close-button`
    );

    expect(getComputedStyle(closeButton).display).to.equal('none');
  });

  it('fires the close event when the close button is clicked', async () => {
    const el = await fixture(html`
      <cds-toast-notification></cds-toast-notification>
    `);
    const closeButton = el.shadowRoot?.querySelector(
      `.${prefix}--toast-notification__close-button`
    );
    const closed = oneEvent(el, `${prefix}-notification-closed`);

    closeButton.click();
    await closed;

    expect(el.open).to.be.false;
  });
});
