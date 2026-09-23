/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import Bee from '@carbon/icons/es/bee/32';
import Add16 from '@carbon/icons/es/add/32';
import RightPanelClose32 from '@carbon/icons/es/right-panel--close/32';
import { breakpoints } from '@carbon/layout';

export const storyPrefix = 'tearsheet-stories';

// Helper to get button size based on screen size and variant
export const getButtonSize = (variant: string = 'wide') => {
  const smMediaQuery = `(max-width: ${breakpoints.md.width})`;
  const isSmallScreen = window.matchMedia(smMediaQuery).matches;
  return isSmallScreen || variant === 'narrow' ? 'xl' : '2xl';
};

// When decorator=true, render an AI label; false/undefined renders nothing.
export const getDecorator = (decorator) => {
  if (!decorator) {
    return '';
  }
  return html`
    <cds-ai-label alignment="bottom-right" slot="decorator">
      <div slot="body-text">
        <p class="secondary">AI Explained</p>
        <h2 class="ai-label-heading">84%</h2>
        <p class="secondary bold">Confidence score</p>
        <p class="secondary">Any description goes here</p>
        <hr />
        <p class="secondary">Model type</p>
        <p class="bold">Foundation model</p>
      </div>
    </cds-ai-label>
  `;
};

export const toggleButton = () => {
  document.querySelector(`${prefix}-tearsheet`)?.toggleAttribute('open');
};

/**
 * Handles `cds-tearsheet-collapse-change` events in stories.
 * Resizes header-action buttons to `xs` when collapsed, `sm` when expanded,
 * matching the React TearsheetHeaderActions behavior.
 */
export const handleCollapseChange = (e: Event) => {
  const { collapsed } = (e as CustomEvent).detail as { collapsed: boolean };
  const tearsheet = e.currentTarget as Element;
  tearsheet
    .querySelectorAll('[slot="header-actions"] cds-button')
    .forEach((btn) => btn.setAttribute('size', collapsed ? 'xs' : 'sm'));
};

export const toggleInfluencerPanel = () => {
  const influencer = document.querySelector(`${prefix}-tearsheet-influencer`);
  if (influencer) {
    influencer.toggleAttribute('influencer-panel-open');
  }
};

export const toggleSummaryPanel = () => {
  const summaryContent = document.querySelector(
    `${prefix}-tearsheet-summary-content`
  );
  if (summaryContent) {
    summaryContent.toggleAttribute('summary-panel-open');
  }
};

export const description = html` <cds-truncated-text
  slot="description"
  lines="2"
  type="expand"
  expand-label="Read more"
  collapse-label="Read less"
  id="header-description__truncatedText"
  value="Buttons are used to initialize an action, either in the background or foreground of an experience. There are several kinds of buttons. Primary buttons should be used for the principle call to action on the page. Secondary buttons should be used for secondary actions on each page. Danger buttons should be used for a negative action (such as Delete) on the page"></cds-truncated-text>`;

export const progressIndicator = (vertical: boolean) =>
  html`<cds-progress-indicator ?vertical=${vertical} current-index="1">
    <cds-progress-step
      description="Step 1: Getting started with Carbon Design System"
      label="First step"
      complete></cds-progress-step>
    <cds-progress-step
      description="Step 2: Getting started with Carbon Design System"
      label="Second step with tooltip"
      current></cds-progress-step>
    <cds-progress-step
      description="Step 3: Getting started with Carbon Design System"
      label="Third step with tooltip"></cds-progress-step>
    <cds-progress-step
      description="Step 4: Getting started with Carbon Design System"
      label="Fourth step"
      secondary-label="Example invalid step"
      invalid></cds-progress-step>
    <cds-progress-step
      disabled
      description="Step 5: Getting started with Carbon Design System"
      label="Fifth step"></cds-progress-step>
  </cds-progress-indicator>`;

export const tabs = html` <cds-tabs value="tab-1">
  <cds-tab id="tab-1" target="tab-panel-1" value="tab-1">Tab 1</cds-tab>
  <cds-tab id="tab-2" target="tab-panel-2" value="tab-2">Tab 2</cds-tab>
  <cds-tab id="tab-3" target="tab-panel-3" value="tab-3">Tab 3</cds-tab>
  <cds-tab id="tab-4" target="tab-panel-4" value="tab-4">Tab 4</cds-tab>
  <cds-tab id="tab-5" target="tab-panel-5" value="tab-5">Tab 5</cds-tab>
  <cds-tab id="tab-6" target="tab-panel-6" value="tab-6">Tab 6</cds-tab>
  <cds-tab id="tab-7" target="tab-panel-7" value="tab-7">Tab 7</cds-tab>
</cds-tabs>`;

export const tabPanel = html` <div class="tabs-demo">
  <div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-1" hidden>
    Tab Panel 1
  </div>
  <div id="tab-panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>
    Tab Panel 2
  </div>
  <div id="tab-panel-3" role="tabpanel" aria-labelledby="tab-3" hidden>
    Tab Panel 3
  </div>
  <div id="tab-panel-4" role="tabpanel" aria-labelledby="tab-4" hidden>
    Tab Panel 4
  </div>
  <div id="tab-panel-5" role="tabpanel" aria-labelledby="tab-5" hidden>
    Tab Panel 5
  </div>
  <div id="tab-panel-6" role="tabpanel" aria-labelledby="tab-6" hidden>
    Tab Panel 6
  </div>
  <div id="tab-panel-7" role="tabpanel" aria-labelledby="tab-7" hidden>
    Tab Panel 7
  </div>
</div>`;

export const summaryContent = html`
  <div class="rightDetailsBody">
    <div class="summaryPanelHeading">Summary Details</div>
    <div>
      <label>item 1</label>
      <p>item description</p>
    </div>
    <div>
      <label>item 2</label>
      <p>item description</p>
    </div>
    <div>
      <label>item 3</label>
      <p>item description</p>
    </div>
    <div>
      <label>item 4</label>
      <p>item description</p>
    </div>
    <div>
      <label>item 5</label>
      <p>item description</p>
    </div>
  </div>
`;

export const dummyContent = html` <section class="main-content">
  <h4>Main content heading</h4>

  <div class="${storyPrefix}text-inputs">
    <cds-text-input
      label="Enter an important value here"
      id="input1"></cds-text-input>
    <cds-text-input
      label="Here is an entry field:"
      id="tss-ft2"></cds-text-input>
  </div>

  <div class="${storyPrefix}text-inputs">
    <cds-text-input
      label="Enter an important value here"
      id="tss-ft1"></cds-text-input>
    <cds-text-input
      label="Here is an entry field:"
      id="tss-ft2-2"></cds-text-input>
  </div>

  <div class="${storyPrefix}text-inputs">
    <cds-text-input
      label="Enter an important value here"
      id="tss-ft3"></cds-text-input>
    <cds-text-input
      label="Here is an entry field:"
      id="tss-ft4"></cds-text-input>
  </div>

  <div class="${storyPrefix}textarea-container">
    <cds-textarea label="Notes" value="This is a text area"></cds-textarea>
    <cds-textarea label="Notes" value="This is a text area"></cds-textarea>
    <cds-textarea label="Notes" value="This is a text area"></cds-textarea>
    <cds-textarea label="Notes" value="This is a text area"></cds-textarea>
  </div>
</section>`;

export { Bee, Add16, RightPanelClose32, iconLoader };
