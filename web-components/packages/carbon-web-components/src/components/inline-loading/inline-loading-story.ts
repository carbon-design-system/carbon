/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { select } from '@storybook/addon-knobs';
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

export const Default = (args) => {
  const { status } = args?.[`${prefix}-inline-loading`] ?? {};
  return html`
    <cds-inline-loading status="${ifDefined(status)}"
      >Loading data...</cds-inline-loading
    >
  `;
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
      [`${prefix}-inline-loading`]: () => ({
        status: select(
          'Loading status (status)',
          states,
          INLINE_LOADING_STATE.ACTIVE
        ),
      }),
    },
  },
};
