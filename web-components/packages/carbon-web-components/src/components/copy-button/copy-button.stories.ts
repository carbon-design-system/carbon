/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta } from '@storybook/web-components';
import storyDocs from './copy-button.mdx';
import './copy-button';

const meta: Meta = {
  title: 'Components/Copy button',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
  render: ({feedbackText, feedbackTimeout, onClick, iconDescription}) => html`
    <cds-copy-button
      feedback="${ifDefined(feedbackText)}"
      feedback-timeout="${ifDefined(feedbackTimeout)}"
      @click="${onClick}">
      ${iconDescription}
    </cds-copy-button>
  `,
  argTypes: {
    feedback: { control: 'text' },
    feedbackTimeout: { control: { type: 'number', min:1, step: 1 } },
    iconDescription: { control: 'text' },
  },
  args: {
    feedback: 'Copied!',
    feedbackTimeout: 2000,
    iconDescription: 'Copy to clipboard'
  }
};

export default meta;

export const Default = {
  name: 'Default',
};