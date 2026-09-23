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
import styles from './story-styles.scss?lit';
import './_story-assets/step-tearsheet';
import './_story-assets/stacking-tearsheet';
import '../progress-indicator/index';
import '../tabs/index';
import '../ai-label/index';
import '../text-input/index';
import '../textarea/index';
import '../slug/index';
import '../toggle-tip/index';
import '../dropdown/index';
import '../progress-bar/index';
import '../notification/index';
import mdx from './tearsheet.mdx';
import {
  storyPrefix,
  getButtonSize,
  getDecorator,
  toggleButton,
  handleCollapseChange,
  toggleInfluencerPanel,
  toggleSummaryPanel,
  description,
  progressIndicator,
  tabs,
  tabPanel,
  summaryContent,
  dummyContent,
  Bee,
  Add16,
  RightPanelClose32,
  iconLoader,
} from './tearsheet-helpers';

export const Default = {
  args: {
    variant: 'wide',
    open: false,
    decorator: false,
    isFlush: false,
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

      <cds-tearsheet
        variant="${args.variant}"
        ?open="${args.open}"
        ?prevent-close-on-click-outside="${args.preventCloseOnClickOutside}"
        @cds-tearsheet-collapse-change="${handleCollapseChange}">
        <cds-tearsheet-header
          ?hide-close-button="${args.hideCloseButton}"
          ?disable-header-collapse="${args.disableHeaderCollapse}">
          <cds-tearsheet-header-content title="${args.title}">
            ${getDecorator(args.decorator)}
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
          </cds-tearsheet-header-content>
        </cds-tearsheet-header>

        <cds-tearsheet-body>
          <div slot="main-content" ?is-flush="${args.isFlush}">
            ${args.showSummaryContent
              ? html`<div class="summaryPanelTrigger">
                  <cds-button
                    size="md"
                    kind="ghost"
                    label="Open right panel"
                    @click="${toggleSummaryPanel}"
                    aria-expanded="false"
                    aria-controls="summary-panel">
                    ${iconLoader(RightPanelClose32, {
                      slot: 'icon',
                    })}
                  </cds-button>
                </div>`
              : ''}
            ${dummyContent}
          </div>
          ${args.showSummaryContent
            ? html`<cds-tearsheet-summary-content slot="summary-content"
                >${summaryContent}</cds-tearsheet-summary-content
              >`
            : ''}
        </cds-tearsheet-body>
        <cds-tearsheet-footer
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
          ]}">
        </cds-tearsheet-footer>
      </cds-tearsheet>
    `;
  },
};

export const WithInfluencer = {
  args: {
    variant: 'wide',
    decorator: false,
    isFlush: false,
    hideCloseButton: false,
    disableHeaderCollapse: false,
  },
  render: (args) => {
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

      <cds-tearsheet
        variant="${args.variant ?? 'wide'}"
        @cds-tearsheet-collapse-change="${handleCollapseChange}">
        <cds-tearsheet-header
          ?hide-close-button="${args.hideCloseButton}"
          ?disable-header-collapse="${args.disableHeaderCollapse}">
          <cds-tearsheet-header-content title="Title of the tearsheet">
            ${getDecorator(args.decorator)}
            <label slot="label">Label</label>
            ${description}
            ${iconLoader(Bee, {
              slot: 'title-start',
            })}

            <div slot="header-actions">
              <cds-button size="sm" kind="tertiary">Action 1</cds-button>
            </div>
          </cds-tearsheet-header-content>
        </cds-tearsheet-header>

        <!-- Influencer with Progress Indicator -->
        <cds-tearsheet-influencer>
          ${progressIndicator(true)}
        </cds-tearsheet-influencer>

        <cds-tearsheet-body>
          <div slot="main-content" ?is-flush="${args.isFlush}">
            <!-- Button to open influencer panel on small screens -->
            <div class="influencerPanelTrigger">
              <cds-button
                size="md"
                kind="ghost"
                tooltip-text="Open Influencer"
                tooltip-position="right"
                @click="${toggleInfluencerPanel}">
                ${iconLoader(RightPanelClose32, { slot: 'icon' })}
              </cds-button>
            </div>

            <!-- Main Content -->
            ${dummyContent}
          </div>
        </cds-tearsheet-body>

        <cds-tearsheet-footer
          variant="${args.variant ?? 'wide'}"
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
          ]}">
        </cds-tearsheet-footer>
      </cds-tearsheet>
    `;
  },
};

export const WithTabs = {
  args: {
    variant: 'wide',
    decorator: false,
    isFlush: false,
    hideCloseButton: false,
    disableHeaderCollapse: false,
  },
  render: (args) => {
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

      <cds-tearsheet
        variant="${args.variant ?? 'wide'}"
        @cds-tearsheet-collapse-change="${handleCollapseChange}">
        <cds-tearsheet-header
          ?hide-close-button="${args.hideCloseButton}"
          ?disable-header-collapse="${args.disableHeaderCollapse}">
          <cds-tearsheet-header-content title="Title of the tearsheet">
            ${getDecorator(args.decorator)}
            <label slot="label">Label</label>
            ${description}
            ${iconLoader(Bee, {
              slot: 'title-start',
            })}

            <div slot="header-actions">
              <cds-button size="sm" kind="tertiary">Action 1</cds-button>
            </div>
          </cds-tearsheet-header-content>
          <cds-tearsheet-navigation-bar>
            ${tabs}
            <cds-tearsheet-scroller slot="scroller"></cds-tearsheet-scroller>
          </cds-tearsheet-navigation-bar>
        </cds-tearsheet-header>

        <cds-tearsheet-body>
          <div slot="main-content" ?is-flush="${args.isFlush}">
            <div
              id="tab-cloudFoundry"
              role="tabpanel"
              aria-labelledby="tab-all"
              hidden="">
              Tab Panel 1
            </div>
            ${tabPanel}
          </div>
        </cds-tearsheet-body>

        <cds-tearsheet-footer
          variant="${args.variant ?? 'wide'}"
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
          ]}">
        </cds-tearsheet-footer>
      </cds-tearsheet>
    `;
  },
};

export const narrowTearsheet = {
  args: {
    decorator: false,
    isFlush: false,
    hideCloseButton: false,
    disableHeaderCollapse: false,
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

      <cds-tearsheet
        variant="narrow"
        @cds-tearsheet-collapse-change="${handleCollapseChange}">
        <cds-tearsheet-header
          ?hide-close-button="${args.hideCloseButton}"
          ?disable-header-collapse="${args.disableHeaderCollapse}">
          <cds-tearsheet-header-content title="Title of the tearsheet">
            ${getDecorator(args.decorator)}
            <label slot="label">Label</label>
            ${description}
            <div slot="header-actions">
              <cds-button size="sm" kind="tertiary">
                Primary action ${iconLoader(Add16, { slot: 'icon' })}
              </cds-button>
            </div>
          </cds-tearsheet-header-content>
        </cds-tearsheet-header>

        <cds-tearsheet-influencer
          >${progressIndicator(true)}</cds-tearsheet-influencer
        >

        <cds-tearsheet-body>
          <div slot="main-content" ?is-flush="${args.isFlush}">
            <div class="influencerPanelTrigger">
              <cds-button
                size="md"
                kind="ghost"
                label="Open influencer"
                @click="${toggleInfluencerPanel}">
                ${iconLoader(RightPanelClose32, { slot: 'icon' })}
              </cds-button>
            </div>
            <div class="summaryPanelTrigger">
              <cds-button
                size="md"
                kind="ghost"
                label="Open right panel"
                @click="${toggleSummaryPanel}">
                ${iconLoader(RightPanelClose32, { slot: 'icon' })}
              </cds-button>
            </div>
            ${dummyContent}
          </div>
          <cds-tearsheet-summary-content slot="summary-content">
            ${summaryContent}
          </cds-tearsheet-summary-content>
        </cds-tearsheet-body>

        <cds-tearsheet-footer
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
          ]}">
        </cds-tearsheet-footer>
      </cds-tearsheet>
    `;
  },
};
export const withSteps = {
  render: () => {
    return html` <step-tearsheet-demo></step-tearsheet-demo> `;
  },
};
export const withStepsAndHorizontalProgressIndicator = {
  render: () => {
    return html` <step-tearsheet-demo horizontal></step-tearsheet-demo> `;
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
        tearsheet-type="narrow"></stacking-tearsheet-demo>
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
    decorator: false,
    isFlush: false,
    hideCloseButton: false,
    disableHeaderCollapse: false,
    showSummaryContent: true,
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

      <cds-tearsheet
        variant="${args.variant}"
        ?open="${args.open}"
        prevent-close-on-click-outside
        @cds-tearsheet-collapse-change="${handleCollapseChange}">
        <cds-tearsheet-header
          ?hide-close-button="${args.hideCloseButton}"
          ?disable-header-collapse="${args.disableHeaderCollapse}">
          <cds-tearsheet-header-content title="Title of the tearsheet">
            ${getDecorator(args.decorator)}
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
          </cds-tearsheet-header-content>
        </cds-tearsheet-header>

        <cds-tearsheet-body>
          <div slot="main-content" ?is-flush="${args.isFlush}">
            ${args.showSummaryContent
              ? html`<div class="summaryPanelTrigger">
                  <cds-button
                    size="md"
                    kind="ghost"
                    label="Open right panel"
                    @click="${toggleSummaryPanel}">
                    ${iconLoader(RightPanelClose32, {
                      slot: 'icon',
                    })}
                  </cds-button>
                </div>`
              : ''}
            ${dummyContent}
          </div>
          ${args.showSummaryContent
            ? html`<cds-tearsheet-summary-content slot="summary-content"
                >${summaryContent}</cds-tearsheet-summary-content
              >`
            : ''}
        </cds-tearsheet-body>

        <cds-tearsheet-footer>
          <div class="default__action-buttons">
            <cds-button
              kind="ghost"
              size="${getButtonSize(args.variant)}"
              @click="${toggleButton}">
              Cancel
            </cds-button>
            <cds-button
              kind="secondary"
              size="${getButtonSize(args.variant)}"
              @click="${() => {}}">
              Back
            </cds-button>
            <cds-button
              size="${getButtonSize(args.variant)}"
              @click="${() => {}}">
              Submit
            </cds-button>
          </div>
        </cds-tearsheet-footer>
      </cds-tearsheet>
    `;
  },
};

const meta = {
  title: 'Components/Tearsheet',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  tags: ['ibm-products-migrated'],
  // Shared argTypes inherited by every story
  argTypes: {
    decorator: {
      control: { type: 'boolean' },
      description: 'When true, an AI Label decorator is shown in the header.',
    },
    isFlush: {
      control: { type: 'boolean' },
      description:
        'When true, the main content area takes full width without padding.',
    },
    variant: {
      control: { type: 'radio' },
      options: ['wide', 'narrow'],
      description: 'Tearsheet variant',
    },
    hideCloseButton: {
      control: { type: 'boolean' },
      description: 'Hide the close button in the header.',
    },
    disableHeaderCollapse: {
      control: { type: 'boolean' },
      description: 'Disable header collapse/expand on scroll.',
    },
    closeIconDescription: {
      control: { type: 'text' },
      description: 'Accessible label for the close icon button.',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Controls whether the tearsheet is open',
    },
    title: {
      control: { type: 'text' },
      description: 'Title of the tearsheet',
    },
    label: {
      control: { type: 'text' },
      description: 'Label above the title',
    },
    showDescription: {
      control: { type: 'boolean' },
      description: 'Show description text',
    },
    showTitleIcon: {
      control: { type: 'boolean' },
      description: 'Show icon before title',
    },
    showHeaderActions: {
      control: { type: 'boolean' },
      description: 'Show action buttons in header',
    },
    showSummaryContent: {
      control: { type: 'boolean' },
      description: 'Show summary content panel',
    },
    preventCloseOnClickOutside: {
      control: { type: 'boolean' },
      description: 'Prevent closing when clicking outside',
    },
  },
  decorators: [
    (story) =>
      html` <style>
          #main-content {
            padding: 0;
          }
        </style>
        ${story()}`,
  ],
};

export default meta;
