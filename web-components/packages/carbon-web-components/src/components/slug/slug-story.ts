/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { select, boolean } from '@storybook/addon-knobs';
import View16 from '@carbon/icons/lib/view/16';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16';
import Folders16 from '@carbon/icons/lib/folders/16';

import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import './index';
import '../icon-button/index';
import styles from './slug-story.scss';

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
  <cds-slug-action-button>View Literature</cds-slug-action-button>
`;

export const Default = () => {
  return html`
    <style>
      ${styles}
    </style>
    <div class="slug-container">
      <cds-slug size="mini" alignment="bottom-left"> ${content} </cds-slug>
      <cds-slug size="2xs" alignment="bottom-left"> ${content} </cds-slug>
      <cds-slug size="xs" alignment="bottom-left"> ${content} </cds-slug>
      <cds-slug size="sm" alignment="bottom-left"> ${content} </cds-slug>
      <cds-slug size="md" alignment="bottom-left"> ${content} </cds-slug>
      <cds-slug size="lg" alignment="bottom-left"> ${content} </cds-slug>
      <cds-slug size="xl" alignment="bottom-left"> ${content} </cds-slug>
    </div>
    <div class="slug-container">
      <cds-slug size="mini" kind="hollow" alignment="bottom-left">
        ${hollowContent}
      </cds-slug>
      <cds-slug size="2xs" kind="hollow" alignment="bottom-left">
        ${hollowContent}
      </cds-slug>
      <cds-slug size="xs" kind="hollow" alignment="bottom-left">
        ${hollowContent}
      </cds-slug>
    </div>
    <div class="slug-container">
      <cds-slug size="sm" kind="inline" alignment="bottom-left">
        ${content}
      </cds-slug>
      <cds-slug size="md" kind="inline" alignment="bottom-left">
        ${content}
      </cds-slug>
      <cds-slug size="lg" kind="inline" alignment="bottom-left">
        ${content}
      </cds-slug>
    </div>
    <div class="slug-container">
      <cds-slug
        size="sm"
        kind="inline"
        ai-text-label="Text goes here"
        alignment="bottom-left">
        ${content}
      </cds-slug>
      <cds-slug
        size="md"
        kind="inline"
        ai-text-label="Text goes here"
        alignment="bottom-left">
        ${content}
      </cds-slug>
      <cds-slug
        size="lg"
        kind="inline"
        ai-text-label="Text goes here"
        alignment="bottom-left">
        ${content}
      </cds-slug>
    </div>
    <div class="slug-container">
      <cds-slug
        size="sm"
        kind="inline"
        dot-type="hollow"
        alignment="bottom-left">
        ${hollowContent}
      </cds-slug>
      <cds-slug
        size="md"
        kind="inline"
        dot-type="hollow"
        alignment="bottom-left">
        ${hollowContent}
      </cds-slug>
      <cds-slug
        size="lg"
        kind="inline"
        dot-type="hollow"
        alignment="bottom-left">
        ${hollowContent}
      </cds-slug>
    </div>
    <div class="slug-container">
      <cds-slug
        size="sm"
        kind="inline"
        dot-type="hollow"
        ai-text-label="Text goes here"
        alignment="bottom-left">
        ${hollowContent}
      </cds-slug>
      <cds-slug
        size="md"
        kind="inline"
        dot-type="hollow"
        ai-text-label="Text goes here"
        alignment="bottom-left">
        ${hollowContent}
      </cds-slug>
      <cds-slug
        size="lg"
        kind="inline"
        dot-type="hollow"
        ai-text-label="Text goes here"
        alignment="bottom-left">
        ${hollowContent}
      </cds-slug>
    </div>
  `;
};

export const Playground = (args) => {
  const { alignment, aiTextLabel, size, kind, dotType, revertActive } =
    args?.[`${prefix}-slug`] ?? {};
  return html`
    <style>
      ${styles}
    </style>
    <div class="slug-container">
      <cds-slug
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

Playground.parameters = {
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
          tooltipAlignments,
          POPOVER_ALIGNMENT.BOTTOM
        ),
        size: select('Slug size (size)', sizes, SLUG_SIZE.MEDIUM),
        kind,
        dotType,
        aiTextLabel: textNullable('Ai text label', ''),
        revertActive: boolean('Revert active', false),
      };
    },
  },
};

export default {
  title: 'Experimental/Slug',
};
