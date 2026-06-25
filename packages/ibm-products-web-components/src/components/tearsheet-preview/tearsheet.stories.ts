/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import styles from './_story-assets/_storybook-styles.scss?lit';
import { prefix } from '../../globals/settings';
import './_story-assets/step-tearsheet-preview';
import './_story-assets/stacking-tearsheet';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import Bee from '@carbon/icons/es/bee/32';
import Add16 from '@carbon/icons/es/add/32';
import RightPanelClose32 from '@carbon/icons/es/right-panel--close/32';
import '@carbon/web-components/es/components/progress-indicator/index.js';
import '@carbon/web-components/es/components/tabs/index.js';
import '@carbon/web-components/es/components/ai-label/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/textarea/index.js';
import '@carbon/web-components/es/components/slug/index.js';
import '@carbon/web-components/es/components/toggle-tip/index.js';
import '@carbon/web-components/es/components/dropdown/index.js';
import '@carbon/web-components/es/components/progress-bar/index.js';
import '@carbon/web-components/es/components/notification/index.js';
import { breakpoints } from '@carbon/layout';
import mdx from './tearsheet.mdx';

const storyPrefix = 'tearsheet-preview-stories';

// Helper to get button size based on screen size and variant
const getButtonSize = (variant: string = 'wide') => {
  const smMediaQuery = `(max-width: ${breakpoints.md.width})`;
  const isSmallScreen = window.matchMedia(smMediaQuery).matches;
  return isSmallScreen || variant === 'narrow' ? 'xl' : '2xl';
};

const getDecorator = (decorator) => {
  switch (decorator) {
    case 'WITH_AI_LABEL':
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

    default:
      return;
  }
};
const toggleButton = () => {
  document
    .querySelector(`${prefix}-preview-tearsheet`)
    ?.toggleAttribute('open');
};

const toggleInfluencerPanel = () => {
  const influencer = document.querySelector(`${prefix}-tearsheet-influencer`);
  if (influencer) {
    influencer.toggleAttribute('influencer-panel-open');
  }
};
const toggleSummaryPanel = () => {
  const summaryContent = document.querySelector(
    `${prefix}-tearsheet-summary-content`
  );
  if (summaryContent) {
    summaryContent.toggleAttribute('summary-panel-open');
  }
};
const description = html` <c4p-truncated-text
  slot="description"
  lines="2"
  type="expand"
  expand-label="Read more"
  collapse-label="Read less"
  id="header-description__truncatedText"
  value="Buttons are used to initialize an action, either in the background or foreground of an experience. There are several kinds of buttons. Primary buttons should be used for the principle call to action on the page. Secondary buttons should be used for secondary actions on each page. Danger buttons should be used for a negative action (such as Delete) on the page"
></c4p-truncated-text>`;

const progressIndicator = (vertical: boolean) =>
  html`<cds-progress-indicator ?vertical=${vertical} current-index="1">
    <cds-progress-step
      description="Step 1: Getting started with Carbon Design System"
      label="First step"
      complete
    ></cds-progress-step>
    <cds-progress-step
      description="Step 2: Getting started with Carbon Design System"
      label="Second step with tooltip"
      current
    ></cds-progress-step>
    <cds-progress-step
      description="Step 3: Getting started with Carbon Design System"
      label="Third step with tooltip"
    ></cds-progress-step>
    <cds-progress-step
      description="Step 4: Getting started with Carbon Design System"
      label="Fourth step"
      secondary-label="Example invalid step"
      invalid
    ></cds-progress-step>
    <cds-progress-step
      disabled
      description="Step 5: Getting started with Carbon Design System"
      label="Fifth step"
    ></cds-progress-step>
  </cds-progress-indicator>`;

const tabs = html` <cds-tabs value="tab-1">
  <cds-tab id="tab-1" target="tab-panel-1" value="tab-1">Tab 1</cds-tab>
  <cds-tab id="tab-2" target="tab-panel-2" value="tab-2">Tab 2</cds-tab>
  <cds-tab id="tab-3" target="tab-panel-3" value="tab-3">Tab 3</cds-tab>
  <cds-tab id="tab-4" target="tab-panel-4" value="tab-4">Tab 4</cds-tab>
  <cds-tab id="tab-5" target="tab-panel-5" value="tab-5">Tab 5</cds-tab>
  <cds-tab id="tab-6" target="tab-panel-6" value="tab-6">Tab 6</cds-tab>
  <cds-tab id="tab-7" target="tab-panel-7" value="tab-7">Tab 7</cds-tab>
</cds-tabs>`;

const tabPanel = html` <div class="tabs-demo">
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

const summaryContent = html`  <div class="rightDetailsBody">
 <Heading class="summaryPanelHeading">Summary Details</Heading>
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
              </div><div>
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
              </div><div>
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
              </div><div>
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
              </div>`;

const dummyContent = html` <section class="main-content">
  <h4>Main content heading</h4>

  <div class="${storyPrefix}text-inputs">
    <cds-text-input
      label="Enter an important value here"
      id="input1"
    ></cds-text-input>
    <cds-text-input
      label="Here is an entry field:"
      id="tss-ft2"
    ></cds-text-input>
  </div>

  <div class="${storyPrefix}text-inputs">
    <cds-text-input
      label="Enter an important value here"
      id="tss-ft1"
    ></cds-text-input>
    <cds-text-input
      label="Here is an entry field:"
      id="tss-ft2-2"
    ></cds-text-input>
  </div>

  <div class="${storyPrefix}text-inputs">
    <cds-text-input
      label="Enter an important value here"
      id="tss-ft3"
    ></cds-text-input>
    <cds-text-input
      label="Here is an entry field:"
      id="tss-ft4"
    ></cds-text-input>
  </div>

  <div class="${storyPrefix}textarea-container">
    <cds-textarea label="Notes" value="This is a text area"></cds-textarea>
    <cds-textarea label="Notes" value="This is a text area"></cds-textarea>
    <cds-textarea label="Notes" value="This is a text area"></cds-textarea>
    <cds-textarea label="Notes" value="This is a text area"></cds-textarea>
  </div>
</section>`;

export const Default = {
  args: {
    variant: 'wide',
    open: false,
    decorator: 'NONE',
    hideCloseButton: false,
    disableHeaderCollapse: false,
    title: 'Title of the tearsheet',
    label: 'Label',
    showDescription: true,
    showTitleIcon: true,
    showHeaderActions: true,
    showSummaryContent: true,
    preventCloseOnClickOutside: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['wide', 'narrow'],
      description: 'Tearsheet variant',
    },
    open: {
      control: 'boolean',
      description: 'Controls whether the tearsheet is open',
    },
    decorator: {
      control: 'select',
      options: ['NONE', 'WITH_AI_LABEL'],
      description: 'Decorator type for the tearsheet header',
    },
    hideCloseButton: {
      control: 'boolean',
      description: 'Hide the close button in the header',
    },
    disableHeaderCollapse: {
      control: 'boolean',
      description: 'Disable header collapse/expand on scroll',
    },
    title: {
      control: 'text',
      description: 'Title of the tearsheet',
    },
    label: {
      control: 'text',
      description: 'Label above the title',
    },
    showDescription: {
      control: 'boolean',
      description: 'Show description text',
    },
    showTitleIcon: {
      control: 'boolean',
      description: 'Show icon before title',
    },
    showHeaderActions: {
      control: 'boolean',
      description: 'Show action buttons in header',
    },
    showSummaryContent: {
      control: 'boolean',
      description: 'Show summary content panel',
    },
    preventCloseOnClickOutside: {
      control: 'boolean',
      description: 'Prevent closing when clicking outside',
    },
  },
  render: (args) => {
    return html`
      <style>
        ${styles}
      </style>
      <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${toggleButton}" aria-haspopup="dialog"
            >Toggle tearsheet</cds-button
          >
        </div>
      </div>

      <c4p-preview-tearsheet
        variant="${args.variant}"
        ?open="${args.open}"
        ?prevent-close-on-click-outside="${args.preventCloseOnClickOutside}"
      >
        <c4p-tearsheet-header
          ?hide-close-button="${args.hideCloseButton}"
          ?disable-header-collapse="${args.disableHeaderCollapse}"
        >
          <!-- slotted Decorator -->
          ${args.decorator !== 'NONE' ? getDecorator(args.decorator) : ''}

          <c4p-tearsheet-header-content title="${args.title}">
            <label slot="label">${args.label}</label>
            ${args.showDescription ? description : ''}
            ${args.showTitleIcon
              ? iconLoader(Bee, {
                  slot: 'title-start',
                })
              : ''}
            ${args.showHeaderActions
              ? html`<div slot="header-actions">
                  <cds-button size="sm" kind="tertiary">
                    Primary action ${iconLoader(Add16, { slot: 'icon' })}
                  </cds-button>
                </div>`
              : ''}
          </c4p-tearsheet-header-content>
        </c4p-tearsheet-header>

        <c4p-tearsheet-body>
          <div slot="main-content">
            ${args.showSummaryContent
              ? html`<div class="summaryPanelTrigger">
                  <cds-button
                    kind="ghost"
                    label="Open right panel"
                    @click="${toggleSummaryPanel}"
                    aria-expanded="false"
                    aria-controls="summary-panel"
                  >
                    ${iconLoader(RightPanelClose32, {
                      slot: 'icon',
                    })}
                  </cds-button>
                </div>`
              : ''}
            ${dummyContent}
          </div>
          ${args.showSummaryContent
            ? html`<c4p-tearsheet-summary-content slot="summary-content"
                >${summaryContent}</c4p-tearsheet-summary-content
              >`
            : ''}
        </c4p-tearsheet-body>
        <c4p-tearsheet-footer
          variant="${args.variant}"
          .actions="${[
            {
              kind: 'ghost',
              label: 'Cancel',
              onClick: toggleButton,
            },
            {
              kind: 'secondary',
              label: 'Back',
            },
            {
              kind: 'primary',
              label: 'Submit',
            },
          ]}"
        >
        </c4p-tearsheet-footer>
      </c4p-preview-tearsheet>
    `;
  },
};

export const WithInfluencer = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${toggleButton}">Open Tearsheet</cds-button>
        </div>
      </div>

      <c4p-preview-tearsheet variant="wide">
        <c4p-tearsheet-header ?hide-close-button="${false}">
          <!-- Decorator -->
          ${getDecorator('WITH_AI_LABEL')}

          <c4p-tearsheet-header-content title="Title of the tearsheet">
            <label slot="label">Label</label>
            ${description}
            ${iconLoader(Bee, {
              slot: 'title-start',
            })}

            <div slot="header-actions">
              <cds-button size="sm" kind="tertiary">Action 1</cds-button>
            </div>
          </c4p-tearsheet-header-content>
        </c4p-tearsheet-header>

        <!-- Influencer with Progress Indicator -->
        <c4p-tearsheet-influencer>
          ${progressIndicator(true)}
        </c4p-tearsheet-influencer>

        <c4p-tearsheet-body>
          <div slot="main-content">
            <!-- Button to open influencer panel on small screens -->
            <div class="influencerPanelTrigger">
              <cds-button
                kind="ghost"
                tooltip-text="Open Influencer"
                tooltip-position="right"
                @click="${toggleInfluencerPanel}"
              >
                ${iconLoader(RightPanelClose32, { slot: 'icon' })}
              </cds-button>
            </div>

            <!-- Main Content -->
            ${dummyContent}
          </div>
        </c4p-tearsheet-body>

        <c4p-tearsheet-footer
          variant="wide"
          .actions="${[
            {
              kind: 'ghost',
              label: 'Cancel',
              onClick: toggleButton,
            },
            {
              kind: 'secondary',
              label: 'Back',
            },
            {
              kind: 'primary',
              label: 'Submit',
            },
          ]}"
        >
        </c4p-tearsheet-footer>
      </c4p-preview-tearsheet>
    `;
  },
};

export const WithTabs = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${toggleButton}">Open Tearsheet</cds-button>
        </div>
      </div>

      <c4p-preview-tearsheet variant="wide">
        <c4p-tearsheet-header ?hide-close-button="${false}">
          <!-- Decorator -->
          ${getDecorator('WITH_AI_LABEL')}

          <c4p-tearsheet-header-content title="Title of the tearsheet">
            <label slot="label">Label</label>
            ${description}
            ${iconLoader(Bee, {
              slot: 'title-start',
            })}

            <div slot="header-actions">
              <cds-button size="sm" kind="tertiary">Action 1</cds-button>
            </div>
          </c4p-tearsheet-header-content>
          <c4p-tearsheet-navigation-bar>
            ${tabs}
            <c4p-tearsheet-scroller slot="scroller"></c4p-tearsheet-scroller>
          </c4p-tearsheet-navigation-bar>
        </c4p-tearsheet-header>

        <c4p-tearsheet-body>
          <div slot="main-content">
            <!-- Button to open influencer panel on small screens -->

            <!-- Main Content -->
            <div
              id="tab-cloudFoundry"
              role="tabpanel"
              aria-labelledby="tab-all"
              hidden=""
            >
              Tab Panel 1
            </div>
            ${tabPanel}
          </div>
        </c4p-tearsheet-body>

        <c4p-tearsheet-footer
          variant="wide"
          .actions="${[
            {
              kind: 'ghost',
              label: 'Cancel',
              onClick: toggleButton,
            },
            {
              kind: 'secondary',
              label: 'Back',
            },
            {
              kind: 'primary',
              label: 'Submit',
            },
          ]}"
        >
        </c4p-tearsheet-footer>
      </c4p-preview-tearsheet>
    `;
  },
};

export const narrowTearsheet = {
  render: (args) => {
    return html`
      <style>
        ${styles}
      </style>
       <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${toggleButton}">Toggle tearsheet</cds-button>
        </div>
      </div>


     <c4p-preview-tearsheet variant="narrow">
     <c4p-tearsheet-header  ?hide-close-button="${false}" >
           <!-- slotted Decorator -->
             ${getDecorator('WITH_AI_LABEL')}
      <c4p-tearsheet-header-content title="Tile to the tearsheet">
      <label slot="label"> label </label>
    ${description}
     
      
      <div slot="header-actions">
            <cds-button size="sm" kind="tertiary" 
              >Primary action ${iconLoader(Add16, { slot: 'icon' })}</cds-button
            >
          </div>
     </c4p-tearsheet-header-content>
   
      
   
     </c4p-tearsheet-header>
      <c4p-tearsheet-influencer  >${progressIndicator(true)}</c4p-tearsheet-influencer>
       <c4p-tearsheet-body >
       <div  slot="main-content"> 
        <div class="influencerPanelTrigger">
              <cds-button
                kind="ghost"
                label="Open influencer"
                @click="${toggleInfluencerPanel}"
              >
                 ${iconLoader(RightPanelClose32, {
                   slot: 'icon',
                 })}
                </cds-button>
            </div>
            <div class="summaryPanelTrigger">
              <cds-button
                kind="ghost"
                label="Open right panel"
               @click="${toggleSummaryPanel}"
               
              > ${iconLoader(RightPanelClose32, {
                slot: 'icon',
              })}</cds-button>
            </div>
        ${dummyContent}</div>
       <c4p-tearsheet-summary-content   slot="summary-content">${summaryContent}</c4p-tearsheet-summary-content>
        </c4p-tearsheet-body>
        <c4p-tearsheet-footer
         variant="narrow"
         .actions="${[
           {
             kind: 'ghost',
             label: 'Cancel',
             onClick: toggleButton,
           },
           {
             kind: 'secondary',
             label: 'Back',
           },
           {
             kind: 'primary',
             label: 'Submit',
           },
         ]}"
       >
       </c4p-tearsheet-footer>
     </<c4p-preview-tearsheet>
      
    `;
  },
};
export const withSteps = {
  render: () => {
    return html` <step-tearsheet-preview></step-tearsheet-preview> `;
  },
};
export const withStepsAndHorizontalProgressIndicator = {
  render: () => {
    return html` <step-tearsheet-preview horizontal></step-tearsheet-preview> `;
  },
};

export const StackingTearsheets = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <stacking-tearsheet-demo tearsheet-type="wide"></stacking-tearsheet-demo>
    `;
  },
};
export const StackingNarrowTearsheets = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <stacking-tearsheet-demo
        tearsheet-type="narrow"
      ></stacking-tearsheet-demo>
    `;
  },
};
export const StackingWithDifferentSizes = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <stacking-tearsheet-demo tearsheet-type="mixed"></stacking-tearsheet-demo>
    `;
  },
};

export const WithCustomFooterActions = {
  args: {
    variant: 'wide',
    open: false,
    showSummaryContent: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['wide', 'narrow'],
      description: 'Tearsheet variant',
    },
    open: {
      control: 'boolean',
      description: 'Controls whether the tearsheet is open',
    },
    showSummaryContent: {
      control: 'boolean',
      description: 'Show summary content panel',
    },
  },
  render: (args) => {
    return html`
      <style>
        ${styles}
      </style>
      <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${toggleButton}">Toggle tearsheet</cds-button>
        </div>
      </div>

      <c4p-preview-tearsheet
        variant="${args.variant}"
        ?open="${args.open}"
        prevent-close-on-click-outside
      >
        <c4p-tearsheet-header ?hide-close-button="${false}">
          <c4p-tearsheet-header-content title="Title of the tearsheet">
            <label slot="label">Customer data</label>
            ${description}
            ${iconLoader(Bee, {
              slot: 'title-start',
            })}

            <div slot="header-actions">
              <cds-button size="sm" kind="tertiary">
                Action 1 ${iconLoader(Add16, { slot: 'icon' })}
              </cds-button>
            </div>
          </c4p-tearsheet-header-content>
        </c4p-tearsheet-header>

        <c4p-tearsheet-body>
          <div slot="main-content">
            ${args.showSummaryContent
              ? html`<div class="summaryPanelTrigger">
                  <cds-button
                    kind="ghost"
                    label="Open right panel"
                    @click="${toggleSummaryPanel}"
                  >
                    ${iconLoader(RightPanelClose32, {
                      slot: 'icon',
                    })}
                  </cds-button>
                </div>`
              : ''}
            ${dummyContent}
          </div>
          ${args.showSummaryContent
            ? html`<c4p-tearsheet-summary-content slot="summary-content"
                >${summaryContent}</c4p-tearsheet-summary-content
              >`
            : ''}
        </c4p-tearsheet-body>

        <c4p-tearsheet-footer>
          <div class="default__action-buttons">
            <cds-button
              kind="ghost"
              size="${getButtonSize(args.variant)}"
              @click="${toggleButton}"
            >
              Cancel
            </cds-button>
            <cds-button
              kind="secondary"
              size="${getButtonSize(args.variant)}"
              @click="${() => console.log('Back clicked')}"
            >
              Back
            </cds-button>
            <cds-button
              size="${getButtonSize(args.variant)}"
              @click="${() => console.log('Submit clicked')}"
            >
              Submit
            </cds-button>
          </div>
        </c4p-tearsheet-footer>
      </c4p-preview-tearsheet>
    `;
  },
};

const meta = {
  title: 'Preview/Tearsheet',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (story) =>
      html` <style>
          #main-content {
            padding: 0;
          }

          .tabs-demo {
            padding: 1rem;
          }
        </style>
        ${story()}`,
  ],
};

export default meta;
