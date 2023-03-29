/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select, text } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LOADING_TYPE } from './loading';
import storyDocs from './loading-story.mdx';
import { prefix } from '../../globals/settings';

const types = {
  [`Regular (${LOADING_TYPE.REGULAR})`]: null,
  [`Small (${LOADING_TYPE.SMALL})`]: LOADING_TYPE.SMALL,
};

export const Default = () => html` <cds-loading></cds-loading> `;

export default {
  title: 'Components/Loading',
  parameters: { ...storyDocs.parameters },
};

export const Playground = (args) => {
  const { inactive, assistiveText, type, withOverlay } =
    args?.[`${prefix}-loading`] ?? {};
  return html`
    <cds-loading
      ?inactive=${inactive}
      assistive-text=${assistiveText}
      type=${ifDefined(type)}
      ?overlay=${withOverlay}></cds-loading>
  `;
};

Playground.parameters = {
  ...storyDocs.parameters,
  knobs: {
    [`${prefix}-loading`]: () => ({
      inactive: boolean('Inactive (inactive)', false),
      assistiveText: text(
        'Assistive text (assistive-text) - Specify a description that would be used to best describe the loading state',
        'Loading'
      ),
      type: select('The spinner type (type)', types, null),
      withOverlay: boolean('With overlay (withOverlay)', false),
    }),
  },
};
