/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import View16 from '@carbon/icons/lib/view/16';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16';
import Folders16 from '@carbon/icons/lib/folders/16';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import '../icon-button/index';
import styles from './slug-story.scss?lit';

import { POPOVER_ALIGNMENT } from '../popover/defs';
import { SLUG_SIZE } from './defs';

const tooltipAlignments = {
  [`top`]: POPOVER_ALIGNMENT.TOP,
  [`top-left`]: POPOVER_ALIGNMENT.TOP_LEFT,
  [`top-right`]: POPOVER_ALIGNMENT.TOP_RIGHT,
  [`bottom`]: POPOVER_ALIGNMENT.BOTTOM,
  [`bottom-left`]: POPOVER_ALIGNMENT.BOTTOM_LEFT,
  [`bottom-right`]: POPOVER_ALIGNMENT.BOTTOM_RIGHT,
  [`left`]: POPOVER_ALIGNMENT.LEFT,
  [`left-bottom`]: POPOVER_ALIGNMENT.LEFT_BOTTOM,
  [`left-top`]: POPOVER_ALIGNMENT.LEFT_TOP,
  [`right`]: POPOVER_ALIGNMENT.RIGHT,
  [`right-bottom`]: POPOVER_ALIGNMENT.RIGHT_BOTTOM,
  [`right-top`]: POPOVER_ALIGNMENT.RIGHT_TOP,
};

const sizes = {
  [`Mini size (${SLUG_SIZE.MINI})`]: SLUG_SIZE.MINI,
  [`2XS size (${SLUG_SIZE.EXTRA_EXTRA_SMALL})`]: SLUG_SIZE.EXTRA_EXTRA_SMALL,
  [`XS size (${SLUG_SIZE.EXTRA_SMALL})`]: SLUG_SIZE.EXTRA_SMALL,
  [`Small size (${SLUG_SIZE.SMALL})`]: SLUG_SIZE.SMALL,
  [`Medium size (${SLUG_SIZE.MEDIUM})`]: SLUG_SIZE.MEDIUM,
  [`Large size (${SLUG_SIZE.LARGE})`]: SLUG_SIZE.LARGE,
  [`XL size (${SLUG_SIZE.EXTRA_LARGE})`]: SLUG_SIZE.EXTRA_LARGE,
};

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h1>84%</h1>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${View16({ slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${FolderOpen16({ slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${Folders16({ slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-slug-action-button>View details</cds-slug-action-button>
`;

const args = {
  aiTextLabel: '',
  alignment: POPOVER_ALIGNMENT.BOTTOM,
  kind: 'inline',
  revertActive: false,
  size: SLUG_SIZE.EXTRA_SMALL,
};

const argTypes = {
  aiTextLabel: {
    control: 'text',
    description:
      'Specify additional text to be rendered next to the AI label in the inline variant.',
  },
  alignment: {
    control: 'select',
    description: 'Specify how the popover should align with the button.',
    options: tooltipAlignments,
  },
  kind: {
    control: 'radio',
    description:
      'Specify the type of Slug, from the following list of types: <code>default</code>, <code>hollow</code>, or <code>inline</code>.',
    options: ['default', 'inline'],
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the button, from the following list of sizes: <code>mini</code>, <code>2xs</code>, <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>.',
    options: sizes,
  },
  revertActive: {
    control: 'boolean',
    description: 'Specify whether the revert button should be visible.',
  },
};

export const Default = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <div class="slug-container">
        <cds-slug size="mini" alignment="bottom-left">
          ${content}${actions}
        </cds-slug>
        <cds-slug size="2xs" alignment="bottom-left">
          ${content}${actions}
        </cds-slug>
        <cds-slug size="xs" alignment="bottom-left">
          ${content}${actions}
        </cds-slug>
        <cds-slug size="sm" alignment="bottom-left">
          ${content}${actions}
        </cds-slug>
        <cds-slug size="md" alignment="bottom-left" open>
          ${content} ${actions}</cds-slug
        >
        <cds-slug size="lg" alignment="bottom-left">
          ${content} ${actions}</cds-slug
        >
        <cds-slug size="xl" alignment="bottom-left">
          ${content} ${actions}</cds-slug
        >
      </div>
      <div class="slug-container">
        <cds-slug size="sm" kind="inline" alignment="bottom-left">
          ${content}${actions}
        </cds-slug>
        <cds-slug size="md" kind="inline" alignment="bottom-left">
          ${content}${actions}
        </cds-slug>
        <cds-slug size="lg" kind="inline" alignment="bottom-left">
          ${content}${actions}
        </cds-slug>
      </div>
      <div class="slug-container">
        <cds-slug
          size="sm"
          kind="inline"
          ai-text-label="Text goes here"
          alignment="bottom-left">
          ${content}${actions}
        </cds-slug>
        <cds-slug
          size="md"
          kind="inline"
          ai-text-label="Text goes here"
          alignment="bottom-left">
          ${content}${actions}
        </cds-slug>
        <cds-slug
          size="lg"
          kind="inline"
          ai-text-label="Text goes here"
          alignment="bottom-left">
          ${content}${actions}
        </cds-slug>
      </div>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const { alignment, aiTextLabel, kind, revertActive, size } = args ?? {};
    return html`
      <style>
        ${styles}
      </style>
      <div class="slug-container">
        <cds-slug
          alignment="${ifDefined(alignment)}"
          size="${size}"
          kind="${kind}"
          ai-text-label="${aiTextLabel}"
          ?revert-active="${revertActive}">
          ${content} ${actions}
        </cds-slug>
      </div>
    `;
  },
};

export const Callout = {
  args: {
    alignment: tooltipAlignments.bottom,
    showActions: false,
  },
  argTypes: {
    alignment: {
      control: 'select',
      description: 'Specify how the popover should align with the button.',
      options: tooltipAlignments,
    },
    showActions: {
      control: 'boolean',
      description: 'Specify whether to show action items in slug callout',
    },
  },
  render: (args) => {
    const { alignment, showActions } = args ?? {};
    return html`
      <style>
        ${styles}
      </style>
      <div class="slug-container-example slug-container centered">
        <cds-slug open alignment="${alignment}" size="${SLUG_SIZE.EXTRA_SMALL}">
          ${content} ${showActions ? actions : ''}
        </cds-slug>
      </div>
    `;
  },
};

const meta = {
  title: 'Experimental/Slug',
};

export default meta;
