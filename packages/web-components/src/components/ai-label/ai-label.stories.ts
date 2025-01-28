/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import View16 from '@carbon/icons/lib/view/16.js';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16.js';
import Folders16 from '@carbon/icons/lib/folders/16.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import '../icon-button/index';
import '../button/index';
import styles from './ai-label-story.scss?lit';

import { POPOVER_ALIGNMENT } from '../popover/defs';
import { AI_LABEL_SIZE } from './defs';

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
  [`Mini size (${AI_LABEL_SIZE.MINI})`]: AI_LABEL_SIZE.MINI,
  [`2XS size (${AI_LABEL_SIZE.EXTRA_EXTRA_SMALL})`]:
    AI_LABEL_SIZE.EXTRA_EXTRA_SMALL,
  [`XS size (${AI_LABEL_SIZE.EXTRA_SMALL})`]: AI_LABEL_SIZE.EXTRA_SMALL,
  [`Small size (${AI_LABEL_SIZE.SMALL})`]: AI_LABEL_SIZE.SMALL,
  [`Medium size (${AI_LABEL_SIZE.MEDIUM})`]: AI_LABEL_SIZE.MEDIUM,
  [`Large size (${AI_LABEL_SIZE.LARGE})`]: AI_LABEL_SIZE.LARGE,
  [`XL size (${AI_LABEL_SIZE.EXTRA_LARGE})`]: AI_LABEL_SIZE.EXTRA_LARGE,
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
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

const args = {
  aiTextLabel: '',
  alignment: POPOVER_ALIGNMENT.BOTTOM,
  autoalign: true,
  kind: 'default',
  revertActive: false,
  showActions: true,
  size: AI_LABEL_SIZE.EXTRA_SMALL,
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
  autoalign: {
    control: 'boolean',
    description:
      'Will auto-align the popover. This prop is currently experimental and is subject to future changes.',
  },
  kind: {
    control: 'radio',
    description:
      'Specify the type of AI Label, from the following list of types: <code>default</code>, <code>hollow</code>, or <code>inline</code>.',
    options: ['default', 'inline'],
  },
  showActions: {
    control: 'boolean',
    description:
      'Storybook only - Specify whether to show action items in AI Label callout',
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
      <div class="ai-label-container">
        <cds-ai-label autoalign size="mini" alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
        <cds-ai-label autoalign size="2xs" alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
        <cds-ai-label autoalign size="xs" alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
        <cds-ai-label autoalign size="sm" alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
        <cds-ai-label autoalign size="md" alignment="bottom-left">
          ${content} ${actions}</cds-ai-label
        >
        <cds-ai-label autoalign size="lg" alignment="bottom-left">
          ${content} ${actions}</cds-ai-label
        >
        <cds-ai-label autoalign size="xl" alignment="bottom-left">
          ${content} ${actions}</cds-ai-label
        >
      </div>
      <div class="ai-label-container">
        <cds-ai-label autoalign size="sm" kind="inline" alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
        <cds-ai-label autoalign size="md" kind="inline" alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
        <cds-ai-label autoalign size="lg" kind="inline" alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
      </div>
      <div class="ai-label-container">
        <cds-ai-label
          autoalign
          size="sm"
          kind="inline"
          ai-text-label="Text goes here"
          alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
        <cds-ai-label
          autoalign
          size="md"
          kind="inline"
          ai-text-label="Text goes here"
          alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
        <cds-ai-label
          autoalign
          size="lg"
          kind="inline"
          ai-text-label="Text goes here"
          alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
      </div>
    `;
  },
};

export const ExplainabilityPopover = {
  args: {
    alignment: tooltipAlignments.bottom,
    showActions: true,
  },
  argTypes: {
    alignment: {
      control: 'select',
      description: 'Specify how the popover should align with the button.',
      options: tooltipAlignments,
    },
    showActions: {
      control: 'boolean',
      description:
        'Storybook only - Specify whether to show action items in AI Label callout',
    },
  },
  render: (args) => {
    const { alignment, showActions } = args ?? {};

    return html`
      <style>
        ${styles}
      </style>
      <div class="ai-label-container-example ai-label-container centered">
        <cds-ai-label
          open
          alignment="${alignment}"
          size="${AI_LABEL_SIZE.EXTRA_SMALL}">
          ${content} ${showActions ? actions : ''}
        </cds-ai-label>
      </div>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const {
      alignment,
      aiTextLabel,
      autoalign,
      kind,
      revertActive,
      showActions,
      size,
    } = args ?? {};
    return html`
      <style>
        ${styles}
      </style>
      <div class="ai-label-container">
        <cds-ai-label
          ?autoalign=${autoalign}
          alignment="${ifDefined(alignment)}"
          size="${size}"
          kind="${kind}"
          ai-text-label="${aiTextLabel}"
          ?revert-active="${revertActive}">
          ${content} ${showActions ? actions : ''}
        </cds-ai-label>
      </div>
      <div style="display: inline-flex">
        <cds-button>Test</cds-button>
        <cds-button kind="danger">Test</cds-button>
        <div></div>
      </div>
    `;
  },
};

const meta = {
  title: 'Components/AI Label',
};

export default meta;
