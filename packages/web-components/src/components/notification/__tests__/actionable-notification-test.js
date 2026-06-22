/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/notification/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-actionable-notification', () => {
  it('uses the status icon description as the accessible icon label', async () => {
    const el = await fixture(html`
      <cds-actionable-notification status-icon-description="notification">
      </cds-actionable-notification>
    `);
    const statusIcon = el.shadowRoot?.querySelector(
      '.cds--toast-notification__icon'
    );

    expect(statusIcon).to.have.attribute('aria-label', 'notification');
    expect(statusIcon).to.not.have.attribute('aria-hidden');
  });
});
