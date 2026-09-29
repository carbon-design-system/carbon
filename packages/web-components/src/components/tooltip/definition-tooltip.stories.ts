/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import './index';
import styles from './tooltip-story.scss?lit';
import { POPOVER_ALIGNMENT } from '../popover/defs';

const tooltipAlignments = {
  [`top`]: POPOVER_ALIGNMENT.TOP,
  [`top-left`]: POPOVER_ALIGNMENT.TOP_LEFT,
  [`top-right`]: POPOVER_ALIGNMENT.TOP_RIGHT,
  [`top-start`]: POPOVER_ALIGNMENT.TOP_START,
  [`top-end`]: POPOVER_ALIGNMENT.TOP_END,
  [`bottom`]: POPOVER_ALIGNMENT.BOTTOM,
  [`bottom-left`]: POPOVER_ALIGNMENT.BOTTOM_LEFT,
  [`bottom-right`]: POPOVER_ALIGNMENT.BOTTOM_RIGHT,
  [`bottom-start`]: POPOVER_ALIGNMENT.BOTTOM_START,
  [`bottom-end`]: POPOVER_ALIGNMENT.BOTTOM_END,
  [`left`]: POPOVER_ALIGNMENT.LEFT,
  [`left-bottom`]: POPOVER_ALIGNMENT.LEFT_BOTTOM,
  [`left-top`]: POPOVER_ALIGNMENT.LEFT_TOP,
  [`left-start`]: POPOVER_ALIGNMENT.LEFT_START,
  [`left-end`]: POPOVER_ALIGNMENT.LEFT_END,
  [`right`]: POPOVER_ALIGNMENT.RIGHT,
  [`right-bottom`]: POPOVER_ALIGNMENT.RIGHT_BOTTOM,
  [`right-top`]: POPOVER_ALIGNMENT.RIGHT_TOP,
  [`right-start`]: POPOVER_ALIGNMENT.RIGHT_START,
  [`right-end`]: POPOVER_ALIGNMENT.RIGHT_END,
};

const defaultArgs = {
  align: POPOVER_ALIGNMENT.BOTTOM_START,
  autoAlign: false,
  defaultOpen: false,
  definition:
    'Uniform Resource Locator; the address of a resource (such as a document or website) on the Internet.',
  openOnHover: true,
};

const controls = {
  align: {
    control: 'select',
    description: 'Specify how the trigger should align with the tooltip',
    options: tooltipAlignments,
  },
  autoAlign: {
    control: 'boolean',
    description:
      'Will auto-align Definition Tooltip. This prop is currently experimental and is subject to future changes.',
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
  render: ({ align, autoAlign, defaultOpen, definition, openOnHover }) => html`
    <p>
      Custom domains direct requests for your apps in this Cloud Foundry
      organization to a
      <span style="display: inline-block;">
        ${keyed(
          defaultOpen,
          html`
            <cds-definition-tooltip
              align=${align}
              ?autoalign=${autoAlign}
              ?open-on-hover=${openOnHover}
              ?default-open=${defaultOpen}>
              <span slot="definition">${definition}</span>
              URL
            </cds-definition-tooltip>
          `
        )}
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
