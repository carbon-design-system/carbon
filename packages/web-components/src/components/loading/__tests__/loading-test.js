/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/loading/index.js';
import { LOADING_TYPE } from '@carbon/web-components/es/components/loading/defs.js';

describe('cds-loading', function () {
  const loading = html`<cds-loading></cds-loading>`;
  const loadingWithDescription = html`<cds-loading
    description="Custom loading text"></cds-loading>`;
  const loadingWithLabel = html`<cds-loading
    assistive-text="Assistive loading text"></cds-loading>`;
  const loadingSmall = html`<cds-loading small></cds-loading>`;
  const loadingWithOverlay = html`<cds-loading overlay></cds-loading>`;
  const loadingActive = html`<cds-loading active></cds-loading>`;

  it('should render', async () => {
    const el = await fixture(loading);
    expect(el).dom.to.equalSnapshot();
  });

  describe('Component API', () => {
    it('should have default description text', async () => {
      const el = await fixture(loading);
      expect(el.description).to.equal('Loading');
    });

    it('should change description text when property is set', async () => {
      const el = await fixture(loadingWithDescription);
      const title = el.shadowRoot.querySelector('title');

      expect(title.textContent).to.equal('Custom loading text');
    });

    it('should support assistive-text as alias for description', async () => {
      const el = await fixture(loadingWithLabel);
      expect(el.description).to.equal('Assistive loading text');
      const title = el.shadowRoot.querySelector('title');

      expect(title.textContent).to.equal('Assistive loading text');
    });

    it('should add small attribute when small property is set', async () => {
      const el = await fixture(loadingSmall);
      expect(el.small).to.be.true;
    });

    it('should support type as alias for small property', async () => {
      const el = await fixture(loading);
      expect(el.type).to.equal(LOADING_TYPE.REGULAR);

      el.type = LOADING_TYPE.SMALL;
      await el.updateComplete;
      expect(el.small).to.be.true;
    });
  });

  describe('Active state', () => {
    it('should support setting active state', async () => {
      const el = await fixture(loading);
      expect(el.active).to.be.false;

      el.active = true;
      await el.updateComplete;

      expect(el.active).to.be.true;
    });

    it('should support inactive as inverse of active property', async () => {
      const el = await fixture(loading);
      expect(el.inactive).to.be.true;
      expect(el.active).to.be.false;

      el.inactive = false;
      await el.updateComplete;
      expect(el.active).to.be.true;
    });

    it('should reflect active state to attribute', async () => {
      const el = await fixture(loading);
      expect(el.hasAttribute('active')).to.be.false;
      el.active = true;
      await el.updateComplete;
      expect(el.hasAttribute('active')).to.be.true;
    });

    it('should reflect inactive state to attribute', async () => {
      const el = await fixture(loading);
      expect(el.hasAttribute('inactive')).to.be.true;
      el.inactive = false;
      await el.updateComplete;
      expect(el.hasAttribute('inactive')).to.be.false;
    });
  });

  describe('Overlay variant', () => {
    it('should render with overlay when overlay attribute is set', async () => {
      const el = await fixture(loadingWithOverlay);
      expect(el.overlay).to.be.true;

      const divElement = el.shadowRoot.querySelector('div');
      expect(divElement).to.exist;
    });

    it('should render without overlay when overlay attribute is not set', async () => {
      const el = await fixture(loading);
      expect(el.overlay).to.be.false;
      const svgElement = el.shadowRoot.querySelector('svg');
      expect(svgElement).to.exist;
    });
  });

  describe('SVG structure', () => {
    it('should have correct structure for default loading', async () => {
      const el = await fixture(loading);
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.exist;

      const circle = svg.querySelector('circle');
      expect(circle).to.exist;
      expect(circle.getAttribute('cx')).to.equal('50%');
      expect(circle.getAttribute('cy')).to.equal('50%');
    });

    it('should have correct structure for small loading', async () => {
      const el = await fixture(loadingSmall);
      const svg = el.shadowRoot.querySelector('svg');
      expect(svg).to.exist;

      const circles = svg.querySelectorAll('circle');
      expect(circles.length).to.be.at.least(1);
    });
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(loading);
      await expect(el).to.be.accessible();
    });

    it('should have no Axe violations with overlay', async () => {
      const el = await fixture(loadingWithOverlay);
      await expect(el).to.be.accessible();
    });

    it('should have no Axe violations when active', async () => {
      const el = await fixture(loadingActive);
      await expect(el).to.be.accessible();
    });

    it('should have no Axe violations when small', async () => {
      const el = await fixture(loadingSmall);
      await expect(el).to.be.accessible();
    });
  });
});
