/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSActionableNotification from '@carbon/web-components/es/components/notification/actionable-notification.js';
import { expect } from '@open-wc/testing';

describe('cds-actionable-notification', () => {
  it('uses the status icon description as its accessible label', async () => {
    const el = new CDSActionableNotification();
    el.hasFocus = false;
    el.statusIconDescription = 'notification';
    document.body.append(el);

    try {
      await el.updateComplete;

      const statusIcon = el.shadowRoot?.querySelector(
        '.cds--toast-notification__icon'
      );

      expect(statusIcon).to.exist;
      expect(statusIcon).to.have.attribute('aria-label', 'notification');
      expect(statusIcon).to.not.have.attribute('aria-hidden');
    } finally {
      el.remove();
    }
  });
});
