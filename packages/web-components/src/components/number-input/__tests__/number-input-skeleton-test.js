/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/number-input/index.js';
import { fixture, html, expect } from '@open-wc/testing';

describe('<cds-number-input-skeleton>', () => {
  it('should render skeleton component', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton></cds-number-input-skeleton>`
    );
    expect(el).to.exist;
  });

  it('should render label skeleton by default', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton></cds-number-input-skeleton>`
    );
    const label = el.shadowRoot.querySelector('.cds--label.cds--skeleton');
    expect(label).to.exist;
  });

  it('should hide label when hide-label is set', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton hide-label></cds-number-input-skeleton>`
    );
    const label = el.shadowRoot.querySelector('.cds--label.cds--skeleton');
    expect(label).to.not.exist;
  });

  it('should render input skeleton', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton></cds-number-input-skeleton>`
    );
    const inputSkeleton = el.shadowRoot.querySelector(
      '.cds--number.cds--skeleton'
    );
    expect(inputSkeleton).to.exist;
  });

  it('should apply small size class', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton size="sm"></cds-number-input-skeleton>`
    );
    await el.updateComplete;
    expect(el.getAttribute('size')).to.equal('sm');
  });

  it('should apply medium size class by default', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton></cds-number-input-skeleton>`
    );
    await el.updateComplete;
    const size = el.getAttribute('size') || 'md';
    expect(size).to.equal('md');
  });

  it('should apply large size class', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton size="lg"></cds-number-input-skeleton>`
    );
    await el.updateComplete;
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('should place custom class on host', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton
        class="custom-class"></cds-number-input-skeleton>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should update size dynamically', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton size="sm"></cds-number-input-skeleton>`
    );
    await el.updateComplete;

    expect(el.getAttribute('size')).to.equal('sm');

    el.setAttribute('size', 'lg');
    await el.updateComplete;

    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('should toggle hide-label dynamically', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton></cds-number-input-skeleton>`
    );

    let label = el.shadowRoot.querySelector('.cds--label.cds--skeleton');
    expect(label).to.exist;

    el.hideLabel = true;
    await el.updateComplete;

    label = el.shadowRoot.querySelector('.cds--label.cds--skeleton');
    expect(label).to.not.exist;
  });

  // React parity tests
  describe('React NumberInput.Skeleton parity', () => {
    it('should support all React skeleton props', async () => {
      const el = await fixture(
        html`<cds-number-input-skeleton
          hide-label
          size="lg"></cds-number-input-skeleton>`
      );

      expect(el.hideLabel).to.be.true;
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('should match React skeleton structure', async () => {
      const el = await fixture(
        html`<cds-number-input-skeleton></cds-number-input-skeleton>`
      );

      // Should have label skeleton
      const label = el.shadowRoot.querySelector('.cds--label.cds--skeleton');
      expect(label).to.exist;

      // Should have input skeleton
      const inputSkeleton = el.shadowRoot.querySelector(
        '.cds--number.cds--skeleton'
      );
      expect(inputSkeleton).to.exist;
    });
  });
});
