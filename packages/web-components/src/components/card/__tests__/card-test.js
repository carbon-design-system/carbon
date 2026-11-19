/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/card/index.js';
import '@carbon/web-components/es/components/ai-label/index.js';

// ─── cds-card ────────────────────────────────────────────────────────────────

describe('cds-card', function () {
  it('should render', async () => {
    const el = await fixture(html`
      <cds-card>
        <cds-card-header
          ><cds-card-title>Title</cds-card-title></cds-card-header
        >
      </cds-card>
    `);
    expect(el).to.exist;
  });

  describe('automated accessibility testing', () => {
    it('should have no Axe violations on a static card', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header>
            <cds-card-title>Static card</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      await expect(el).to.be.accessible();
    });

    it('should have no Axe violations on a clickable card with aria-label', async () => {
      const el = await fixture(html`
        <cds-card clickable aria-label="Clickable card">
          <cds-card-header>
            <cds-card-title>Clickable</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      await expect(el).to.be.accessible();
    });
  });

  describe('density', () => {
    it('should default to productive density', async () => {
      const el = await fixture(html`<cds-card></cds-card>`);
      expect(el.getAttribute('density')).to.equal('productive');
    });

    it('should reflect expressive density as attribute', async () => {
      const el = await fixture(
        html`<cds-card density="expressive"></cds-card>`
      );
      expect(el.getAttribute('density')).to.equal('expressive');
    });
  });

  describe('card state on child elements', () => {
    // Children mirror the card state onto their own host so their styles do not
    // rely on `:host-context()`, which Firefox and Safari do not support.
    it('should reflect density on the title and follow density changes', async () => {
      const el = await fixture(html`
        <cds-card density="expressive">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const title = el.querySelector('cds-card-title');
      await title.updateComplete;
      expect(title.getAttribute('data-card-density')).to.equal('expressive');

      el.density = 'productive';
      await el.updateComplete;
      await title.updateComplete;
      expect(title.getAttribute('data-card-density')).to.equal('productive');
    });

    it('should size the title text from the card density', async () => {
      const el = await fixture(html`
        <cds-card density="expressive">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const title = el.querySelector('cds-card-title');
      await title.updateComplete;
      const row = title.shadowRoot.querySelector('.cds--card__title-text-row');
      const expressive = getComputedStyle(row).fontSize;

      el.density = 'productive';
      await el.updateComplete;
      await title.updateComplete;
      expect(getComputedStyle(row).fontSize).to.not.equal(expressive);
    });

    it('should reflect disabled on the title, body and footer', async () => {
      const el = await fixture(html`
        <cds-card disabled>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
          <cds-card-body>Body</cds-card-body>
          <cds-card-footer>Footer</cds-card-footer>
        </cds-card>
      `);
      const children = ['cds-card-title', 'cds-card-body', 'cds-card-footer'];
      for (const selector of children) {
        const child = el.querySelector(selector);
        await child.updateComplete;
        expect(child.hasAttribute('data-card-disabled'), selector).to.be.true;
      }

      el.disabled = false;
      await el.updateComplete;
      for (const selector of children) {
        const child = el.querySelector(selector);
        await child.updateComplete;
        expect(child.hasAttribute('data-card-disabled'), selector).to.be.false;
      }
    });

    it('should reflect horizontal on the body and footer and push the footer to the bottom', async () => {
      const el = await fixture(html`
        <cds-card horizontal>
          <cds-card-media media-width="100px">
            <div style="block-size: 300px"></div>
          </cds-card-media>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
          <cds-card-body>Body</cds-card-body>
          <cds-card-footer>Footer</cds-card-footer>
        </cds-card>
      `);
      const body = el.querySelector('cds-card-body');
      const footer = el.querySelector('cds-card-footer');
      await body.updateComplete;
      await footer.updateComplete;
      expect(body.hasAttribute('data-card-horizontal')).to.be.true;
      expect(footer.hasAttribute('data-card-horizontal')).to.be.true;

      const card = el.shadowRoot.querySelector('.cds--card');
      expect(footer.getBoundingClientRect().bottom).to.be.closeTo(
        card.getBoundingClientRect().bottom,
        1
      );
    });
  });

  describe('clickable', () => {
    it('should render with role="button" when clickable without href', async () => {
      const el = await fixture(html`
        <cds-card clickable aria-label="Clickable card">
          <cds-card-header>
            <cds-card-title>Clickable</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const inner = el.shadowRoot.querySelector('[role="button"]');
      expect(inner).to.exist;
    });

    it('should not have role="button" on a non-clickable card', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header>
            <cds-card-title>Static</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const inner = el.shadowRoot.querySelector('[role="button"]');
      expect(inner).to.be.null;
    });

    it('should render as <a> when href is set', async () => {
      const el = await fixture(html`
        <cds-card clickable href="/somewhere" aria-label="Link card">
          <cds-card-header>
            <cds-card-title>Link</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const anchor = el.shadowRoot.querySelector('a');
      expect(anchor).to.exist;
      expect(anchor.getAttribute('href')).to.equal('/somewhere');
    });

    it('should name the button from aria-label on the host', async () => {
      const el = await fixture(html`
        <cds-card clickable aria-label="View report">
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const btn = el.shadowRoot.querySelector('[role="button"]');
      expect(btn.getAttribute('aria-label')).to.equal('View report');
    });

    it('should name the button from aria-labelledby on the host', async () => {
      const el = await fixture(html`
        <div>
          <h2 id="report-name">Usage report</h2>
          <cds-card clickable aria-labelledby="report-name">
            <cds-card-header>
              <cds-card-title>T</cds-card-title>
            </cds-card-header>
          </cds-card>
        </div>
      `);
      const btn = el
        .querySelector('cds-card')
        .shadowRoot.querySelector('[role="button"]');
      expect(btn.getAttribute('aria-label')).to.equal('Usage report');
    });

    it('should name the anchor from aria-label on the host', async () => {
      const el = await fixture(html`
        <cds-card clickable href="/somewhere" aria-label="Open the docs">
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const anchor = el.shadowRoot.querySelector('a');
      expect(anchor.getAttribute('aria-label')).to.equal('Open the docs');
    });

    it('should not set aria-label on the anchor when the host has no name', async () => {
      const el = await fixture(html`
        <cds-card clickable href="/somewhere">
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const anchor = el.shadowRoot.querySelector('a');
      expect(anchor.hasAttribute('aria-label')).to.be.false;
    });

    it('should update the button name when aria-label changes', async () => {
      const el = await fixture(html`
        <cds-card clickable aria-label="Before">
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      el.setAttribute('aria-label', 'After');
      await el.updateComplete;
      expect(
        el.shadowRoot
          .querySelector('[role="button"]')
          .getAttribute('aria-label')
      ).to.equal('After');
    });

    it('should have tabindex="0" when clickable and not disabled', async () => {
      const el = await fixture(html`
        <cds-card clickable aria-label="Clickable">
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const btn = el.shadowRoot.querySelector('[role="button"]');
      expect(btn.getAttribute('tabindex')).to.equal('0');
    });

    it('should have tabindex="-1" when clickable and disabled', async () => {
      const el = await fixture(html`
        <cds-card clickable disabled aria-label="Disabled clickable">
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const btn = el.shadowRoot.querySelector('[role="button"]');
      expect(btn.getAttribute('tabindex')).to.equal('-1');
    });

    it('should set aria-disabled when disabled', async () => {
      const el = await fixture(html`
        <cds-card clickable disabled aria-label="Disabled">
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const btn = el.shadowRoot.querySelector('[role="button"]');
      expect(btn.getAttribute('aria-disabled')).to.equal('true');
    });

    it('should fire click on Enter keydown', async () => {
      const el = await fixture(html`
        <cds-card clickable aria-label="Keyboard card">
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const btn = el.shadowRoot.querySelector('[role="button"]');
      const clickPromise = oneEvent(btn, 'click');
      btn.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      );
      const event = await clickPromise;
      expect(event).to.exist;
    });

    it('should show a focus ring on the focused wrapper of a clickable card', async () => {
      const el = await fixture(html`
        <cds-card clickable aria-label="Focusable">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const btn = el.shadowRoot.querySelector('[role="button"]');
      btn.focus();
      const { outlineStyle, outlineWidth, outlineOffset } =
        getComputedStyle(btn);
      expect(outlineStyle).to.equal('solid');
      expect(outlineWidth).to.equal('2px');
      expect(outlineOffset).to.equal('0px');
    });

    it('should show a focus ring on the focused wrapper of a link card', async () => {
      const el = await fixture(html`
        <cds-card clickable href="#" aria-label="Focusable link">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const link = el.shadowRoot.querySelector('a[part="link"]');
      link.focus();
      expect(getComputedStyle(link).outlineStyle).to.equal('solid');
      expect(getComputedStyle(link).outlineWidth).to.equal('2px');
    });

    it('should render the link wrapper as a block box so its focus ring paints around the card', async () => {
      const el = await fixture(html`
        <cds-card clickable href="#" aria-label="Focusable link">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const link = el.shadowRoot.querySelector('a[part="link"]');
      const card = link.querySelector('.cds--card');
      expect(getComputedStyle(link).display).to.equal('block');
      const linkRect = link.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      expect(linkRect.width).to.equal(cardRect.width);
      expect(linkRect.height).to.equal(cardRect.height);
    });
  });

  describe('disabled', () => {
    it('should apply --disabled modifier class', async () => {
      const el = await fixture(html`
        <cds-card clickable disabled aria-label="Disabled card">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const div = el.shadowRoot.querySelector('.cds--card');
      expect(div.classList.contains('cds--card--disabled')).to.be.true;
    });

    it('should set aria-disabled on a static disabled card', async () => {
      const el = await fixture(html`
        <cds-card disabled>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const wrapper = el.shadowRoot.querySelector('.cds--card').parentElement;
      expect(wrapper.getAttribute('aria-disabled')).to.equal('true');
    });

    it('should render a disabled static card as a group named by aria-label', async () => {
      const el = await fixture(html`
        <cds-card disabled aria-label="Disabled card">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const wrapper = el.shadowRoot.querySelector('.cds--card').parentElement;
      expect(wrapper.getAttribute('role')).to.equal('group');
      expect(wrapper.getAttribute('aria-disabled')).to.equal('true');
      expect(wrapper.getAttribute('aria-label')).to.equal('Disabled card');
    });

    it('should render a disabled link card as a named group without an anchor', async () => {
      const el = await fixture(html`
        <cds-card href="/somewhere" disabled aria-label="Disabled link card">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      expect(el.shadowRoot.querySelector('a')).to.not.exist;
      const wrapper = el.shadowRoot.querySelector('.cds--card').parentElement;
      expect(wrapper.getAttribute('role')).to.equal('group');
      expect(wrapper.getAttribute('aria-disabled')).to.equal('true');
      expect(wrapper.getAttribute('aria-label')).to.equal('Disabled link card');
    });

    it('should render a disabled clickable link card as a group, not a button', async () => {
      const el = await fixture(html`
        <cds-card
          clickable
          href="/somewhere"
          disabled
          aria-label="Disabled link card">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      expect(el.shadowRoot.querySelector('a')).to.not.exist;
      expect(el.shadowRoot.querySelector('[role="button"]')).to.not.exist;
      expect(el.shadowRoot.querySelector('[role="group"]')).to.exist;
    });

    it('should name a disabled static card from aria-labelledby', async () => {
      const el = await fixture(html`
        <div>
          <h2 id="disabled-title">Disabled title</h2>
          <cds-card disabled aria-labelledby="disabled-title">
            <cds-card-header>
              <cds-card-title>T</cds-card-title>
            </cds-card-header>
          </cds-card>
        </div>
      `);
      const card = el.querySelector('cds-card');
      const wrapper = card.shadowRoot.querySelector('.cds--card').parentElement;
      expect(wrapper.getAttribute('aria-label')).to.equal('Disabled title');
    });

    it('should not set a role on an enabled static card', async () => {
      const el = await fixture(html`
        <cds-card aria-label="Enabled card">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const wrapper = el.shadowRoot.querySelector('.cds--card').parentElement;
      expect(wrapper.hasAttribute('role')).to.be.false;
      expect(wrapper.hasAttribute('aria-label')).to.be.false;
    });

    it('should not set role="group" on a disabled clickable card', async () => {
      const el = await fixture(html`
        <cds-card clickable disabled aria-label="Disabled card">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      expect(el.shadowRoot.querySelector('[role="group"]')).to.not.exist;
      expect(el.shadowRoot.querySelector('[role="button"]')).to.exist;
    });

    it('should not set aria-disabled on a static enabled card', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const wrapper = el.shadowRoot.querySelector('.cds--card').parentElement;
      expect(wrapper.hasAttribute('aria-disabled')).to.be.false;
    });

    it('should render the error icon instead of the footer-icon slot when a clickable card is disabled', async () => {
      const el = await fixture(html`
        <cds-card clickable disabled aria-label="Disabled">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
          <span slot="footer-icon">custom</span>
        </cds-card>
      `);
      const footer = el.shadowRoot.querySelector(
        '.cds--card__clickable-footer'
      );
      expect(footer.querySelector('slot[name="footer-icon"]')).to.not.exist;
      expect(footer.querySelector('svg')).to.exist;
    });

    it('should keep the footer-icon slot on an enabled clickable card', async () => {
      const el = await fixture(html`
        <cds-card clickable aria-label="Enabled">
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
          <span slot="footer-icon">custom</span>
        </cds-card>
      `);
      const footer = el.shadowRoot.querySelector(
        '.cds--card__clickable-footer'
      );
      expect(footer.querySelector('slot[name="footer-icon"]')).to.exist;
    });
  });

  describe('AI label detection', () => {
    it('should set has-ai-label attribute when cds-ai-label is in the header decorator slot', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
            <cds-ai-label slot="decorator"></cds-ai-label>
          </cds-card-header>
        </cds-card>
      `);
      await el.updateComplete;
      expect(el.hasAttribute('has-ai-label')).to.be.true;
    });

    it('should not activate a clickable card from Enter, Space or a click on the AI label', async () => {
      const el = await fixture(html`
        <cds-card clickable aria-label="AI card">
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
            <cds-ai-label slot="decorator"></cds-ai-label>
          </cds-card-header>
        </cds-card>
      `);
      await el.updateComplete;
      let clicks = 0;
      el.addEventListener('click', () => clicks++);
      const label = el.querySelector('cds-ai-label');
      for (const key of ['Enter', ' ']) {
        label.dispatchEvent(
          new KeyboardEvent('keydown', { key, bubbles: true, composed: true })
        );
      }
      label.dispatchEvent(
        new MouseEvent('click', { bubbles: true, composed: true })
      );
      // Only the label's own click may reach this listener; the card must not
      // have turned the key presses into extra clicks.
      expect(clicks).to.equal(0);

      el.shadowRoot.querySelector('[role="button"]').dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          composed: true,
        })
      );
      expect(clicks).to.equal(1);
    });

    it('should not set has-ai-label when decorator slot is empty', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      await el.updateComplete;
      expect(el.hasAttribute('has-ai-label')).to.be.false;
    });

    it('should position the AI label from the header when media sits above it', async () => {
      const el = await fixture(html`
        <cds-card style="width: 320px">
          <cds-card-media ratio="16x9">
            <div style="height: 100%"></div>
          </cds-card-media>
          <cds-card-header id="hdr">
            <cds-card-title>T</cds-card-title>
            <cds-ai-label slot="decorator"></cds-ai-label>
          </cds-card-header>
        </cds-card>
      `);
      const header = el.querySelector('#hdr');
      await el.updateComplete;
      await header.updateComplete;

      const media = el.querySelector('cds-card-media').getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();
      const label = el.querySelector('cds-ai-label').getBoundingClientRect();

      expect(headerRect.top).to.be.at.least(media.bottom);
      // The label is $spacing-03 (8px) inside the header, not over the media.
      expect(label.top - headerRect.top).to.be.within(0, 16);
      expect(label.top).to.be.at.least(media.bottom);
    });

    it('should clear has-ai-label when the header that holds the label is removed', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header id="hdr">
            <cds-card-title>T</cds-card-title>
            <cds-ai-label slot="decorator"></cds-ai-label>
          </cds-card-header>
        </cds-card>
      `);
      await el.updateComplete;
      expect(el.hasAttribute('has-ai-label')).to.be.true;

      el.querySelector('#hdr').remove();
      await oneEvent(el.shadowRoot.querySelector('slot'), 'slotchange');
      await el.updateComplete;

      expect(el.hasAttribute('has-ai-label')).to.be.false;
    });
  });
});

// ─── cds-card-header ─────────────────────────────────────────────────────────

describe('cds-card-header', function () {
  it('should render children in the header container', async () => {
    const el = await fixture(html`
      <cds-card>
        <cds-card-header>
          <cds-card-title>My title</cds-card-title>
        </cds-card-header>
      </cds-card>
    `);
    const header = el.querySelector('cds-card-header');
    expect(header).to.exist;
    const title = header.querySelector('cds-card-title');
    expect(title.textContent.trim()).to.equal('My title');
  });

  describe('header-media and actions slots', () => {
    const getHeaderDiv = (header) =>
      header.shadowRoot.querySelector('.cds--card__header');

    it('should lay out title and actions in a single row without header-media', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header id="hdr">
            <cds-card-title>T</cds-card-title>
            <cds-card-actions slot="actions">
              <cds-card-action label="Edit"></cds-card-action>
            </cds-card-actions>
          </cds-card-header>
        </cds-card>
      `);
      const header = el.querySelector('#hdr');
      await header.updateComplete;
      await header.updateComplete;
      const root = header.shadowRoot;
      expect(root.querySelector('.cds--card__header-top-row')).to.not.exist;
      expect(root.querySelector('.cds--card__actions-slot')).to.exist;
      expect(getHeaderDiv(header).hasAttribute('data-has-actions')).to.be.true;
    });

    it('should render header-media and actions in a top row above the title', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header id="hdr">
            <span slot="header-media" id="icon">★</span>
            <cds-card-title>T</cds-card-title>
            <cds-card-actions slot="actions">
              <cds-card-action label="Edit"></cds-card-action>
            </cds-card-actions>
          </cds-card-header>
        </cds-card>
      `);
      const header = el.querySelector('#hdr');
      await header.updateComplete;
      await header.updateComplete;
      const topRow = header.shadowRoot.querySelector(
        '.cds--card__header-top-row'
      );
      expect(topRow).to.exist;
      expect(topRow.querySelector('.cds--card__header-media')).to.exist;
      expect(topRow.querySelector('.cds--card__actions-slot')).to.exist;
    });

    it('should not render wrappers when the slots are empty', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header id="hdr">
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const header = el.querySelector('#hdr');
      await header.updateComplete;
      const root = header.shadowRoot;
      expect(root.querySelector('.cds--card__header-top-row')).to.not.exist;
      expect(root.querySelector('.cds--card__header-media')).to.not.exist;
      expect(root.querySelector('.cds--card__actions-slot')).to.not.exist;
      expect(getHeaderDiv(header).hasAttribute('data-has-actions')).to.be.false;
    });
  });

  describe('data-has-ai-label propagation', () => {
    const getHeaderDiv = (card) =>
      card
        .querySelector('cds-card-header')
        .shadowRoot.querySelector('.cds--card__header');

    it('should set data-has-ai-label when the card has an AI label', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
            <cds-ai-label slot="decorator"></cds-ai-label>
          </cds-card-header>
        </cds-card>
      `);
      const header = el.querySelector('cds-card-header');
      await el.updateComplete;
      await header.updateComplete;
      expect(getHeaderDiv(el).hasAttribute('data-has-ai-label')).to.be.true;
    });

    it('should not set data-has-ai-label when the card has no AI label', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      const header = el.querySelector('cds-card-header');
      await el.updateComplete;
      await header.updateComplete;
      expect(getHeaderDiv(el).hasAttribute('data-has-ai-label')).to.be.false;
    });

    it('should remove data-has-ai-label when the AI label is removed', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header>
            <cds-card-title>T</cds-card-title>
            <cds-ai-label slot="decorator"></cds-ai-label>
          </cds-card-header>
        </cds-card>
      `);
      const header = el.querySelector('cds-card-header');
      await el.updateComplete;
      await header.updateComplete;
      expect(getHeaderDiv(el).hasAttribute('data-has-ai-label')).to.be.true;

      el.querySelector('cds-ai-label').remove();
      await oneEvent(
        header.shadowRoot.querySelector('slot[name="decorator"]'),
        'slotchange'
      );
      await el.updateComplete;
      await header.updateComplete;

      expect(el.hasAttribute('has-ai-label')).to.be.false;
      expect(getHeaderDiv(el).hasAttribute('data-has-ai-label')).to.be.false;
    });

    it('should reserve decorator clearance on the actions slot only while an AI label is present', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header id="hdr">
            <cds-card-title>T</cds-card-title>
            <cds-card-actions slot="actions">
              <cds-card-action label="Edit"></cds-card-action>
            </cds-card-actions>
          </cds-card-header>
        </cds-card>
      `);
      const header = el.querySelector('#hdr');
      await el.updateComplete;
      await header.updateComplete;
      await header.updateComplete;
      const getSlot = () =>
        header.shadowRoot.querySelector('.cds--card__actions-slot');
      const without = parseFloat(getComputedStyle(getSlot()).paddingInlineEnd);

      const aiLabel = document.createElement('cds-ai-label');
      aiLabel.slot = 'decorator';
      header.append(aiLabel);
      await oneEvent(
        header.shadowRoot.querySelector('slot[name="decorator"]'),
        'slotchange'
      );
      await el.updateComplete;
      await header.updateComplete;
      const withLabel = parseFloat(
        getComputedStyle(getSlot()).paddingInlineEnd
      );

      el.querySelector('cds-ai-label').remove();
      await oneEvent(
        header.shadowRoot.querySelector('slot[name="decorator"]'),
        'slotchange'
      );
      await el.updateComplete;
      await header.updateComplete;
      const reset = parseFloat(getComputedStyle(getSlot()).paddingInlineEnd);

      expect(withLabel).to.be.greaterThan(without);
      expect(reset).to.equal(without);
    });

    it('should keep a $spacing-03 (8px) gap between the last action and the AI label', async () => {
      const el = await fixture(html`
        <div style="width: 400px">
          <cds-card>
            <cds-card-header id="hdr">
              <cds-ai-label slot="decorator"></cds-ai-label>
              <cds-card-title>T</cds-card-title>
              <cds-card-actions slot="actions">
                <cds-card-action label="Edit">
                  <cds-icon-button kind="ghost" size="sm"
                    >E<span slot="tooltip-content">Edit</span></cds-icon-button
                  >
                </cds-card-action>
                <cds-card-action label="Delete">
                  <cds-icon-button kind="ghost" size="sm"
                    >D<span slot="tooltip-content"
                      >Delete</span
                    ></cds-icon-button
                  >
                </cds-card-action>
              </cds-card-actions>
            </cds-card-header>
          </cds-card>
        </div>
      `);
      const card = el.querySelector('cds-card');
      const header = el.querySelector('#hdr');
      await card.updateComplete;
      await header.updateComplete;
      await new Promise((r) => setTimeout(r, 300));

      const actions = el.querySelectorAll('cds-card-action');
      const lastAction = actions[actions.length - 1].getBoundingClientRect();
      const aiLabel = el.querySelector('cds-ai-label').getBoundingClientRect();
      expect(aiLabel.width).to.be.greaterThan(0);
      expect(aiLabel.left - lastAction.right).to.be.closeTo(8, 1);
    });
  });

  it('should stop click propagation from decorator slot', async () => {
    let cardClicked = false;
    const el = await fixture(html`
      <cds-card
        clickable
        aria-label="Card"
        @click=${() => {
          cardClicked = true;
        }}>
        <cds-card-header>
          <cds-card-title>T</cds-card-title>
          <span slot="decorator" id="dec">decorator</span>
        </cds-card-header>
      </cds-card>
    `);
    const header = el.querySelector('cds-card-header');
    const decoratorWrapper = header.shadowRoot.querySelector(
      '.cds--card__decorator'
    );
    decoratorWrapper.click();
    await el.updateComplete;
    expect(cardClicked).to.be.false;
  });
});

// ─── cds-card-body ───────────────────────────────────────────────────────────

describe('cds-card-body', function () {
  it('should render default slot content', async () => {
    const el = await fixture(html`
      <cds-card-body><p>Content</p></cds-card-body>
    `);
    expect(el.querySelector('p').textContent).to.equal('Content');
  });

  it('should add flush modifier class when is-flush is set', async () => {
    const el = await fixture(html`<cds-card-body is-flush></cds-card-body>`);
    const div = el.shadowRoot.querySelector('.cds--card__body');
    expect(div.classList.contains('cds--card__body--flush')).to.be.true;
  });

  it('should not have flush modifier class by default', async () => {
    const el = await fixture(html`<cds-card-body></cds-card-body>`);
    const div = el.shadowRoot.querySelector('.cds--card__body');
    expect(div.classList.contains('cds--card__body--flush')).to.be.false;
  });
});

// ─── cds-card-footer ─────────────────────────────────────────────────────────

describe('cds-card-footer', function () {
  describe('has-actions reflection (rule 17)', () => {
    it('should set has-actions when cds-card-action elements are slotted', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
          <cds-card-footer id="ftr">
            <cds-card-action label="Edit"></cds-card-action>
          </cds-card-footer>
        </cds-card>
      `);
      const footer = el.querySelector('#ftr');
      await footer.updateComplete;
      expect(footer.hasAttribute('has-actions')).to.be.true;
    });

    it('should not set has-actions when no cds-card-action is slotted', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
          <cds-card-footer id="ftr"><span>Plain content</span></cds-card-footer>
        </cds-card>
      `);
      const footer = el.querySelector('#ftr');
      await footer.updateComplete;
      expect(footer.hasAttribute('has-actions')).to.be.false;
    });
  });

  it('should render slot content when not inside a clickable card', async () => {
    const el = await fixture(html`
      <cds-card>
        <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        <cds-card-footer><span id="fc">Footer content</span></cds-card-footer>
      </cds-card>
    `);
    const footer = el.querySelector('cds-card-footer');
    await footer.updateComplete;
    const div = footer.shadowRoot.querySelector('.cds--card__footer');
    expect(div).to.exist;
  });

  it('should render nothing when inside a clickable card', async () => {
    const el = await fixture(html`
      <cds-card clickable aria-label="Clickable">
        <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        <cds-card-footer>Footer</cds-card-footer>
      </cds-card>
    `);
    const footer = el.querySelector('cds-card-footer');
    await footer.updateComplete;
    const div = footer.shadowRoot.querySelector('.cds--card__footer');
    expect(div).to.be.null;
  });
});

// ─── cds-card-title ──────────────────────────────────────────────────────────

describe('cds-card-title', function () {
  it('should render title text', async () => {
    const el = await fixture(html`
      <cds-card-title>My card title</cds-card-title>
    `);
    expect(el.textContent.trim()).to.equal('My card title');
  });

  it('should render label attribute as fallback content', async () => {
    const el = await fixture(html`
      <cds-card-title label="My label">Title</cds-card-title>
    `);
    await el.updateComplete;
    const labelDiv = el.shadowRoot.querySelector('.cds--card__label');
    expect(labelDiv.textContent.trim()).to.equal('My label');
  });

  it('should render description attribute as fallback content', async () => {
    const el = await fixture(html`
      <cds-card-title description="My description">Title</cds-card-title>
    `);
    await el.updateComplete;
    const descDiv = el.shadowRoot.querySelector('.cds--card__description');
    expect(descDiv.textContent.trim()).to.equal('My description');
  });

  it('should set --cds--card--title-max-width CSS custom property when title-truncate is set', async () => {
    const el = await fixture(html`
      <cds-card-title title-truncate max-width="80%">Title</cds-card-title>
    `);
    await el.updateComplete;
    const row = el.shadowRoot.querySelector('.cds--card__title-text-row');
    expect(row.style.getPropertyValue('--cds--card--title-max-width')).to.equal(
      '80%'
    );
  });

  it('should set --cds--card--title-line-clamp when title-truncate is a number', async () => {
    const el = await fixture(html`
      <cds-card-title title-truncate="3">Title</cds-card-title>
    `);
    await el.updateComplete;
    const row = el.shadowRoot.querySelector('.cds--card__title-text-row');
    expect(
      row.style.getPropertyValue('--cds--card--title-line-clamp')
    ).to.equal('3');
  });

  it('should render title-start slot', async () => {
    const el = await fixture(html`
      <cds-card-title>
        <span slot="title-start" id="start-icon">★</span>
        Title
      </cds-card-title>
    `);
    const icon = el.querySelector('#start-icon');
    expect(icon).to.exist;
  });

  it('should render title-end slot', async () => {
    const el = await fixture(html`
      <cds-card-title>
        Title
        <span slot="title-end" id="end-icon">→</span>
      </cds-card-title>
    `);
    const icon = el.querySelector('#end-icon');
    expect(icon).to.exist;
  });

  it('should not leave whitespace between the title text and the title-end wrapper', async () => {
    const el = await fixture(html`
      <cds-card-title>
        Title
        <span slot="title-end">→</span>
      </cds-card-title>
    `);
    const end = el.shadowRoot.querySelector('.cds--card__title-end-icon');
    // Lit's marker comments are harmless; a whitespace text node between the
    // default slot and the wrapper renders as a space and pushes the icon away
    // from the title.
    let previous = end.previousSibling;
    while (previous?.nodeType === Node.COMMENT_NODE) {
      previous = previous.previousSibling;
    }
    expect(previous.nodeType).to.equal(Node.ELEMENT_NODE);
    expect(previous.localName).to.equal('slot');
  });

  it('should render the title text in an h2 heading by default', async () => {
    const el = await fixture(html`<cds-card-title>Title</cds-card-title>`);
    const heading = el.shadowRoot.querySelector('.cds--card__title-text-row');
    expect(heading.localName).to.equal('h2');
  });

  it('should render the title text in the heading level set by title-level', async () => {
    const el = await fixture(html`
      <cds-card-title title-level="h4">Title</cds-card-title>
    `);
    const heading = el.shadowRoot.querySelector('.cds--card__title-text-row');
    expect(heading.localName).to.equal('h4');
    expect(heading.classList.contains('cds--card__title-text-row')).to.be.true;
  });

  it('should update the heading when title-level changes', async () => {
    const el = await fixture(html`
      <cds-card-title title-level="h3">Title</cds-card-title>
    `);
    el.setAttribute('title-level', 'h5');
    await el.updateComplete;
    expect(
      el.shadowRoot.querySelector('.cds--card__title-text-row').localName
    ).to.equal('h5');
  });

  it('should fall back to an h2 for an invalid title-level', async () => {
    const el = await fixture(html`
      <cds-card-title title-level="div">Title</cds-card-title>
    `);
    expect(
      el.shadowRoot.querySelector('.cds--card__title-text-row').localName
    ).to.equal('h2');
  });

  it('should not include the label or description in the heading', async () => {
    const el = await fixture(html`
      <cds-card-title label="Category" description="A description">
        My Title
      </cds-card-title>
    `);
    const heading = el.shadowRoot.querySelector('.cds--card__title-text-row');
    expect(heading.textContent).to.not.contain('Category');
    expect(heading.textContent).to.not.contain('A description');
  });

  it('should remove the user-agent margins of the heading', async () => {
    const el = await fixture(html`<cds-card-title>Title</cds-card-title>`);
    const heading = el.shadowRoot.querySelector('.cds--card__title-text-row');
    const { marginBlockStart, marginBlockEnd } = getComputedStyle(heading);
    expect(marginBlockStart).to.equal('0px');
    expect(marginBlockEnd).to.equal('0px');
  });
  it('should hide the heading from assistive technology when the title has no text', async () => {
    const el = await fixture(html`<cds-card-title></cds-card-title>`);
    const heading = el.shadowRoot.querySelector('.cds--card__title-text-row');
    expect(heading.getAttribute('aria-hidden')).to.equal('true');
  });

  it('should expose the heading once the title has text', async () => {
    const el = await fixture(html`<cds-card-title>Title</cds-card-title>`);
    await el.updateComplete;
    const heading = el.shadowRoot.querySelector('.cds--card__title-text-row');
    expect(heading.hasAttribute('aria-hidden')).to.be.false;
  });

  it('should expose the heading again when text is added to an empty title', async () => {
    const el = await fixture(html`<cds-card-title></cds-card-title>`);
    el.textContent = 'Added later';
    await new Promise((resolve) => setTimeout(resolve));
    await el.updateComplete;
    const heading = el.shadowRoot.querySelector('.cds--card__title-text-row');
    expect(heading.hasAttribute('aria-hidden')).to.be.false;
  });

  it('should have no Axe violations for an empty title', async () => {
    const el = await fixture(html`
      <cds-card>
        <cds-card-header><cds-card-title></cds-card-title></cds-card-header>
      </cds-card>
    `);
    await expect(el).to.be.accessible();
  });

  it('should have no Axe violations for a title-level that follows the page hierarchy', async () => {
    const el = await fixture(html`
      <main>
        <h1>Page</h1>
        <h2>Section</h2>
        <cds-card>
          <cds-card-header>
            <cds-card-title title-level="h3">Card</cds-card-title>
          </cds-card-header>
        </cds-card>
      </main>
    `);
    await expect(el).to.be.accessible();
  });

  it('should not render title-start/title-end wrappers when the slots are empty', async () => {
    const el = await fixture(html`<cds-card-title>Title</cds-card-title>`);
    expect(el.shadowRoot.querySelector('.cds--card__title-start-icon')).to.not
      .exist;
    expect(el.shadowRoot.querySelector('.cds--card__title-end-icon')).to.not
      .exist;
  });

  it('should render title-start/title-end wrappers once the slots are populated', async () => {
    const el = await fixture(html`
      <cds-card-title>
        <span slot="title-start">★</span>
        Title
        <span slot="title-end">→</span>
      </cds-card-title>
    `);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.cds--card__title-start-icon')).to
      .exist;
    expect(el.shadowRoot.querySelector('.cds--card__title-end-icon')).to.exist;
  });

  it('should render title-media slot and wrap text in __title-text', async () => {
    const el = await fixture(html`
      <cds-card-title>
        <span slot="title-media" id="media">★</span>
        Title
      </cds-card-title>
    `);
    await el.updateComplete;
    await el.updateComplete;
    const root = el.shadowRoot;
    expect(el.querySelector('#media')).to.exist;
    expect(root.querySelector('.cds--card__title--has-media')).to.exist;
    expect(root.querySelector('.cds--card__title-media')).to.exist;
    expect(root.querySelector('.cds--card__title-text')).to.exist;
  });

  it('should not render title-media wrapper when the slot is empty', async () => {
    const el = await fixture(html`<cds-card-title>Title</cds-card-title>`);
    await el.updateComplete;
    const root = el.shadowRoot;
    expect(root.querySelector('.cds--card__title--has-media')).to.not.exist;
    expect(root.querySelector('.cds--card__title-media')).to.not.exist;
    expect(root.querySelector('.cds--card__title-text')).to.exist;
  });
});

// ─── cds-card-media ──────────────────────────────────────────────────────────

describe('cds-card-media', function () {
  it('should apply aspect-ratio class in vertical mode', async () => {
    const el = await fixture(html`
      <cds-card-media ratio="16x9"></cds-card-media>
    `);
    await el.updateComplete;
    const div = el.shadowRoot.querySelector('div');
    expect(div.classList.contains('cds--aspect-ratio--16x9')).to.be.true;
  });

  it('should default to a 1x1 ratio in vertical mode, like the React card media', async () => {
    const el = await fixture(html`<cds-card-media></cds-card-media>`);
    await el.updateComplete;
    const div = el.shadowRoot.querySelector('div');
    expect(el.ratio).to.equal('1x1');
    expect(div.classList.contains('cds--aspect-ratio')).to.be.true;
    expect(div.classList.contains('cds--aspect-ratio--1x1')).to.be.true;
  });

  it('should apply horizontal media class when inside a horizontal card', async () => {
    const el = await fixture(html`
      <cds-card horizontal>
        <cds-card-media ratio="16x9" id="media"></cds-card-media>
      </cds-card>
    `);
    const media = el.querySelector('#media');
    await media.updateComplete;
    const div = media.shadowRoot.querySelector('div');
    expect(div.classList.contains('cds--card__media--horizontal')).to.be.true;
  });

  it('should forward the default media width to the host in a horizontal card', async () => {
    const el = await fixture(html`
      <cds-card horizontal>
        <cds-card-media id="media"></cds-card-media>
      </cds-card>
    `);
    const media = el.querySelector('#media');
    await media.updateComplete;
    expect(media.getAttribute('slot')).to.equal('media');
    expect(media.style.getPropertyValue('--cds--card--media-width')).to.equal(
      '33.33%'
    );
  });

  it('should forward a custom media-width to the host in a horizontal card', async () => {
    const el = await fixture(html`
      <cds-card horizontal>
        <cds-card-media id="media" media-width="50%"></cds-card-media>
      </cds-card>
    `);
    const media = el.querySelector('#media');
    await media.updateComplete;
    expect(media.style.getPropertyValue('--cds--card--media-width')).to.equal(
      '50%'
    );
  });

  it('should update the host media width when media-width changes', async () => {
    const el = await fixture(html`
      <cds-card horizontal>
        <cds-card-media id="media" media-width="50%"></cds-card-media>
      </cds-card>
    `);
    const media = el.querySelector('#media');
    await media.updateComplete;
    media.setAttribute('media-width', '200px');
    await media.updateComplete;
    expect(media.style.getPropertyValue('--cds--card--media-width')).to.equal(
      '200px'
    );
  });

  it('should size the host from the media width in a horizontal card', async () => {
    const el = await fixture(html`
      <cds-card horizontal style="width: 600px">
        <cds-card-media id="media" media-width="50%"></cds-card-media>
      </cds-card>
    `);
    const media = el.querySelector('#media');
    await media.updateComplete;
    const style = getComputedStyle(media);
    expect(style.flexShrink).to.equal('0');
    expect(style.flexBasis).to.equal('50%');
  });

  it('should not set the media width on the host in a vertical card', async () => {
    const el = await fixture(html`
      <cds-card>
        <cds-card-media id="media" media-width="50%"></cds-card-media>
      </cds-card>
    `);
    const media = el.querySelector('#media');
    await media.updateComplete;
    expect(media.hasAttribute('slot')).to.be.false;
    expect(media.style.getPropertyValue('--cds--card--media-width')).to.equal(
      ''
    );
  });

  it('should remove the host media width and slot when horizontal is turned off', async () => {
    const el = await fixture(html`
      <cds-card horizontal>
        <cds-card-media id="media" media-width="50%"></cds-card-media>
      </cds-card>
    `);
    const media = el.querySelector('#media');
    await media.updateComplete;
    expect(media.style.getPropertyValue('--cds--card--media-width')).to.equal(
      '50%'
    );

    el.horizontal = false;
    await el.updateComplete;
    await media.updateComplete;
    expect(media.hasAttribute('slot')).to.be.false;
    expect(media.style.getPropertyValue('--cds--card--media-width')).to.equal(
      ''
    );
  });
});

// ─── cds-card-action ─────────────────────────────────────────────────────────

describe('cds-card-action', function () {
  it('should render with action BEM class', async () => {
    const el = await fixture(html`<cds-card-action></cds-card-action>`);
    const div = el.shadowRoot.querySelector('.cds--card__action');
    expect(div).to.exist;
  });

  it('should expose label property', async () => {
    const el = await fixture(html`
      <cds-card-action label="Edit"></cds-card-action>
    `);
    expect(el.label).to.equal('Edit');
  });
});

// ─── cds-card-actions ────────────────────────────────────────────────────────

describe('cds-card-actions', function () {
  it('should render slotted cds-card-action children', async () => {
    const el = await fixture(html`
      <cds-card-actions>
        <cds-card-action label="Edit"></cds-card-action>
        <cds-card-action label="Share"></cds-card-action>
      </cds-card-actions>
    `);
    const actions = el.querySelectorAll('cds-card-action');
    expect(actions).to.have.length(2);
  });

  it('should resolve label from cds-card-action[label] attribute', async () => {
    const el = await fixture(html`
      <cds-card-actions>
        <cds-card-action label="My action"></cds-card-action>
      </cds-card-actions>
    `);
    await el.updateComplete;
    const action = el.querySelector('cds-card-action');
    expect(action.getAttribute('label')).to.equal('My action');
  });

  it('should publish the natural inline size as a custom property', async () => {
    const el = await fixture(html`
      <cds-card-actions>
        <cds-card-action label="Edit">
          <button type="button">Edit</button>
        </cds-card-action>
        <cds-card-action label="Share">
          <button type="button">Share</button>
        </cds-card-action>
      </cds-card-actions>
    `);
    await el.updateComplete;
    await el.updateComplete;
    expect(
      el.style.getPropertyValue('--cds--card--actions-inline-size')
    ).to.match(/^\d+px$/);
  });

  it('should resolve labels from any button type and forward menu item clicks', async () => {
    let clicks = 0;
    const el = await fixture(html`
      <div style="width: 120px">
        <cds-card-actions>
          <cds-card-action>
            <button
              type="button"
              aria-label="From aria"
              @click=${() => clicks++}>
              A long visible action label
            </button>
          </cds-card-action>
          <cds-card-action>
            <button type="button" disabled>Disabled one</button>
          </cds-card-action>
          <cds-card-action></cds-card-action>
        </cds-card-actions>
      </div>
    `);
    const actions = el.querySelector('cds-card-actions');
    await actions.updateComplete;
    const items = actions._resolveActionItems(
      Array.from(actions.querySelectorAll('cds-card-action'))
    );
    expect(items.map((i) => i.label)).to.deep.equal([
      'From aria',
      'Disabled one',
      'Action 3',
    ]);
    expect(items.map((i) => i.disabled)).to.deep.equal([false, true, false]);

    actions._handleMenuItemClick(items[0].el);
    expect(clicks).to.equal(1);
  });
  it('should treat aria-disabled="true" on the button or the action as disabled', async () => {
    const el = await fixture(html`
      <cds-card-actions>
        <cds-card-action>
          <button type="button" aria-disabled="true">Inner</button>
        </cds-card-action>
        <cds-card-action aria-disabled="true">
          <button type="button">Wrapper</button>
        </cds-card-action>
        <cds-card-action>
          <button type="button" aria-disabled="false">Enabled</button>
        </cds-card-action>
      </cds-card-actions>
    `);
    await el.updateComplete;
    const items = el._resolveActionItems(
      Array.from(el.querySelectorAll('cds-card-action'))
    );
    expect(items.map((i) => i.disabled)).to.deep.equal([true, true, false]);
  });

  it('should not forward clicks from disabled overflow menu items', async () => {
    let enabledClicks = 0;
    let disabledClicks = 0;
    const el = await fixture(html`
      <div style="width: 60px">
        <cds-card-actions>
          <cds-card-action>
            <button type="button" @click=${() => enabledClicks++}>
              A long visible action label
            </button>
          </cds-card-action>
          <cds-card-action>
            <button
              type="button"
              aria-disabled="true"
              @click=${() => disabledClicks++}>
              Another long visible action label
            </button>
          </cds-card-action>
        </cds-card-actions>
      </div>
    `);
    const actions = el.querySelector('cds-card-actions');
    await actions.updateComplete;
    await new Promise((r) => setTimeout(r, 300));
    await actions.updateComplete;

    const menuItems = Array.from(
      actions.shadowRoot.querySelectorAll('cds-menu-item')
    );
    expect(menuItems).to.have.length(2);
    expect(menuItems.map((i) => i.hasAttribute('disabled'))).to.deep.equal([
      false,
      true,
    ]);

    menuItems.forEach((item) => item.click());

    expect(enabledClicks).to.equal(1);
    expect(disabledClicks).to.equal(0);
  });

  it('should collapse text actions into the overflow menu when they do not fit', async () => {
    const el = await fixture(html`
      <div style="width: 360px">
        <cds-card>
          <cds-card-header id="hdr">
            <cds-card-title>Usage metrics</cds-card-title>
            <cds-card-actions slot="actions">
              <cds-card-action>
                <cds-button kind="tertiary" size="sm">Export</cds-button>
              </cds-card-action>
              <cds-card-action>
                <cds-button kind="tertiary" size="sm">Share</cds-button>
              </cds-card-action>
              <cds-card-action>
                <cds-button kind="tertiary" size="sm">View report</cds-button>
              </cds-card-action>
            </cds-card-actions>
          </cds-card-header>
        </cds-card>
      </div>
    `);
    const actions = el.querySelector('cds-card-actions');
    await actions.updateComplete;
    await new Promise((r) => setTimeout(r, 300));
    await actions.updateComplete;

    // Items must keep their natural width instead of being flex-compressed.
    const items = Array.from(actions.querySelectorAll('cds-card-action'));
    const button = items[2].querySelector('cds-button');
    expect(items[2].getBoundingClientRect().width).to.be.at.least(
      button.getBoundingClientRect().width - 1
    );
    // Visible actions must not overlap each other.
    const visible = items
      .filter((i) => !i.hasAttribute('data-hidden'))
      .map((i) => i.getBoundingClientRect());
    for (let i = 1; i < visible.length; i++) {
      expect(visible[i].left).to.be.at.least(visible[i - 1].right - 1);
    }
    // Everything beyond the cap is reachable through the overflow menu.
    expect(actions.shadowRoot.querySelector('cds-overflow-menu')).to.exist;
  });

  it('should reflect label and disabled changes made after the first render in the overflow menu', async () => {
    const el = await fixture(html`
      <div style="width: 120px">
        <cds-card-actions>
          <cds-card-action>
            <button type="button" aria-label="First">
              A long visible action label
            </button>
          </cds-card-action>
          <cds-card-action>
            <button type="button" aria-label="Second">
              Another long visible action label
            </button>
          </cds-card-action>
        </cds-card-actions>
      </div>
    `);
    const actions = el.querySelector('cds-card-actions');
    await actions.updateComplete;
    await new Promise((r) => setTimeout(r, 300));
    await actions.updateComplete;

    const hiddenId = Array.from(actions._hiddenIds)[0];
    expect(hiddenId).to.exist;
    const hiddenAction = actions.querySelector(
      `[data-action-id="${hiddenId}"]`
    );
    const button = hiddenAction.querySelector('button');

    button.setAttribute('aria-label', 'Renamed');
    button.setAttribute('disabled', '');
    // MutationObserver callbacks are microtasks; wait for the resulting render.
    await Promise.resolve();
    await actions.updateComplete;

    const menuItem = actions.shadowRoot.querySelector(
      `cds-menu-item[data-action-id="${hiddenId}"]`
    );
    expect(menuItem.getAttribute('label')).to.equal('Renamed');
    expect(menuItem.hasAttribute('disabled')).to.be.true;
  });

  it('should remove the overflow menu when removed actions make the rest fit', async () => {
    const el = await fixture(html`
      <div style="width: 130px">
        <cds-card-actions>
          <cds-card-action>
            <button type="button" aria-label="First" style="width: 40px">
              A
            </button>
          </cds-card-action>
          <cds-card-action>
            <button type="button" aria-label="Second" style="width: 40px">
              B
            </button>
          </cds-card-action>
          <cds-card-action>
            <button type="button" aria-label="Third" style="width: 40px">
              C
            </button>
          </cds-card-action>
          <cds-card-action>
            <button type="button" aria-label="Fourth" style="width: 40px">
              D
            </button>
          </cds-card-action>
        </cds-card-actions>
      </div>
    `);
    const actions = el.querySelector('cds-card-actions');
    const settle = async () => {
      await actions.updateComplete;
      await new Promise((r) => setTimeout(r, 300));
      await actions.updateComplete;
    };
    await settle();

    expect(actions.shadowRoot.querySelector('cds-overflow-menu')).to.exist;

    // Dropping to three actions fits the container again. The last child is
    // the overflow handler's offset spacer, so remove the last action instead.
    const items = actions.querySelectorAll('cds-card-action');
    items[items.length - 1].remove();
    await settle();

    expect(actions.shadowRoot.querySelector('cds-overflow-menu')).to.not.exist;
    expect(actions._hiddenIds.size).to.equal(0);
    expect(actions.querySelector('[data-offset]').style.display).to.equal(
      'none'
    );
  });
});
