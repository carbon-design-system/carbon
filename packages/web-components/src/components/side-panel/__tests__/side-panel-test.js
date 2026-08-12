/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, oneEvent, expect } from '@open-wc/testing';
import { SIDE_PANEL_PLACEMENT, SIDE_PANEL_SIZE } from '../defs.js';
import { prefix } from '../../../globals/settings.js';
import '../index.js';
import CDSSidePanel from '../side-panel.js';
import {
  getActionItems,
  getActionToolbarItems,
  getContent,
  getSlug,
  getSubTitle,
} from '../_story-assets/index.js';

import '../../text-input/index.js';
import '../../slug/index.js';

const defaultProps = {
  animateTitle: true,
  includeOverlay: true,
  slideIn: false,
  selectorInitialFocus: '',
  label: '',
  open: true,
  placement: SIDE_PANEL_PLACEMENT.RIGHT,
  preventCloseOnClickOutside: false,
  selectorPageContent: '',
  hideCloseButton: false,
  size: SIDE_PANEL_SIZE.MEDIUM,
  title: 'Side panel title',
  condensedActions: false,
  resizable: false,
};

const blockClass = `${prefix}--side-panel`;

const template = (props = defaultProps, children = getContent(1)) => html`
  <cds-side-panel
    ?animate-title=${props.animateTitle}
    ?include-overlay=${props.includeOverlay && !props.slideIn}
    selector-initial-focus=${props.selectorInitialFocus}
    label-text="${props.label}"
    ?open=${props.open}
    placement=${props.placement}
    ?prevent-close-on-click-outside=${props.preventCloseOnClickOutside}
    selector-page-content=${props.selectorPageContent}
    ?hide-close-button=${props.hideCloseButton}
    size=${props.size}
    ?slide-in=${props.slideIn}
    .title=${props.title}>
    ${children}
  </cds-side-panel>
`;

describe('cds-side-panel', () => {
  it('should render a side panel', async () => {
    const sidePanel = await fixture(template());

    expect(sidePanel.open).to.be.true;
    expect(sidePanel).to.exist;
  });

  it('should render a side panel on the left', async () => {
    const sidePanel = await fixture(
      template({ ...defaultProps, placement: SIDE_PANEL_PLACEMENT.LEFT })
    );

    expect(sidePanel.placement).to.equal('left');
  });

  it('should render a side panel on the right', async () => {
    const sidePanel = await fixture(template());

    expect(sidePanel.placement).to.equal('right');
  });

  it('should render a side panel with overlay and close when clicked outside', async () => {
    const sidePanel = await fixture(template());

    expect(sidePanel.includeOverlay).to.be.true;

    const overlayElement = sidePanel.shadowRoot?.querySelector(
      `.${blockClass}__overlay`
    );
    expect(overlayElement).to.exist;
    expect(overlayElement?.getAttribute('tabindex')).to.equal('-1');
    expect(overlayElement?.hasAttribute('open')).to.be.true;
    expect(sidePanel.preventCloseOnClickOutside).to.be.false;

    const eventBeforeClose = oneEvent(sidePanel, CDSSidePanel.eventBeforeClose);
    const eventClose = oneEvent(sidePanel, CDSSidePanel.eventClose);

    overlayElement?.dispatchEvent(new Event('click'));

    const { detail: beforeCloseDetail } = await eventBeforeClose;
    const { detail: closeDetail } = await eventClose;

    expect(beforeCloseDetail?.triggeredBy).to.equal(overlayElement);
    expect(closeDetail?.triggeredBy).to.equal(overlayElement);

    await sidePanel.updateComplete;
    expect(sidePanel.open).to.be.false;
  });

  it('should close side panel on escape keydown', async () => {
    const sidePanel = await fixture(template());

    expect(sidePanel.open).to.be.true;

    const eventBeforeClose = oneEvent(sidePanel, CDSSidePanel.eventBeforeClose);
    const eventClose = oneEvent(sidePanel, CDSSidePanel.eventClose);

    document?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    const { detail: beforeCloseDetail } = await eventBeforeClose;
    const { detail: closeDetail } = await eventClose;

    expect(beforeCloseDetail?.triggeredBy).to.equal(document);
    expect(closeDetail?.triggeredBy).to.equal(document);

    expect(sidePanel.open).to.be.false;
  });

  it('should close side panel on the close button click', async () => {
    const sidePanel = await fixture(template());

    expect(sidePanel.open).to.be.true;
    expect(sidePanel.closeIconDescription).to.equal('Close');

    const closeButton = sidePanel.shadowRoot?.querySelector('cds-icon-button');
    expect(closeButton).to.exist;

    const eventBeforeClose = oneEvent(sidePanel, CDSSidePanel.eventBeforeClose);
    const eventClose = oneEvent(sidePanel, CDSSidePanel.eventClose);

    closeButton?.dispatchEvent(new Event('click'));

    const { detail: beforeCloseDetail } = await eventBeforeClose;
    const { detail: closeDetail } = await eventClose;

    expect(beforeCloseDetail?.triggeredBy).to.equal(closeButton);
    expect(closeDetail?.triggeredBy).to.equal(closeButton);

    expect(sidePanel.open).to.be.false;
  });

  it('should render a slug', async () => {
    const sidePanel = await fixture(template(defaultProps, getSlug(1)));

    expect(sidePanel.open).to.be.true;
    expect(sidePanel._hasSlug).to.be.true;

    const slug = sidePanel.querySelector('cds-slug');
    expect(slug).to.exist;
    expect(slug?.size).to.equal('xs');
  });

  it('should render action toolbar items', async () => {
    const sidePanel = await fixture(
      template(defaultProps, getActionToolbarItems(1))
    );

    expect(sidePanel.open).to.be.true;

    const copyButton = Array.prototype.find.call(
      sidePanel.querySelectorAll('cds-button'),
      (el) => el.innerHTML === 'Copy'
    );
    expect(copyButton).to.exist;
  });

  it('should render a slide-in side panel', async () => {
    const sidePanel = await fixture(
      template({ ...defaultProps, slideIn: true })
    );

    expect(sidePanel.slideIn).to.be.true;
    expect(sidePanel.includeOverlay).to.be.false;

    const overlayElement = sidePanel.shadowRoot?.querySelector(
      `.${blockClass}__overlay`
    );
    expect(overlayElement).to.be.null;
  });

  it('should call the eventNavigateBack callback', async () => {
    const sidePanel = await fixture(
      html`<cds-side-panel
        ?animate-title=${defaultProps.animateTitle}
        ?condensed-actions=${defaultProps.condensedActions}
        current-step="1"
        ?include-overlay=${defaultProps.includeOverlay && !defaultProps.slideIn}
        selector-initial-focus=${defaultProps.selectorInitialFocus}
        label-text="${defaultProps.label}"
        ?open=${defaultProps.open}
        placement=${defaultProps.placement}
        ?prevent-close-on-click-outside=${defaultProps.preventCloseOnClickOutside}
        selector-page-content=${defaultProps.selectorPageContent}
        size=${defaultProps.size}
        ?slide-in=${defaultProps.slideIn}
        .title=${defaultProps.title}>
        ${getContent(1)}
      </cds-side-panel>`
    );

    const backButton = sidePanel.shadowRoot?.querySelector(
      `.${prefix}--side-panel__navigation-back-button`
    );
    const eventNavigateBack = oneEvent(
      sidePanel,
      CDSSidePanel.eventNavigateBack
    );

    backButton?.dispatchEvent(new Event('click'));

    const { detail } = await eventNavigateBack;
    expect(detail).to.exist;
  });

  it('should render subtitle text', async () => {
    const sidePanel = await fixture(template(defaultProps, getSubTitle(1)));

    const subTitleText = sidePanel.querySelector(
      `.${prefix}--side-panel__subtitle-text`
    );
    expect(subTitleText).to.exist;
  });

  it('should render at least one action item', async () => {
    const sidePanel = await fixture(template(defaultProps, getActionItems(1)));
    await sidePanel.updateComplete;

    const actionItems = sidePanel.querySelectorAll(
      'cds-button[slot="actions"]'
    );
    expect(actionItems).to.have.lengthOf(1);
  });

  it('should render action items', async () => {
    const sidePanel = await fixture(template(defaultProps, getActionItems(6)));
    await sidePanel.updateComplete;

    const actionItems = sidePanel.querySelectorAll(
      'cds-button[slot="actions"]'
    );
    // getActionItems(6) returns 2 buttons (danger + primary)
    expect(actionItems).to.have.lengthOf(2);
  });

  it('should display a close button by default', async () => {
    const sidePanel = await fixture(template());

    expect(sidePanel.open).to.be.true;
    const closeButton = sidePanel.shadowRoot?.querySelector('cds-icon-button');
    expect(closeButton).to.exist;
  });

  it('should not display a close button when hideCloseButton prop is set to true', async () => {
    const sidePanel = await fixture(
      template({ ...defaultProps, hideCloseButton: true })
    );

    expect(sidePanel.open).to.be.true;
    expect(sidePanel.hideCloseButton).to.be.true;

    const closeButton = sidePanel.shadowRoot?.querySelector('cds-icon-button');
    expect(closeButton).to.be.null;
  });

  describe('Resizer functionality', () => {
    it('should not render resizer handle when resizable is false', async () => {
      const sidePanel = await fixture(
        template({ ...defaultProps, resizable: false })
      );

      const resizerHandle =
        sidePanel.shadowRoot?.querySelector('cds-resizer-handle');
      expect(resizerHandle).to.be.null;
    });

    it('should render resizer handle when resizable is true and viewport is wide enough', async () => {
      const originalInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const sidePanel = await fixture(html`
        <cds-side-panel
          ?animate-title=${defaultProps.animateTitle}
          ?include-overlay=${defaultProps.includeOverlay}
          ?open=${defaultProps.open}
          placement=${defaultProps.placement}
          size=${defaultProps.size}
          .title=${defaultProps.title}
          ?resizable=${true}>
          ${getContent(1)}
        </cds-side-panel>
      `);
      await sidePanel.updateComplete;

      const resizerHandle =
        sidePanel.shadowRoot?.querySelector('cds-resizer-handle');
      expect(resizerHandle).to.exist;
      expect(resizerHandle?.getAttribute('orientation')).to.equal('horizontal');

      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth,
      });
    });

    it('should not render resizer handle in slide-in mode even when resizable is true', async () => {
      const sidePanel = await fixture(html`
        <cds-side-panel
          ?animate-title=${defaultProps.animateTitle}
          ?open=${defaultProps.open}
          placement=${defaultProps.placement}
          size=${defaultProps.size}
          .title=${defaultProps.title}
          ?resizable=${true}
          ?slide-in=${true}>
          ${getContent(1)}
        </cds-side-panel>
      `);
      await sidePanel.updateComplete;

      const resizerHandle =
        sidePanel.shadowRoot?.querySelector('cds-resizer-handle');
      expect(resizerHandle).to.be.null;
    });

    it('should handle resize-start event', async () => {
      const sidePanel = await fixture(html`
        <cds-side-panel
          ?open=${true}
          placement=${SIDE_PANEL_PLACEMENT.RIGHT}
          size=${SIDE_PANEL_SIZE.MEDIUM}
          .title=${'Test Panel'}
          ?resizable=${true}>
          ${getContent(1)}
        </cds-side-panel>
      `);
      await sidePanel.updateComplete;

      sidePanel.dispatchEvent(
        new CustomEvent('resize-start', {
          bubbles: true,
          composed: true,
          detail: {},
        })
      );
      await sidePanel.updateComplete;

      expect(sidePanel._sidePanelWidth).to.be.greaterThan(0);
    });

    it('should handle resize-drag event and update panel width', async () => {
      const sidePanel = await fixture(html`
        <cds-side-panel
          ?open=${true}
          placement=${SIDE_PANEL_PLACEMENT.RIGHT}
          size=${SIDE_PANEL_SIZE.MEDIUM}
          .title=${'Test Panel'}
          ?resizable=${true}>
          ${getContent(1)}
        </cds-side-panel>
      `);
      await sidePanel.updateComplete;

      sidePanel.dispatchEvent(
        new CustomEvent('resize-start', { bubbles: true, composed: true })
      );
      sidePanel.dispatchEvent(
        new CustomEvent('resize-drag', {
          bubbles: true,
          composed: true,
          detail: { delta: 50, isKeyboard: false },
        })
      );
      await sidePanel.updateComplete;

      const customProperty = sidePanel.style.getPropertyValue(
        '--cds-side-panel-modified-size'
      );
      expect(customProperty).to.not.be.empty;
    });

    it('should handle resize-end event and reset accumulated delta', async () => {
      const sidePanel = await fixture(html`
        <cds-side-panel
          ?open=${true}
          placement=${SIDE_PANEL_PLACEMENT.RIGHT}
          size=${SIDE_PANEL_SIZE.MEDIUM}
          .title=${'Test Panel'}
          ?resizable=${true}>
          ${getContent(1)}
        </cds-side-panel>
      `);
      await sidePanel.updateComplete;

      sidePanel.dispatchEvent(
        new CustomEvent('resize-end', { bubbles: true, composed: true })
      );
      await sidePanel.updateComplete;

      expect(sidePanel._accumulatedDelta).to.equal(0);
    });

    it('should handle resize-reset event and remove custom size', async () => {
      const sidePanel = await fixture(html`
        <cds-side-panel
          ?open=${true}
          placement=${SIDE_PANEL_PLACEMENT.RIGHT}
          size=${SIDE_PANEL_SIZE.MEDIUM}
          .title=${'Test Panel'}
          ?resizable=${true}>
          ${getContent(1)}
        </cds-side-panel>
      `);
      await sidePanel.updateComplete;

      sidePanel.style.setProperty('--cds-side-panel-modified-size', '500px');
      sidePanel.dispatchEvent(
        new CustomEvent('resize-reset', { bubbles: true, composed: true })
      );
      await sidePanel.updateComplete;

      const customProperty = sidePanel.style.getPropertyValue(
        '--cds-side-panel-modified-size'
      );
      expect(customProperty).to.be.empty;
    });

    it('should have correct ARIA attributes on resizer handle', async () => {
      const originalInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const sidePanel = await fixture(html`
        <cds-side-panel
          ?open=${true}
          placement=${SIDE_PANEL_PLACEMENT.RIGHT}
          size=${SIDE_PANEL_SIZE.MEDIUM}
          .title=${'Test Panel'}
          ?resizable=${true}>
          ${getContent(1)}
        </cds-side-panel>
      `);
      await sidePanel.updateComplete;

      const resizerHandle =
        sidePanel.shadowRoot?.querySelector('cds-resizer-handle');

      expect(resizerHandle?.hasAttribute('aria-valuemin')).to.be.true;
      expect(resizerHandle?.hasAttribute('aria-valuemax')).to.be.true;
      expect(resizerHandle?.hasAttribute('aria-valuenow')).to.be.true;
      expect(resizerHandle?.hasAttribute('aria-label')).to.be.true;

      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth,
      });
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});
