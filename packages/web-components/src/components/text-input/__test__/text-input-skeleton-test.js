/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/text-input/text-input-skeleton.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-text-input-skeleton', () => {
  it('should render the label skeleton by default', async () => {
    const el = await fixture(
      html`<cds-text-input-skeleton></cds-text-input-skeleton>`
    );
    const label = el.shadowRoot.querySelector('.cds--label.cds--skeleton');
    expect(label).to.exist;
  });

  it('should hide the label skeleton when hide-label attribute is set', async () => {
    const el = await fixture(
      html`<cds-text-input-skeleton hide-label></cds-text-input-skeleton>`
    );
    const label = el.shadowRoot.querySelector('.cds--label.cds--skeleton');
    expect(label).to.not.exist;
  });

  it('should support a custom class on the host', async () => {
    // Useful for style overrides or integration tests
    const el = await fixture(
      html`<cds-text-input-skeleton
        class="custom-class"></cds-text-input-skeleton>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should forward additional attributes to the host', async () => {
    // Useful for test IDs and custom automation hooks
    const el = await fixture(
      html`<cds-text-input-skeleton
        data-testid="test-id"></cds-text-input-skeleton>`
    );
    expect(el.getAttribute('data-testid')).to.equal('test-id');
  });

  it('should be accessible', async () => {
    const el = await fixture(
      html`<cds-text-input-skeleton></cds-text-input-skeleton>`
    );
    await expect(el).to.be.accessible();
  });
});
