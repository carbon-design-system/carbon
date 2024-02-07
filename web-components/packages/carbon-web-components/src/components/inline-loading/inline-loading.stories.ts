/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { INLINE_LOADING_STATE } from './inline-loading';

const states = {
  [`Inactive (${INLINE_LOADING_STATE.INACTIVE})`]:
    INLINE_LOADING_STATE.INACTIVE,
  [`Active (${INLINE_LOADING_STATE.ACTIVE})`]: INLINE_LOADING_STATE.ACTIVE,
  [`Finished (${INLINE_LOADING_STATE.FINISHED})`]:
    INLINE_LOADING_STATE.FINISHED,
  [`Failed (${INLINE_LOADING_STATE.ERROR})`]: INLINE_LOADING_STATE.ERROR,
};

const defaultArgs = {
  description: 'Loading data...',
  assistiveText: 'Loading',
  status: INLINE_LOADING_STATE.ACTIVE,
};

const controls = {
  description: {
    control: 'text',
    description: 'Specify the description for the inline loading text.',
  },
  assistiveText: {
    control: 'text',
    description:
      'Specify a description that would be used to best describe the loading state.',
  },
  status: {
    control: 'select',
    description: 'Specify the loading status.',
    options: states,
  },
};

export const Default = {
  render: () => html`<cds-inline-loading>Loading data...</cds-inline-loading>`,
};

export const Playground = {
  args: defaultArgs,
  argTypes: controls,
  parameters: {
    percy: { skip: true },
  },
  render: ({ assistiveText, description, status }) =>
    html`
      <cds-inline-loading status="${status}" assistive-text=${assistiveText}>
        ${description}
      </cds-inline-loading>
    `,
};

const meta = {
  title: 'Components/Inline loading',
};

export default meta;
