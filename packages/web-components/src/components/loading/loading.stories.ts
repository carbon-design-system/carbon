/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';

const defaultArgs = {
  active: true,
  description: 'Loading account settings',
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
  render: ({ active, description, withOverlay, small }) => html`
    <cds-loading
      ?active=${active}
      description=${description}
      ?small=${small}
      ?overlay=${withOverlay}></cds-loading>
  `,
};

const meta = {
  title: 'Components/Loading',
};

export default meta;
