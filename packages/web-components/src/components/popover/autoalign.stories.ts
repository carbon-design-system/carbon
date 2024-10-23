/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../toggle-tip/index';
import '../ai-label/index';
import '../icon-button/index';
import '../data-table/index';
import { POPOVER_ALIGNMENT } from './defs';
import { AI_LABEL_SIZE } from '../ai-label/defs';
import Checkbox16 from '@carbon/icons/lib/checkbox/16.js';
import Information16 from '@carbon/icons/lib/information/16.js';
import View16 from '@carbon/icons/lib/view/16.js';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16.js';
import Folders16 from '@carbon/icons/lib/folders/16.js';

import styles from './popover-story.scss?lit';
import aiLabelStyles from '../ai-label/ai-label-story.scss?lit';
import tooltipStyles from '../tooltip/tooltip-story.scss?lit';

const popoverAlignments = {
  [`top`]: POPOVER_ALIGNMENT.TOP,
  [`top-start`]: POPOVER_ALIGNMENT.TOP_START,
  [`top-end`]: POPOVER_ALIGNMENT.TOP_END,
  [`bottom`]: POPOVER_ALIGNMENT.BOTTOM,
  [`bottom-start`]: POPOVER_ALIGNMENT.BOTTOM_START,
  [`bottom-end`]: POPOVER_ALIGNMENT.BOTTOM_END,
  [`left`]: POPOVER_ALIGNMENT.LEFT,
  [`left-end`]: POPOVER_ALIGNMENT.LEFT_END,
  [`left-start`]: POPOVER_ALIGNMENT.LEFT_START,
  [`right`]: POPOVER_ALIGNMENT.RIGHT,
  [`right-end`]: POPOVER_ALIGNMENT.RIGHT_END,
  [`right-start`]: POPOVER_ALIGNMENT.RIGHT_START,
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

export const Popover = {
  args: {
    caret: true,
    highContrast: false,
    align: popoverAlignments.bottom,
    dropShadow: true,
  },
  argTypes: {
    caret: {
      control: 'boolean',
      description: 'Caret (caret)',
    },
    highContrast: {
      control: 'boolean',
      description: 'High contrast (highContrast)',
    },
    align: {
      control: 'select',
      description: 'Align (align)',
      options: popoverAlignments,
    },
    dropShadow: {
      control: 'boolean',
      description: 'Drop shadow (dropShadow)',
    },
  },
  render: (args) => {
    const { caret, highContrast, align, dropShadow } = args ?? {};

    const handleClick = (id) => {
      const popover = document.querySelector(id);
      const open = popover?.hasAttribute('open');
      open
        ? popover?.removeAttribute('open')
        : popover?.setAttribute('open', '');
    };

    return html`
      <style>
        ${styles}
      </style>
      <cds-popover
        autoalign
        id="popover-one"
        open
        ?caret=${caret}
        ?highContrast=${highContrast}
        align=${align}
        ?dropShadow=${dropShadow}>
        <button
          class="playground-trigger"
          aria-label="Settings"
          type="button"
          @click="${() => handleClick('#popover-one')}">
          ${Checkbox16()}
        </button>
        <cds-popover-content>
          <div class="p-3">
            <p class="popover-title">Available storage</p>
            <p class="popover-details">
              This server has 150 GB of block storage remaining.
            </p>
          </div>
        </cds-popover-content>
      </cds-popover>
    `;
  },
};

export const Toggletip = {
  args: {
    alignment: POPOVER_ALIGNMENT.BOTTOM,
    bodyText: `Lorem ipsum dolor sit amet, di os consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.`,
  },
  argTypes: {
    alignment: {
      control: 'select',
      description: 'Toggletip alignment to trigger button (alignment)',
      options: popoverAlignments,
    },
    bodyText: {
      control: 'text',
      description: 'Toggletip content (bodyText)',
    },
  },
  render: (args) => {
    const { alignment, bodyText } = args ?? {};

    return html`
      <cds-toggletip autoalign alignment="${alignment}">
        Toggletip label

        <p slot="body-text">${bodyText}</p>
        <cds-link slot="actions">Test</cds-link>
        <cds-button slot="actions">Button</cds-button>
      </cds-toggletip>
    `;
  },
};

export const Tooltip = {
  args: {
    alignment: POPOVER_ALIGNMENT.TOP,
    defaultOpen: false,
    label: 'Custom label',
    enterDelay: 100,
    leaveDelay: 300,
    closeOnActivation: false,
  },
  argTypes: {
    alignment: {
      control: 'select',
      description: 'Tooltip alignment to trigger button (alignment)',
      options: popoverAlignments,
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open (defaultOpen)',
    },
    label: {
      control: 'text',
      description: 'Label (label)',
    },
    enterDelay: {
      control: 'number',
      description: 'Enter delay in ms',
    },
    leaveDelay: {
      control: 'number',
      description: 'Leave delay in ms',
    },
    closeOnActivation: {
      control: 'boolean',
      description: 'Close on activation (closeOnActivation)',
    },
  },
  render: (args) => {
    const {
      alignment,
      defaultOpen,
      label,
      enterDelay,
      leaveDelay,
      closeOnActivation,
    } = args ?? {};

    return html`
      <style>
        ${tooltipStyles}
      </style>
      <cds-tooltip
        autoalign
        ?defaultOpen=${defaultOpen}
        align=${alignment}
        enter-delay-ms=${enterDelay}
        leave-delay-ms=${leaveDelay}
        ?closeOnActivation=${closeOnActivation}>
        <button
          class="sb-tooltip-trigger"
          role="button"
          aria-labelledby="content">
          ${Information16()}
        </button>
        <cds-tooltip-content id="content"> ${label} </cds-tooltip-content>
      </cds-tooltip>
    `;
  },
};

export const AILabel = {
  args: {
    alignment: POPOVER_ALIGNMENT.BOTTOM,
    size: AI_LABEL_SIZE.EXTRA_SMALL,
    kind: 'default',
    aiTextLabel: '',
    revertActive: false,
  },
  argTypes: {
    alignment: {
      control: 'select',
      description: 'AI Label alignment to trigger button (alignment)',
      options: popoverAlignments,
    },
    size: {
      control: 'select',
      description: 'AI Label size (size)',
      options: sizes,
    },
    kind: {
      control: 'select',
      description: 'Kind (kind)',
      options: ['default', 'inline'],
    },
    aiTextLabel: {
      control: 'text',
      description: 'Ai text label',
    },
    revertActive: {
      control: 'boolean',
      description: 'Revert active',
    },
  },
  render: (args) => {
    const { alignment, aiTextLabel, size, kind, revertActive } = args ?? {};
    return html`
      <style>
        ${aiLabelStyles}
      </style>
      <div class="ai-label-container">
        <cds-ai-label
          autoalign
          alignment="${alignment}"
          size="${size}"
          kind="${kind}"
          ai-text-label="${aiTextLabel}"
          ?revert-active="${revertActive}">
          ${content} ${actions}
        </cds-ai-label>
      </div>
    `;
  },
};

const meta = {
  title: 'Experimental/Auto Align',
};

export default meta;
