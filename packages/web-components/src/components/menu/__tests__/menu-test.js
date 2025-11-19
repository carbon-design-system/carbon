/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/menu/index.js';

import { expect, fixture, html } from '@open-wc/testing';

describe('cds-menu', () => {
  it('should render with default properties', async () => {
    const el = await fixture(html`<cds-menu></cds-menu>`);
    expect(el).to.exist;
  });

  it('should apply custom class to the outermost element', async () => {
    const el = await fixture(html`<cds-menu class="custom-class"></cds-menu>`);
    expect(el).to.have.class('custom-class');
  });

  it('should have an id when one is provided', async () => {
    const el = await fixture(html`<cds-menu id="test-id"></cds-menu>`);
    expect(el).to.have.attribute('id', 'test-id');
  });

  it('should be open if open is supplied', async () => {
    const el = await fixture(html`<cds-menu open></cds-menu>`);
    expect(el.open).to.be.true;
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.have.class('cds--menu--open');
  });

  it('should change size based on size prop', async () => {
    const el = await fixture(html`<cds-menu size="lg"></cds-menu>`);
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.have.class('cds--menu--lg');
  });

  it('should set aria-label attribute', async () => {
    const el = await fixture(html`<cds-menu label="Test Menu"></cds-menu>`);
    const menu = el.shadowRoot.querySelector('[role="menu"]');
    expect(menu).to.have.attribute('aria-label', 'Test Menu');
  });

  it('should apply border class when border prop is true', async () => {
    const el = await fixture(html`<cds-menu border></cds-menu>`);
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.have.class('cds--menu--border');
  });

  it('should not apply border class when border prop is false', async () => {
    const el = await fixture(html`<cds-menu></cds-menu>`);
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.not.have.class('cds--menu--border');
  });

  it('should apply background token class when backgroundToken is "background"', async () => {
    const el = await fixture(
      html`<cds-menu background-token="background"></cds-menu>`
    );
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.have.class('cds--menu--background-token__background');
  });

  it('should not apply background token class when backgroundToken is "layer"', async () => {
    const el = await fixture(
      html`<cds-menu background-token="layer"></cds-menu>`
    );
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.not.have.class('cds--menu--background-token__background');
  });

  describe('firstUpdated', () => {
    it('should set isRtl based on direction', async () => {
      const el = await fixture(html`<cds-menu direction="rtl"></cds-menu>`);
      await el.updateComplete;
      expect(el.isRtl).to.be.true;
    });

    it('should set isRoot from context', async () => {
      const el = await fixture(html`<cds-menu></cds-menu>`);
      await el.updateComplete;
      expect(el.isRoot).to.be.true;
    });

    it('should create a new context if isChild is true', async () => {
      const el = await fixture(html`<cds-menu isChild></cds-menu>`);
      await el.updateComplete;
      expect(el.context.isRoot).to.be.false;
    });
  });

  describe('positioning', () => {
    it('should adjust position when the menu cannot open to the bottom right', async () => {
      const nearMaxX = window.innerWidth - 10;
      const nearMaxY = window.innerHeight - 10;

      const el = await fixture(html`
        <cds-menu .x=${nearMaxX} .y=${nearMaxY} open>
          <cds-menu-item label="Item 1"></cds-menu-item>
        </cds-menu>
      `);

      await el.updateComplete;

      expect(el.position[0]).to.be.a('number');
      expect(el.position[1]).to.be.a('number');
      expect(el.position[0]).to.be.at.most(nearMaxX);
      expect(el.position[1]).to.be.at.most(nearMaxY);
    });
  });
});
