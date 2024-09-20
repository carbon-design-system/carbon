/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LOADING_TYPE } from './loading';

const types = {
  [`Regular (${LOADING_TYPE.REGULAR})`]: null,
  [`Small (${LOADING_TYPE.SMALL})`]: LOADING_TYPE.SMALL,
};

const defaultArgs = {
  inactive: false,
  assistiveText: 'Loading',
  type: null,
  withOverlay: false,
};

const controls = {
  inactive: {
    control: 'boolean',
    description: `Specify whether the component should be inactive, or not.`,
  },
  assistiveText: {
    control: 'text',
    description: `Specify a description that would be used to best describe the loading state.`,
  },
  type: {
    control: 'radio',
    options: types,
    description: `Specify the spinner type.`,
  },
  withOverlay: {
    control: 'boolean',
    description: `Specify whether the loading should be an overlay.`,
  },
};

export const Default = {
  render: () => html` <cds-loading></cds-loading> `,
};

export const Playground = {
  args: defaultArgs,
  argTypes: controls,
  render: ({ inactive, assistiveText, type, withOverlay }) =>
    html`
      <cds-loading
        ?inactive=${inactive}
        assistive-text=${assistiveText}
        type=${ifDefined(type)}
        ?overlay=${withOverlay}></cds-loading>
    `,
};

const meta = {
  title: 'Components/Loading',
};

export default meta;
