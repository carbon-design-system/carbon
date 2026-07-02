/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/fluid-select/fluid-select-skeleton.js';

describe('cds-fluid-select-skeleton', () => {
  describe('renders as expected - Component API', () => {
    it('should render with fluid skeleton wrapper', async () => {
      const el = await fixture(
        html`<cds-fluid-select-skeleton></cds-fluid-select-skeleton>`
      );
      const wrapper = el.shadowRoot.firstElementChild;
      expect(wrapper).to.exist;
      expect(wrapper.classList.contains('cds--select--fluid__skeleton')).to.be
        .true;
    });

    it('should render the label skeleton by default', async () => {
      const el = await fixture(
        html`<cds-fluid-select-skeleton></cds-fluid-select-skeleton>`
      );
      const label = el.shadowRoot.querySelector('.cds--label.cds--skeleton');
      expect(label).to.exist;
    });

    it('should hide the label skeleton when hide-label attribute is set', async () => {
      const el = await fixture(
        html`<cds-fluid-select-skeleton hide-label></cds-fluid-select-skeleton>`
      );
      const label = el.shadowRoot.querySelector('.cds--label.cds--skeleton');
      expect(label).to.not.exist;
    });
  });

  it('should support a custom class on the host', async () => {
    const el = await fixture(
      html`<cds-fluid-select-skeleton
        class="custom-class"></cds-fluid-select-skeleton>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should be accessible', async () => {
    const el = await fixture(
      html`<cds-fluid-select-skeleton></cds-fluid-select-skeleton>`
    );
    await expect(el).to.be.accessible();
  });
});
