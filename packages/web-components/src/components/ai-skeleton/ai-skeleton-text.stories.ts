/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './ai-skeleton-text';

const args = {
  heading: false,
  paragraph: false,
  width: '100%',
  lineCount: 3,
};

const argTypes = {
  heading: {
    control: 'boolean',
    description: 'Set this to true to apply heading styling.',
  },
  paragraph: {
    control: 'boolean',
    description: 'Set this to true to generate multiple lines of text.',
  },
  width: {
    control: 'text',
    description:
      'Width (in px or %) of single line of text or max-width of paragraph lines.',
  },
  lineCount: {
    control: 'number',
    description: 'The number of lines shown if paragraph is true.',
  },
};

export const AISkeletonText = {
  args,
  argTypes,
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: (args) => {
    const { heading, paragraph, width, lineCount } = args ?? {};

    return html`<cds-ai-skeleton-text
      ?heading="${heading}"
      width="${width}"
      ?paragraph="${paragraph}"
      linecount="${lineCount}"></cds-ai-skeleton-text>`;
  },
};

// TEMPORARY VISUAL TEST: Flex Container Compatibility
// This story validates the fix for AI skeleton components in flex containers
// TODO: Remove this story after merge
export const AIFlexContainerTest = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html`
    <style>
      .flex-container {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        border: 1px solid #ccc;
      }
      .flex-container h3 {
        margin-top: 0;
        width: 100%;
      }
    </style>

    <div class="flex-container">
      <h3>AI Skeleton Text in Flex Container</h3>
    </div>

    <div class="flex-container">
      <cds-ai-skeleton-text></cds-ai-skeleton-text>
      <cds-ai-skeleton-text></cds-ai-skeleton-text>
    </div>

    <div class="flex-container">
      <cds-ai-skeleton-text paragraph linecount="2"></cds-ai-skeleton-text>
      <cds-ai-skeleton-placeholder></cds-ai-skeleton-placeholder>
      <cds-ai-skeleton-icon></cds-ai-skeleton-icon>
    </div>
  `,
};

const meta = {
  title: 'Components/Skeleton/AI Skeleton',
};

export default meta;
