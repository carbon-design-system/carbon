/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import './index';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import styles from './tooltip-story.scss?lit';
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

const defaultArgs = {
  align: POPOVER_ALIGNMENT.BOTTOM,
  closeOnActivation: false,
  defaultOpen: true,
  enterDelayMs: 100,
  label: 'Custom label',
  leaveDelayMs: 300,
};

const controls = {
  align: {
    control: 'select',
    description: 'Specify how the trigger should align with the tooltip',
    options: tooltipAlignments,
  },
  closeOnActivation: {
    control: 'boolean',
    description:
      'Determines wether the tooltip should close when inner content is activated (click, Enter or Space)',
  },
  defaultOpen: {
    control: 'boolean',
    description:
      'Specify whether the tooltip should be open when it first renders',
  },
  enterDelayMs: {
    control: 'number',
    description:
      'Specify the duration in milliseconds to delay before displaying the tooltip',
  },
  label: {
    control: 'text',
    description: 'Provide the label to be rendered inside of the Tooltip.',
  },
  leaveDelayMs: {
    control: 'number',
    description:
      'Specify the duration in milliseconds to delay before hiding the tooltip',
  },
};

export const Default = {
  render: () => html`
    <cds-tooltip align="bottom">
      <button
        class="sb-tooltip-trigger"
        role="button"
        aria-labelledby="content">
        ${Information16()}
      </button>
      <cds-tooltip-content id="content">
        Occassionally, services are updated in a specified time window to ensure
        no down time for customers.
      </cds-tooltip-content>
    </cds-tooltip>
  `,
};

export const Alignment = {
  render: () => html`
    <cds-tooltip align="bottom-left">
      <button
        class="sb-tooltip-trigger"
        role="button"
        aria-labelledby="content">
        ${Information16()}
      </button>
      <cds-tooltip-content id="content">
        Tooltip alignment
      </cds-tooltip-content>
    </cds-tooltip>
  `,
};

export const Duration = {
  render: () => html`
    <cds-tooltip enter-delay-ms=${0} leave-delay-ms=${300}>
      <button
        class="sb-tooltip-trigger"
        role="button"
        aria-labelledby="content">
        ${Information16()}
      </button>
      <cds-tooltip-content id="content"> Label one </cds-tooltip-content>
    </cds-tooltip>
  `,
};

export const Playground = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    align,
    closeOnActivation,
    defaultOpen,
    enterDelayMs,
    label,
    leaveDelayMs,
  }) => html`
    <cds-tooltip
      ?defaultOpen=${defaultOpen}
      align=${align}
      enter-delay-ms=${enterDelayMs}
      leave-delay-ms=${leaveDelayMs}
      ?closeOnActivation=${closeOnActivation}>
      <button
        class="sb-tooltip-trigger"
        role="button"
        aria-labelledby="content">
        ${Information16()}
      </button>
      <cds-tooltip-content id="content"> ${label} </cds-tooltip-content>
    </cds-tooltip>
  `,
};

const meta = {
  title: 'Components/Tooltip',
  decorators: [
    (story) => html`<div class="sb-tooltip-story">
      <style>
        ${styles}</style
      >${story()}
    </div>`,
  ],
};

export default meta;
