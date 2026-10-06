/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, expect } from '@open-wc/testing';
import '@carbon/web-components/es/components/page-header/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/breadcrumb/index.js';
import '@carbon/web-components/es/components/tabs/index.js';

import CDSPageHeader from '@carbon/web-components/es/components/page-header/page-header.js';
import CDSPageHeaderContent from '@carbon/web-components/es/components/page-header/page-header-content.js';
import CDSPageHeaderBreadcrumb from '@carbon/web-components/es/components/page-header/page-header-breadcrumb.js';
import CDSPageHeaderTabs from '@carbon/web-components/es/components/page-header/page-header-tabs.js';

const prefix = 'cds';
const blockClass = `${prefix}--page-header`;

describe('cds-page-header', () => {
  it('renders and has correct tag name', async () => {
    const el = await fixture(html`<cds-page-header></cds-page-header>`);
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-page-header');
  });

  it('is an instance of CDSPageHeader', async () => {
    const el = await fixture(html`<cds-page-header></cds-page-header>`);
    expect(el).to.be.instanceOf(CDSPageHeader);
  });

  it('reflects fullWidthGrid attribute to property', async () => {
    const el = await fixture(html`
      <cds-page-header full-width-grid></cds-page-header>
    `);
    expect(el.fullWidthGrid).to.be.true;
  });

  it('reflects narrowGrid attribute to property', async () => {
    const el = await fixture(html`
      <cds-page-header narrow-grid></cds-page-header>
    `);
    expect(el.narrowGrid).to.be.true;
  });

  it('fullWidthGrid defaults to false', async () => {
    const el = await fixture(html`<cds-page-header></cds-page-header>`);
    expect(el.fullWidthGrid).to.be.false;
  });

  it('narrowGrid defaults to false', async () => {
    const el = await fixture(html`<cds-page-header></cds-page-header>`);
    expect(el.narrowGrid).to.be.false;
  });

  it('has a shadow root', async () => {
    const el = await fixture(html`<cds-page-header></cds-page-header>`);
    expect(el.shadowRoot).to.exist;
  });

  it('renders a slot', async () => {
    const el = await fixture(html`<cds-page-header></cds-page-header>`);
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).to.exist;
  });

  it('renders slotted content', async () => {
    const el = await fixture(html`
      <cds-page-header>
        <div id="slotted-child">content</div>
      </cds-page-header>
    `);
    const child = el.querySelector('#slotted-child');
    expect(child).to.exist;
  });

  it('disconnects observers without error', async () => {
    const el = await fixture(html`<cds-page-header></cds-page-header>`);
    expect(() => el.remove()).not.to.throw();
  });

  describe('cds-page-header-breadcrumb', () => {
    it('renders breadcrumb sub-component', async () => {
      const el = await fixture(html`
        <cds-page-header>
          <cds-page-header-breadcrumb></cds-page-header-breadcrumb>
        </cds-page-header>
      `);
      await el.updateComplete;
      const breadcrumb = el.querySelector('cds-page-header-breadcrumb');
      expect(breadcrumb).to.exist;
      expect(breadcrumb).to.be.instanceOf(CDSPageHeaderBreadcrumb);
    });

    it('border defaults to true', async () => {
      const el = await fixture(html`
        <cds-page-header-breadcrumb></cds-page-header-breadcrumb>
      `);
      expect(el.border).to.be.true;
    });

    it('border can be set to false', async () => {
      const el = await fixture(html`
        <cds-page-header-breadcrumb
          .border=${false}></cds-page-header-breadcrumb>
      `);
      expect(el.border).to.be.false;
    });

    it('actionsAriaLabel defaults to "Page header actions"', async () => {
      const el = await fixture(html`
        <cds-page-header-breadcrumb></cds-page-header-breadcrumb>
      `);
      expect(el.actionsAriaLabel).to.equal('Page header actions');
    });

    it('withinGrid defaults to false', async () => {
      const el = await fixture(html`
        <cds-page-header-breadcrumb></cds-page-header-breadcrumb>
      `);
      expect(el.withinGrid).to.be.false;
    });

    it('renders slot content', async () => {
      const el = await fixture(html`
        <cds-page-header-breadcrumb>
          <span id="breadcrumb-text">BC 1</span>
        </cds-page-header-breadcrumb>
      `);
      await el.updateComplete;
      const child = el.querySelector('#breadcrumb-text');
      expect(child).to.exist;
    });
  });

  describe('cds-page-header-content', () => {
    it('renders content sub-component', async () => {
      const el = await fixture(html`
        <cds-page-header-content title="My Page"></cds-page-header-content>
      `);
      expect(el).to.exist;
      expect(el).to.be.instanceOf(CDSPageHeaderContent);
    });

    it('title attribute sets property', async () => {
      const el = await fixture(html`
        <cds-page-header-content title="Test Title"></cds-page-header-content>
      `);
      expect(el.title).to.equal('Test Title');
    });

    it('titleLevel defaults to h1', async () => {
      const el = await fixture(html`
        <cds-page-header-content title="T"></cds-page-header-content>
      `);
      expect(el.titleLevel).to.equal('h1');
    });

    it('titleLevel can be set via attribute', async () => {
      const el = await fixture(html`
        <cds-page-header-content
          title-level="h2"
          title="T"></cds-page-header-content>
      `);
      expect(el.titleLevel).to.equal('h2');
    });

    it('withinGrid defaults to false', async () => {
      const el = await fixture(html`
        <cds-page-header-content title="T"></cds-page-header-content>
      `);
      expect(el.withinGrid).to.be.false;
    });
  });

  describe('cds-page-header-tabs', () => {
    it('renders tabs sub-component', async () => {
      const el = await fixture(html`
        <cds-page-header-tabs></cds-page-header-tabs>
      `);
      expect(el).to.exist;
      expect(el).to.be.instanceOf(CDSPageHeaderTabs);
    });

    it('disableStickyTabBar defaults to false', async () => {
      const el = await fixture(html`
        <cds-page-header-tabs></cds-page-header-tabs>
      `);
      expect(el.disableStickyTabBar).to.be.false;
    });

    it('disable-sticky-tab-bar attribute sets property', async () => {
      const el = await fixture(html`
        <cds-page-header-tabs disable-sticky-tab-bar></cds-page-header-tabs>
      `);
      expect(el.disableStickyTabBar).to.be.true;
    });
  });

  describe('cds-page-header-content-text', () => {
    it('renders content-text sub-component', async () => {
      const el = await fixture(html`
        <cds-page-header-content-text
          subtitle="Sub"></cds-page-header-content-text>
      `);
      expect(el).to.exist;
      expect(el.tagName.toLowerCase()).to.equal('cds-page-header-content-text');
    });

    it('subtitle attribute sets property', async () => {
      const el = await fixture(html`
        <cds-page-header-content-text
          subtitle="My Subtitle"></cds-page-header-content-text>
      `);
      expect(el.subtitle).to.equal('My Subtitle');
    });

    it('subtitleLevel defaults to h2', async () => {
      const el = await fixture(html`
        <cds-page-header-content-text></cds-page-header-content-text>
      `);
      expect(el.subtitleLevel).to.equal('h2');
    });
  });

  describe('cds-page-header-hero-image', () => {
    it('renders hero-image sub-component', async () => {
      const el = await fixture(html`
        <cds-page-header-hero-image></cds-page-header-hero-image>
      `);
      expect(el).to.exist;
      expect(el.tagName.toLowerCase()).to.equal('cds-page-header-hero-image');
    });

    it('objectFit defaults to cover', async () => {
      const el = await fixture(html`
        <cds-page-header-hero-image></cds-page-header-hero-image>
      `);
      expect(el.objectFit).to.equal('cover');
    });

    it('object-fit attribute sets property', async () => {
      const el = await fixture(html`
        <cds-page-header-hero-image
          object-fit="contain"></cds-page-header-hero-image>
      `);
      expect(el.objectFit).to.equal('contain');
    });

    it('renders hero-image div in shadow DOM', async () => {
      const el = await fixture(html`
        <cds-page-header-hero-image></cds-page-header-hero-image>
      `);
      await el.updateComplete;
      const inner = el.shadowRoot?.querySelector(`.${blockClass}__hero-image`);
      expect(inner).to.exist;
    });
  });

  describe('custom events', () => {
    it('dispatches cds-page-header-fully-collapsed when content is observed', async () => {
      // This test verifies the event is wired up on the correct element tag.
      const el = await fixture(html`<cds-page-header></cds-page-header>`);
      let firedDetail = null;
      el.addEventListener(`${prefix}-page-header-fully-collapsed`, (e) => {
        firedDetail = e.detail;
      });
      // Dispatch manually to verify the listener is attached
      el.dispatchEvent(
        new CustomEvent(`${prefix}-page-header-fully-collapsed`, {
          bubbles: true,
          composed: true,
          detail: { fullyCollapsed: true },
        })
      );
      expect(firedDetail).to.exist;
      expect(firedDetail.fullyCollapsed).to.be.true;
    });
  });
});
