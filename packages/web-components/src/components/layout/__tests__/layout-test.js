/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/layout/index.js';

const prefix = 'cds';

describe('cds-layout', () => {
  it('should apply the correct size attribute for Layout', async () => {
    const el = await fixture(html`<cds-layout size="lg">Content</cds-layout>`);
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('should apply the correct density attribute for Layout', async () => {
    const el = await fixture(
      html`<cds-layout density="condensed">Content</cds-layout>`
    );
    expect(el.getAttribute('density')).to.equal('condensed');
  });

  it('should render children inside Layout', async () => {
    const el = await fixture(html`<cds-layout>Child Content</cds-layout>`);
    expect(el.textContent?.trim()).to.equal('Child Content');
  });
});

describe('cds-layout-constraint', () => {
  it('should apply correct size constraints for LayoutConstraint', async () => {
    const el = await fixture(
      html`<cds-layout-constraint size-default="md" size-min="sm" size-max="xl">
        Content
      </cds-layout-constraint>`
    );

    expect(el.getAttribute('size-default')).to.equal('md');
    expect(el.getAttribute('size-min')).to.equal('sm');
    expect(el.getAttribute('size-max')).to.equal('xl');
  });

  it('should apply correct density constraints for LayoutConstraint', async () => {
    const el = await fixture(
      html`<cds-layout-constraint
        density-default="condensed"
        density-min="normal"
        density-max="normal">
        Content
      </cds-layout-constraint>`
    );
    expect(el.getAttribute('density-default')).to.equal('condensed');
    expect(el.getAttribute('density-min')).to.equal('normal');
    expect(el.getAttribute('density-max')).to.equal('normal');
  });

  it('should render children inside LayoutConstraint', async () => {
    const el = await fixture(
      html`<cds-layout-constraint
        >Constraint Child Content</cds-layout-constraint
      >`
    );
    expect(el.textContent?.trim()).to.equal('Constraint Child Content');
  });
});
