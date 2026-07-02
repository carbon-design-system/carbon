/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSActionableNotification from '@carbon/web-components/es/components/notification/actionable-notification.js';
import '@carbon/web-components/es/components/notification/actionable-notification-button.js';
import { expect, fixture } from '@open-wc/testing';

const prefix = 'cds';

async function createActionable(properties = {}, content = '') {
  const el = new CDSActionableNotification();
  el.hasFocus = false;
  Object.assign(el, properties);
  el.innerHTML = content;
  return fixture(el);
}

describe('cds-actionable-notification', () => {
  it('renders with an alertdialog role', async () => {
    const el = await createActionable();

    expect(el).to.have.attribute('role', 'alertdialog');
  });

  it('preserves a custom role', async () => {
    const el = new CDSActionableNotification();
    el.hasFocus = false;
    el.setAttribute('role', 'status');
    await fixture(el);

    expect(el).to.have.attribute('role', 'status');
  });

  it('uses the status icon description as its accessible label', async () => {
    const el = await createActionable({
      statusIconDescription: 'notification',
    });
    const statusIcon = el.shadowRoot?.querySelector(
      `.${prefix}--toast-notification__icon`
    );

    expect(statusIcon).to.exist;
    expect(statusIcon).to.have.attribute('aria-label', 'notification');
    expect(statusIcon).to.not.have.attribute('aria-hidden');
  });

  it('renders title, subtitle, and caption properties', async () => {
    const el = await createActionable({
      title: 'A title',
      subtitle: 'A subtitle',
      caption: '00:00:00 AM',
    });

    expect(
      el.shadowRoot?.querySelector(`.${prefix}--actionable-notification__title`)
        ?.textContent
    ).to.contain('A title');
    expect(
      el.shadowRoot?.querySelector(
        `.${prefix}--actionable-notification__subtitle`
      )?.textContent
    ).to.contain('A subtitle');
    expect(
      el.shadowRoot?.querySelector(
        `.${prefix}--actionable-notification__caption`
      )?.textContent
    ).to.contain('00:00:00 AM');
  });

  it('renders additional content in the default slot', async () => {
    const el = await createActionable({}, '<a href="#">Additional content</a>');

    expect(el.querySelector('a')?.textContent).to.equal('Additional content');
  });

  it('closes when Escape is pressed', async () => {
    const el = await createActionable();

    el.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        composed: true,
      })
    );
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('remains open on Escape when close-on-escape is false', async () => {
    const el = await createActionable({ closeOnEscape: false });

    el.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        composed: true,
      })
    );
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('uses inline notification styling when inline', async () => {
    const el = await createActionable({ inline: true });

    expect(
      el.shadowRoot?.querySelector(`.${prefix}--inline-notification__icon`)
    ).to.exist;
  });

  it('configures its action button from notification state', async () => {
    const el = await createActionable(
      { inline: true, lowContrast: true, hideCloseButton: true },
      `<${prefix}-actionable-notification-button slot="action">
        Action
      </${prefix}-actionable-notification-button>`
    );
    const actionButton = el.querySelector(
      `${prefix}-actionable-notification-button`
    );

    expect(actionButton).to.have.attribute('kind', 'ghost');
    expect(actionButton).to.have.attribute('low-contrast', 'true');
    expect(actionButton).to.have.attribute('hide-close-button', 'true');
    expect(actionButton).to.have.attribute('size', 'sm');
  });

  it('uses tertiary action button styling in toast mode', async () => {
    const el = await createActionable(
      {},
      `<${prefix}-actionable-notification-button slot="action">
        Action
      </${prefix}-actionable-notification-button>`
    );
    const actionButton = el.querySelector(
      `${prefix}-actionable-notification-button`
    );

    expect(actionButton).to.have.attribute('kind', 'tertiary');
    expect(
      actionButton.shadowRoot?.querySelector(
        `.${prefix}--actionable-notification__action-button`
      )
    ).to.exist;
  });
});
