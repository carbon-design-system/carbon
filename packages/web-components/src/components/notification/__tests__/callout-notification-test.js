/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSCalloutNotification from '@carbon/web-components/es/components/notification/callout-notification.js';
import '@carbon/web-components/es/components/notification/actionable-notification-button.js';
import { expect, fixture } from '@open-wc/testing';

const prefix = 'cds';

async function createCallout(properties = {}, content = '') {
  const el = new CDSCalloutNotification();
  el.hasFocus = false;
  Object.assign(el, properties);
  el.innerHTML = content;
  return fixture(el);
}

describe('cds-callout-notification', () => {
  it('does not use a live-region role', async () => {
    const el = await createCallout();

    expect(el).to.not.have.attribute('role');
  });

  it('defaults to the info kind', async () => {
    const el = await createCallout();

    expect(el).to.have.attribute('kind', 'info');
  });

  it('renders title, subtitle, title ID, and additional content', async () => {
    const el = await createCallout(
      {
        title: 'A title',
        subtitle: 'A subtitle',
        titleId: 'callout-title',
      },
      '<p>Additional content</p>'
    );
    const title = el.shadowRoot?.querySelector(
      `.${prefix}--actionable-notification__title`
    );

    expect(title).to.have.attribute('id', 'callout-title');
    expect(title?.textContent).to.contain('A title');
    expect(
      el.shadowRoot?.querySelector(
        `.${prefix}--actionable-notification__subtitle`
      )?.textContent
    ).to.contain('A subtitle');
    expect(el.querySelector('p')?.textContent).to.equal('Additional content');
  });

  it('does not render empty title and subtitle containers', async () => {
    const el = await createCallout();

    expect(
      el.shadowRoot?.querySelector(`.${prefix}--actionable-notification__title`)
    ).to.not.exist;
    expect(
      el.shadowRoot?.querySelector(
        `.${prefix}--actionable-notification__subtitle`
      )
    ).to.not.exist;
  });

  it('does not render a close button', async () => {
    const el = await createCallout();

    expect(
      el.shadowRoot?.querySelector(
        `.${prefix}--actionable-notification__close-button`
      )
    ).to.not.exist;
  });

  it('uses the status icon description as its accessible label', async () => {
    const el = await createCallout({
      statusIconDescription: 'notification',
    });
    const statusIcon = el.shadowRoot?.querySelector(
      `.${prefix}--inline-notification__icon`
    );

    expect(statusIcon).to.have.attribute('aria-label', 'notification');
    expect(statusIcon).to.not.have.attribute('aria-hidden');
  });

  it('configures its action button for callout context', async () => {
    const el = await createCallout(
      { title: 'A title', titleId: 'callout-title', lowContrast: true },
      `<${prefix}-actionable-notification-button slot="action">
        Action
      </${prefix}-actionable-notification-button>`
    );
    const actionButton = el.querySelector(
      `${prefix}-actionable-notification-button`
    );

    expect(actionButton).to.have.attribute('kind', 'ghost');
    expect(actionButton).to.have.attribute('aria-describedby', 'callout-title');
    expect(actionButton).to.have.attribute('low-contrast', 'true');
  });

  it('reflects changes to kind and low contrast', async () => {
    const el = await createCallout();

    el.kind = 'warning';
    el.lowContrast = true;
    await el.updateComplete;

    expect(el).to.have.attribute('kind', 'warning');
    expect(el).to.have.attribute('low-contrast');
  });
});
