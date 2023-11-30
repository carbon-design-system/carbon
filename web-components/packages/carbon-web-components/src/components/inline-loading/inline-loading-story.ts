/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { select, text } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import { INLINE_LOADING_STATE } from './inline-loading';
import storyDocs from './inline-loading-story.mdx';
import { prefix } from '../../globals/settings';

const states = {
  [`Inactive (${INLINE_LOADING_STATE.INACTIVE})`]:
    INLINE_LOADING_STATE.INACTIVE,
  [`Active (${INLINE_LOADING_STATE.ACTIVE})`]: INLINE_LOADING_STATE.ACTIVE,
  [`Finished (${INLINE_LOADING_STATE.FINISHED})`]:
    INLINE_LOADING_STATE.FINISHED,
  [`Failed (${INLINE_LOADING_STATE.ERROR})`]: INLINE_LOADING_STATE.ERROR,
};

export const Default = () =>
  html`<cds-inline-loading>Loading data...</cds-inline-loading>`;

export default {
  title: 'Components/Inline loading',
  parameters: { ...storyDocs.parameters },
};

export const Playground = (args) => {
  const { assistiveText, description, status } =
    args?.[`${prefix}-inline-loading`] ?? {};
  return html`
    <cds-inline-loading
      status="${ifDefined(status)}"
      assistive-text=${assistiveText}>
      ${description}
    </cds-inline-loading>
  `;
};

Playground.parameters = {
  ...storyDocs.parameters,
  percy: { skip: true },
  knobs: {
    [`${prefix}-inline-loading`]: () => ({
      description: text(
        'Description (description) - Specify the description for the inline loading text',
        'Loading data...'
      ),
      assistiveText: text(
        'Assistive text (assistive-text) - Specify a description that would be used to best describe the loading state',
        'Loading'
      ),
      status: select(
        'Loading status (status)',
        states,
        INLINE_LOADING_STATE.ACTIVE
      ),
    }),
  },
};
