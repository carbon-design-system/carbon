/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/number-input/index.js';
import { fixture, html, expect } from '@open-wc/testing';

describe('<cds-number-input-skeleton>', () => {
  it('should place custom class on host', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton
        class="custom-class"></cds-number-input-skeleton>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should spread additional attributes on the host element', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton
        data-testid="skeleton"></cds-number-input-skeleton>`
    );
    expect(el.getAttribute('data-testid')).to.equal('skeleton');
  });

  it('should render label skeleton by default', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton></cds-number-input-skeleton>`
    );
    const label = el.shadowRoot.querySelector('.cds--label');
    expect(label).to.exist;
  });

  it('should hide label skeleton when hide-label is true', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton hide-label></cds-number-input-skeleton>`
    );
    const label = el.shadowRoot.querySelector('.cds--label');
    expect(label).to.not.exist;
  });

  it('should always render number skeleton', async () => {
    const el = await fixture(
      html`<cds-number-input-skeleton></cds-number-input-skeleton>`
    );
    const numberSkeleton = el.shadowRoot.querySelector('.cds--number');
    expect(numberSkeleton).to.exist;
    expect(numberSkeleton.classList.contains('cds--skeleton')).to.be.true;
  });
});
