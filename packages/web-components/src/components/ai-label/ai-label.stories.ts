/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import './index';
import '../icon-button/index';
import '../button/index';
import styles from './ai-label-story.scss?lit';
import { iconLoader } from '../../globals/internal/icon-loader';

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

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
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
    ${iconLoader(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

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

const meta = {
  title: 'Components/AI Label',
};

export default meta;
