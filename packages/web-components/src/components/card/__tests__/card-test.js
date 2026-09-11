/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/card/index.js';

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
  });

  describe('AI label detection', () => {
    it('should set has-ai-label attribute when cds-ai-label is in decorator slot', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-ai-label slot="decorator"></cds-ai-label>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      await el.updateComplete;
      expect(el.hasAttribute('has-ai-label')).to.be.true;
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
  });
  describe('has-actions reflection (rule 15)', () => {
    it('should set has-actions when cds-card-actions is slotted', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
          <cds-card-actions>
            <cds-card-action label="Edit"></cds-card-action>
          </cds-card-actions>
        </cds-card>
      `);
      await el.updateComplete;
      expect(el.hasAttribute('has-actions')).to.be.true;
    });

    it('should remove has-actions when cds-card-actions is not present', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header><cds-card-title>T</cds-card-title></cds-card-header>
        </cds-card>
      `);
      await el.updateComplete;
      expect(el.hasAttribute('has-actions')).to.be.false;
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

  describe('has-title-media reflection (rule 16)', () => {
    it('should set has-title-media when cds-card-title-media is slotted', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header id="hdr">
            <cds-card-title-media></cds-card-title-media>
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const header = el.querySelector('#hdr');
      await header.updateComplete;
      expect(header.hasAttribute('has-title-media')).to.be.true;
    });

    it('should not set has-title-media when cds-card-title-media is absent', async () => {
      const el = await fixture(html`
        <cds-card>
          <cds-card-header id="hdr">
            <cds-card-title>T</cds-card-title>
          </cds-card-header>
        </cds-card>
      `);
      const header = el.querySelector('#hdr');
      await header.updateComplete;
      expect(header.hasAttribute('has-title-media')).to.be.false;
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
});

// ─── cds-card-header-media ───────────────────────────────────────────────────

describe('cds-card-header-media', function () {
  it('should render slot content', async () => {
    const el = await fixture(html`
      <cds-card-header-media><span id="icon">★</span></cds-card-header-media>
    `);
    expect(el.querySelector('#icon')).to.exist;
  });

  it('should render with header-media BEM class', async () => {
    const el = await fixture(
      html`<cds-card-header-media></cds-card-header-media>`
    );
    const div = el.shadowRoot.querySelector('.cds--card__header-media');
    expect(div).to.exist;
  });
});

// ─── cds-card-title-media ────────────────────────────────────────────────────

describe('cds-card-title-media', function () {
  it('should render slot content', async () => {
    const el = await fixture(html`
      <cds-card-title-media><span id="icon">★</span></cds-card-title-media>
    `);
    expect(el.querySelector('#icon')).to.exist;
  });

  it('should render with title-media BEM class', async () => {
    const el = await fixture(
      html`<cds-card-title-media></cds-card-title-media>`
    );
    const div = el.shadowRoot.querySelector('.cds--card__title-media');
    expect(div).to.exist;
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
});
