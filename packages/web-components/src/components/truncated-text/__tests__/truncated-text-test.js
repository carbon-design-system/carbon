/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/truncated-text/index.js';
import '@carbon/web-components/es/components/layer/index.js';
import { fixture, html, expect } from '@open-wc/testing';

// Suppress the benign "ResizeObserver loop completed with undelivered notifications"
// error that fires in headless Puppeteer because there is no real paint loop.
// This does not affect test correctness — overflow detection via ResizeObserver
// is exercised in integration / Storybook; unit tests drive state directly.
const _origOnError = window.onerror;
window.onerror = (message, ...rest) => {
  if (typeof message === 'string' && message.includes('ResizeObserver loop')) {
    return true; // suppress
  }
  if (_origOnError) return _origOnError(message, ...rest);
};

const prefix = 'cds';
const blockClass = `${prefix}--truncated-text`;

const longText =
  'Buttons are used to initialize an action, either in the background or foreground of an experience. There are several kinds of buttons. Primary buttons should be used for the principle call to action on the page.';

const shortText = 'Short.';

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('cds-truncated-text', () => {
  // ── Basic rendering ────────────────────────────────────────────────────────

  it('should render the component', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="tooltip">
      </cds-truncated-text>
    `);
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-truncated-text');
  });

  it('should reflect attribute values back as properties', async () => {
    const el = await fixture(html`
      <cds-truncated-text
        value="${longText}"
        lines="3"
        align="bottom"
        type="expand"
        expand-label="More"
        collapse-label="Less"></cds-truncated-text>
    `);
    expect(el.value).to.equal(longText);
    expect(el.lines).to.equal(3);
    expect(el.align).to.equal('bottom');
    expect(el.type).to.equal('expand');
    expect(el.expandLabel).to.equal('More');
    expect(el.collapseLabel).to.equal('Less');
  });

  it('should default type to "tooltip"', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${shortText}" lines="2"></cds-truncated-text>
    `);
    expect(el.type).to.equal('tooltip');
  });

  it('should render the content div with the correct class', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="tooltip">
      </cds-truncated-text>
    `);
    await el.updateComplete;
    const content = el.shadowRoot.querySelector(`.${blockClass}_content`);
    expect(content).to.exist;
  });

  // ── Tooltip variant — state-driven ────────────────────────────────────────
  // In headless Puppeteer, layout is zero so ResizeObserver never detects
  // overflow. We force _isOverflowing to simulate the truncated condition.

  it('should render a cds-tooltip when _isOverflowing is true and type=tooltip', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="tooltip">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;
    const tooltip = el.shadowRoot.querySelector(`${prefix}-tooltip`);
    expect(tooltip).to.exist;
  });

  it('should not render a cds-tooltip when _isOverflowing is false and type=tooltip', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="tooltip">
      </cds-truncated-text>
    `);
    el._isOverflowing = false;
    await el.updateComplete;
    const tooltip = el.shadowRoot.querySelector(`${prefix}-tooltip`);
    expect(tooltip).to.not.exist;
  });

  it('should render plain content (no expand button) for type=tooltip regardless of overflow', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${shortText}" lines="2" type="tooltip">
      </cds-truncated-text>
    `);
    el._isOverflowing = false;
    await el.updateComplete;
    const expandBtn = el.shadowRoot.querySelector(
      `.${blockClass}_button-expand`
    );
    expect(expandBtn).to.not.exist;
  });

  // ── Expand variant ─────────────────────────────────────────────────────────

  it('should always render the expand button structure when type=expand', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    await el.updateComplete;
    // Button is always in DOM for expand type; hidden via CSS when not overflowing
    const expandBtn = el.shadowRoot.querySelector(
      `.${blockClass}_button-expand`
    );
    expect(expandBtn).to.exist;
  });

  it('should have _button-hide class on expand button when not overflowing', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = false;
    await el.updateComplete;
    const expandBtn = el.shadowRoot.querySelector(
      `.${blockClass}_button-expand`
    );
    expect(expandBtn.classList.contains(`${blockClass}_button-hide`)).to.be
      .true;
  });

  it('should not have _button-hide class when overflowing', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;
    const expandBtn = el.shadowRoot.querySelector(
      `.${blockClass}_button-expand`
    );
    expect(expandBtn.classList.contains(`${blockClass}_button-hide`)).to.be
      .false;
  });

  it('should toggle to collapse button after clicking expand', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;

    el.shadowRoot.querySelector(`.${blockClass}_button-expand`).click();
    await el.updateComplete;

    expect(el.shadowRoot.querySelector(`.${blockClass}_button-collapse`)).to
      .exist;
    expect(el.shadowRoot.querySelector(`.${blockClass}_button-expand`)).to.not
      .exist;
  });

  it('should apply _content--expanded class on the content div when expanded', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;

    el.shadowRoot.querySelector(`.${blockClass}_button-expand`).click();
    await el.updateComplete;

    const content = el.shadowRoot.querySelector(`.${blockClass}_content`);
    expect(content.classList.contains(`${blockClass}_content--expanded`)).to.be
      .true;
  });

  it('should collapse back to expand button when collapse is clicked', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;

    el.shadowRoot.querySelector(`.${blockClass}_button-expand`).click();
    await el.updateComplete;

    el.shadowRoot.querySelector(`.${blockClass}_button-collapse`).click();
    await el.updateComplete;

    expect(el.shadowRoot.querySelector(`.${blockClass}_button-expand`)).to
      .exist;
    const content = el.shadowRoot.querySelector(`.${blockClass}_content`);
    expect(content.classList.contains(`${blockClass}_content--expanded`)).to.be
      .false;
  });

  // ── Keyboard interaction ───────────────────────────────────────────────────

  it('should toggle expansion with Enter key on the expand button', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;

    el.shadowRoot
      .querySelector(`.${blockClass}_button-expand`)
      .dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      );
    await el.updateComplete;

    expect(el.shadowRoot.querySelector(`.${blockClass}_button-collapse`)).to
      .exist;
  });

  it('should toggle expansion with Space key on the expand button', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;

    el.shadowRoot
      .querySelector(`.${blockClass}_button-expand`)
      .dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;

    expect(el.shadowRoot.querySelector(`.${blockClass}_button-collapse`)).to
      .exist;
  });

  it('should not toggle expansion with an unrelated key', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;

    el.shadowRoot
      .querySelector(`.${blockClass}_button-expand`)
      .dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      );
    await el.updateComplete;

    // Should still be showing expand button (not toggled)
    expect(el.shadowRoot.querySelector(`.${blockClass}_button-expand`)).to
      .exist;
  });

  // ── Layer context ──────────────────────────────────────────────────────────

  it('should apply _button-layered class when inside a cds-layer', async () => {
    const wrapper = await fixture(html`
      <cds-layer>
        <cds-truncated-text
          value="${longText}"
          lines="2"
          type="expand"></cds-truncated-text>
      </cds-layer>
    `);
    const el = wrapper.querySelector('cds-truncated-text');
    el._isOverflowing = true;
    await el.updateComplete;

    const expandBtn = el.shadowRoot.querySelector(
      `.${blockClass}_button-expand`
    );
    expect(expandBtn.classList.contains(`${blockClass}_button-layered`)).to.be
      .true;
  });

  it('should not apply _button-layered class when not inside a cds-layer', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;

    const expandBtn = el.shadowRoot.querySelector(
      `.${blockClass}_button-expand`
    );
    expect(expandBtn.classList.contains(`${blockClass}_button-layered`)).to.be
      .false;
  });

  // ── Accessibility ──────────────────────────────────────────────────────────

  it('should set aria-expanded="false" on the expand button when collapsed', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;

    const btn = el.shadowRoot.querySelector(`.${blockClass}_button-expand`);
    expect(btn.getAttribute('aria-expanded')).to.equal('false');
  });

  it('should set aria-expanded="true" on the collapse button when expanded', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    el._isOverflowing = true;
    await el.updateComplete;

    el.shadowRoot.querySelector(`.${blockClass}_button-expand`).click();
    await el.updateComplete;

    const btn = el.shadowRoot.querySelector(`.${blockClass}_button-collapse`);
    expect(btn.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should set role="button" and tabindex="0" on the toggle button', async () => {
    const el = await fixture(html`
      <cds-truncated-text value="${longText}" lines="2" type="expand">
      </cds-truncated-text>
    `);
    await el.updateComplete;
    const btn = el.shadowRoot.querySelector(`.${blockClass}_button-expand`);
    expect(btn.getAttribute('role')).to.equal('button');
    expect(btn.getAttribute('tabindex')).to.equal('0');
  });
});
