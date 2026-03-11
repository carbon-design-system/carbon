/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import styles from './tooltip-story.scss?lit';
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

const defaultArgs = {
  align: POPOVER_ALIGNMENT.BOTTOM_LEFT,
  defaultOpen: false,
  definition: 'Example definition',
  openOnHover: true,
};

const controls = {
  align: {
    control: 'select',
    description: 'Specify how the trigger should align with the tooltip',
    options: tooltipAlignments,
  },
  openOnHover: {
    control: 'boolean',
    description:
      'Specifies whether the definition tooltip should open on hover or not',
  },
  defaultOpen: {
    control: 'boolean',
    description:
      'Specify whether the tooltip should be open when it first renders',
  },
  definition: {
    control: 'text',
    description:
      'This is a slot where the applied the content inside of the tooltip that appears when a user interacts with the element rendered by the children prop',
  },
};

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ align, defaultOpen, definition, openOnHover }) => html`
    <p>
      Custom domains direct requests for your apps in this Cloud Foundry
      organization to a
      <span style="display: inline-block;">
        <cds-definition-tooltip
          align=${align}
          ?open-on-hover=${openOnHover}
          ?default-open=${defaultOpen}>
          <span slot="definition">${definition}</span>
          URL
        </cds-definition-tooltip>
      </span>
      that you own. A custom domain can be a shared domain, a shared subdomain,
      or a shared domain and host.
    </p>
  `,
};
const meta = {
  title: 'Components/Definition tooltip',
  decorators: [
    (story) =>
      html` <div class="sb-tooltip-story sb-definition-tooltip">
        <style>
          ${styles}
        </style>
        ${story()}
      </div>`,
  ],
};

export default meta;
