/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/icon-indicator/index.js';
import '@carbon/web-components/es/components/feature-flags/index.js';

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

  it('should default the compact tooltip autoalign to true with enable-v12-release', async () => {
    const featureFlag = await fixture(html`
      <feature-flags enable-v12-release="true">
        <cds-icon-indicator
          compact
          kind="failed"
          label="test label"></cds-icon-indicator>
      </feature-flags>
    `);
    const el = featureFlag.querySelector('cds-icon-indicator');

    await el.updateComplete;

    expect(el.autoalign).to.be.true;
    expect(el.shadowRoot.querySelector('cds-definition-tooltip').autoalign).to
      .be.true;
  });

  it('should keep the compact tooltip autoalign disabled when set to false with enable-v12-release', async () => {
    const featureFlag = await fixture(html`
      <feature-flags enable-v12-release="true">
        <cds-icon-indicator
          compact
          .autoalign=${false}
          kind="failed"
          label="test label"></cds-icon-indicator>
      </feature-flags>
    `);
    const el = featureFlag.querySelector('cds-icon-indicator');

    await el.updateComplete;

    expect(el.autoalign).to.be.false;
    expect(el.shadowRoot.querySelector('cds-definition-tooltip').autoalign).to
      .be.false;
  });
});
