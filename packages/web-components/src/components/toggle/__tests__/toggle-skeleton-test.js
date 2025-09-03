/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/toggle/toggle-skeleton.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-toggle', () => {
  it('should support a custom class on the host', async () => {
    const el = await fixture(
      html`<cds-toggle-skeleton class="custom-class"></cds-toggle-skeleton>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });
  it('should spread additional attributes on the host element', async () => {
    const el = await fixture(
      html`<cds-toggle-skeleton data-testid="skeleton"></cds-toggle-skeleton>`
    );
    expect(el.getAttribute('data-testid')).to.equal('skeleton');
  });
});
