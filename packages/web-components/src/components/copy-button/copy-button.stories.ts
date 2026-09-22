/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta } from '@storybook/web-components-vite';
import './copy-button';
import { BUTTON_KIND, BUTTON_SIZE } from '../button/defs';
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
  align: POPOVER_ALIGNMENT.BOTTOM,
  autoAlign: false,
  disabled: false,
  feedback: 'Copied!',
  feedbackTimeout: 2000,
  iconDescription: 'Copy to clipboard',
  kind: BUTTON_KIND.GHOST,
  size: BUTTON_SIZE.LARGE,
};

const argTypes = {
  align: {
    control: 'select',
    description: 'Specify how the toggletip should align with the button',
    options: Object.values(tooltipAlignments),
  },
  autoAlign: {
    control: 'boolean',
    description: 'Specify whether the tooltip should auto-align.',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the button should be disabled.',
  },
  feedback: {
    control: 'text',
    description: 'Specify the text displayed after the button is clicked.',
  },
  feedbackTimeout: {
    control: { type: 'number', min: 1, step: 1 },
    description: `Specify the time it takes for the feedback message to timeout`,
  },
  iconDescription: {
    control: 'text',
    description: `Provide a description for the icon representing the copy action that can be read by screen readers`,
  },
  kind: {
    control: 'select',
    description: 'Specify the kind of Button you want to create.',
    options: Object.values(BUTTON_KIND),
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Button.',
    options: Object.values(BUTTON_SIZE),
  },
  onClick: {
    action: 'onClick',
    description:
      'Provide a function that is called when the button is clicked.',
  },
};

const parameters = {
  controls: {
    include: Object.keys(argTypes),
  },
};

const meta: Meta = {
  title: 'Components/Copy button',
  render: ({
    align,
    autoAlign,
    disabled,
    feedback,
    feedbackTimeout,
    iconDescription,
    kind,
    size,
    onClick,
  }) => html`
    <cds-copy-button
      align="${align}"
      ?autoalign="${autoAlign}"
      ?disabled="${disabled}"
      feedback="${ifDefined(feedback)}"
      feedback-timeout="${ifDefined(feedbackTimeout)}"
      kind="${ifDefined(kind)}"
      size="${ifDefined(size)}"
      @click="${onClick}">
      ${iconDescription}
    </cds-copy-button>
  `,
};

export const Default = {
  argTypes,
  args: defaultArgs,
  parameters,
};

export default meta;
