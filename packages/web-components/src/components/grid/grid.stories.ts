/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';

export const Default = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html`<div>hello world</div>`,
};

const meta = {
  title: 'Components/Grid',
};

export default meta;
