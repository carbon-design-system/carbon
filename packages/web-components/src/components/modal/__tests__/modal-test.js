/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/ai-label/index.js';

const prefix = 'cds';

const defaultModal = html`
  <cds-modal open>
    <cds-modal-header>
      <cds-modal-close-button></cds-modal-close-button>
      <cds-modal-label>Modal label</cds-modal-label>
      <cds-modal-heading>Modal heading</cds-modal-heading>
    </cds-modal-header>
    <cds-modal-body>
      <p>Modal body content</p>
    </cds-modal-body>
    <cds-modal-footer>
      <cds-modal-footer-button kind="secondary" data-modal-close
        >Cancel</cds-modal-footer-button
      >
      <cds-modal-footer-button kind="primary">Add</cds-modal-footer-button>
    </cds-modal-footer>
  </cds-modal>
`;

describe('cds-modal', function () {
  describe('Rendering', function () {
    it('should render', async () => {
      const el = await fixture(defaultModal);
      expect(el).to.exist;
      expect(el.open).to.be.true;
      expect(el.size).to.equal('md');
      expect(el.loadingStatus).to.equal('inactive');
      expect(el.getAttribute('has-footer')).to.exist;
    });

    it('should render modal heading', async () => {
      const el = await fixture(defaultModal);
      const heading = el.querySelector('cds-modal-heading');
      expect(heading).to.exist;
      expect(heading.textContent).to.equal('Modal heading');
    });

    it('should set ai-label attribute on modal when cds-ai-label is slotted in the header', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
            <cds-ai-label slot="ai-label"></cds-ai-label>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      await el.updateComplete;

      expect(el.hasAttribute('ai-label')).to.be.true;
      const aiLabel = el.querySelector('cds-ai-label');
      expect(aiLabel).to.exist;
      expect(aiLabel.getAttribute('size')).to.equal('sm');
    });

    it('should render modal label', async () => {
      const el = await fixture(defaultModal);

      const label = el.querySelector('cds-modal-label');
      expect(label).to.exist;
      expect(label.textContent).to.equal('Modal label');
    });

    it('should render modal body', async () => {
      const el = await fixture(defaultModal);
      const body = el.querySelector('cds-modal-body');
      expect(body).to.exist;
      expect(body.textContent.trim()).to.include('Modal body content');
    });

    it('should automatically create modal-body if not provided', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <!-- no modal body -->
        </cds-modal>
      `);

      await el.updateComplete;

      const body = el.querySelector('cds-modal-body');
      expect(body).to.exist;
    });

    it('should render modal-body-content', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <cds-modal-body-content description>
              <p>This is the modal body content</p>
            </cds-modal-body-content>
          </cds-modal-body>
        </cds-modal>
      `);

      const bodyContent = el.querySelector('cds-modal-body-content');

      const styles = window.getComputedStyle(bodyContent);

      expect(bodyContent).to.exist;
      expect(bodyContent.textContent.trim()).to.include(
        'This is the modal body content'
      );
      expect(styles.display).to.equal('block');
    });

    it('should render modal footer with buttons', async () => {
      const el = await fixture(defaultModal);
      const footer = el.querySelector('cds-modal-footer');
      expect(footer).to.exist;

      const buttons = footer.querySelectorAll('cds-modal-footer-button');
      expect(buttons.length).to.equal(2);
      expect(buttons[0].textContent).to.equal('Cancel');
      expect(buttons[1].textContent).to.equal('Add');
    });

    it('should add extra classes via class attribute', async () => {
      const el = await fixture(html`
        <cds-modal open class="test-class">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);
      expect(el.classList.contains('test-class')).to.be.true;
    });

    it('should apply custom container class', async () => {
      const el = await fixture(html`
        <cds-modal open container-class="test-class">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      expect(el.containerClass).to.equal('test-class');
      const container = el.shadowRoot.querySelector('.cds--modal-container');
      expect(container.classList.contains('test-class')).to.be.true;
    });

    it('should set custom id when provided', async () => {
      const el = await fixture(html`
        <cds-modal open id="custom-modal-id">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);
      expect(el.id).to.equal('custom-modal-id');
    });

    it('should forward additional attributes on the outermost element', async () => {
      const el = await fixture(html`
        <cds-modal open data-testid="test-id">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      expect(el).to.have.attribute('data-testid', 'test-id');
    });

    it('should respect size attribute', async () => {
      const el = await fixture(html`
        <cds-modal open size="xs">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);
      expect(el.size).to.equal('xs');
      const container = el.shadowRoot.querySelector('[part="dialog"]');
      expect(container.classList.contains(`${prefix}--modal-container--xs`)).to
        .be.true;
    });

    it('should support full-width attribute', async () => {
      const el = await fixture(html`
        <cds-modal open full-width>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      const modalBody = el.querySelector('cds-modal-body');

      expect(el.fullWidth).to.be.true;
      const styles = window.getComputedStyle(modalBody);
      expect(styles.padding).to.equal('0px');
      expect(styles.margin).to.equal('0px');
    });
  });

  describe('Footer buttons', function () {
    it('should support three footer buttons', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >First button</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="secondary"
              >Second button</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="primary"
              >Add</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      const footerButtons = el.querySelectorAll('cds-modal-footer-button');
      expect(footerButtons.length).to.equal(3);
      expect(
        el.querySelector('cds-modal-footer').hasAttribute('has-three-buttons')
      ).to.be.true;
      expect(footerButtons[0].textContent.trim()).to.equal('First button');
      expect(footerButtons[1].textContent.trim()).to.equal('Second button');
      expect(footerButtons[2].textContent.trim()).to.equal('Add');
    });

    it('should disable buttons when loading status is active and enable when inactive', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >Cancel</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="primary"
              >Save</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      await el.updateComplete;

      const secondaryButton = el.querySelector(
        'cds-modal-footer-button[kind="secondary"]'
      );
      const primaryButton = el.querySelector(
        'cds-modal-footer-button[kind="primary"]'
      );

      // buttons enabled by default
      expect(secondaryButton.hasAttribute('disabled')).to.be.false;
      expect(primaryButton.style.display).to.not.equal('none');

      // Set loading status to active
      el.setAttribute('loading-status', 'active');
      el.setAttribute('loading-description', 'Loading...');
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));

      // buttons disabled
      expect(el.loadingStatus).to.equal('active');
      expect(secondaryButton.hasAttribute('disabled')).to.be.true;
      expect(primaryButton.style.display).to.equal('none');

      // Set loading status to inactive
      el.setAttribute('loading-status', 'inactive');
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));

      // buttons enabled
      expect(el.loadingStatus).to.equal('inactive');
      expect(secondaryButton.hasAttribute('disabled')).to.be.false;
      expect(primaryButton.style.display).to.not.equal('none');
    });

    it('should not disable secondary buttons when loading with three buttons', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >First button</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="secondary"
              >Second button</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="primary"
              >Add</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      await el.updateComplete;

      const secondaryButtons = el.querySelectorAll(
        'cds-modal-footer-button[kind="secondary"]'
      );
      const primaryButton = el.querySelector(
        'cds-modal-footer-button[kind="primary"]'
      );

      // Set loading status to active
      el.setAttribute('loading-status', 'active');
      el.setAttribute('loading-description', 'Loading...');
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));

      // secondary buttons should NOT be disabled
      expect(el.loadingStatus).to.equal('active');
      expect(secondaryButtons[0].hasAttribute('disabled')).to.be.false;
      expect(secondaryButtons[1].hasAttribute('disabled')).to.be.false;
      expect(primaryButton.style.display).to.equal('none');
    });
  });

  describe('Open/Close behavior', function () {
    it('should be closed by default', async () => {
      const el = await fixture(html`
        <cds-modal>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);
      expect(el.open).to.be.false;
    });

    it('should open when open attribute is set', async () => {
      const el = await fixture(defaultModal);
      expect(el.open).to.be.true;
    });

    it('should close modal when close button is clicked', async () => {
      const el = await fixture(defaultModal);
      const closeButton = el.querySelector('cds-modal-close-button');

      expect(el.open).to.be.true;

      setTimeout(() => closeButton.click());
      const { detail } = await oneEvent(el, `${prefix}-modal-closed`);

      expect(el.open).to.be.false;
      expect(detail.triggeredBy).to.equal(closeButton);
    });

    it('should fire beingclosed event before closing', async () => {
      const el = await fixture(defaultModal);
      const closeButton = el.querySelector('cds-modal-close-button');

      let beingClosedFired = false;
      el.addEventListener(`${prefix}-modal-beingclosed`, () => {
        beingClosedFired = true;
      });

      setTimeout(() => closeButton.click());
      await oneEvent(el, `${prefix}-modal-closed`);

      expect(beingClosedFired).to.be.true;
    });

    it('should allow preventing close via beingclosed event', async () => {
      const el = await fixture(defaultModal);
      const closeButton = el.querySelector('cds-modal-close-button');

      el.addEventListener(`${prefix}-modal-beingclosed`, (event) => {
        event.preventDefault();
      });

      closeButton.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
    });

    it('should close on Escape key', async () => {
      const el = await fixture(defaultModal);

      expect(el.open).to.be.true;

      setTimeout(() => {
        const event = new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
          composed: true,
        });
        el.dispatchEvent(event);
      });

      await oneEvent(el, `${prefix}-modal-closed`);
      expect(el.open).to.be.false;
    });

    it('should not close on click outside when prevent-close-on-click-outside is true', async () => {
      const el = await fixture(html`
        <cds-modal open prevent-close-on-click-outside>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      expect(el.preventCloseOnClickOutside).to.be.true;
      expect(el.open).to.be.true;

      el.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
    });

    it('should close on click outside when prevent-close-on-click-outside is false', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      expect(el.preventCloseOnClickOutside).to.be.false;
      expect(el.open).to.be.true;

      el.click();
      await el.updateComplete;

      expect(el.open).to.be.false;
    });

    it('should not close when prevent-close is set', async () => {
      const el = await fixture(html`
        <cds-modal open prevent-close>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      const closeButton = el.querySelector('cds-modal-close-button');
      closeButton.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
    });

    it('should not fire close events when inner content is clicked', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <p>Modal body content</p>
            <input type="text" />
          </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >Cancel</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="primary"
              >Save</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      let closeEventFired = false;
      el.addEventListener(`${prefix}-modal-closed`, () => {
        closeEventFired = true;
      });

      el.addEventListener(`${prefix}-modal-beingclosed`, () => {
        closeEventFired = true;
      });

      const body = el.querySelector('cds-modal-body');
      body.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
      expect(closeEventFired).to.be.false;
    });

    it('should respect data-modal-close attribute', async () => {
      const el = await fixture(defaultModal);
      const secondaryButton = el.querySelector(
        'cds-modal-footer-button[kind="secondary"]'
      );

      expect(el.open).to.be.true;

      setTimeout(() => secondaryButton.click());
      await oneEvent(el, `${prefix}-modal-closed`);

      expect(el.open).to.be.false;
    });
  });

  describe('Alert modal', function () {
    it('should have alert role when alert attribute is set', async () => {
      const el = await fixture(html`
        <cds-modal open alert>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Alert modal</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>This is an alert</cds-modal-body>
        </cds-modal>
      `);

      expect(el.alert).to.be.true;
      const container = el.shadowRoot.querySelector('[role="alert"]');
      expect(container).to.exist;
    });

    it('should have dialog role when alert is not set', async () => {
      const el = await fixture(defaultModal);

      expect(el.alert).to.be.false;
      const container = el.shadowRoot.querySelector('[role="dialog"]');
      expect(container).to.exist;
    });
  });

  describe('Accessibility', function () {
    it('should have aria-modal attribute', async () => {
      const el = await fixture(defaultModal);
      const container = el.shadowRoot.querySelector('[aria-modal]');
      expect(container).to.exist;
      expect(container.getAttribute('aria-modal')).to.equal('true');
    });

    /*
     * The modal's `aria-label` handling is determined via (in order of precedence):
     * 1. modal-label
     * 2. aria-label
     * 3. modal-heading
     */

    it('should compute aria-label from modal-label', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header aria-label="Custom label">
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-label>Modal label</cds-modal-label>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      await el.updateComplete;
      const container = el.shadowRoot.querySelector('[aria-label]');
      expect(container.getAttribute('aria-label')).to.equal('Modal label');
    });

    it('should compute aria-label from aria-label attribute if there is no modal-label', async () => {
      const el = await fixture(html`
        <cds-modal open aria-label="Custom label">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      await el.updateComplete;
      const container = el.shadowRoot.querySelector('[aria-label]');
      expect(container.getAttribute('aria-label')).to.equal('Custom label');
    });

    it('should compute aria-label from modal-heading as a final fallback', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      await el.updateComplete;
      const container = el.shadowRoot.querySelector('[aria-label]');
      expect(container.getAttribute('aria-label')).to.equal('Modal heading');
    });

    it('should not place the close button svg icon in the accessibility tree', async () => {
      const el = await fixture(defaultModal);
      const closeButton = el.querySelector('cds-modal-close-button');

      await el.updateComplete;
      await closeButton.updateComplete;

      const icon = closeButton.shadowRoot.querySelector('svg');
      expect(icon.getAttribute('aria-hidden')).to.equal('true');
    });
  });

  describe('Scrolling content', function () {
    it('should support has-scrolling-content attribute', async () => {
      const el = await fixture(html`
        <cds-modal open has-scrolling-content>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body with scrolling content</cds-modal-body>
        </cds-modal>
      `);

      expect(el.hasScrollingContent).to.be.true;
      const indicator = el.shadowRoot.querySelector(
        '.cds--modal-content--overflow-indicator'
      );
      expect(indicator).to.exist;
    });

    it('should not show overflow indicator when has-scrolling-content is false', async () => {
      const el = await fixture(defaultModal);

      expect(el.hasScrollingContent).to.be.false;
      const indicator = el.shadowRoot.querySelector(
        '.cds--modal-content--overflow-indicator'
      );
      expect(indicator).to.not.exist;
    });

    it('should set tabindex="0" on modal body when content is scrollable', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body style="height: 100px; overflow: auto;">
            <p style="height: 500px;">Very long scrollable content</p>
          </cds-modal-body>
        </cds-modal>
      `);

      const body = el.querySelector('cds-modal-body');
      await body.updateComplete;

      expect(body.hasAttribute('is-scrollable')).to.be.true;
      expect(body.getAttribute('tabindex')).to.equal('0');
    });

    it('should not set tabindex when content is not scrollable', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <p>Short content</p>
          </cds-modal-body>
        </cds-modal>
      `);

      const body = el.querySelector('cds-modal-body');
      await body.updateComplete;

      expect(body.hasAttribute('is-scrollable')).to.be.false;
      expect(body.hasAttribute('tabindex')).to.be.false;
    });

    it('should respect user-defined tabindex on modal body', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body tabindex="-1" style="height: 100px; overflow: auto;">
            <p style="height: 500px;">Very long scrollable content</p>
          </cds-modal-body>
        </cds-modal>
      `);

      const body = el.querySelector('cds-modal-body');
      await body.updateComplete;

      expect(body.getAttribute('tabindex')).to.equal('-1');
    });

    it('should set no-fade attribute when body height is <= 300px', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body style="height: 200px;">
            <p style="height: 500px;">Very long scrollable content</p>
          </cds-modal-body>
        </cds-modal>
      `);

      const body = el.querySelector('cds-modal-body');
      await body.updateComplete;

      expect(body.hasAttribute('no-fade')).to.be.true;
    });

    it('should remove no-fade attribute when body height is > 300px', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body style="height: 400px;">
            <p>Content in larger body</p>
          </cds-modal-body>
        </cds-modal>
      `);

      const body = el.querySelector('cds-modal-body');
      await body.updateComplete;

      expect(body.hasAttribute('no-fade')).to.be.false;
    });

    it('should set no-fade attribute when body contains autoalign element', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body style="height: 400px;">
            <select autoalign>
              Example autoalign element
            </select>
          </cds-modal-body>
        </cds-modal>
      `);

      const body = el.querySelector('cds-modal-body');
      await body.updateComplete;

      expect(body.hasAttribute('no-fade')).to.be.true;
    });
  });

  describe('Loading states', function () {
    it('should support loading-status attribute', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >Cancel</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="primary"
              >Save</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      el.setAttribute('loading-status', 'active');
      el.setAttribute('loading-description', 'Loading...');
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));

      const loadingEl = el
        .querySelector('cds-modal-footer')
        .querySelector('cds-inline-loading');
      expect(el.loadingStatus).to.equal('active');
      expect(el.loadingDescription).to.equal('Loading...');
      expect(loadingEl).to.exist;
      expect(loadingEl.textContent).to.equal('Loading...');
      expect(loadingEl.status).to.equal('active');
    });

    it('should fire on-loadingsuccess event when loading finishes', async () => {
      const el = await fixture(html`
        <cds-modal open loading-status="finished" loading-success-delay="100">
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >Cancel</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="primary"
              >Save</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      await el.updateComplete;

      const event = await oneEvent(el, `${prefix}-modal-on-loadingsuccess`);
      expect(event).to.exist;
    });
  });

  describe('Submit on Enter', function () {
    it('should submit on Enter key when should-submit-on-enter is set', async () => {
      const el = await fixture(html`
        <cds-modal open should-submit-on-enter>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body> </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >Cancel</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="primary"
              >Save</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      expect(el.shouldSubmitOnEnter).to.be.true;

      const primaryButton = el.querySelector(
        'cds-modal-footer-button[kind="primary"]'
      );

      let buttonClicked = false;

      primaryButton.addEventListener('click', () => {
        buttonClicked = true;
      });

      // Press Enter key
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        composed: true,
      });

      el.dispatchEvent(enterEvent);
      await el.updateComplete;

      expect(buttonClicked).to.be.true;
    });

    it('should NOT submit on Enter key when should-submit-on-enter is not set', async () => {
      const el = await fixture(html`
        <cds-modal open>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body> </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >Cancel</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="primary"
              >Save</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      expect(el.shouldSubmitOnEnter).to.be.false;

      const primaryButton = el.querySelector(
        'cds-modal-footer-button[kind="primary"]'
      );

      // move focus away from primary button
      el.querySelector('cds-modal-body').focus();

      let buttonClicked = false;
      primaryButton.addEventListener('click', () => {
        buttonClicked = true;
      });

      // Press Enter key
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        composed: true,
      });

      el.dispatchEvent(enterEvent);
      await el.updateComplete;

      expect(buttonClicked).to.be.false;
    });

    it('should NOT double submit when primary button is focused and Enter is pressed', async () => {
      const el = await fixture(html`
        <cds-modal open should-submit-on-enter>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body> </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >Cancel</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="primary"
              >Save</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      expect(el.shouldSubmitOnEnter).to.be.true;

      const primaryButton = el.querySelector(
        'cds-modal-footer-button[kind="primary"]'
      );
      let eventCount = 0;

      primaryButton.addEventListener('click', () => {
        eventCount++;
      });

      primaryButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          eventCount++;
        }
      });

      // focus the primary button
      primaryButton.shadowRoot.querySelector('button').focus();
      await el.updateComplete;

      // Press Enter key
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        composed: true,
      });

      primaryButton.dispatchEvent(enterEvent);
      await el.updateComplete;

      expect(eventCount).to.equal(1);
    });
  });

  describe('Focus management', function () {
    it('should focus primary button on open', async () => {
      const el = await fixture(defaultModal);

      el.open = true;
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));

      const primaryButton = el.querySelector(
        'cds-modal-footer-button[kind="primary"]'
      );
      expect(document.activeElement).to.equal(primaryButton);
    });

    it('should focus secondary button on open when primary button has kind="danger"', async () => {
      const el = await fixture(html`
        <cds-modal>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >Cancel</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="danger"
              >Save</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      el.open = true;
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));

      const secondaryButton = el.querySelector(
        'cds-modal-footer-button[kind="secondary"]'
      );
      expect(document.activeElement).to.equal(secondaryButton);
    });

    it('should focus close button on open when modal is passive', async () => {
      const el = await fixture(html`
        <cds-modal>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>Modal body</cds-modal-body>
        </cds-modal>
      `);

      el.open = true;
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));

      const closeButton = el.querySelector('cds-modal-close-button');
      expect(document.activeElement).to.equal(closeButton);
    });

    it('should focus element with data-modal-primary-focus', async () => {
      const el = await fixture(html`
        <cds-modal>
          <cds-modal-header>
            <cds-modal-close-button></cds-modal-close-button>
            <cds-modal-heading>Modal heading</cds-modal-heading>
          </cds-modal-header>
          <cds-modal-body>
            <input type="text" data-modal-primary-focus />
          </cds-modal-body>
          <cds-modal-footer>
            <cds-modal-footer-button kind="secondary"
              >Cancel</cds-modal-footer-button
            >
            <cds-modal-footer-button kind="primary"
              >Save</cds-modal-footer-button
            >
          </cds-modal-footer>
        </cds-modal>
      `);

      el.open = true;
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 0));

      const input = el.querySelector('input[type="text"]');
      expect(document.activeElement).to.equal(input);
    });
  });
});
