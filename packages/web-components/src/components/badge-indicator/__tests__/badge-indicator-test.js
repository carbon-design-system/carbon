/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/badge-indicator/index.js';

describe('cds-badge-indicator', function () {
  const basicBadgeIndicator = html`<cds-badge-indicator></cds-badge-indicator>`;

  it('should render', async () => {
    const el = await fixture(basicBadgeIndicator);
    await expect(el).dom.to.equalSnapshot();
  });

  it('should set a count', async () => {
    const el = await fixture(
      html`<cds-badge-indicator count="3"></cds-badge-indicator>`
    );
    await expect(el.shadowRoot.textContent.trim()).to.equal('3');
  });

  it('should truncate the count over 999', async () => {
    const el = await fixture(
      html`<cds-badge-indicator count="2342"></cds-badge-indicator>`
    );
    await expect(el.shadowRoot.textContent.trim()).to.equal('999+');
  });

  it('should have the default slot value', async () => {
    const el = await fixture(basicBadgeIndicator);
    await expect(el.getAttribute('slot')).to.equal('badge-indicator');
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(basicBadgeIndicator);
      await expect(el).to.be.accessible();
    });
  });
});
