/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';
import ifNonNull from '../../globals/directives/if-non-null';
import { LOADING_TYPE } from './loading';
import storyDocs from './loading-story.mdx';

const types = {
  [`Regular (${LOADING_TYPE.REGULAR})`]: null,
  [`Small (${LOADING_TYPE.SMALL})`]: LOADING_TYPE.SMALL,
  [`With overlay (${LOADING_TYPE.OVERLAY})`]: LOADING_TYPE.OVERLAY,
};

export const Default = args => {
  const { inactive, type } = args?.['bx-loading'] ?? {};
  return html` <bx-loading ?inactive=${inactive} type=${ifNonNull(type)}></bx-loading> `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Loading',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-loading': () => ({
        inactive: boolean('Inactive (inactive)', false),
        type: select('The spinner type (type)', types, null),
      }),
    },
  },
};
