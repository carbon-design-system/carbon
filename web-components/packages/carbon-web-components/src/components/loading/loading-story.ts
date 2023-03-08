/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LOADING_TYPE } from './loading';
import storyDocs from './loading-story.mdx';
import { prefix } from '../../globals/settings';

const types = {
  [`Regular (${LOADING_TYPE.REGULAR})`]: null,
  [`Small (${LOADING_TYPE.SMALL})`]: LOADING_TYPE.SMALL,
};

export const Default = (args) => {
  const { inactive, type, withOverlay } = args?.[`${prefix}-loading`] ?? {};
  return html`
    <cds-loading
      ?inactive=${inactive}
      type=${ifDefined(type)}
      ?overlay=${withOverlay}></cds-loading>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Loading',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-loading`]: () => ({
        inactive: boolean('Inactive (inactive)', false),
        type: select('The spinner type (type)', types, null),
        withOverlay: boolean('With overlay (withOverlay)', false),
      }),
    },
  },
};
