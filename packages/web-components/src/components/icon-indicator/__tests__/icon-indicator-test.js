/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/icon-indicator/index.js';

describe('cds-icon-indicator', function () {
  const iconIndicator = html`<cds-icon-indicator
    kind="failed"
    label="test label"></cds-icon-indicator>`;

  it('should render', async () => {
    const el = await fixture(iconIndicator);
    expect(el).to.exist;
  });

  it('should use a custom label', async () => {
    const el = await fixture(
      html`<cds-icon-indicator
        kind="failed"
        label="custom label"></cds-icon-indicator>`
    );
    await el.updateComplete;

    expect(el.label).to.equal('custom label');
    expect(el.shadowRoot.textContent.trim()).to.include('custom label');
  });

  it('should render default size 16 when no size is specified', async () => {
    const el = await fixture(
      html`<cds-icon-indicator
        kind="failed"
        label="test label"></cds-icon-indicator>`
    );
    await el.updateComplete;

    expect(el.size).to.equal(16);
    const svgElement = el.shadowRoot.querySelector('svg');
    expect(svgElement).to.exist;
  });

  it('should support a custom class name on the outermost element', async () => {
    const el = await fixture(
      html`<cds-icon-indicator
        kind="failed"
        label="test label"
        class="custom-class"></cds-icon-indicator>`
    );

    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should update with the kind attribute', async () => {
    const el = await fixture(
      html`<cds-icon-indicator
        kind="pending"
        label="test label"
        size="20"></cds-icon-indicator>`
    );
    await el.updateComplete;

    expect(el.kind).to.equal('pending');

    // Check that an SVG icon is rendered
    const svgElement = el.shadowRoot.querySelector('svg');
    expect(svgElement).to.exist;
  });

  it('should render different sizes correctly', async () => {
    const sizes = [16, 20];

    for (const size of sizes) {
      const el = await fixture(
        html`<cds-icon-indicator
          kind="failed"
          label="test"
          size="${size}"></cds-icon-indicator>`
      );
      await el.updateComplete;

      expect(el.size).to.equal(size.toString());
      const svgElement = el.shadowRoot.querySelector('svg');
      expect(svgElement).to.exist;
    }
  });
});
