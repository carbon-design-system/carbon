/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import {
  TEARSHEET_INFLUENCER_PLACEMENT,
  TEARSHEET_INFLUENCER_WIDTH,
  TEARSHEET_WIDTH,
} from './tearsheet';
import './index';
import '@carbon/web-components/es/components/button/index.js';

import { prefix } from '../../globals/settings';
import {
  getInfluencer,
  getContent,
  getSlug,
  getDecorator,
  getDescription,
  getLabel,
  getActionToolbarItems,
  getActionItems,
  getNavigation,
  influencers,
} from './utils';
import styles from './story-styles.scss?lit';

const toggleButton = () => {
  document.querySelector(`${prefix}-tearsheet`)?.toggleAttribute('open');
};

const widths = {
  // 'default (narrow)': null,
  [`Narrow (${TEARSHEET_WIDTH.NARROW})`]: TEARSHEET_WIDTH.NARROW,
  [`Wide (${TEARSHEET_WIDTH.WIDE})`]: TEARSHEET_WIDTH.WIDE,
};

const influencerWidths = {
  // 'default (narrow)': null,
  [`Narrow (${TEARSHEET_INFLUENCER_WIDTH.NARROW})`]:
    TEARSHEET_INFLUENCER_WIDTH.NARROW,
  [`Wide (${TEARSHEET_INFLUENCER_WIDTH.WIDE})`]:
    TEARSHEET_INFLUENCER_WIDTH.WIDE,
};

const influencerPlacements = {
  // 'default (right)': null,
  [`Left (${TEARSHEET_INFLUENCER_PLACEMENT.LEFT})`]:
    TEARSHEET_INFLUENCER_PLACEMENT.LEFT,
  [`right (${TEARSHEET_INFLUENCER_PLACEMENT.RIGHT})`]:
    TEARSHEET_INFLUENCER_PLACEMENT.RIGHT,
};

const storyPrefix = 'tearsheet-stories';

const actionItems = {
  'No actions': 0,
  'One button': 1,
  'Two buttons with ghost': 2,
  'Two buttons with danger': 3,
  'Three buttons with ghost': 4,
  'Three buttons with danger': 5,
  'Four buttons with ghost': 6,
  'Four buttons with danger': 7,
  'Too many buttons': 8,
};

const headerActions = {
  'No header actions': 0,
  'Drop down': 1,
  Buttons: 2,
};

const navigation = {
  'No navigation': 0,
  'With navigation': 1,
};

const slugs = {
  'No Slug': 0,
  'With Slug': 1,
};

const decorators = {
  'No Decorator': 'NO_DECORATOR',
  'With AI Label': 'WITH_AI_LABEL',
  'With non AI Label component': 'NON_AI_LABEL_DECORATOR',
};

const contents = {
  Empty: 0,
  'Brief content': 1,
  'Longer content': 2,
};

const labels = {
  'No label': 0,
  'Shorter label': 1,
  'Longer label': 2,
};

const descriptions = {
  'No description': 0,
  'With plain String': 1,
  'With truncated-text and 1 line': 2,
  'With truncated-text and 2 lines': 3,
};

export const Default = {
  args: {
    actionItems: 4,
    headerActions: 0,
    content: 2,
    label: 1,
    open: false,
    influencerWidth: TEARSHEET_INFLUENCER_WIDTH.NARROW,
    influencerPlacement: TEARSHEET_INFLUENCER_PLACEMENT.LEFT,
    influencer: 0,
    preventCloseOnClickOutside: false,
    selectorInitialFocus: '',
    width: TEARSHEET_WIDTH.WIDE,
    slug: 0,
    decorator: 'NO_DECORATOR',
    description: 1,
    title: 'Title used to designate the overarching flow of the tearsheet.',
    headerNavigation: 0,
  },
  argTypes: {
    actionItems: {
      control: 'select',
      description: 'Slot (actions)',
      options: actionItems,
    },
    headerActions: {
      control: 'select',
      description: 'Slot (header-toolbar)',
      options: headerActions,
    },
    content: {
      control: 'select',
      description: 'Slot (default), panel contents',
      options: contents,
    },
    label: {
      control: 'select',
      description: 'label',
      options: labels,
    },
    open: {
      control: 'boolean',
      description: 'open',
    },
    influencerWidth: {
      control: 'select',
      description: 'influencer-width',
      options: influencerWidths,
    },
    influencerPlacement: {
      control: 'select',
      description: 'influencer-placement',
      options: influencerPlacements,
    },
    influencer: {
      control: 'select',
      description: 'influencer (slot)',
      options: influencers,
    },
    preventCloseOnClickOutside: {
      control: 'boolean',
      description: 'prevent-close-on-click-outside',
    },
    selectorInitialFocus: {
      control: 'text',
      description: 'selector-initial-focus',
    },
    width: {
      control: 'select',
      description: 'width',
      options: widths,
    },
    slug: {
      control: 'select',
      description: 'slug (AI slug)',
      options: slugs,
    },
    decorator: {
      control: 'select',
      description: 'Slot(decorator)',
      options: decorators,
    },
    description: {
      control: 'select',
      description: 'description (slot)',
      options: descriptions,
    },
    title: {
      control: 'text',
      description: 'title',
    },
    headerNavigation: {
      control: 'select',
      description: 'header-navigation',
      options: navigation,
    },
  },
  render: (args) => {
    return html`
      <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${toggleButton}">Toggle tearsheet</cds-button>
        </div>
      </div>
      <c4p-tearsheet
        class=${args.class}
        selector-initial-focus=${args.selectorInitialFocus}
        ?open=${args.open}
        influencer-placement=${args.influencerPlacement}
        influencer-width=${args.influencerWidth}
        ?prevent-close-on-click-outside=${args.preventCloseOnClickOutside}
        width=${args.width}
      >
        <!-- default slotted content -->
        ${getContent(args.content)}

        <!-- slotted header label -->
        ${getLabel(args.label)}

        <!-- slotted header title -->
        ${args.title ? html`<span slot="title">${args.title}</span>` : ''}

        <!-- slotted header description -->
        ${getDescription(args.description)}

        <!-- slotted action in header cds-buttons -->
        ${getActionToolbarItems(args.headerActions)}

        <!-- slotted action items cds-buttons -->
        ${getActionItems(args.actionItems)}

        <!-- slotted Decorator -->
        ${getDecorator(args.decorator)}

        <!-- slotted slug -->
        ${getSlug(args.slug)}

        <!-- slotted header-navigation -->
        ${getNavigation(args.headerNavigation)}

        <!-- slotted influencer -->
        ${getInfluencer(args.influencer)}
      </c4p-tearsheet>
    `;
  },
};

export const WithNavigation = {
  ...Default,
  args: {
    ...Default.args,
    headerNavigation: 1,
  },
};

export const WithInfluencer = {
  ...Default,
  args: {
    ...Default.args,
    influencer: 2,
  },
};

export const WithAllHeaderItemsAndInfluencer = {
  ...Default,
  args: {
    ...Default.args,
    headerActions: 2,
    influencer: 2,
  },
};

export const Narrow = {
  ...Default,
  args: {
    ...Default.args,
    label: getLabel(0),
    width: TEARSHEET_WIDTH.NARROW,
  },
};

export const NarrowWithAllHeaderItems = {
  ...Default,
  args: {
    ...Default.args,
    width: TEARSHEET_WIDTH.NARROW,
  },
};

export const StackingTemplate = {
  ...Default,
  args: {
    ...Default.args,
  },
  render: (args) => {
    const toggleButton = (index) => {
      const tearsheet = document.querySelector(`[data-index="${index}"]`);
      tearsheet?.toggleAttribute('open');
    };

    return html`
      <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button-set-base z-index="9999">
            <cds-button @click="${() => toggleButton('one')}"
              >Toggle tearsheet one</cds-button
            >
            <cds-button @click="${() => toggleButton('two')}"
              >Toggle tearsheet two</cds-button
            >
            <cds-button @click="${() => toggleButton('three')}"
              >Toggle tearsheet three</cds-button
            >
          </cds-button-set-base>
        </div>
      </div>
      <c4p-tearsheet
        data-index="one"
        class=${args.class}
        selector-initial-focus=${args.selectorInitialFocus}
        ?open=${args.open}
        influencer-placement=${args.influencerPlacement}
        influencer-width=${args.influencerWidth}
        ?prevent-close-on-click-outside=${args.preventCloseOnClickOutside}
        width=${args.width}
      >
        <!-- default slotted content -->
        <cds-button @click="${() => toggleButton('two')}"
          >Toggle tearsheet two</cds-button
        >
        ${getContent(args.content)}

        <!-- slotted header label -->
        ${getLabel(args.label)}

        <!-- slotted header title -->
        ${args.title ? html`<span slot="title">One ${args.title}</span>` : ''}

        <!-- slotted header description -->
        ${getDescription(args.description)}

        <!-- slotted action in header cds-buttons -->
        ${getActionToolbarItems(args.headerActions)}

        <!-- slotted action items cds-buttons -->
        ${getActionItems(args.actionItems)}

        <!-- slotted slug -->
        ${getSlug(args.slug)}

        <!-- slotted header-navigation -->
        ${getNavigation(args.headerNavigation)}

        <!-- slotted influencer -->
        ${getInfluencer(args.influencer)}
      </c4p-tearsheet>
      <c4p-tearsheet
        data-index="two"
        class=${args.class}
        selector-initial-focus=${args.selectorInitialFocus}
        has-close-icon
        ?open=${args.open}
        influencer-placement=${args.influencerPlacement}
        influencer-width=${args.influencerWidth}
        ?prevent-close-on-click-outside=${args.preventCloseOnClickOutside}
        width=${args.width}
      >
        <!-- default slotted content -->
        <cds-button @click="${() => toggleButton('three')}"
          >Toggle tearsheet three</cds-button
        >
        ${getContent(args.content)}

        <!-- slotted header label -->
        ${getLabel(args.label)}

        <!-- slotted header title -->
        ${args.title ? html`<span slot="title">Two ${args.title}</span>` : ''}

        <!-- slotted header description -->
        ${args.description
          ? html`<span slot="description">${args.description}</span>`
          : ''}

        <!-- slotted action in header cds-buttons -->
        ${getActionToolbarItems(args.headerActions)}

        <!-- slotted action items cds-buttons -->
        ${getActionItems(args.actionItems)}

        <!-- slotted slug -->
        ${getSlug(args.slug)}

        <!-- slotted header-navigation -->
        ${getNavigation(args.headerNavigation)}

        <!-- slotted influencer -->
        ${getInfluencer(args.influencer)}
      </c4p-tearsheet>
      <c4p-tearsheet
        data-index="three"
        class=${args.class}
        selector-initial-focus=${args.selectorInitialFocus}
        has-close-icon
        ?open=${args.open}
        influencer-placement=${args.influencerPlacement}
        influencer-width=${args.influencerWidth}
        ?prevent-close-on-click-outside=${args.preventCloseOnClickOutside}
        width=${args.width}
      >
        <!-- default slotted content -->
        ${getContent(args.content)}

        <!-- slotted header label -->
        ${getLabel(args.label)}

        <!-- slotted action in header cds-buttons -->
        ${getActionToolbarItems(args.headerActions)}

        <!-- slotted action items cds-buttons -->
        ${getActionItems(args.actionItems)}

        <!-- slotted slug -->
        ${getSlug(args.slug)}

        <!-- slotted header-navigation -->
        ${getNavigation(args.headerNavigation)}

        <!-- slotted influencer -->
        ${getInfluencer(args.influencer)}

        <!-- slotted header title -->
        ${args.title ? html`<span slot="title">Three ${args.title}</span>` : ''}

        <!-- slotted header description -->
        ${getDescription(args.description)}
      </c4p-tearsheet>
    `;
  },
};

const meta = {
  title: 'Components/Tearsheet',
};

export default meta;
