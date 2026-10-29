/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @deprecated PageHeader has moved to Carbon for IBM Products.
 * See https://github.com/carbon-design-system/carbon/issues/21926
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
    >. See
    <a href="https://github.com/carbon-design-system/carbon/issues/21926"
      >carbon#21926</a
    >.
  `,
};

const meta = {
  title: 'Deprecated/PageHeader',
  tags: ['!autodocs'],
};

export default meta;
