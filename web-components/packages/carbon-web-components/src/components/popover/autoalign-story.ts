/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select, text, number } from '@storybook/addon-knobs';
import './index';
import '../toggle-tip/index';
import '../slug/index';
import '../icon-button/index';
import '../data-table/index';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import { POPOVER_ALIGNMENT } from './defs';
import { SLUG_SIZE } from '../slug/defs';
import storyDocs from './autoalign-story.mdx';
import { prefix } from '../../globals/settings';
import Checkbox16 from '@carbon/icons/lib/checkbox/16';
import Information16 from '@carbon/icons/lib/information/16';
import View16 from '@carbon/icons/lib/view/16';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16';
import Folders16 from '@carbon/icons/lib/folders/16';

import styles from './popover-story.scss';
import slugStyles from '../slug/slug-story.scss';
import tooltipStyles from '../tooltip/tooltip-story.scss';

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

const hollowContent = html`<span slot="body-text"
  >AI was used to generate this content</span
>`;

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

export const Popover = (args) => {
  const { caret, highContrast, align, dropShadow } =
    args?.[`${prefix}-popover`] ?? {};

  const handleClick = (id) => {
    const popover = document.querySelector(id);
    const open = popover?.hasAttribute('open');
    open ? popover?.removeAttribute('open') : popover?.setAttribute('open', '');
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
};

Popover.parameters = {
  knobs: {
    [`${prefix}-popover`]: () => ({
      caret: boolean('caret (caret)', true),
      highContrast: boolean('high contrast (highContrast)', false),
      align: select(
        'Align (align)',
        popoverAlignments,
        popoverAlignments.bottom
      ),
      dropShadow: boolean('drop shadow (dropShadow)', true),
    }),
  },
};

export const Toggletip = (args) => {
  const { alignment, bodyText } = args?.[`${prefix}-toggletip`] ?? {};

  return html`
    <cds-toggletip autoalign alignment="${ifDefined(alignment)}">
      Toggletip label

      <p slot="body-text">${bodyText}</p>
      <cds-link slot="actions">Test</cds-link>
      <cds-button slot="actions">Button</cds-button>
    </cds-toggletip>
  `;
};

Toggletip.parameters = {
  knobs: {
    [`${prefix}-toggletip`]: () => ({
      alignment: select(
        'Toggletip alignment to trigger button (alignment)',
        popoverAlignments,
        POPOVER_ALIGNMENT.BOTTOM
      ),
      bodyText: textNullable(
        'Toggletip content (bodyText)',
        `Lorem ipsum dolor sit amet, di os consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.`
      ),
    }),
  },
};

export const Tooltip = (args) => {
  const {
    alignment,
    defaultOpen,
    label,
    enterDelay,
    leaveDelay,
    closeOnActivation,
  } = args?.['cds-tooltip'] ?? {};

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
};

Tooltip.parameters = {
  knobs: {
    [`${prefix}-tooltip`]: () => ({
      defaultOpen: boolean('Default open (defaultOpen)', false),
      alignment: select(
        'Tooltip alignment to trigger button (alignment)',
        popoverAlignments,
        POPOVER_ALIGNMENT.TOP
      ),
      label: text('Label (label)', 'Custom label'),
      enterDelay: number('Enter delay (in ms)', 100),
      leaveDelay: number('Leave delay (in ms)', 300),
      closeOnActivation: boolean(
        'Close on activation (closeOnActivation)',
        false
      ),
    }),
  },
};

export const Slug = (args) => {
  const { alignment, aiTextLabel, size, kind, dotType, revertActive } =
    args?.[`${prefix}-slug`] ?? {};
  return html`
    <style>
      ${slugStyles}
    </style>
    <div class="slug-container">
      <cds-slug
        autoalign
        alignment="${ifDefined(alignment)}"
        size="${size}"
        kind="${kind}"
        dot-type="${dotType}"
        ai-text-label="${aiTextLabel}"
        ?revert-active="${revertActive}">
        ${kind === 'hollow' || dotType === 'hollow' ? hollowContent : content}
        ${kind === 'hollow' || dotType === 'hollow' ? '' : actions}
      </cds-slug>
    </div>
  `;
};

Slug.parameters = {
  knobs: {
    [`${prefix}-slug`]: () => {
      const kind = select(
        'Kind (kind)',
        ['default', 'hollow', 'inline'],
        'default'
      );
      const dotType =
        kind === 'inline'
          ? select('DotType (dotType)', ['default', 'hollow'], 'default')
          : ``;

      return {
        alignment: select(
          'Slug alignment to trigger button (alignment)',
          popoverAlignments,
          POPOVER_ALIGNMENT.BOTTOM
        ),
        size: select('Slug size (size)', sizes, SLUG_SIZE.EXTRA_SMALL),
        kind,
        dotType,
        aiTextLabel: textNullable('Ai text label', ''),
        revertActive: boolean('Revert active', false),
      };
    },
  },
};

export default {
  parameters: {
    ...storyDocs.parameters,
  },
  title: 'Experimental/Auto Align',
};
