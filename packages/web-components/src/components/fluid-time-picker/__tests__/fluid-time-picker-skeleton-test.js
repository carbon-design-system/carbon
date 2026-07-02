/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/fluid-time-picker/fluid-time-picker-skeleton.js';

describe('cds-fluid-time-picker-skeleton', () => {
  describe('renders as expected - Component API', () => {
    it('should render with fluid skeleton wrapper', async () => {
      const el = await fixture(
        html`<cds-fluid-time-picker-skeleton></cds-fluid-time-picker-skeleton>`
      );
      const wrapper = el.shadowRoot.firstElementChild;
      expect(wrapper).to.exist;
      expect(wrapper.classList.contains('cds--time-picker--fluid--skeleton')).to
        .be.true;
    });

    it('should render the expected skeleton children by default', async () => {
      const el = await fixture(
        html`<cds-fluid-time-picker-skeleton></cds-fluid-time-picker-skeleton>`
      );
      const textInputSkeleton = el.shadowRoot.querySelector(
        'cds-fluid-text-input-skeleton'
      );
      const selectSkeletons = el.shadowRoot.querySelectorAll(
        'cds-fluid-select-skeleton'
      );

      expect(textInputSkeleton).to.exist;
      expect(selectSkeletons.length).to.equal(2);
    });

    it('should render the expected skeleton children when is-only-two is set', async () => {
      const el = await fixture(html`
        <cds-fluid-time-picker-skeleton
          is-only-two></cds-fluid-time-picker-skeleton>
      `);
      const wrapper = el.shadowRoot.firstElementChild;
      const selectSkeletons = el.shadowRoot.querySelectorAll(
        'cds-fluid-select-skeleton'
      );

      expect(wrapper.classList.contains('cds--time-picker--equal-width')).to.be
        .true;
      expect(selectSkeletons.length).to.equal(1);
    });
  });

  it('should support a custom class on the host', async () => {
    const el = await fixture(
      html`<cds-fluid-time-picker-skeleton
        class="custom-class"></cds-fluid-time-picker-skeleton>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should be accessible', async () => {
    const el = await fixture(
      html`<cds-fluid-time-picker-skeleton></cds-fluid-time-picker-skeleton>`
    );
    await expect(el).to.be.accessible();
  });
});
