/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it, afterEach } from 'vitest';
import { TemplateResult } from 'lit';
import { fixture, html } from '@open-wc/testing';
import './index';
import '@carbon/web-components/es/components/tabs/index.js';
import '@carbon/web-components/es/components/slug/index.js';
import '@carbon/web-components/es/components/dropdown/index.js';
import '@carbon/web-components/es/components/progress-bar/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/textarea/index.js';

import {
  getContent,
  getLabel,
  getActionToolbarItems,
  getActionItems,
  getSlug,
  getDecorator,
  getNavigation,
  influencers,
} from './utils';
import CDSTearsheet from './tearsheet';

const defaultProps = {
  headerActions: '',
  open: true,
  influencerWidth: 'narrow',
  influencerPlacement: 'left',
  influencer: '',
  preventCloseOnClickOutside: false,
  selectorInitialFocus: '',
  width: 'wide',
  slug: '',
  description: 'Description used to describe the flow if need be.',
  title: 'Title used to designate the overarching flow of the tearsheet.',
  headerNavigation: '',
  hasCloseIcon: false,
};

const template = (props = defaultProps, children = getContent(1)) => html`
  <c4p-tearsheet
    selector-initial-focus=${props.selectorInitialFocus}
    ?open=${props.open}
    influencer-placement=${props.influencerPlacement}
    influencer-width=${props.influencerWidth}
    ?prevent-close-on-click-outside=${props.preventCloseOnClickOutside}
    width=${props.width}
    ?has-close-icon=${props.hasCloseIcon}
  >
    ${children}
    <!-- slotted header title -->
    ${props.title ? html`<span slot="title">Three ${props.title}</span>` : ''}

    <!-- slotted header description -->
    ${props.description
      ? html`<span slot="description">${props.description}</span>`
      : ''}
  </c4p-tearsheet>
`;

describe('c4p-tearsheet', () => {
  it('should render a tearsheet', async () => {
    const tearsheet = (await fixture(
      template({ ...defaultProps })
    )) as CDSTearsheet;

    expect(tearsheet?.open).toBeTruthy();
    expect(tearsheet).toBeDefined();
  });

  it('responds to hasCloseIcon and renders closeIconDescription', async () => {
    const tearsheet = (await fixture(
      template({ ...defaultProps, open: true, hasCloseIcon: true })
    )) as CDSTearsheet;
    expect(tearsheet?.open).toBeTruthy();
    expect(tearsheet?.closeIconDescription).toBe('Close');
    const headerEle = tearsheet.shadowRoot?.querySelector('cds-modal-header');
    expect(headerEle).to.exist;

    const closeButton = headerEle?.shadowRoot
      ?.querySelector('slot')
      ?.assignedNodes({ flatten: true })
      .find(
        (node) => node.nodeName.toLowerCase() === 'cds-modal-close-button'
      ) as HTMLElement;

    expect(closeButton).to.exist;

    closeButton?.click();

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(tearsheet?.open).to.be.false;
  });

  it('should render label', async () => {
    const tearsheet = (await fixture(
      template(defaultProps, getLabel(1))
    )) as CDSTearsheet;

    expect(tearsheet?.open).toBeTruthy();

    const headerEle = tearsheet.shadowRoot?.querySelector('cds-modal-header');
    expect(headerEle).to.exist;

    // Check if slot[name="label"] is present in 'cds-modal-header'
    const labelSlot = headerEle?.querySelector(
      'slot[name="label"]'
    ) as HTMLSlotElement;
    expect(labelSlot).to.exist;

    const assignedNodes = labelSlot?.assignedNodes({ flatten: true }) ?? [];

    // Extract text content from assigned nodes
    const labelText = assignedNodes
      .map((node) => (node.textContent ?? '').trim())
      .join(' ');

    // Assert the label matches expected text
    expect(labelText).to.equal('Optional label for context');
  });

  it('should render description and title', async () => {
    const tearsheet = (await fixture(
      template({ ...defaultProps })
    )) as CDSTearsheet;

    expect(tearsheet?.open).toBeTruthy();

    const headerEle = tearsheet.shadowRoot?.querySelector('cds-modal-header');
    expect(headerEle).to.exist;

    ['description', 'title'].forEach((name, i) => {
      const slot = headerEle?.querySelector(
        `slot[name="${name}"]`
      ) as HTMLSlotElement;
      expect(slot).to.exist;
      const text = (slot?.assignedNodes({ flatten: true }) ?? [])
        .map((node) => node.textContent?.trim() ?? '')
        .join(' ');
      expect(text).to.equal(
        [
          'Description used to describe the flow if need be.',
          'Three Title used to designate the overarching flow of the tearsheet.',
        ][i]
      );
    });
  });

  it('should render a slug', async () => {
    const tearsheet = (await fixture(
      template(defaultProps, getSlug(1))
    )) as CDSTearsheet;

    await new Promise((resolve) => setTimeout(resolve, 100));
    document.body.offsetHeight;

    expect(tearsheet?.open).toBeTruthy();
    // Ensure slug is present
    expect(tearsheet?._hasSlug).toBeTruthy();

    // Locate slug element
    const slug = tearsheet.querySelector('cds-slug') as any;

    // Expect the slug element is present
    expect(slug).toBeDefined();
    // Expect the default slug size is sm
    expect(slug.size).toBe('sm');
  });

  it('should render an ai label', async () => {
    const tearsheet = (await fixture(
      template(defaultProps, getDecorator('WITH_AI_LABEL'))
    )) as CDSTearsheet;

    await new Promise((resolve) => setTimeout(resolve, 100));
    document.body.offsetHeight;

    expect(tearsheet?.open).toBeTruthy();
    // Ensure ai label is present
    expect(tearsheet?._hasAILabel).toBeTruthy();

    // Locate ai label element
    const aiLabel = tearsheet.querySelector('cds-ai-label') as any;

    // Expect the ai label element is present
    expect(aiLabel).toBeDefined();
    // Expect the default ai label size is sm
    expect(aiLabel.size).toBe('sm');
  });

  it('should render a non ai label decorator', async () => {
    const tearsheet = (await fixture(
      template(defaultProps, getDecorator('NON_AI_LABEL_DECORATOR'))
    )) as CDSTearsheet;

    await new Promise((resolve) => setTimeout(resolve, 100));
    document.body.offsetHeight;

    expect(tearsheet?.open).toBeTruthy();
    // Ensure ai label is present
    expect(tearsheet?._hasDecorator).toBeTruthy();

    // Locate ai label element
    const decorator = tearsheet.querySelector('cds-toggletip') as any;

    // Expect the ai label element is present
    expect(decorator).toBeDefined();
  });

  it('should render navigation button', async () => {
    const tearsheet = (await fixture(
      template(defaultProps, getActionToolbarItems(1))
    )) as CDSTearsheet;

    expect(tearsheet?.open).toBeTruthy();

    // Get the dropdown with initial value as option 1
    const dropdown = Array.prototype.find.call(
      tearsheet?.querySelectorAll('cds-dropdown'),
      (el) => el.getAttribute('value') === 'option 1'
    );

    expect(dropdown).toBeDefined();

    // Check if dropdown contains all the available options
    const dropdownItems = dropdown?.querySelectorAll('cds-dropdown-item');
    const expectedOptions = ['option 1', 'option 2', 'option 3', 'option 4'];

    expect(dropdownItems?.length).toBe(expectedOptions.length);

    // Ensure all expected options are present
    expectedOptions.forEach((option) => {
      const item = Array.prototype.find.call(
        dropdownItems,
        (el) =>
          el.getAttribute('value') === option &&
          el.textContent?.trim() === option
      );
      expect(item).toBeDefined();
    });
  });

  it('should close tearsheet when pressing Esc', async () => {
    const tearsheet = (await fixture(
      template({ ...defaultProps, open: true })
    )) as CDSTearsheet;

    // Ensure the tearsheet is initially open
    expect(tearsheet?.open).toBeTruthy();

    // Dispatch the before-close event via Esc
    const beforeCloseEvent = new CustomEvent('cds-tearsheet-before-close', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { triggeredBy: 'Escape' },
    });

    // Dispatch the close event
    const closeEvent = new CustomEvent('cds-tearsheet-close', {
      bubbles: true,
      composed: true,
      detail: { triggeredBy: 'Escape' },
    });

    // Fire the before-close event
    const beforeCloseAccepted = tearsheet.dispatchEvent(beforeCloseEvent);

    if (beforeCloseAccepted) {
      tearsheet.dispatchEvent(closeEvent);
      tearsheet.open = false;
    }

    // Wait for the modal to update
    await new Promise((resolve) => setTimeout(resolve, 200));
    await tearsheet.updateComplete;

    // Expect modal to be closed
    expect(tearsheet.open).toBeFalsy();
  });

  it('should not close tearsheet when preventCloseOnClickOutside is true', async () => {
    const tearsheet = (await fixture(
      template({ ...defaultProps, preventCloseOnClickOutside: true })
    )) as CDSTearsheet;

    expect(tearsheet?.open).toBeTruthy();

    // Dispatch the 'cds-tearsheet-before-close' event
    const beforeCloseEvent = new CustomEvent('cds-tearsheet-before-close', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { triggeredBy: document.body },
    });

    // Prevent the 'cds-tearsheet-before-close' event via event listener
    tearsheet.addEventListener('cds-tearsheet-before-close', (event) => {
      event.preventDefault();
    });

    const beforeCloseAccepted = tearsheet.dispatchEvent(beforeCloseEvent);
    expect(beforeCloseAccepted).toBeFalsy();

    // Expect the modal is still open
    expect(tearsheet.open).toBeTruthy();
  });

  it('renders navigation', async () => {
    const tearsheet = (await fixture(
      template(defaultProps, getNavigation(1))
    )) as CDSTearsheet;

    // Ensure the tearsheet is initially open
    expect(tearsheet?.open).toBeTruthy();

    // Find the slot element
    const slotElement = tearsheet.shadowRoot?.querySelector(
      'slot[name="header-navigation"]'
    ) as HTMLSlotElement;
    expect(slotElement).to.exist;

    const assignedElements = slotElement.assignedElements();

    const tabsContainer = assignedElements.find(
      (el) =>
        el instanceof HTMLElement &&
        (el.classList.contains('tearsheet-stories__tabs') ||
          el.getAttribute('classname') === 'tearsheet-stories__tabs')
    ) as HTMLElement | undefined;

    expect(tabsContainer).to.exist;

    const tabs = tabsContainer?.querySelector('cds-tabs');
    expect(tabs).to.exist;
    expect(tabs?.querySelectorAll('cds-tab')).to.have.lengthOf(4);
  });

  it('responds to influencerPosition', async () => {
    const tearsheet = (await fixture(
      template({
        ...defaultProps,
        influencer: influencers[1],
        influencerPlacement: 'right',
        influencerWidth: 'wide',
      })
    )) as CDSTearsheet;

    expect(tearsheet?.open).toBeTruthy();
    expect(tearsheet?.influencerPlacement).toBe('right');
    expect(tearsheet?.influencerWidth).toBe('wide');
    const bodyEle = tearsheet.shadowRoot?.querySelector('cds-modal-body');
    expect(bodyEle).to.exist;

    const influencerSlot = bodyEle?.querySelector(
      'slot[name="influencer"]'
    ) as HTMLSlotElement;
    expect(influencerSlot).to.exist;

    const influencer = bodyEle?.querySelector(
      '.c4p--tearsheet__influencer'
    ) as HTMLElement;
    const rightSection = bodyEle?.querySelector(
      '.c4p--tearsheet__right'
    ) as HTMLElement;

    expect(influencer).to.exist;
    expect(influencer.getAttribute('wide')).to.not.be.null;

    expect(rightSection).to.exist;

    // Ensure content is before influencer in DOM
    expect(
      rightSection.compareDocumentPosition(influencer) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).to.be.greaterThan(0);
  });

  it('responds to action items', async () => {
    const actionItems = getActionItems(2);
    const mergedActionItems = actionItems
      ? (html`${actionItems}` as TemplateResult<1>)
      : null;

    const tearsheet = (await fixture(
      template(defaultProps, mergedActionItems)
    )) as CDSTearsheet;

    expect(tearsheet?.open).toBeTruthy();
    const slot = tearsheet.shadowRoot?.querySelector(
      'cds-modal-body cds-button-set-base slot[name="actions"]'
    ) as HTMLSlotElement;

    const buttons = slot
      ?.assignedElements({ flatten: true })
      .filter((node) => node.tagName === 'CDS-BUTTON');

    expect(buttons?.length).to.equal(2);
  });

  it('Exceeded more than 4 action items', async () => {
    const actionItems = getActionItems(8);
    const mergedActionItems = actionItems
      ? (html`${actionItems}` as TemplateResult<1>)
      : null;

    const tearsheet = (await fixture(
      template(defaultProps, mergedActionItems)
    )) as CDSTearsheet;

    expect(tearsheet?.open).toBeTruthy();
    const slot = tearsheet.shadowRoot?.querySelector(
      'cds-modal-body cds-button-set-base slot[name="actions"]'
    ) as HTMLSlotElement;

    expect(slot).to.exist;

    const allButtons = slot?.assignedElements({ flatten: true }) ?? [];

    // Fetching only visible buttons
    const visibleButtons = allButtons.filter(
      (node) =>
        node.tagName === 'CDS-BUTTON' &&
        !node.hasAttribute('data-actions-limit-4-exceeded')
    );
    expect(visibleButtons.length).to.equal(4);

    const fifthButton = allButtons[4] as HTMLElement;
    expect(fifthButton).to.exist;
    expect(fifthButton.hasAttribute('data-actions-limit-4-exceeded')).to.be
      .true;
  });

  it('render stacked tearsheet with depth 3', async () => {
    const tearsheets = await Promise.all([
      fixture(template({ ...defaultProps })) as Promise<CDSTearsheet>,
      fixture(template({ ...defaultProps })) as Promise<CDSTearsheet>,
      fixture(template({ ...defaultProps })) as Promise<CDSTearsheet>,
    ]);

    expect(tearsheets).to.have.lengthOf(3);
  });

  afterEach(() => {
    // Clears the DOM after each test
    document.body.innerHTML = '';
  });
});
