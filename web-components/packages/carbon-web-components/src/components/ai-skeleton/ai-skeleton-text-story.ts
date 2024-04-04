/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './ai-skeleton-text';
import { prefix } from '../../globals/settings';
import { boolean, text, number } from '@storybook/addon-knobs';
import storyDocs from './ai-skeleton-story.mdx';

export const Default = () =>
  html`<cds-ai-skeleton-text></cds-ai-skeleton-text>`;

Default.parameters = {
  percy: {
    skip: true,
  },
};

export const Playground = (args) => {
  const { heading, paragraph, width, lineCount } =
    args?.[`${prefix}-ai-skeleton-text`] ?? {};

  return html`<cds-ai-skeleton-text
    ?heading="${heading}"
    width="${width}"
    ?paragraph="${paragraph}"
    linecount="${lineCount}"></cds-ai-skeleton-text>`;
};

Playground.parameters = {
  ...storyDocs.parameters,
  percy: {
    skip: true,
  },
  knobs: {
    [`${prefix}-ai-skeleton-text`]: () => ({
      heading: boolean('Heading (heading)', false),
      paragraph: boolean('Paragraph (paragraph)', false),
      width: text('Width (width)', '100%'),
      lineCount: number('lineCount (linecount)', 3),
    }),
  },
};

export default {
  title: 'Experimental/AISkeleton/AISkeletonText',
  parameters: {
    ...storyDocs.parameters,
  },
};
