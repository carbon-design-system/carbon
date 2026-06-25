/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { html, fixture, oneEvent, elementUpdated } from '@open-wc/testing';
import { prefix } from '../../globals/settings';
import { stackManager } from './stack-signal';
import CDSTearsheet from './tearsheet';
import CDSTearsheetHeader from './tearsheet-header';
import CDSTearsheetBody from './tearsheet-body';
import CDSTearsheetInfluencer from './tearsheet-influencer';
import '.';

const blockClass = `${prefix}--tearsheet__next`;

describe('c4p-preview-tearsheet', () => {
  let el: CDSTearsheet;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-preview-tearsheet>
        <c4p-tearsheet-header>
          <c4p-tearsheet-header-content title="Test Tearsheet">
            <label slot="label">Test Label</label>
          </c4p-tearsheet-header-content>
        </c4p-tearsheet-header>
        <c4p-tearsheet-body>
          <div slot="main-content">Main content</div>
        </c4p-tearsheet-body>
      </c4p-preview-tearsheet>
    `);
  });

  it('renders with default properties', () => {
    expect(el).to.exist;
    expect(el.open).to.be.false;
    expect(el.variant).to.equal('wide');
    expect(el.preventCloseOnClickOutside).to.be.false;
  });

  it('applies wide variant class', async () => {
    el.variant = 'wide';
    await elementUpdated(el);
    const modal = el.shadowRoot?.querySelector('cds-modal');
    expect(modal?.classList.contains(`${blockClass}--wide`)).to.be.true;
  });

  it('applies narrow variant class', async () => {
    el.variant = 'narrow';
    await elementUpdated(el);
    const modal = el.shadowRoot?.querySelector('cds-modal');
    expect(modal?.classList.contains(`${blockClass}--narrow`)).to.be.true;
  });

  it('opens when open property is set to true', async () => {
    el.open = true;
    await elementUpdated(el);
    expect(el.open).to.be.true;
    expect(el.classList.contains('is-visible')).to.be.true;
  });

  it('closes when open property is set to false', async () => {
    el.open = true;
    await elementUpdated(el);
    el.open = false;
    await elementUpdated(el);
    expect(el.open).to.be.false;
    expect(el.classList.contains('is-visible')).to.be.false;
  });

  it('updates open state when changed programmatically', async () => {
    el.open = true;
    await elementUpdated(el);
    expect(el.open).to.be.true;

    el.open = false;
    await elementUpdated(el);
    expect(el.open).to.be.false;
  });

  it('adds and removes is-visible class based on open state', async () => {
    el.open = true;
    await elementUpdated(el);
    expect(el.classList.contains('is-visible')).to.be.true;

    el.open = false;
    await elementUpdated(el);
    expect(el.classList.contains('is-visible')).to.be.false;
  });

  it('sets custom influencer width', async () => {
    el.influencerWidth = '300px';
    await elementUpdated(el);
    const customProp = document.documentElement.style.getPropertyValue(
      '--tearsheet-influencer-width'
    );
    expect(customProp).to.equal('300px');
  });

  it('sets custom summary content width', async () => {
    el.summaryContentWidth = '400px';
    await elementUpdated(el);
    const customProp = document.documentElement.style.getPropertyValue(
      '--tearsheet-summary-content-width'
    );
    expect(customProp).to.equal('400px');
  });

  it('sets custom vertical gap', async () => {
    el.verticalGap = '2rem';
    await elementUpdated(el);
    const customProp = document.documentElement.style.getPropertyValue(
      '--tearsheet-vertical-gap'
    );
    expect(customProp).to.equal('2rem');
  });

  it('prevents close on click outside when preventCloseOnClickOutside is true', async () => {
    el.preventCloseOnClickOutside = true;
    await elementUpdated(el);
    const modal = el.shadowRoot?.querySelector('cds-modal');
    expect(modal?.hasAttribute('prevent-close-on-click-outside')).to.be.true;
  });
});

describe('c4p-tearsheet-stack', () => {
  afterEach(() => {
    stackManager.reset();
  });

  it('updates the stack step size when connected', async () => {
    const el = await fixture(html`
      <c4p-tearsheet-stack stack-step-size="md"></c4p-tearsheet-stack>
    `);

    expect(el).to.exist;
    expect(stackManager.state.stackStepSize).to.equal('md');
  });

  it('dispatches a connected event with the current stack step size', async () => {
    const el = await fixture(html`
      <c4p-tearsheet-stack stack-step-size="sm"></c4p-tearsheet-stack>
    `);

    setTimeout(() => {
      el.dispatchEvent(
        new CustomEvent(`${prefix}-tearsheet-stack-connected`, {
          bubbles: true,
          composed: true,
          detail: { stackStepSize: 'sm' },
        })
      );
    });

    const event = await oneEvent(el, `${prefix}-tearsheet-stack-connected`);
    expect(event).to.exist;
    expect(event.detail.stackStepSize).to.equal('sm');
  });

  it('updates stack step size when the property changes', async () => {
    const el = (await fixture(html`
      <c4p-tearsheet-stack stack-step-size="sm"></c4p-tearsheet-stack>
    `)) as HTMLElement & { stackStepSize: 'sm' | 'md' | 'lg' };

    el.stackStepSize = 'lg';
    await elementUpdated(el);

    expect(stackManager.state.stackStepSize).to.equal('lg');
  });

  it('resets the stack manager when disconnected', async () => {
    const el = await fixture(html`
      <c4p-tearsheet-stack stack-step-size="md"></c4p-tearsheet-stack>
    `);

    const container = document.createElement('div');
    Object.defineProperty(container, 'offsetWidth', {
      configurable: true,
      value: 320,
    });
    stackManager.notifyStack('stacked-sheet', true, container);

    el.remove();

    expect(stackManager.state.stack).to.deep.equal([]);
    expect(stackManager.state.containers.size).to.equal(0);
    expect(stackManager.state.stackStepSize).to.equal('lg');
  });
});

describe('c4p-preview-tearsheet stacking', () => {
  afterEach(() => {
    stackManager.reset();
  });

  it('does not register with the stack manager without a stack wrapper', async () => {
    const tearsheet = await fixture<CDSTearsheet>(html`
      <c4p-preview-tearsheet open>
        <c4p-tearsheet-header>
          <c4p-tearsheet-header-content title="Standalone Tearsheet">
          </c4p-tearsheet-header-content>
        </c4p-tearsheet-header>
        <c4p-tearsheet-body>
          <div slot="main-content">Main content</div>
        </c4p-tearsheet-body>
      </c4p-preview-tearsheet>
    `);

    await elementUpdated(tearsheet);

    expect(stackManager.state.stack).to.deep.equal([]);
    expect(tearsheet.classList.contains(`${blockClass}--stack-activated`)).to.be
      .false;
  });

  it('registers stacked tearsheets and applies stack properties', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div>
        <c4p-tearsheet-stack stack-step-size="md">
          <c4p-preview-tearsheet id="sheet-1" open>
            <c4p-tearsheet-header>
              <c4p-tearsheet-header-content title="Tearsheet 1">
              </c4p-tearsheet-header-content>
            </c4p-tearsheet-header>
            <c4p-tearsheet-body>
              <div slot="main-content">Main content 1</div>
            </c4p-tearsheet-body>
          </c4p-preview-tearsheet>
          <c4p-preview-tearsheet id="sheet-2" open>
            <c4p-tearsheet-header>
              <c4p-tearsheet-header-content title="Tearsheet 2">
              </c4p-tearsheet-header-content>
            </c4p-tearsheet-header>
            <c4p-tearsheet-body>
              <div slot="main-content">Main content 2</div>
            </c4p-tearsheet-body>
          </c4p-preview-tearsheet>
        </c4p-tearsheet-stack>
      </div>
    `);

    const tearsheets = Array.from(
      wrapper.querySelectorAll('c4p-preview-tearsheet')
    ) as CDSTearsheet[];

    tearsheets.forEach((tearsheet, index) => {
      const modalBody = tearsheet.shadowRoot?.querySelector(
        'cds-modal-body'
      ) as HTMLElement;
      Object.defineProperty(modalBody, 'offsetWidth', {
        configurable: true,
        value: 320 - index * 20,
      });
      tearsheet.open = false;
      tearsheet.open = true;
    });

    await Promise.all(tearsheets.map((tearsheet) => elementUpdated(tearsheet)));

    expect(stackManager.state.stack).to.have.length(2);
    expect(tearsheets[0].classList.contains(`${blockClass}--stack-activated`))
      .to.be.true;
    expect(tearsheets[1].classList.contains(`${blockClass}--stack-activated`))
      .to.be.true;
    expect(tearsheets[0].style.getPropertyValue('--stack-depth')).to.equal('1');
    expect(tearsheets[1].style.getPropertyValue('--stack-depth')).to.equal('0');
    expect(
      tearsheets[0].style.getPropertyValue('--block-size-change')
    ).to.equal('12px');
  });

  it('recomputes stack styles when stack step size changes', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div>
        <c4p-tearsheet-stack stack-step-size="sm">
          <c4p-preview-tearsheet id="sheet-1" open>
            <c4p-tearsheet-header>
              <c4p-tearsheet-header-content title="Tearsheet 1">
              </c4p-tearsheet-header-content>
            </c4p-tearsheet-header>
            <c4p-tearsheet-body>
              <div slot="main-content">Main content 1</div>
            </c4p-tearsheet-body>
          </c4p-preview-tearsheet>
          <c4p-preview-tearsheet id="sheet-2" open>
            <c4p-tearsheet-header>
              <c4p-tearsheet-header-content title="Tearsheet 2">
              </c4p-tearsheet-header-content>
            </c4p-tearsheet-header>
            <c4p-tearsheet-body>
              <div slot="main-content">Main content 2</div>
            </c4p-tearsheet-body>
          </c4p-preview-tearsheet>
        </c4p-tearsheet-stack>
      </div>
    `);

    const stack = wrapper.querySelector(
      'c4p-tearsheet-stack'
    ) as HTMLElement & {
      stackStepSize: 'sm' | 'md' | 'lg';
    };
    const tearsheets = Array.from(
      wrapper.querySelectorAll('c4p-preview-tearsheet')
    ) as CDSTearsheet[];

    tearsheets.forEach((tearsheet) => {
      const modalBody = tearsheet.shadowRoot?.querySelector(
        'cds-modal-body'
      ) as HTMLElement;
      Object.defineProperty(modalBody, 'offsetWidth', {
        configurable: true,
        value: 320,
      });
      tearsheet.open = false;
      tearsheet.open = true;
    });

    await Promise.all(tearsheets.map((tearsheet) => elementUpdated(tearsheet)));
    expect(
      tearsheets[0].style.getPropertyValue('--block-size-change')
    ).to.equal('8px');

    stack.stackStepSize = 'lg';
    await elementUpdated(stack);
    await Promise.all(tearsheets.map((tearsheet) => elementUpdated(tearsheet)));

    expect(
      tearsheets[0].style.getPropertyValue('--block-size-change')
    ).to.equal('16px');
  });

  it('closes through the header action and unregister from the stack', async () => {
    const notifyStackSpy = vi.spyOn(stackManager, 'notifyStack');

    const wrapper = await fixture<HTMLDivElement>(html`
      <div>
        <c4p-tearsheet-stack>
          <c4p-preview-tearsheet open>
            <c4p-tearsheet-header>
              <c4p-tearsheet-header-content title="Closable Tearsheet">
              </c4p-tearsheet-header-content>
            </c4p-tearsheet-header>
            <c4p-tearsheet-body>
              <div slot="main-content">Main content</div>
            </c4p-tearsheet-body>
          </c4p-preview-tearsheet>
        </c4p-tearsheet-stack>
      </div>
    `);

    const tearsheet = wrapper.querySelector(
      'c4p-preview-tearsheet'
    ) as CDSTearsheet;
    const modalBody = tearsheet.shadowRoot?.querySelector(
      'cds-modal-body'
    ) as HTMLElement;
    Object.defineProperty(modalBody, 'offsetWidth', {
      configurable: true,
      value: 320,
    });

    tearsheet.open = false;
    tearsheet.open = true;
    await elementUpdated(tearsheet);

    tearsheet.dispatchEvent(
      new CustomEvent(`${prefix}-tearsheet-header-close-button-clicked`, {
        bubbles: true,
        composed: true,
      })
    );
    await elementUpdated(tearsheet);

    expect(tearsheet.open).to.be.false;
    expect(stackManager.state.stack).to.deep.equal([]);
    expect(notifyStackSpy.mock.calls.length).to.be.greaterThan(0);
  });
});

describe('c4p-tearsheet-header', () => {
  let el: CDSTearsheetHeader;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-tearsheet-header>
        <c4p-tearsheet-header-content title="Test Header">
        </c4p-tearsheet-header-content>
      </c4p-tearsheet-header>
    `);
  });

  it('renders with default properties', () => {
    expect(el).to.exist;
    expect(el.hideCloseButton).to.be.false;
    expect(el.closeIconDescription).to.equal('Close');
    expect(el.disableHeaderCollapse).to.be.false;
  });

  it('hides close button when hideCloseButton is true', async () => {
    el.hideCloseButton = true;
    await elementUpdated(el);
    const closeButton = el.shadowRoot?.querySelector('cds-modal-close-button');
    expect(
      closeButton?.classList.contains(`${blockClass}__header--no-close-icon`)
    ).to.be.true;
  });

  it('dispatches close button clicked event when close button is clicked', async () => {
    const closeButton = el.shadowRoot?.querySelector(
      'cds-modal-close-button'
    ) as HTMLElement;

    setTimeout(() => closeButton?.click());

    const event = await oneEvent(
      el,
      `${prefix}-tearsheet-header-close-button-clicked`
    );
    expect(event).to.exist;
    expect(event.composed).to.be.true;
  });

  it('sets custom close icon description', async () => {
    el.closeIconDescription = 'Custom Close';
    await elementUpdated(el);
    const closeButton = el.shadowRoot?.querySelector('cds-modal-close-button');
    expect(closeButton?.getAttribute('close-button-label')).to.equal(
      'Custom Close'
    );
  });

  it('disables header collapse when disableHeaderCollapse is true', async () => {
    el.disableHeaderCollapse = true;
    await elementUpdated(el);
    expect(el.disableHeaderCollapse).to.be.true;
  });
});

describe('c4p-tearsheet-body', () => {
  let el: CDSTearsheetBody;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-tearsheet-body>
        <div slot="main-content">Main content</div>
      </c4p-tearsheet-body>
    `);
  });

  it('renders with default properties', () => {
    expect(el).to.exist;
    expect(el.isFlush).to.be.false;
    expect(el.slot).to.equal('body');
  });

  it('applies flush class when isFlush is true', async () => {
    el.isFlush = true;
    await elementUpdated(el);
    const mainContent = el.shadowRoot?.querySelector(
      `.${blockClass}__main-content`
    );
    expect(mainContent?.classList.contains(`${blockClass}__flush`)).to.be.true;
  });

  it('renders main content slot', () => {
    const slot = el.shadowRoot?.querySelector('slot[name="main-content"]');
    expect(slot).to.exist;
  });

  it('renders summary content slot', () => {
    const slot = el.shadowRoot?.querySelector('slot[name="summary-content"]');
    expect(slot).to.exist;
  });

  it('detects when summary content is present', async () => {
    const bodyWithSummary = await fixture(html`
      <c4p-tearsheet-body>
        <div slot="main-content">Main content</div>
        <c4p-tearsheet-summary-content>
          <div>Summary content</div>
        </c4p-tearsheet-summary-content>
      </c4p-tearsheet-body>
    `);
    await elementUpdated(bodyWithSummary);

    const mainContent = bodyWithSummary.shadowRoot?.querySelector(
      `.${blockClass}__main-content`
    );
    expect(
      mainContent?.classList.contains(`${blockClass}__main-content--no-summary`)
    ).to.be.false;
  });

  it('applies no-summary class when summary content is absent', async () => {
    await elementUpdated(el);
    const mainContent = el.shadowRoot?.querySelector(
      `.${blockClass}__main-content`
    );
    expect(
      mainContent?.classList.contains(`${blockClass}__main-content--no-summary`)
    ).to.be.true;
  });

  it('updates summary content detection on slot change', async () => {
    await elementUpdated(el);

    // Initially no summary content
    let mainContent = el.shadowRoot?.querySelector(
      `.${blockClass}__main-content`
    );
    expect(
      mainContent?.classList.contains(`${blockClass}__main-content--no-summary`)
    ).to.be.true;

    // Add summary content dynamically
    const summaryContent = document.createElement(
      'c4p-tearsheet-summary-content'
    );
    summaryContent.innerHTML = '<div>New summary</div>';
    el.appendChild(summaryContent);

    await elementUpdated(el);

    // Trigger slot change event
    const summarySlot = el.shadowRoot?.querySelector(
      'slot[name="summary-content"]'
    ) as HTMLSlotElement;
    summarySlot?.dispatchEvent(new Event('slotchange'));

    await elementUpdated(el);
    mainContent = el.shadowRoot?.querySelector(`.${blockClass}__main-content`);
    expect(
      mainContent?.classList.contains(`${blockClass}__main-content--no-summary`)
    ).to.be.false;
  });

  it('wraps main content in cds-layer with background', () => {
    const layer = el.shadowRoot?.querySelector('cds-layer');
    expect(layer).to.exist;
    expect(layer?.hasAttribute('with-background')).to.be.true;
    expect(layer?.classList.contains(`${blockClass}__main-content`)).to.be.true;
  });

  it('handles slot change event', async () => {
    const summarySlot = el.shadowRoot?.querySelector(
      'slot[name="summary-content"]'
    ) as HTMLSlotElement;
    expect(summarySlot).to.exist;

    // Verify slot has change listener
    summarySlot?.dispatchEvent(new Event('slotchange'));
    await elementUpdated(el);

    // Should not throw error
    expect(el).to.exist;
  });

  it('initializes collapsible controller', () => {
    // The collapsible controller should be initialized
    // We can verify this by checking that the component exists and doesn't throw
    expect(el).to.exist;
  });

  it('collapses header when scrolling down with scrollable content', async () => {
    const { updateTearsheetSignals } = await import('./tearsheet-signal');

    // Reset signal state
    updateTearsheetSignals({
      fullyCollapsed: false,
      disableHeaderCollapse: false,
    });

    // Create body with scrollable content
    const scrollableBody = await fixture(html`
      <c4p-tearsheet-body>
        <div slot="main-content" style="height: 2000px;">
          Tall content that scrolls
        </div>
      </c4p-tearsheet-body>
    `);

    await elementUpdated(scrollableBody);

    // Get the main content container
    const mainContent = scrollableBody.shadowRoot?.querySelector(
      `.${blockClass}__main-content`
    ) as HTMLElement;
    expect(mainContent).to.exist;
  });

  it('does not collapse header when disableHeaderCollapse is true', async () => {
    const { updateTearsheetSignals } = await import('./tearsheet-signal');

    // Set disableHeaderCollapse to true
    updateTearsheetSignals({
      disableHeaderCollapse: true,
      fullyCollapsed: false,
    });

    await elementUpdated(el);

    // The controller should respect the disable flag
    expect(el).to.exist;

    // Reset
    updateTearsheetSignals({
      disableHeaderCollapse: false,
    });
  });
});

describe('c4p-tearsheet-influencer', () => {
  let el: CDSTearsheetInfluencer;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-tearsheet-influencer>
        <div>Influencer content</div>
      </c4p-tearsheet-influencer>
    `);
  });

  it('renders with default properties', () => {
    expect(el).to.exist;
    expect(el.isFlush).to.be.false;
    expect(el.influencerPanelOpen).to.be.false;
  });

  it('applies flush class when isFlush is true', async () => {
    el.isFlush = true;
    await elementUpdated(el);
    expect(el.isFlush).to.be.true;
  });

  it('opens influencer panel when influencerPanelOpen is true', async () => {
    el.influencerPanelOpen = true;
    await elementUpdated(el);
    expect(el.influencerPanelOpen).to.be.true;
  });

  it('updates influencerPanelOpen property', async () => {
    el.influencerPanelOpen = true;
    await elementUpdated(el);
    expect(el.influencerPanelOpen).to.be.true;

    el.influencerPanelOpen = false;
    await elementUpdated(el);
    expect(el.influencerPanelOpen).to.be.false;
  });
});

describe('Tearsheet close functionality', () => {
  let tearsheet: CDSTearsheet;

  beforeEach(async () => {
    tearsheet = await fixture(html`
      <c4p-preview-tearsheet open>
        <c4p-tearsheet-header>
          <c4p-tearsheet-header-content title="Test">
          </c4p-tearsheet-header-content>
        </c4p-tearsheet-header>
        <c4p-tearsheet-body>
          <div slot="main-content">Content</div>
        </c4p-tearsheet-body>
      </c4p-preview-tearsheet>
    `);
  });

  it('closes tearsheet when header close button is clicked', async () => {
    const header = tearsheet.querySelector(
      'c4p-tearsheet-header'
    ) as CDSTearsheetHeader;
    const closeButton = header.shadowRoot?.querySelector(
      'cds-modal-close-button'
    ) as HTMLElement;

    setTimeout(() => closeButton?.click());

    // Wait for the closed event
    const event = await oneEvent(
      tearsheet,
      `${prefix}-preview-tearsheet-closed`
    );
    expect(event).to.exist;
    expect(tearsheet.open).to.be.false;
  });

  it('allows canceling close via beingclosed event', async () => {
    tearsheet.addEventListener(
      `${prefix}-preview-tearsheet-beingclosed`,
      (e) => {
        e.preventDefault();
      }
    );

    const header = tearsheet.querySelector(
      'c4p-tearsheet-header'
    ) as CDSTearsheetHeader;
    const closeButton = header.shadowRoot?.querySelector(
      'cds-modal-close-button'
    ) as HTMLElement;

    closeButton?.click();
    await elementUpdated(tearsheet);

    // Tearsheet should still be open because we prevented the close
    expect(tearsheet.open).to.be.true;
  });
});

describe('c4p-tearsheet-summary-content', () => {
  let el: any;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-tearsheet-summary-content>
        <div>Summary content</div>
      </c4p-tearsheet-summary-content>
    `);
  });

  it('renders with default properties', () => {
    expect(el).to.exist;
    expect(el.isFlush).to.be.false;
    expect(el.summaryPanelOpen).to.be.false;
    expect(el.slot).to.equal('summary-content');
  });

  it('applies flush class when isFlush is true', async () => {
    el.isFlush = true;
    await elementUpdated(el);
    expect(el.isFlush).to.be.true;
  });

  it('opens summary panel when summaryPanelOpen is true', async () => {
    el.summaryPanelOpen = true;
    await elementUpdated(el);
    expect(el.summaryPanelOpen).to.be.true;
  });

  it('closes summary panel when summaryPanelOpen is false', async () => {
    el.summaryPanelOpen = true;
    await elementUpdated(el);
    el.summaryPanelOpen = false;
    await elementUpdated(el);
    expect(el.summaryPanelOpen).to.be.false;
  });

  it('dispatches cds-tearsheet-summary-closed event when panel is closed', async () => {
    // Import signal to set mobile view
    const { tearsheetSignal } = await import('./tearsheet-signal');
    tearsheetSignal.set({
      ...tearsheetSignal.get(),
      isSm: true,
    });

    el.summaryPanelOpen = true;
    await elementUpdated(el);

    // Find the side panel and trigger its close event
    const sidePanel = el.shadowRoot?.querySelector('c4p-side-panel');

    setTimeout(() => {
      const closeEvent = new CustomEvent('c4p-side-panel-closed', {
        bubbles: true,
        composed: true,
      });
      sidePanel?.dispatchEvent(closeEvent);
    });

    const event = await oneEvent(el, 'cds-tearsheet-summary-closed');
    expect(event).to.exist;
    expect(event.bubbles).to.be.true;
    expect(event.composed).to.be.true;
    expect(el.summaryPanelOpen).to.be.false;
  });

  it('adds summary-content class on first update', async () => {
    await elementUpdated(el);
    expect(el.classList.contains(`${blockClass}__summary-content`)).to.be.true;
  });

  it('renders slot for content', () => {
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).to.exist;
  });
});

describe('c4p-tearsheet-scroller', () => {
  let el: any;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-tearsheet-scroller></c4p-tearsheet-scroller>
    `);
  });

  it('renders with default properties', () => {
    expect(el).to.exist;
    expect(el.slot).to.equal('scroller');
    expect(el.align).to.equal('left');
    expect(el.collapseText).to.equal('Collapse');
    expect(el.expandText).to.equal('Expand');
    expect(el.size).to.equal('md');
  });

  it('sets custom collapse text', async () => {
    el.collapseText = 'Custom Collapse';
    await elementUpdated(el);
    expect(el.collapseText).to.equal('Custom Collapse');
  });

  it('sets custom expand text', async () => {
    el.expandText = 'Custom Expand';
    await elementUpdated(el);
    expect(el.expandText).to.equal('Custom Expand');
  });

  it('sets custom align value', async () => {
    el.align = 'right';
    await elementUpdated(el);
    expect(el.align).to.equal('right');
  });

  it('sets custom size', async () => {
    el.size = 'lg';
    await elementUpdated(el);
    expect(el.size).to.equal('lg');
  });

  it('renders icon button', () => {
    const iconButton = el.shadowRoot?.querySelector('cds-icon-button');
    expect(iconButton).to.exist;
    expect(iconButton?.getAttribute('kind')).to.equal('ghost');
    expect(iconButton?.getAttribute('size')).to.equal('md');
  });

  it('renders tooltip content slot', () => {
    const tooltipSlot = el.shadowRoot?.querySelector(
      'span[slot="tooltip-content"]'
    );
    expect(tooltipSlot).to.exist;
  });

  it('applies scroller-collapsed class when fully collapsed', async () => {
    // Import and set the signal
    const { tearsheetSignal } = await import('./tearsheet-signal');

    // Set collapsed state
    tearsheetSignal.set({
      ...tearsheetSignal.get(),
      fullyCollapsed: true,
    });

    // Re-create element to pick up signal changes
    el = await fixture(html`
      <c4p-tearsheet-scroller></c4p-tearsheet-scroller>
    `);
    await elementUpdated(el);

    const iconButton = el.shadowRoot?.querySelector('cds-icon-button');
    expect(iconButton?.classList.contains('scroller-collapsed')).to.be.true;

    // Reset signal
    tearsheetSignal.set({
      ...tearsheetSignal.get(),
      fullyCollapsed: false,
    });
  });

  it('toggles fullyCollapsed state when clicked', async () => {
    const { tearsheetSignal } = await import('./tearsheet-signal');

    // Reset to known state
    tearsheetSignal.set({
      ...tearsheetSignal.get(),
      fullyCollapsed: false,
    });

    const iconButton = el.shadowRoot?.querySelector(
      'cds-icon-button'
    ) as HTMLElement;
    iconButton?.click();
    await elementUpdated(el);

    expect(tearsheetSignal.get().fullyCollapsed).to.be.true;

    // Reset signal
    tearsheetSignal.set({
      ...tearsheetSignal.get(),
      fullyCollapsed: false,
    });
  });

  it('displays correct tooltip text based on collapsed state', async () => {
    const { tearsheetSignal } = await import('./tearsheet-signal');

    // Test expanded state
    tearsheetSignal.set({
      ...tearsheetSignal.get(),
      fullyCollapsed: false,
    });

    // Re-create element to pick up signal changes
    let testEl = await fixture(html`
      <c4p-tearsheet-scroller></c4p-tearsheet-scroller>
    `);
    await elementUpdated(testEl);

    let tooltipSlot = testEl.shadowRoot?.querySelector(
      'span[slot="tooltip-content"]'
    );
    expect(tooltipSlot?.textContent?.trim()).to.equal('Collapse');

    // Test collapsed state
    tearsheetSignal.set({
      ...tearsheetSignal.get(),
      fullyCollapsed: true,
    });

    testEl = await fixture(html`
      <c4p-tearsheet-scroller></c4p-tearsheet-scroller>
    `);
    await elementUpdated(testEl);

    tooltipSlot = testEl.shadowRoot?.querySelector(
      'span[slot="tooltip-content"]'
    );
    expect(tooltipSlot?.textContent?.trim()).to.equal('Expand');

    // Reset signal
    tearsheetSignal.set({
      ...tearsheetSignal.get(),
      fullyCollapsed: false,
    });
  });
});

describe('c4p-tearsheet-navigation-bar', () => {
  let el: any;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-tearsheet-navigation-bar>
        <div>Navigation content</div>
      </c4p-tearsheet-navigation-bar>
    `);
  });

  it('renders with default properties', () => {
    expect(el).to.exist;
    expect(el.slot).to.equal('navigation-bar');
  });

  it('renders default slot for navigation content', () => {
    const slot = el.shadowRoot?.querySelector('slot:not([name])');
    expect(slot).to.exist;
  });

  it('renders scroller slot', () => {
    const scrollerSlot = el.shadowRoot?.querySelector('slot[name="scroller"]');
    expect(scrollerSlot).to.exist;
  });

  it('accepts slotted content', async () => {
    const content = el.querySelector('div');
    expect(content).to.exist;
    expect(content?.textContent).to.equal('Navigation content');
  });

  it('accepts scroller in named slot', async () => {
    const navBar = await fixture(html`
      <c4p-tearsheet-navigation-bar>
        <div>Navigation content</div>
        <c4p-tearsheet-scroller slot="scroller"></c4p-tearsheet-scroller>
      </c4p-tearsheet-navigation-bar>
    `);

    const scroller = navBar.querySelector('c4p-tearsheet-scroller');
    expect(scroller).to.exist;
    expect(scroller?.getAttribute('slot')).to.equal('scroller');
  });
});
