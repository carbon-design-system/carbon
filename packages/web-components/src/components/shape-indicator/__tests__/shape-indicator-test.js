/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/shape-indicator/index.js';

describe('cds-shape-indicator', function () {
  const shapeIndicator = html`<cds-shape-indicator
    kind="failed"
    label="test label"></cds-shape-indicator>`;

  it('should render', async () => {
    const el = await fixture(shapeIndicator);
    expect(el).to.exist;
  });

  it('should use a custom label', async () => {
    const el = await fixture(
      html`<cds-shape-indicator
        kind="failed"
        label="custom label"></cds-shape-indicator>`
    );
    await el.updateComplete;

    expect(el.label).to.equal('custom label');
    expect(el.shadowRoot.textContent.trim()).to.include('custom label');
  });

  it('should update with the textSize attribute', async () => {
    const el = await fixture(
      html`<cds-shape-indicator
        kind="failed"
        label="test label"
        text-size="14"></cds-shape-indicator>`
    );
    await el.updateComplete;

    expect(el.textSize).to.equal('14');

    expect(el.getAttribute('text-size')).to.equal('14');
  });

  it('should render default textSize 12 when no textSize is specified', async () => {
    const el = await fixture(
      html`<cds-shape-indicator
        kind="failed"
        label="test label"></cds-shape-indicator>`
    );
    await el.updateComplete;

    expect(el.textSize).to.equal(12);
  });

  it('should update with the kind attribute', async () => {
    const el = await fixture(
      html`<cds-shape-indicator
        kind="critical"
        label="test label"
        text-size="14"></cds-shape-indicator>`
    );
    await el.updateComplete;

    expect(el.kind).to.equal('critical');

    const svgElement = el.shadowRoot.querySelector('svg');
    expect(svgElement).to.exist;
  });

  it('should support a custom class name on the outermost element', async () => {
    const el = await fixture(
      html`<cds-shape-indicator
        kind="failed"
        label="test label"
        class="custom-class"></cds-shape-indicator>`
    );

    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should render different textSizes correctly', async () => {
    const textSizes = [12, 14];

    for (const textSize of textSizes) {
      const el = await fixture(
        html`<cds-shape-indicator
          kind="failed"
          label="test"
          text-size="${textSize}"></cds-shape-indicator>`
      );
      await el.updateComplete;

      expect(el.textSize).to.equal(textSize.toString());

      // Should render an SVG for both text sizes
      const svgElement = el.shadowRoot.querySelector('svg');
      expect(svgElement).to.exist;
    }
  });
});
