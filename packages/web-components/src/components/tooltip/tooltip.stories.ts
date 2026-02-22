/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
// @ts-ignore
import './index';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import { iconLoader } from '../../globals/internal/icon-loader';
import styles from './tooltip-story.scss?lit';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';
import '../button';

const defaultArgs = {
  align: POPOVER_ALIGNMENT.TOP,
  closeOnActivation: false,
  defaultOpen: false,
  dropShadow: false,
  enterDelayMs: 100,
  label: 'Options',
  leaveDelayMs: 300,
};

const controls = {
  align: {
    control: 'select',
    description: 'Specify how the trigger should align with the tooltip',
    options: [
      POPOVER_ALIGNMENT.TOP,
      POPOVER_ALIGNMENT.TOP_START,
      POPOVER_ALIGNMENT.TOP_END,
      POPOVER_ALIGNMENT.BOTTOM,
      POPOVER_ALIGNMENT.BOTTOM_START,
      POPOVER_ALIGNMENT.BOTTOM_END,
      POPOVER_ALIGNMENT.LEFT,
      POPOVER_ALIGNMENT.LEFT_END,
      POPOVER_ALIGNMENT.LEFT_START,
      POPOVER_ALIGNMENT.RIGHT,
      POPOVER_ALIGNMENT.RIGHT_END,
      POPOVER_ALIGNMENT.RIGHT_START,
    ],
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
  dropShadow: {
    control: 'boolean',
    description: 'Specify whether a drop shadow should be rendered',
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
  argTypes: controls,
  args: defaultArgs,
  render: ({
    align,
    closeOnActivation,
    defaultOpen,
    dropShadow,
    enterDelayMs,
    label,
    leaveDelayMs,
  }) => html`
    <cds-tooltip
      ?defaultOpen=${defaultOpen}
      align=${align}
      .dropShadow=${dropShadow}
      enter-delay-ms=${enterDelayMs}
      leave-delay-ms=${leaveDelayMs}
      ?closeOnActivation=${closeOnActivation}>
      <button
        class="sb-tooltip-trigger"
        role="button"
        aria-labelledby="content">
        ${iconLoader(OverflowMenuVertical16)}
      </button>
      <cds-tooltip-content id="content"> ${label} </cds-tooltip-content>
    </cds-tooltip>
  `,
};

export const Alignment = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    align: POPOVER_ALIGNMENT.BOTTOM_START,
    label: 'Tooltip alignment',
  },
  render: ({
    align,
    closeOnActivation,
    defaultOpen,
    dropShadow,
    label,
    enterDelayMs,
    leaveDelayMs,
  }) => html`
    <cds-tooltip
      ?defaultOpen=${defaultOpen}
      align=${align}
      .dropShadow=${dropShadow}
      enter-delay-ms=${enterDelayMs}
      leave-delay-ms=${leaveDelayMs}
      ?closeOnActivation=${closeOnActivation}>
      <cds-button role="button" aria-labelledby="content">
        This button has a tooltip
      </cds-button>
      <cds-tooltip-content id="content">${label}</cds-tooltip-content>
    </cds-tooltip>
  `,
};

export const Duration = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    enterDelayMs: 0,
    leaveDelayMs: 300,
    label: 'Label one',
  },
  render: ({
    align,
    closeOnActivation,
    defaultOpen,
    dropShadow,
    label,
    enterDelayMs,
    leaveDelayMs,
  }) => html`
    <cds-tooltip
      ?defaultOpen=${defaultOpen}
      align=${align}
      .dropShadow=${dropShadow}
      enter-delay-ms=${enterDelayMs}
      leave-delay-ms=${leaveDelayMs}
      ?closeOnActivation=${closeOnActivation}>
      <cds-button role="button" aria-labelledby="content">
        This button has a tooltip
      </cds-button>
      <cds-tooltip-content id="content">${label}</cds-tooltip-content>
    </cds-tooltip>
  `,
};

export const ExperimentalAutoAlign = {
  argTypes: controls,
  parameters: {
    controls: {
      exclude: ['align'],
    },
  },
  args: {
    ...defaultArgs,
    label:
      'Scroll the container up, down, left or right to observe how the tooltip will automatically change its position in attempt to stay within the viewport. This works on initial render in addition to on scroll.',
  },
  render: ({
    closeOnActivation,
    defaultOpen,
    dropShadow,
    label,
    enterDelayMs,
    leaveDelayMs,
  }) => {
    requestAnimationFrame(() => {
      document.querySelector('cds-tooltip')?.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    });
    return html`
      <div style="width: 5000px; height: 5000px;">
        <div
          style="position: absolute; top: 2500px;
          left: 2500px; padding-right: 2500px;">
          <cds-tooltip
            ?defaultOpen=${defaultOpen}
            .dropShadow=${dropShadow}
            autoalign
            enter-delay-ms=${enterDelayMs}
            leave-delay-ms=${leaveDelayMs}
            ?closeOnActivation=${closeOnActivation}>
            <cds-button role="button" aria-labelledby="content">
              This button has a tooltip
            </cds-button>
            <cds-tooltip-content id="content">${label}</cds-tooltip-content>
          </cds-tooltip>
        </div>
      </div>
    `;
  },
};

const meta = {
  title: 'Components/Tooltip',
  decorators: [
    (story) =>
      html`<div class="sb-tooltip-story">
        <style>
          ${styles}</style
        >${story()}
      </div>`,
  ],
};

export default meta;
