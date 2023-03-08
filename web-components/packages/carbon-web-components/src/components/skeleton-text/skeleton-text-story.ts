/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import { SKELETON_TEXT_TYPE } from './skeleton-text';
import storyDocs from './skeleton-text-story.mdx';

const types = {
  Regular: null,
  [`Heading (${SKELETON_TEXT_TYPE.HEADING})`]: SKELETON_TEXT_TYPE.HEADING,
};

export const Default = (args) => {
  const { type } = args?.[`${prefix}-skeleton-text`] ?? {};
  return html`
    <cds-skeleton-text type="${ifDefined(type)}"></cds-skeleton-text>
  `;
};

Default.parameters = {
  knobs: {
    [`${prefix}-skeleton-text`]: () => ({
      type: select('Skeleton text type (type)', types, null),
    }),
  },
};

export const Lines = (args) => {
  const { paragraph, lineCount, width } =
    args?.[`${prefix}-skeleton-text`] ?? {};
  return html`
    <cds-skeleton-text
      type="line"
      ?paragraph="${paragraph}"
      lineCount="${lineCount}"
      width="${width}"></cds-skeleton-text>
  `;
};

Lines.parameters = {
  knobs: {
    [`${prefix}-skeleton-text`]: () => ({
      paragraph: boolean('Use multiple lines of text (paragraph)', true),
      lineCount: number('The number of lines in a paragraph (lineCount)', 3),
      width: text(
        'Width (in px or %) of single line of text or max-width of paragraph lines (width)',
        '100%'
      ),
    }),
  },
};

export default {
  title: 'Components/Skeleton text',
  parameters: {
    ...storyDocs.parameters,
    percy: {
      skip: true,
    },
  },
};
