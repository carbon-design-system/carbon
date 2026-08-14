/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/dialog/index.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';

const prefix = 'cds';

const defaultDialog = html`
  <cds-dialog open>
    <cds-dialog-header>
      <cds-dialog-subtitle>Dialog subtitle</cds-dialog-subtitle>
      <cds-dialog-title>Dialog title</cds-dialog-title>
      <cds-dialog-controls>
        <cds-dialog-close-button></cds-dialog-close-button>
      </cds-dialog-controls>
    </cds-dialog-header>
    <cds-dialog-body>
      <p>Dialog body content</p>
    </cds-dialog-body>
    <cds-dialog-footer>
      <cds-dialog-footer-button kind="secondary" data-dialog-close
        >Cancel</cds-dialog-footer-button
      >
      <cds-dialog-footer-button>Add</cds-dialog-footer-button>
    </cds-dialog-footer>
  </cds-dialog>
`;

describe('cds-dialog', () => {
  describe('renders as expected - Component API', () => {
    it('should render', async () => {
      const el = await fixture(html`<cds-dialog></cds-dialog>`);
      expect(el).to.exist;
    });

    it('supports a custom class name on the outermost element', async () => {
      const el = await fixture(html`<cds-dialog class="test"></cds-dialog>`);
      expect(el).to.have.class('test');
    });

    it('forwards additional attributes on the outermost element', async () => {
      const el = await fixture(
        html`<cds-dialog data-testid="test"></cds-dialog>`
      );
      expect(el).to.have.attribute('data-testid', 'test');
    });

    it('supports modal', async () => {
      const el = await fixture(html`<cds-dialog modal></cds-dialog>`);
      expect(el).to.have.attribute('modal');
    });

    it('supports non-modal', async () => {
      const el = await fixture(html`<cds-dialog .modal=${false}></cds-dialog>`);
      expect(el).to.not.have.attribute('modal');
    });

    it('supports open prop', async () => {
      const el = await fixture(html`<cds-dialog open></cds-dialog>`);
      await el.updateComplete;
      const dialog = el.shadowRoot?.querySelector('dialog');
      expect(dialog?.open).to.be.true;
    });

    it('is not open by default', async () => {
      const el = await fixture(html`<cds-dialog></cds-dialog>`);
      const dialog = el.shadowRoot?.querySelector('dialog');
      expect(dialog?.open).to.be.false;
    });

    it('should call close event on backdrop click in modal mode', async () => {
      let closeEventFired = false;
      const el = await fixture(html`
        <cds-dialog open modal>
          <p>inside</p>
        </cds-dialog>
      `);

      el.addEventListener(`${prefix}-dialog-closed`, () => {
        closeEventFired = true;
      });

      await el.updateComplete;
      const dialog = el.shadowRoot?.querySelector('dialog');

      dialog?.click();
      expect(closeEventFired).to.be.true;
    });

    it('should support `cds-dialog-header`, `cds-dialog-controls`, `cds-dialog-title`, and `cds-dialog-subtitle` in context', async () => {
      const el = await fixture(html`
        <cds-dialog open>
          <cds-dialog-header data-testid="header">
            <cds-dialog-controls data-testid="controls">
              <cds-dialog-close-button></cds-dialog-close-button>
            </cds-dialog-controls>
            <cds-dialog-subtitle class="subtitle-class"
              >Subtitle</cds-dialog-subtitle
            >
            <cds-dialog-title class="title-class">Title</cds-dialog-title>
          </cds-dialog-header>
        </cds-dialog>
      `);

      await el.updateComplete;

      const dialog = el.shadowRoot?.querySelector('dialog');
      const header = el.querySelector('[data-testid="header"]');
      const controls = el.querySelector('[data-testid="controls"]');
      const title = el.querySelector('cds-dialog-title');
      const subtitle = el.querySelector('cds-dialog-subtitle');
      const closeButton = el.querySelector('cds-dialog-close-button');

      expect(header).to.exist;
      expect(controls).to.exist;
      expect(title).to.exist;
      expect(subtitle).to.exist;
      expect(closeButton).to.exist;

      expect(dialog?.getAttribute('aria-labelledby')).to.equal(title?.id);
    });

    it('should support custom `id`s for `cds-dialog-title` and `cds-dialog-subtitle`', async () => {
      const el = await fixture(html`
        <cds-dialog open>
          <cds-dialog-title id="custom-title">Custom title</cds-dialog-title>
          <cds-dialog-subtitle id="custom-subtitle"
            >Custom subtitle</cds-dialog-subtitle
          >
        </cds-dialog>
      `);

      await el.updateComplete;

      const title = el.querySelector('cds-dialog-title');
      const subtitle = el.querySelector('cds-dialog-subtitle');

      expect(title?.id).to.equal('custom-title');
      expect(subtitle?.id).to.equal('custom-subtitle');
    });

    it('should support `cds-dialog-body` scrolling content props', async () => {
      const el = await fixture(html`
        <cds-dialog open has-scrolling-content>
          <cds-dialog-body class="body-class" data-testid="body">
            Body
          </cds-dialog-body>
        </cds-dialog>
      `);

      await el.updateComplete;

      const body = el.querySelector('[data-testid="body"]');
      expect(body).to.exist;
      expect(body).to.have.attribute('role', 'region');
      expect(body).to.have.attribute('tabindex', '0');
    });
  });

  describe('Accessibility', () => {
    it('uses aria-describedby when provided', async () => {
      const el = await fixture(html`
        <cds-dialog open aria-describedby="description">
          <p id="description">Description text</p>
        </cds-dialog>
      `);

      await el.updateComplete;
      const dialog = el.shadowRoot?.querySelector('dialog');

      expect(dialog?.getAttribute('aria-describedby')).to.equal('description');
    });

    it('applies aria-labelledby=title.id fallback when no aria-label is provided', async () => {
      const el = await fixture(html`
        <cds-dialog open>
          <cds-dialog-title>Title</cds-dialog-title>
        </cds-dialog>
      `);

      await el.updateComplete;

      const dialog = el.shadowRoot?.querySelector('dialog');
      const title = el.querySelector('cds-dialog-title');

      expect(dialog?.getAttribute('aria-labelledby')).to.equal(title?.id);
    });

    [
      ['aria-label', 'label'],
      ['aria-labelledby', 'label'],
    ].forEach(([attrName, attrValue]) => {
      it(`does not apply aria-labelledby=title.id fallback when ${attrName} is provided`, async () => {
        const el = await fixture(html`
          <cds-dialog open>
            <cds-dialog-title>Title</cds-dialog-title>
          </cds-dialog>
        `);

        el.setAttribute(attrName, attrValue);

        await el.updateComplete;

        const dialog = el.shadowRoot?.querySelector('dialog');
        const title = el.querySelector('cds-dialog-title');

        expect(dialog?.getAttribute('aria-labelledby')).to.not.equal(title?.id);
        expect(dialog?.getAttribute(attrName)).to.equal(attrValue);
      });
    });
  });

  describe('Open/Close behavior', () => {
    it('should close dialog when close button is clicked', async () => {
      const el = await fixture(defaultDialog);
      const closeButton = el.querySelector('cds-dialog-close-button');

      expect(el.open).to.be.true;

      setTimeout(() => closeButton.click());
      const { detail } = await oneEvent(el, `${prefix}-dialog-closed`);

      expect(el.open).to.be.false;
      expect(detail.triggeredBy).to.equal(closeButton);
    });

    it('should fire beingclosed event before closing', async () => {
      const el = await fixture(defaultDialog);
      const closeButton = el.querySelector('cds-dialog-close-button');

      let beingClosedFired = false;
      el.addEventListener(`${prefix}-dialog-beingclosed`, () => {
        beingClosedFired = true;
      });

      setTimeout(() => closeButton.click());
      await oneEvent(el, `${prefix}-dialog-closed`);

      expect(beingClosedFired).to.be.true;
    });

    it('should allow preventing close via beingclosed event', async () => {
      const el = await fixture(defaultDialog);
      const closeButton = el.querySelector('cds-dialog-close-button');

      el.addEventListener(`${prefix}-dialog-beingclosed`, (event) => {
        event.preventDefault();
      });

      setTimeout(() => closeButton.click());
      await oneEvent(el, `${prefix}-dialog-beingclosed`);

      expect(el.open).to.be.true;
    });

    it('should close on Escape key when `modal` is true', async () => {
      const el = await fixture(html`<cds-dialog open modal></cds-dialog>`);
      expect(el.open).to.be.true;
      expect(el.modal).to.be.true;
      expect(el.shadowRoot?.querySelector('dialog')).to.have.attribute('open');

      setTimeout(() => {
        const event = new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
          composed: true,
        });
        el.dispatchEvent(event);
      });

      await oneEvent(el, `${prefix}-dialog-closed`);
      expect(el.open).to.be.false;
      expect(el.shadowRoot?.querySelector('dialog')).to.not.have.attribute(
        'open'
      );
    });

    it('should not close on Escape key when `modal` is false', async () => {
      const el = await fixture(
        html` <cds-dialog open .modal=${false}></cds-dialog>`
      );
      expect(el.open).to.be.true;
      expect(el.modal).to.be.false;
      expect(el.shadowRoot?.querySelector('dialog')).to.have.attribute('open');

      setTimeout(() => {
        const event = new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
          composed: true,
        });
        el.dispatchEvent(event);
      });

      await el.updateComplete;
      expect(el.open).to.be.true;
      expect(el.shadowRoot?.querySelector('dialog')).to.have.attribute('open');
    });

    it('should not close on click outside when prevent-close-on-click-outside is true', async () => {
      const el = await fixture(html`
        <cds-dialog open prevent-close-on-click-outside>
          <cds-dialog-header>
            <cds-dialog-subtitle>Dialog subtitle</cds-dialog-subtitle>
            <cds-dialog-title>Dialog title</cds-dialog-title>
            <cds-dialog-controls>
              <cds-dialog-close-button></cds-dialog-close-button>
            </cds-dialog-controls>
          </cds-dialog-header>
          <cds-dialog-body>
            <p>Dialog body content</p>
          </cds-dialog-body>
          <cds-dialog-footer>
            <cds-dialog-footer-button kind="secondary" data-dialog-close
              >Cancel</cds-dialog-footer-button
            >
            <cds-dialog-footer-button>Add</cds-dialog-footer-button>
          </cds-dialog-footer></cds-dialog
        >
      `);

      expect(el.preventCloseOnClickOutside).to.be.true;
      expect(el.open).to.be.true;

      el.shadowRoot?.querySelector('dialog')?.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
    });

    it('should close on click outside when prevent-close-on-click-outside is false', async () => {
      const el = await fixture(defaultDialog);

      expect(el.preventCloseOnClickOutside).to.be.false;
      expect(el.open).to.be.true;

      el.shadowRoot?.querySelector('dialog')?.click();
      await el.updateComplete;

      expect(el.open).to.be.false;
    });

    it('should not close when prevent-close is set', async () => {
      const el = await fixture(html`
        <cds-dialog open prevent-close>
          <cds-dialog-header>
            <cds-dialog-controls>
              <cds-dialog-close-button></cds-dialog-close-button></cds-dialog-controls></cds-dialog-header
        ></cds-dialog>
      `);

      const closeButton = el.querySelector('cds-dialog-close-button');
      closeButton.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
    });

    it('should respect data-dialog-close attribute', async () => {
      const el = await fixture(defaultDialog);
      const secondaryButton = el.querySelector(
        'cds-dialog-footer-button[data-dialog-close]'
      );

      expect(el.open).to.be.true;

      setTimeout(() => secondaryButton.click());
      await oneEvent(el, `${prefix}-dialog-closed`);

      expect(el.open).to.be.false;
    });

    describe('Focus management', () => {
      it('should focus close button on open when present', async () => {
        const el = await fixture(html`
          <cds-dialog open>
            <cds-dialog-header>
              <cds-dialog-controls>
                <cds-dialog-close-button></cds-dialog-close-button>
              </cds-dialog-controls>
            </cds-dialog-header>
          </cds-dialog>
        `);

        await new Promise((r) => setTimeout(r, 0));

        const closeButton = el.querySelector('cds-dialog-close-button');
        expect(document.activeElement).to.equal(closeButton);
      });

      it('should focus secondary button on open when primary button has kind="danger"', async () => {
        const el = await fixture(html`
          <cds-dialog open>
            <cds-dialog-footer>
              <cds-dialog-footer-button kind="secondary"
                >Cancel</cds-dialog-footer-button
              >
              <cds-dialog-footer-button kind="danger"
                >Delete</cds-dialog-footer-button
              >
            </cds-dialog-footer>
          </cds-dialog>
        `);

        await new Promise((r) => setTimeout(r, 0));

        const secondaryButton = el.querySelector(
          'cds-dialog-footer-button[kind="secondary"]'
        );
        expect(document.activeElement).to.equal(secondaryButton);
      });

      it('should focus element with data-dialog-primary-focus', async () => {
        const el = await fixture(html`
          <cds-dialog open>
            <cds-dialog-body>
              <input type="text" data-dialog-primary-focus />
            </cds-dialog-body>
          </cds-dialog>
        `);

        await new Promise((r) => setTimeout(r, 0));

        const input = el.querySelector('[data-dialog-primary-focus]');
        expect(document.activeElement).to.equal(input);
      });
    });
  });

  describe('Scrolling content', () => {
    it('sets aria-labelledby to subtitle id when dialog body is scrollable and subtitle exists', async () => {
      const el = await fixture(html`
        <cds-dialog open has-scrolling-content>
          <cds-dialog-subtitle>Subtitle</cds-dialog-subtitle>
          <cds-dialog-body>
            <p>Content</p>
          </cds-dialog-body>
        </cds-dialog>
      `);

      await el.updateComplete;

      const body = el.querySelector('cds-dialog-body');
      const subtitle = el.querySelector('cds-dialog-subtitle');

      expect(body?.getAttribute('aria-labelledby')).to.equal(subtitle?.id);
    });

    it('sets aria-labelledby to title id when dialog body is scrollable and no subtitle exists', async () => {
      const el = await fixture(html`
        <cds-dialog open has-scrolling-content>
          <cds-dialog-title>Title</cds-dialog-title>
          <cds-dialog-body>
            <p>Content</p>
          </cds-dialog-body>
        </cds-dialog>
      `);

      await el.updateComplete;

      const body = el.querySelector('cds-dialog-body');
      const title = el.querySelector('cds-dialog-title');

      expect(body?.getAttribute('aria-labelledby')).to.equal(title?.id);
    });

    it('prefers subtitle over title for aria-labelledby when dialog body is scrollable and both exist', async () => {
      const el = await fixture(html`
        <cds-dialog open has-scrolling-content>
          <cds-dialog-subtitle>Subtitle</cds-dialog-subtitle>
          <cds-dialog-title>Title</cds-dialog-title>
          <cds-dialog-body>
            <p>Content</p>
          </cds-dialog-body>
        </cds-dialog>
      `);

      await el.updateComplete;

      const body = el.querySelector('cds-dialog-body');
      const subtitle = el.querySelector('cds-dialog-subtitle');
      const title = el.querySelector('cds-dialog-title');

      expect(body?.getAttribute('aria-labelledby')).to.equal(subtitle?.id);
      expect(body?.getAttribute('aria-labelledby')).to.not.equal(title?.id);
    });

    it('does not set aria-labelledby when dialog body is not scrollable', async () => {
      const el = await fixture(html`
        <cds-dialog open>
          <cds-dialog-title>Title</cds-dialog-title>
          <cds-dialog-body></cds-dialog-body>
        </cds-dialog>
      `);

      await el.updateComplete;

      const body = el.querySelector('cds-dialog-body');

      expect(body?.hasAttribute('aria-labelledby')).to.be.false;
    });
  });

  describe('Loading states', () => {
    it('should fire on-loadingsuccess event when loading finishes', async () => {
      const el = await fixture(html`
        <cds-dialog open loading-status="finished" loading-success-delay="0">
          <cds-dialog-header></cds-dialog-header>
          <cds-dialog-body>Dialog body</cds-dialog-body>
          <cds-dialog-footer>
            <cds-dialog-footer-button kind="secondary"
              >Cancel</cds-dialog-footer-button
            >
            <cds-dialog-footer-button kind="primary"
              >Save</cds-dialog-footer-button
            >
          </cds-dialog-footer>
        </cds-dialog>
      `);

      await el.updateComplete;

      const event = await oneEvent(el, `${prefix}-dialog-on-loadingsuccess`);
      expect(event).to.exist;
    });
  });
});
