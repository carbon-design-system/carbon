/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';

export const Default = {
  render: () => html`
    This component has been deprecated in
    <code>@carbon/web-components</code> and will instead be maintained in
    <nobr
      ><a
        href="https://github.com/carbon-design-system/ibm-products/tree/main/packages/ibm-products-web-components"
        >@carbon/ibm-products-web-components</a
      ></nobr
    >.
  `,
};

const meta = {
  title: 'Deprecated/Tearsheet',
  tags: ['!autodocs'],
};

export default meta;
