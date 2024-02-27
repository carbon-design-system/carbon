/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TemplateResult, html } from 'lit';
import { boolean, select, text } from '@storybook/addon-knobs';
import '../button/button';
import {
  TEARSHEET_INFLUENCER_PLACEMENT,
  TEARSHEET_INFLUENCER_WIDTH,
  TEARSHEET_WIDTH,
} from './tearsheet';
import './index';
import '../text-input/index';
import '../textarea/index';
import storyDocs from './tearsheet-story.mdx';
import { prefix } from '../../globals/settings';

import styles from './story-styles.scss';
import { BUTTON_KIND } from '../button/button';
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

const influencers = {
  'No influencer': 0,
  'Simple influencer': 1,
  'Progress influencer': 2,
};

const getInfluencer = (index) => {
  switch (index) {
    case 1:
      return html`<div
        slot="influencer"
        class=${`${storyPrefix}__dummy-content-block`}>
        Influencer
      </div>`;
    case 2:
      return html` <cds-progress-indicator
        vertical
        slot="influencer"
        class=${`${storyPrefix}__dummy-content-block`}>
        <cds-progress-step
          state="complete"
          label="First step"
          secondary-label="Optional label"
          description="Step 1: Getting started with Carbon Design System"></cds-progress-step>
        <cds-progress-step
          label="Second step with tooltip"
          state="current"></cds-progress-step>
        <cds-progress-step
          label="Third step with tooltip"
          state="incomplete"></cds-progress-step>
        <cds-progress-step
          label="Fourth step"
          secondary-label="Example invalid step"
          state="invalid"></cds-progress-step>
        <cds-progress-step
          disabled
          label="Fifth step"
          state="incomplete"></cds-progress-step>
      </cds-progress-indicator>`;
    default:
      return null;
  }
};

const contents = {
  Empty: 0,
  'Brief content': 1,
  'Longer content': 2,
};

const storyPrefix = 'tearsheet-stories';

const getContent = (index) => {
  switch (index) {
    case 1:
      return html`
        <style>
          ${styles}
        </style>
        <div class=${`${storyPrefix}__dummy-content-block`}>
          <h5>Section</h5>
          <cds-text-input
            label="Input A"
            id="tearsheet-story-text-input-a"
            class="${storyPrefix}text-input"></cds-text-input>
          <cds-text-input
            label="Input B"
            id="tearsheet-story-text-input-b"
            class="${storyPrefix}text-input"></cds-text-input>
        </div>
      `;
    case 2:
      return html` <style>
          ${styles}
        </style>
        <div class=${`${storyPrefix}__dummy-content-block`}>
          <h5>Section</h5>
          <div class="${storyPrefix}text-inputs">
            <cds-text-input
              label="Input A"
              id="tearsheet-story-text-input-a"></cds-text-input>
            <cds-text-input
              label="Input B"
              id="tearsheet-story-text-input-b"></cds-text-input>
          </div>
          <div class="${storyPrefix}text-inputs">
            <cds-text-input
              label="Input C"
              id="tearsheet-story-text-input-c"></cds-text-input>
            <cds-text-input
              label="Input D"
              id="tearsheet-story-text-input-d"></cds-text-input>
          </div>
          <div class="${storyPrefix}textarea-container">
            <cds-textarea
              label="Notes"
              value="This is a text area"></cds-textarea>
            <cds-textarea
              label="Notes"
              value="This is a text area"></cds-textarea>
            <cds-textarea
              label="Notes"
              value="This is a text area"></cds-textarea>
          </div>
        </div>`;
    default:
      return null;
  }
};

const labels = {
  'No label': 0,
  'Shorter label': 1,
  'Longer label': 2,
};

const getLabel = (index) => {
  switch (index) {
    case 1:
      return html`<span slot="label">Optional label for context</span>`;
    case 2:
      return html`<span slot="label"
        >A longer label giving a bit more context
      </span>`;
    default:
      return null;
  }
};

const headerActions = {
  'No header actions': 0,
  'Drop down': 1,
  Buttons: 2,
};

const getActionToolbarItems = (index) => {
  switch (index) {
    case 1:
      return html`<cds-dropdown slot="header-actions">
        ${['option 1', 'option 2', 'option 3', 'option 4'].map(
          (option) => html` <cds-dropdown-item value="${option}"
            >${option}</cds-dropdown-item
          >`
        )}
      </cds-dropdown>`;
    case 2:
      return html`
        <cds-button
          slot="header-actions"
          kind=${BUTTON_KIND.SECONDARY}
          size="sm"
          style="width: initial">
          Secondary
        </cds-button>
        <cds-button
          slot="header-actions"
          kind=${BUTTON_KIND.PRIMARY}
          size="sm"
          style="width: initial">
          Primary
        </cds-button>
      `;
    default:
      return null;
  }
};

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

const toActions = (kinds: BUTTON_KIND[]) => {
  return kinds?.map((kind) => {
    return html`<cds-button key=${kind} slot="actions" kind=${kind}>
      ${kind.charAt(0).toUpperCase() + kind.slice(1)}
    </cds-button>`;
  });
};

// TODO: There are problems switching this
const getActionItems = (index) => {
  switch (index) {
    case 1:
      return toActions([BUTTON_KIND.PRIMARY]);
    case 2:
      return toActions([BUTTON_KIND.GHOST, BUTTON_KIND.PRIMARY]);
    case 3:
      return toActions([BUTTON_KIND.DANGER, BUTTON_KIND.PRIMARY]);
    case 4:
      return toActions([
        BUTTON_KIND.GHOST,
        BUTTON_KIND.SECONDARY,
        BUTTON_KIND.PRIMARY,
      ]);
    case 5:
      return toActions([
        BUTTON_KIND.DANGER,
        BUTTON_KIND.SECONDARY,
        BUTTON_KIND.PRIMARY,
      ]);
    case 6:
      return toActions([
        BUTTON_KIND.GHOST,
        BUTTON_KIND.TERTIARY,
        BUTTON_KIND.SECONDARY,
        BUTTON_KIND.PRIMARY,
      ]);
    case 7:
      return toActions([
        BUTTON_KIND.DANGER,
        BUTTON_KIND.TERTIARY,
        BUTTON_KIND.SECONDARY,
        BUTTON_KIND.PRIMARY,
      ]);
    case 8:
      return toActions([
        BUTTON_KIND.GHOST,
        BUTTON_KIND.DANGER,
        BUTTON_KIND.TERTIARY,
        BUTTON_KIND.SECONDARY,
        BUTTON_KIND.PRIMARY,
      ]);
    default:
      return null;
  }
};

const navigation = {
  'No navigation': 0,
  'With navigation': 1,
};

const getNavigation = (index) => {
  switch (index) {
    case 1:
      return html` <div
        className="tearsheet-stories__tabs"
        slot="header-navigation">
        <cds-tabs value="1">
          <cds-tab value="1">Tab 1</cds-tab>
          <cds-tab value="2">Tab 2</cds-tab>
          <cds-tab value="3">Tab 3</cds-tab>
          <cds-tab value="4">Tab 4</cds-tab>
        </cds-tabs>
      </div>`;
    default:
      return null;
  }
};

const slugs = {
  'No Slug': 0,
  'With Slug': 1,
};

const getSlug = (index) => {
  switch (index) {
    case 1:
      return html`<cds-slug slot="slug" className="slug-container" size="xs">
        <div slot="body-text">
          <p class="secondary">AI Explained</p>
          <h1>84%</h1>
          <p class="secondary bold">Confidence score</p>
          <p class="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p class="secondary">Model type</p>
          <p class="bold">Foundation model</p>
        </div>
      </cds-slug>`;
    default:
      return null;
  }
};

export default {
  title: 'Experimental/Tearsheet',
  decorators: [(story) => html` ${story()} `],
  parameters: {
    ...storyDocs.parameters,
  },
};

const DefaultTemplate = (argsIn) => {
  const args = {
    actionItems: getActionItems(select('Slot (actions)', actionItems, 4)),
    headerActions: getActionToolbarItems(
      select('Slot (header-toolbar)', headerActions, 0)
    ),
    content: getContent(select('Slot (default), panel contents', contents, 2)),
    label: getLabel(select('label', labels, 1)),
    open: boolean('open', false),
    influencerWidth: select(
      'influencer-width',
      influencerWidths,
      TEARSHEET_INFLUENCER_WIDTH.NARROW
    ),
    influencerPlacement: select(
      'influencer-placement',
      influencerPlacements,
      TEARSHEET_INFLUENCER_PLACEMENT.LEFT
    ),

    influencer: getInfluencer(select('influencer (slot)', influencers, 0)),

    preventCloseOnClickOutside: boolean(
      'prevent-close-on-click-outside',
      false
    ),
    selectorInitialFocus: text('selector-initial-focus', ''),
    width: select('width', widths, TEARSHEET_WIDTH.WIDE),
    slug: getSlug(select('slug (AI slug)', slugs, 0)),
    description: text(
      'description',
      'Description used to describe the flow if need be.'
    ),
    title: text(
      'title',
      'Title used to designate the overarching flow of the tearsheet.'
    ),
    headerNavigation: getNavigation(select('header-navigation', navigation, 0)),

    ...(argsIn?.['cds-tearsheet'] ?? {}),
  };

  return html`
    <div class="${storyPrefix}story-container">
      <div class="${storyPrefix}story-header"></div>
      <div id="page-content-selector" class="${storyPrefix}story-content">
        <cds-button @click="${toggleButton}">Toggle tearsheet</cds-button>
      </div>
    </div>
    <cds-tearsheet
      class=${args.class}
      selector-initial-focus=${args.selectorInitialFocus}
      ?open=${args.open}
      influencer-placement=${args.influencerPlacement}
      influencer-width=${args.influencerWidth}
      ?prevent-close-on-click-outside=${args.preventCloseOnClickOutside}
      width=${args.width}>
      <!-- default slotted content -->
      ${args.content}

      <!-- slotted header label -->
      ${args.label}

      <!-- slotted header title -->
      ${args.title ? html`<span slot="title">${args.title}</span>` : ''}

      <!-- slotted header description -->
      ${args.description
        ? html`<span slot="description">${args.description}</span>`
        : ''}

      <!-- slotted action in header cds-buttons -->
      ${args.headerActions}

      <!-- slotted action items cds-buttons -->
      ${args.actionItems}

      <!-- slotted slug -->
      ${args.slug}

      <!-- slotted header-navigation -->
      ${args.headerNavigation}

      <!-- slotted influencer -->
      ${args.influencer}
    </cds-tearsheet>
  `;
};

type TemplateType = {
  (args: any): TemplateResult<1>;
  parameters: { knobs: { [key: string]: any } };
};

export const Default = DefaultTemplate.bind({}) as TemplateType;
Default.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-tearsheet': () => ({}),
  },
};

export const WithNavigation = DefaultTemplate.bind({}) as TemplateType;
WithNavigation.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-tearsheet': () => ({
      headerNavigation: getNavigation(
        select('header-navigation', navigation, 1)
      ),
    }),
  },
};

export const WithInfluencer = DefaultTemplate.bind({}) as TemplateType;
WithInfluencer.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-tearsheet': () => ({
      influencer: getInfluencer(select('influencer (slot)', influencers, 2)),
    }),
  },
};

export const WithAllHeaderItemsAndInfluencer = DefaultTemplate.bind(
  {}
) as TemplateType;
WithAllHeaderItemsAndInfluencer.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-tearsheet': () => ({
      headerActions: getActionToolbarItems(
        select('Slot (header-toolbar)', headerActions, 2)
      ),
      influencer: getInfluencer(select('influencer (slot)', influencers, 2)),
    }),
  },
};

export const Narrow = DefaultTemplate.bind({}) as TemplateType;
Narrow.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-tearsheet': () => ({
      label: getLabel(select('label', labels, 0)),
      width: select('width', widths, TEARSHEET_WIDTH.NARROW),
    }),
  },
};

export const NarrowWithAllHeaderItems = DefaultTemplate.bind(
  {}
) as TemplateType;
NarrowWithAllHeaderItems.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-tearsheet': () => ({
      width: select('width', widths, TEARSHEET_WIDTH.NARROW),
    }),
  },
};
