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
import '../button/index';
import storyDocs from './icon-button.mdx';
import { ICON_BUTTON_TOOLTIP_ALIGNMENT } from './defs';
import Edit16 from '@carbon/icons/lib/edit/16';
import { ICON_BUTTON_SIZE } from './defs';
import { BUTTON_KIND } from '../button/defs';

const kinds = {
  [`Primary button (${BUTTON_KIND.PRIMARY})`]: BUTTON_KIND.PRIMARY,
  [`Secondary button (${BUTTON_KIND.SECONDARY})`]: BUTTON_KIND.SECONDARY,
  [`Tertiary button (${BUTTON_KIND.TERTIARY})`]: BUTTON_KIND.TERTIARY,
  [`Danger button (${BUTTON_KIND.DANGER})`]: BUTTON_KIND.DANGER,
  [`Danger tertiary button (${BUTTON_KIND.DANGER_TERTIARY})`]:
    BUTTON_KIND.DANGER_TERTIARY,
  [`Danger ghost button (${BUTTON_KIND.DANGER_GHOST})`]:
    BUTTON_KIND.DANGER_GHOST,
  [`Ghost button (${BUTTON_KIND.GHOST})`]: BUTTON_KIND.GHOST,
};

const tooltipAlignments = {
  [`top`]: ICON_BUTTON_TOOLTIP_ALIGNMENT.TOP,
  [`top-left`]: ICON_BUTTON_TOOLTIP_ALIGNMENT.TOP_LEFT,
  [`top-right`]: ICON_BUTTON_TOOLTIP_ALIGNMENT.TOP_RIGHT,
  [`bottom`]: ICON_BUTTON_TOOLTIP_ALIGNMENT.BOTTOM,
  [`bottom-left`]: ICON_BUTTON_TOOLTIP_ALIGNMENT.BOTTOM_LEFT,
  [`bottom-right`]: ICON_BUTTON_TOOLTIP_ALIGNMENT.BOTTOM_RIGHT,
  [`left`]: ICON_BUTTON_TOOLTIP_ALIGNMENT.LEFT,
  [`right`]: ICON_BUTTON_TOOLTIP_ALIGNMENT.RIGHT,
};

const args = {
  align: ICON_BUTTON_TOOLTIP_ALIGNMENT.BOTTOM,
  defaultOpen: true,
  disabled: false,
  isSelected: false,
  kind: BUTTON_KIND.PRIMARY,
  label: 'Custom label',
  size: ICON_BUTTON_SIZE.MEDIUM,
};

const argTypes = {
  align: {
    control: 'select',
    description: 'Specify how the trigger should align with the tooltip.',
    options: tooltipAlignments,
  },
  closeOnActivation: {
    control: 'boolean',
    description:
      'Determines whether the tooltip should close when inner content is activated (click, Enter or Space).',
  },
  defaultOpen: {
    control: 'boolean',
    description:
      'Specify whether the tooltip should be open when it first renders.',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the Button should be disabled, or not.',
  },
  enterDelayMs: {
    control: 'number',
    description:
      'Specify the duration in milliseconds to delay before displaying the tooltip.',
  },
  isSelected: {
    control: 'boolean',
    description: 'Specify whether the Icon Button is currently selected.',
  },
  kind: {
    control: 'select',
    description:
      'Specify the type of button to be used as the base for the Icon Button.',
    options: kinds,
  },
  label: {
    control: 'text',
    description:
      'Provide the label to be rendered inside of the Tooltip. The label will use <code>aria-labelledby</code> and will fully describe the child node that is provided. This means that if you have text in the child node it will not be announced to the screen reader.',
  },
  leaveDelayMs: {
    control: 'number',
    description:
      'Specify the duration in milliseconds to delay before hiding the tooltip.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Button. Defaults to <code>md</code>.',
    options: ICON_BUTTON_SIZE,
  },
};

export const Default = {
  render: () => {
    return html`
      <cds-icon-button>
        ${Edit16({ slot: 'icon' })}
        <span slot="tooltip-content">label</span>
      </cds-icon-button>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: ({
    align,
    closeOnActivation,
    defaultOpen,
    disabled,
    enterDelayMs,
    isSelected,
    kind,
    label,
    leaveDelayMs,
    size,
  }) => {
    return html`
      <cds-icon-button
        align=${align}
        ?close-on-activation=${closeOnActivation}
        ?defaultOpen=${defaultOpen}
        ?disabled=${disabled}
        enter-delay-ms=${enterDelayMs}
        ?isSelected=${isSelected}
        kind=${kind}
        leave-delay-ms=${leaveDelayMs}
        size=${size}>
        ${Edit16({ slot: 'icon' })}
        <span slot="tooltip-content">${label}</span>
      </cds-icon-button>
    `;
  },
};

const meta = {
  decorators: [(story) => html`<div style="padding: 3rem">${story()}</div>`],
  title: 'Components/Icon Button',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
