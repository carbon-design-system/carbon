/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './toggletip';
import '../button';
import '../link';
import { POPOVER_ALIGNMENT } from '../popover/defs';

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

const args = {
  alignment: 'bottom',
  open: false,
  autoalign: false,
  defaultOpen: false,
  alignmentAxisOffset: 0,
};

const argTypes = {
  alignment: {
    control: 'select',
    description: 'Specify how the toggletip should align with the button',
    options: Object.keys(tooltipAlignments),
  },
  alignmentAxisOffset: {
    control: 'number',
    description:
      'Provide an offset value for alignment axis. Only takes effect when `autoalign` is enabled.',
  },
  autoalign: {
    control: 'boolean',
    description:
      'Will auto-align the popover. This attribute is currently experimental and is subject to future changes.',
  },
  defaultOpen: {
    control: 'boolean',
    description: 'Specify if the toggletip should be open by default',
  },
  open: {
    control: 'boolean',
    description: 'Specify if the toggletip should be open',
  },
};

export const Default = {
  argTypes,
  args,
  render: ({
    alignment,
    open,
    autoalign,
    defaultOpen,
    alignmentAxisOffset,
  }) => html`
    <div style="display: flex; align-items: center">
      <cds-toggletip
        alignment="${alignment}"
        ?open="${open}"
        ?autoalign="${autoalign}"
        ?default-open="${defaultOpen}"
        alignment-axis-offset="${alignmentAxisOffset}">
        Toggletip label

        <p slot="body-text">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <cds-link href="#" slot="actions">Link action</cds-link>
        <cds-button size="sm" slot="actions">Button</cds-button>
      </cds-toggletip>
    </div>
  `,
};

export const ExperimentalAutoAlign = {
  argTypes,
  args: {
    ...args,
    open: true,
  },
  render: ({
    alignment,
    open,
    autoalign,
    defaultOpen,
    alignmentAxisOffset,
  }) => html`
    <div>
      <cds-toggletip
        alignment="${alignment}"
        ?open="${open}"
        ?autoalign="${autoalign}"
        ?default-open="${defaultOpen}"
        alignment-axis-offset="${alignmentAxisOffset}">
        Toggletip label

        <p slot="body-text">
          Scroll the container up, down, left or right to observe how the
          Toggletip will automatically change its position in attempt to stay
          within the viewport. This works on initial render in addition to on
          scroll.
        </p>

        <cds-link href="#" slot="actions">Link action</cds-link>
        <cds-button size="sm" slot="actions">Button</cds-button>
      </cds-toggletip>
    </div>
  `,
};

const meta = {
  title: 'Components/Toggletip',
};

export default meta;
