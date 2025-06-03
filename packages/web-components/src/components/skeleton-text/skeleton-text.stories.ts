/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';

const args = {
  paragraph: false,
  heading: false,
  lineCount: 3,
  width: '100%',
};

const argTypes = {
  heading: {
    control: 'boolean',
    description: 'Set to true to use heading style',
  },
  paragraph: {
    control: 'boolean',
    description: 'Set this to true to generate multiple lines of text.',
  },
  lineCount: {
    control: 'number',
    description: 'The number of lines shown if paragraph is true.',
  },
  width: {
    control: 'text',
    description:
      'Width (in px or %) of single line of text or max-width of paragraph lines.',
  },
};

export const Default = {
  args,
  argTypes,
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: (args) => {
    const { heading, paragraph, lineCount, width } = args ?? {};
    return html`
      <cds-skeleton-text
        ?paragraph="${paragraph}"
        ?heading="${heading}"
        lineCount="${lineCount}"
        width="${width}">
      </cds-skeleton-text>
    `;
  },
};

const meta = {
  title: 'Components/Skeleton/Skeleton Text',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export default meta;
