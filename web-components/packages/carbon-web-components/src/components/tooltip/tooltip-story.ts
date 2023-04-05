/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, number, select, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import './tooltip';
import './tooltip-content';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import { prefix } from '../../globals/settings';
import styles from './tooltip-story.scss';
import storyDocs from './tooltip-story.mdx';
import Information16 from '@carbon/icons/lib/information/16';

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

export const Default = () => {
  return html`
    <style>
      ${styles}
    </style>
    <cds-tooltip align="bottom">
      <div class="sb-tooltip-trigger">${Information16()}</div>
      <cds-tooltip-content>
        Occassionally, services are updated in a specified time window to ensure
        no down time for customers.
      </cds-tooltip-content>
    </cds-tooltip>
  `;
};

export const Alignment = () => {
  return html`
    <style>
      ${styles}
    </style>
    <cds-tooltip align="bottom-left">
      <div class="sb-tooltip-trigger">${Information16()}</div>
      <cds-tooltip-content> Tooltip alignment </cds-tooltip-content>
    </cds-tooltip>
  `;
};

export const Duration = () => {
  return html`
    <style>
      ${styles}
    </style>
    <cds-tooltip enter-delay-ms=${0} exit-delay-ms=${300}>
      <div class="sb-tooltip-trigger">${Information16()}</div>
      <cds-tooltip-content> Label one </cds-tooltip-content>
    </cds-tooltip>
  `;
};

export const Playground = (args) => {
  const {
    alignment,
    defaultOpen,
    label,
    enterDelay,
    exitDelay,
    closeOnActivation,
  } = args?.['cds-tooltip'] ?? {};
  return html`
    <style>
      ${styles}
    </style>
    <cds-tooltip
      ?defaultOpen=${defaultOpen}
      align=${alignment}
      enter-delay-ms=${enterDelay}
      exit-delay-ms=${exitDelay}
      ?closeOnActivation=${closeOnActivation}>
      <div class="sb-tooltip-trigger">${Information16()}</div>
      <cds-tooltip-content> ${label} </cds-tooltip-content>
    </cds-tooltip>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-tooltip`]: () => ({
      defaultOpen: boolean('Default open (defaultOpen)', false),
      alignment: select(
        'Tooltip alignment to trigger button (alignment)',
        tooltipAlignments,
        POPOVER_ALIGNMENT.TOP
      ),
      label: text('Label (label)', 'Custom label'),
      enterDelay: number('Enter delay (in ms)', 100),
      exitDelay: number('Exit delay (in ms)', 300),
      closeOnActivation: boolean(
        'Close on activation (closeOnActivation)',
        false
      ),
    }),
  },
};

Default.storyName = 'Default';

export default {
  title: 'Components/Tooltip',
  parameters: {
    ...storyDocs.parameters,
  },
  decorators: [(story) => html`<div class="sb-tooltip-story">${story()}</div>`],
};
