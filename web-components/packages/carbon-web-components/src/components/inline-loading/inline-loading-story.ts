/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import ifNonNull from '../../globals/directives/if-non-null';
import { INLINE_LOADING_STATE } from './inline-loading';
import storyDocs from './inline-loading-story.mdx';

const states = {
  [`Inactive (${INLINE_LOADING_STATE.INACTIVE})`]: INLINE_LOADING_STATE.INACTIVE,
  [`In progress (${INLINE_LOADING_STATE.ACTIVE})`]: INLINE_LOADING_STATE.ACTIVE,
  [`Success (${INLINE_LOADING_STATE.FINISHED})`]: INLINE_LOADING_STATE.FINISHED,
  [`Failed (${INLINE_LOADING_STATE.ERROR})`]: INLINE_LOADING_STATE.ERROR,
};

export const Default = (args) => {
  const { status } = args?.['bx-inline-loading'] ?? {};
  return html` <bx-inline-loading status="${ifNonNull(status)}">Loading data...</bx-inline-loading> `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Inline loading',
  parameters: {
    ...storyDocs.parameters,
    percy: {
      skip: true,
    },
    knobs: {
      'bx-inline-loading': () => ({
        status: select('Loading status (status)', states, INLINE_LOADING_STATE.ACTIVE),
      }),
    },
  },
};
