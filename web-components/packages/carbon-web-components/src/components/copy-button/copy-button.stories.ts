/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta } from '@storybook/web-components';
import storyDocs from './copy-button.mdx';
import './copy-button';

const defaultArgs = {
  feedback: 'Copied!',
  feedbackTimeout: 2000,
  iconDescription: 'Copy to clipboard',
};

const controls = {
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
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
  render: ({ feedbackText, feedbackTimeout, onClick, iconDescription }) => html`
    <cds-copy-button
      feedback="${ifDefined(feedbackText)}"
      feedback-timeout="${ifDefined(feedbackTimeout)}"
      @click="${onClick}">
      ${iconDescription}
    </cds-copy-button>
  `,
  args: defaultArgs,
};

export const Default = {
  parameters: {
    controls: { exclude: /(.*?)/ },
  },
};

export const Playground = {
  argTypes: controls,
};

export default meta;
