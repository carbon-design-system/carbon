/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './ai-skeleton-text';
import mdx from './ai-skeleton.mdx';

const args = {
  heading: false,
  paragraph: false,
  width: '100%',
  lineCount: 3,
};

const argTypes = {
  heading: {
    control: 'boolean',
    description: 'Heading (heading)',
  },
  paragraph: {
    control: 'boolean',
    description: 'Paragraph (paragraph)',
  },
  width: {
    control: 'text',
    description: 'Width (width)',
  },
  lineCount: {
    control: 'number',
    description: 'Line count (linecount)',
  },
};

export const AISkeletonText = {
  // This story doesn't accept any args.
  args: {},
  argTypes: {},
  parameters: {
    docs: {
      page: mdx,
    },
    percy: {
      skip: true,
    },
  },
  render: () => {
    return html`<cds-ai-skeleton-text></cds-ai-skeleton-text>`;
  },
};

export const Playground = {
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

const meta = {
  title: 'Components/Skeleton/AI Skeleton',
};

export default meta;
