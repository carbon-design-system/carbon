/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { SIDE_PANEL_SIZE, SIDE_PANEL_PLACEMENT } from './side-panel';
import './index';
import { prefix } from '../../globals/settings';

import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/textarea/index.js';

import { ICON_BUTTON_TOOLTIP_ALIGNMENT } from '@carbon/web-components/es/components/icon-button/defs.js';

import {
  getContent,
  getCustomHeaderComponents,
  getSubTitle,
  getActionToolbarItems,
  getActionItems,
  getSlug,
} from './_story-assets';

const toggleButton = () => {
  document.querySelector(`${prefix}-side-panel`)?.toggleAttribute('open');
};

const nextStep = () => {
  document
    .querySelector(`${prefix}-side-panel`)
    ?.setAttribute('current-step', '1');
};

const prevStep = () => {
  document
    .querySelector(`${prefix}-side-panel`)
    ?.setAttribute('current-step', '0');
};

const sizes = {
  // 'default (md)': null,
  [`Extra small size (${SIDE_PANEL_SIZE.EXTRA_SMALL})`]:
    SIDE_PANEL_SIZE.EXTRA_SMALL,
  [`Small size (${SIDE_PANEL_SIZE.SMALL})`]: SIDE_PANEL_SIZE.SMALL,
  [`Medium size (default) (${SIDE_PANEL_SIZE.MEDIUM})`]: SIDE_PANEL_SIZE.MEDIUM,
  [`Large size (${SIDE_PANEL_SIZE.LARGE})`]: SIDE_PANEL_SIZE.LARGE,
  [`Extra Large size (${SIDE_PANEL_SIZE.EXTRA_LARGE})`]:
    SIDE_PANEL_SIZE.EXTRA_LARGE,
  [`Extra Extra Large size (${SIDE_PANEL_SIZE.EXTRA_EXTRA_LARGE})`]:
    SIDE_PANEL_SIZE.EXTRA_EXTRA_LARGE,
};

const placements = {
  // 'default (right)': null,
  left: SIDE_PANEL_PLACEMENT.LEFT,
  'right (default)': SIDE_PANEL_PLACEMENT.RIGHT,
};

const contents = {
  Empty: 0,
  'Brief content': 1,
  'Longer content': 2,
};

const storyPrefix = 'side-panel-stories__';

const labels = {
  'No label': 0,
  'Shorter label': 1,
  'Longer label': 2,
};

const getLabel = (index) => {
  switch (index) {
    case 1:
      return 'A short label';
    case 2:
      return 'A longer label that might go on for a little bit';
    default:
      return '';
  }
};

const subtitles = {
  'No subtitle': 0,
  'Short subtitle': 1,
  'Longer subtitle': 2,
};

const actionToolbarItems = {
  'No action toolbar': 0,
  'With action toolbar': 1,
};

const actionItems = {
  'One button': 1,
  'One button (ghost)': 2,
  'One button (danger)': 3,
  'Two buttons': 4,
  'Two buttons with ghost': 5,
  'Two buttons with danger': 6,
  'Three buttons with ghost': 7,
  'Three buttons with danger': 8,
  'Three buttons': 9,
  None: 0,
};

const slugs = {
  'No Slug': 0,
  'With Slug': 1,
};

const customHeaderComponents = {
  'No custom header components': 0,
  'With custom components above title': 1,
  'With custom components below title': 2,
  'With custom components above & below title': 3,
};

const closeIconTooltipAlignmentOptions: string[] = Object.values(
  ICON_BUTTON_TOOLTIP_ALIGNMENT
);

const defaultTemplate = {
  args: {
    actionItems: 1,
    actionToolbarItems: 0,
    animateTitle: true,
    class: 'a-user-class',
    closeIconDescription: 'Close panel',
    closeIconTooltipAlignment: 'left',
    condensedActions: false,
    content: 2,
    includeOverlay: true,
    label: 2,
    open: false,
    placement: SIDE_PANEL_PLACEMENT.RIGHT,
    preventCloseOnClickOutside: false,
    resizable: false,
    selectorPageContent: '#page-content-selector',
    selectorInitialFocus: '#side-panel-story-text-input-a',
    hideCloseButton: false,
    size: SIDE_PANEL_SIZE.MEDIUM,
    slideIn: false,
    slug: 0,
    subtitle: 1,
    title:
      'This title is testing a very long title to see how this behaves with a longer title. It needs to be long enough to trigger overflow when collapsed.',
  },
  argTypes: {
    actionItems: {
      control: 'select',
      description: 'Slot (actions)',
      options: actionItems,
    },
    actionToolbarItems: {
      control: 'select',
      description: 'Slot (action-toolbar)',
      options: actionToolbarItems,
    },
    animateTitle: {
      control: 'boolean',
      description: 'animate-title (Title animates on scroll)',
    },
    class: {
      control: 'text',
      description: 'class',
    },
    closeIconDescription: {
      control: 'text',
      description: 'Close icon description',
    },
    closeIconTooltipAlignment: {
      control: 'select',
      description: 'Close icon tooltip alignment',
      options: closeIconTooltipAlignmentOptions,
    },
    condensedActions: {
      control: 'boolean',
      description: 'condensed-actions',
    },
    content: {
      control: 'select',
      description: 'Slot (default), panel contents',
      options: contents,
    },
    includeOverlay: {
      control: 'boolean',
      description: 'include-overlay',
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
    placement: {
      control: 'select',
      description: 'placement',
      options: placements,
    },
    preventCloseOnClickOutside: {
      control: 'boolean',
      description: 'prevent-close-on-click-outside',
    },
    resizable: {
      control: 'boolean',
      description:
        'resizable (enables panel resizing). Note: Does not affect slide-in variant.',
    },
    selectorPageContent: {
      control: 'text',
      description: 'selector-page-content',
    },
    selectorInitialFocus: {
      control: 'text',
      description: 'selector-initial-focus',
    },
    hideCloseButton: {
      control: 'boolean',
      description: 'Show/hide the "X" close button',
    },
    size: {
      control: 'select',
      description: 'size',
      options: sizes,
    },
    slideIn: {
      control: 'boolean',
      description: 'slide-in',
    },
    slug: {
      control: 'select',
      description: 'slug (AI slug)',
      options: slugs,
    },
    subtitle: {
      control: 'select',
      description: 'Slot (subtitle)',
      options: subtitles,
    },
    title: {
      control: 'text',
      description: 'title',
    },
  },
  render: (args) => {
    return html`
      <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${toggleButton}">Toggle side-panel</cds-button>
        </div>
      </div>
      <c4p-side-panel
        ?animate-title=${args.animateTitle}
        ?condensed-actions=${args.condensedActions}
        current-step="0"
        ?include-overlay=${args.includeOverlay && !args.slideIn}
        selector-initial-focus=${args.selectorInitialFocus}
        label-text="${getLabel(args.label)}"
        ?open=${args.open}
        placement=${args.placement}
        ?prevent-close-on-click-outside=${args.preventCloseOnClickOutside}
        ?resizable=${args.resizable}
        selector-page-content=${args.selectorPageContent}
        size=${args.size}
        ?slide-in=${args.slideIn}
        ?hide-close-button=${args.hideCloseButton}
        close-icon-description=${args.closeIconDescription}
        close-icon-tooltip-alignment=${args.closeIconTooltipAlignment}
        .title=${args.title}
        @c4p-side-panel-navigate-back=${prevStep}
      >
        <!-- slotted action toolbar cds-buttons -->
        ${getActionToolbarItems(args.actionToolbarItems)}

        <!-- default slotted content -->
        ${getContent(args.content)}
        <cds-button @click="${nextStep}">Step two</cds-button>

        <!-- slotted subtitle slotted content -->
        ${getSubTitle(args.subtitle)}

        <!-- slotted action items cds-buttons -->
        ${getActionItems(args.actionItems)}

        <!-- slotted slug -->
        ${getSlug(args.slug)}
      </c4p-side-panel>
    `;
  },
};

export const SlideOver = {
  ...defaultTemplate,
};

export const SlideIn = {
  ...defaultTemplate,
  args: {
    ...defaultTemplate.args,
    slideIn: true,
  },
  argTypes: {
    resizable: {
      table: {
        disable: true,
      },
    },
  },
};

export const WithActionToolbar = {
  ...defaultTemplate,
  args: {
    ...defaultTemplate.args,
    actionToolbarItems: 1,
  },
};

export const SpecifyElementToHaveFocus = {
  ...defaultTemplate,
  args: {
    ...defaultTemplate.args,
    focusSelector: '#side-panel-story-text-input-a',
    label: 0,
  },
  argTypes: {
    ...defaultTemplate.argTypes,
    focusSelector: {
      control: 'text',
      description: 'selector-primary-focus',
    },
  },
};

export const WithStaticTitle = {
  ...defaultTemplate,
  args: {
    ...defaultTemplate.args,
    animateTitle: false,
    label: 0,
  },
};

export const WithStaticTitleAndActionToolbar = {
  ...defaultTemplate,
  args: {
    ...defaultTemplate.args,
    actionToolbarItems: 1,
    animateTitle: false,
    label: 0,
  },
};

export const WithoutTitle = {
  ...defaultTemplate,
  args: {
    ...defaultTemplate.args,
    label: 0,
    title: '',
  },
};

export const CustomHeader = {
  args: {
    ...defaultTemplate.args,
    customHeaderComponents: 1,
  },
  argTypes: {
    ...defaultTemplate.argTypes,
    customHeaderComponents: {
      control: 'select',
      description: 'Slots (above-title, below-title)',
      options: customHeaderComponents,
    },
  },
  render: (args) => {
    return html`
      <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${toggleButton}">Toggle side-panel</cds-button>
        </div>
      </div>
      <c4p-side-panel
        ?animate-title=${args.animateTitle}
        ?condensed-actions=${args.condensedActions}
        current-step="0"
        ?include-overlay=${args.includeOverlay && !args.slideIn}
        selector-initial-focus=${args.selectorInitialFocus}
        label-text="${getLabel(args.label)}"
        ?open=${args.open}
        placement=${args.placement}
        ?prevent-close-on-click-outside=${args.preventCloseOnClickOutside}
        ?resizable=${args.resizable}
        selector-page-content=${args.selectorPageContent}
        size=${args.size}
        ?slide-in=${args.slideIn}
        ?hide-close-button=${args.hideCloseButton}
        close-icon-description=${args.closeIconDescription}
        close-icon-tooltip-alignment=${args.closeIconTooltipAlignment}
        .title=${args.title}
        @c4p-side-panel-navigate-back=${prevStep}
      >
        <!-- slotted custom header components -->
        ${getCustomHeaderComponents(args.customHeaderComponents)}

        <!-- slotted action toolbar cds-buttons -->
        ${getActionToolbarItems(args.actionToolbarItems)}

        <!-- default slotted content -->
        ${getContent(args.content)}
        <cds-button @click="${nextStep}">Step two</cds-button>

        <!-- slotted subtitle slotted content -->
        ${getSubTitle(args.subtitle)}

        <!-- slotted action items cds-buttons -->
        ${getActionItems(args.actionItems)}

        <!-- slotted slug -->
        ${getSlug(args.slug)}
      </c4p-side-panel>
    `;
  },
};

const meta = {
  title: 'Components/SidePanel',
};

export default meta;
