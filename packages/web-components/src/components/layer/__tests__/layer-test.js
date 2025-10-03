/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/layer/index.js';

describe('cds-layer', function () {
  const basicLayer = html`<cds-layer>
    <div class="test-content">Test content</div>
  </cds-layer>`;

  it('should set a level', async () => {
    const el = await fixture(
      html`<cds-layer level="2"><div>Test</div></cds-layer>`
    );
    expect(el.getAttribute('level')).to.equal('2');
  });

  it('should have the default level 0', async () => {
    const el = await fixture(basicLayer);
    expect(el.getAttribute('level')).to.equal('0');
  });

  it('should have with-background attribute when specified', async () => {
    const el = await fixture(html`
      <cds-layer with-background>
        <div>Test content</div>
      </cds-layer>
    `);
    expect(el.hasAttribute('with-background')).to.be.true;
  });

  it('should render children in slot', async () => {
    const el = await fixture(html`
      <cds-layer>
        <span data-testid="child">test content</span>
      </cds-layer>
    `);

    const child = el.querySelector('[data-testid="child"]');
    expect(child).to.exist;
    expect(child.textContent).to.equal('test content');
  });

  it('should render nested layers with correct levels', async () => {
    const el = await fixture(html`
      <cds-layer>
        <div>Level 0</div>
        <cds-layer>
          <div>Level 1</div>
          <cds-layer>
            <div>Level 2</div>
          </cds-layer>
        </cds-layer>
      </cds-layer>
    `);

    const nestedLayers = el.querySelectorAll('cds-layer');
    expect(nestedLayers[0].getAttribute('level')).to.equal('1');
    expect(nestedLayers[1].getAttribute('level')).to.equal('2');
  });

  it('should cap level at maximum value', async () => {
    const el = await fixture(html`
      <cds-layer level="2">
        <cds-layer>
          <div>Should stay at level 2</div>
        </cds-layer>
      </cds-layer>
    `);

    const nestedLayer = el.querySelector('cds-layer');
    expect(nestedLayer.getAttribute('level')).to.equal('2');
  });

  it('should accept custom CSS classes', async () => {
    const el = await fixture(html`
      <cds-layer class="custom-class">
        <div>Test</div>
      </cds-layer>
    `);
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should dispatch cds-use-layer event', async () => {
    let eventDetail = null;
    const el = await fixture(html`
      <cds-layer
        @cds-use-layer=${(e) => {
          eventDetail = e.detail;
        }}>
        <div>Test content</div>
      </cds-layer>
    `);

    expect(eventDetail).to.not.be.null;
    expect(eventDetail.layer).to.equal(el);
    expect(eventDetail.level).to.equal(0);
  });

  it('should handle empty layer', async () => {
    const el = await fixture(html`<cds-layer></cds-layer>`);
    expect(el).to.exist;
    expect(el.level).to.equal(0);
  });

  it('should handle deeply nested layers', async () => {
    const el = await fixture(html`
      <cds-layer>
        <cds-layer>
          <cds-layer>
            <cds-layer>
              <div>Deep nesting</div>
            </cds-layer>
          </cds-layer>
        </cds-layer>
      </cds-layer>
    `);

    const layers = el.querySelectorAll('cds-layer');
    expect(layers[0].getAttribute('level')).to.equal('1');
    expect(layers[1].getAttribute('level')).to.equal('2');
    expect(layers[2].getAttribute('level')).to.equal('2');
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(basicLayer);
      await expect(el).to.be.accessible();
    });

    it('should have no Axe violations with background', async () => {
      const el = await fixture(html`
        <cds-layer with-background>
          <div>Accessible content</div>
        </cds-layer>
      `);
      await expect(el).to.be.accessible();
    });
  });
});
