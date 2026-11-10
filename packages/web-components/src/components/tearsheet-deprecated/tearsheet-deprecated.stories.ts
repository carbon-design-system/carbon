/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @deprecated Tearsheet has moved to @carbon/ibm-products-web-components.
 * In @carbon/web-components v12 it will be available as a stable composable component.
 */

import { html } from 'lit';

export const Default = {
  render: () => html`
    This component is deprecated in the current version of
    <code>@carbon/web-components</code>. It is maintained as a preview component
    in
    <nobr
      ><a
        href="https://github.com/carbon-design-system/ibm-products/tree/main/packages/ibm-products-web-components"
        >@carbon/ibm-products-web-components</a
      ></nobr
    >
    and will be promoted to a stable composable component in
    <code>@carbon/web-components</code> v12.
  `,
};

const meta = {
  title: 'Deprecated/Tearsheet',
  tags: ['!autodocs'],
};

export default meta;
