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
import { SKELETON_TEXT_TYPE } from './skeleton-text';

const types = {
  Regular: null,
  [`Heading (${SKELETON_TEXT_TYPE.HEADING})`]: SKELETON_TEXT_TYPE.HEADING,
};

const args = {
  type: null,
  paragraph: true,
  lineCount: 3,
  width: '100%',
};

const argTypes = {
  type: {
    control: 'select',
    description: 'Indicate the type of skeleton text, heading or regular.',
    options: types,
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
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html`<cds-skeleton-text></cds-skeleton-text>`,
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const { type, paragraph, lineCount, width } = args ?? {};
    return html`
      <cds-skeleton-text
        type="${ifDefined(type)}"
        ?paragraph="${paragraph}"
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
