/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta } from '@storybook/web-components-vite';
import './copy-button';
import { POPOVER_ALIGNMENT } from '../popover/defs';

const tooltipAlignments = {
  [`top`]: POPOVER_ALIGNMENT.TOP,
  [`top-start`]: POPOVER_ALIGNMENT.TOP_START,
  [`top-end`]: POPOVER_ALIGNMENT.TOP_END,
  [`bottom`]: POPOVER_ALIGNMENT.BOTTOM,
  [`bottom-start`]: POPOVER_ALIGNMENT.BOTTOM_START,
  [`bottom-end`]: POPOVER_ALIGNMENT.BOTTOM_END,
  [`left`]: POPOVER_ALIGNMENT.LEFT,
  [`left-start`]: POPOVER_ALIGNMENT.LEFT_START,
  [`left-end`]: POPOVER_ALIGNMENT.LEFT_END,
  [`right`]: POPOVER_ALIGNMENT.RIGHT,
  [`right-start`]: POPOVER_ALIGNMENT.RIGHT_START,
  [`right-end`]: POPOVER_ALIGNMENT.RIGHT_END,
};

const defaultArgs = {
  feedback: 'Copied!',
  feedbackTimeout: 2000,
  iconDescription: 'Copy to clipboard',
  align: POPOVER_ALIGNMENT.BOTTOM,
};

const controls = {
  align: {
    control: 'select',
    description: 'Specify how the toggletip should align with the button',
    options: tooltipAlignments,
  },
  autoAlign: {
    control: 'boolean',
    description: 'Specify how the toggletip should align with the button',
  },
  feedback: {
    control: 'text',
    description: `Provide a description for the icon representing the copy action that can be read by screen readers`,
  },
  feedbackTimeout: {
    control: { type: 'number', min: 1, step: 1 },
    description: `Specify the time it takes for the feedback message to timeout`,
  },
  iconDescription: {
    control: 'text',
    description: `Provide a description for the icon representing the copy action that can be read by screen readers`,
  },
};

const meta: Meta = {
  title: 'Components/Copy button',
  render: ({
    feedbackText,
    feedbackTimeout,
    onClick,
    iconDescription,
    align,
    autoAlign,
  }) => html`
    <cds-copy-button
      align="${align}"
      ?autoalign="${autoAlign}"
      feedback="${ifDefined(feedbackText)}"
      feedback-timeout="${ifDefined(feedbackTimeout)}"
      @click="${onClick}">
      ${iconDescription}
    </cds-copy-button>
  `,
  args: defaultArgs,
};

export const Default = {
  argTypes: controls,
};

export default meta;
