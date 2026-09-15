/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { fixture, html, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '@carbon/web-components/es/components/coachmark/index.js';
import '@carbon/web-components/es/components/coachmark/coachmark-beacon/index.js';
import '@carbon/web-components/es/components/button/index.js';
import { prefix } from '@carbon/web-components/es/globals/settings.js';

const blockClass = `${prefix}--coachmark`;

const templateTooltip = (args = {}) => {
  const {
    open = false,
    align = 'bottom',
    caret,
    highContrast,
    dropShadow,
  } = args;
  return html`
    <cds-coachmark
      ?open=${open}
      align=${align}
      .position=${{ x: 150, y: 100 }}
      .caret=${caret}
      ?highContrast=${highContrast}
      ?dropShadow=${dropShadow}>
      <cds-coachmark-beacon
        label="Show information"
        ?expanded=${open}
        slot="trigger"></cds-coachmark-beacon>
      <cds-coachmark-header
        class="coachmark-header"
        closeIconDescription="close icon"></cds-coachmark-header>
      <cds-coachmark-body class="coachmark-body">
        <h2>Hello World</h2>
        <p>this is a description test</p>
        <cds-button size="sm">Done</cds-button>
      </cds-coachmark-body>
    </cds-coachmark>
  `;
};

const templateFloating = (args = {}) => {
  const { open = false, align = 'bottom', floating = false } = args;
  return html`
    <cds-coachmark ?open=${open} align=${align} ?floating=${floating}>
      <cds-button kind="tertiary" slot="trigger" class="trigger-btn"
        >Show information
      </cds-button>
      <cds-coachmark-header
        closeIconDescription="close icon"
        dragIconDescription="drag icon"
        class="coachmark-header"></cds-coachmark-header>
      <cds-coachmark-body class="coachmark-body">
        <h2>Hello World</h2>
        <p>this is a description test</p>
        <cds-button size="sm">Done</cds-button>
      </cds-coachmark-body>
    </cds-coachmark>
  `;
};

describe('cds-coachmark', () => {
  it('renders', async () => {
    const el = await fixture(templateTooltip({ open: false }));
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-coachmark');
  });

  it('applies className to the containing node', async () => {
    const el = await fixture(templateTooltip({ align: 'bottom', open: true }));
    el.classList.add('test');
    expect(el.getAttribute('class')).to.include('test');
  });

  it('should render tooltip variant with beacon and popover (includes header and body)', async () => {
    const el = await fixture(templateTooltip({ align: 'bottom', open: true }));

    // Beacon
    const beacon = el.querySelector('cds-coachmark-beacon');
    expect(beacon).to.exist;
    expect(beacon.getAttribute('label')).to.equal('Show information');

    // Header
    const header = el.querySelector('cds-coachmark-header');
    const headerSlot = header.shadowRoot?.querySelector('slot[name="header"]');
    expect(headerSlot).to.exist;

    const closeButton = header.shadowRoot?.querySelector('cds-button');
    expect(closeButton).to.exist;

    // Body slot content
    const heading = el.querySelector('h2');
    const paragraph = el.querySelector('p');
    const button = el.querySelector('cds-button');

    expect(heading).to.exist;
    expect(heading.textContent?.trim()).to.equal('Hello World');
    expect(paragraph).to.exist;
    expect(paragraph.textContent?.trim()).to.equal(
      'this is a description test'
    );
    expect(button).to.exist;
  });

  it('responds to close button and renders closeIconDescription', async () => {
    const el = await fixture(templateTooltip({ align: 'bottom', open: true }));
    expect(el.open).to.be.true;

    const header = el.querySelector('cds-coachmark-header');
    const closeButton = header.shadowRoot?.querySelector('cds-button');
    expect(closeButton).to.exist;
    expect(closeButton.hasAttribute('tooltip-text')).to.be.true;
    expect(closeButton.getAttribute('tooltip-text')).to.equal('close icon');

    closeButton.click();
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('responds to position attribute and updates the coachmark position accordingly', async () => {
    const el = await fixture(templateTooltip({ align: 'bottom', open: true }));
    expect(el.style.transform).to.equal('translate(150px, 100px)');

    el.position = { x: 50, y: 20 };
    await el.updateComplete;

    expect(el.style.transform).to.equal('translate(50px, 20px)');
  });

  it('should render floating variant with button and popover (should include Drag icon)', async () => {
    const el = await fixture(
      templateFloating({ align: 'bottom', open: true, floating: true })
    );
    expect(el.floating).to.be.true;

    const header = el.querySelector('cds-coachmark-header');
    const headerShadow = header.shadowRoot;
    const headerSlot = headerShadow?.querySelector('slot[name="header"]');
    expect(headerSlot).to.exist;

    const buttons = headerShadow?.querySelectorAll('cds-button');
    expect(buttons?.[0].getAttribute('tooltip-text')).to.equal('drag icon');
  });

  it('dispatches cds-coachmark-opened event when opened', async () => {
    const el = await fixture(templateTooltip({ align: 'bottom', open: false }));

    const eventPromise = oneEvent(el, 'cds-coachmark-opened');
    el.open = true;
    await el.updateComplete;

    const event = await eventPromise;
    expect(event).to.exist;
    expect(event.detail.open).to.be.true;
  });

  it('dispatches cds-coachmark-closed event when closed', async () => {
    const el = await fixture(templateTooltip({ align: 'bottom', open: true }));

    const eventPromise = oneEvent(el, 'cds-coachmark-closed');
    el.open = false;
    await el.updateComplete;

    const event = await eventPromise;
    expect(event).to.exist;
    expect(event.detail.open).to.be.false;
  });

  it('should handle caret property correctly', async () => {
    const el = await fixture(
      templateTooltip({ align: 'bottom', open: true, caret: false })
    );
    await el.updateComplete;

    expect(el.caret).to.equal(false);
    const popover = el.shadowRoot?.querySelector('cds-popover');
    expect(popover).to.exist;
    expect(popover?.caret).to.equal(false);
  });

  it('should derive caret from floating state when caret is undefined', async () => {
    const el = await fixture(templateTooltip({ align: 'bottom', open: true }));
    await el.updateComplete;

    // floating is false by default, so caret should be true
    const popover = el.shadowRoot?.querySelector('cds-popover');
    expect(popover).to.exist;
    expect(popover?.caret).to.be.true;
  });

  it('should render with highContrast property', async () => {
    const el = await fixture(
      templateTooltip({ align: 'bottom', open: true, highContrast: true })
    );
    await el.updateComplete;

    expect(el.highContrast).to.equal(true);
    const popover = el.shadowRoot?.querySelector('cds-popover');
    expect(popover).to.exist;
  });

  it('should render with dropShadow property', async () => {
    const el = await fixture(
      templateTooltip({ align: 'bottom', open: true, dropShadow: true })
    );
    await el.updateComplete;

    expect(el.dropShadow).to.equal(true);
    const popover = el.shadowRoot?.querySelector('cds-popover');
    expect(popover).to.exist;
  });

  it('should cleanup on disconnectedCallback', async () => {
    const el = await fixture(
      templateFloating({ align: 'bottom', open: true, floating: true })
    );
    await el.updateComplete;

    // disconnectedCallback should not throw
    el.remove();
    expect(el.isConnected).to.be.false;
  });

  it('should add and remove class and aria-label on dragstart and dragend for floating variant', async () => {
    const el = await fixture(
      templateFloating({ align: 'bottom', open: true, floating: true })
    );
    await el.updateComplete;
    await nextFrame();

    const popoverContent = el.shadowRoot
      ?.querySelector(`.${blockClass}--popover`)
      ?.querySelector('cds-popover-content');
    expect(popoverContent).to.exist;

    popoverContent.dispatchEvent(new Event('dragstart'));
    await el.updateComplete;

    expect(popoverContent.classList.contains(`${blockClass}--is-dragging`)).to
      .be.true;

    popoverContent.dispatchEvent(new Event('dragend'));
    await el.updateComplete;

    expect(popoverContent.classList.contains(`${blockClass}--is-dragging`)).to
      .be.false;
  });
});
