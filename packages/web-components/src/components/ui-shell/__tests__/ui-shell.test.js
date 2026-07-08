/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/ui-shell/index.js';

describe('cds-header-global-action', () => {
  describe('Handling click', () => {
    it('should set expanded on the linked panel when the panel is collapsed', async () => {
      const el = await fixture(html`
        <div>
          <cds-header-global-action panel-id="test-panel-1">
          </cds-header-global-action>
          <cds-header-panel id="test-panel-1"></cds-header-panel>
        </div>
      `);

      const action = el.querySelector('cds-header-global-action');
      const panel = el.querySelector('cds-header-panel');

      action.click();

      expect(panel.hasAttribute('expanded')).to.be.true;
    });

    it('should remove expanded from the linked panel when the panel is already expanded', async () => {
      const el = await fixture(html`
        <div>
          <cds-header-global-action panel-id="test-panel-2">
          </cds-header-global-action>
          <cds-header-panel id="test-panel-2" expanded></cds-header-panel>
        </div>
      `);

      const action = el.querySelector('cds-header-global-action');
      const panel = el.querySelector('cds-header-panel');

      action.click();

      expect(panel.hasAttribute('expanded')).to.be.false;
    });
  });
});
