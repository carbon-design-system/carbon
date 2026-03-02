/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LOADING_TYPE } from './loading';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
const types = {
  [`Regular (${LOADING_TYPE.REGULAR})`]: null,
  [`Small (${LOADING_TYPE.SMALL})`]: LOADING_TYPE.SMALL,
};

const defaultArgs = {
  inactive: false,
  active: true,
  assistiveText: 'Loading',
  description: 'Loading',
  type: null,
  withOverlay: false,
  small: false,
};

const controls = {
  active: {
    control: 'boolean',
    description: `Specify whether the component should be active, or not.`,
  },
  description: {
    control: 'text',
    description: `Specify a description that would be used to best describe the loading state.`,
  },
  small: {
    control: 'boolean',
    description: 'Specify whether you would like the small variant of',
  },
  withOverlay: {
    control: 'boolean',
    description: `Specify whether the loading should be an overlay.`,
  },
};

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    active,
    inactive,
    assistiveText,
    description,
    type,
    withOverlay,
    small,
  }) => html`
    <cds-loading
      ?inactive=${inactive}
      ?active=${active}
      description=${description}
      assistive-text=${assistiveText}
      type=${ifDefined(type)}
      ?small=${small}
      ?overlay=${withOverlay}></cds-loading>
  `,
};

const meta = {
  title: 'Components/Loading',
};

export default meta;
