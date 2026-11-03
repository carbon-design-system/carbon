/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @deprecated PageHeader has moved to Carbon for IBM Products.
 * See https://github.com/carbon-design-system/carbon/issues/21926
 */
import React from 'react';
import { preview__PageHeader as PageHeader } from '../../';
import mdx from './PageHeader.mdx';

export default {
  title: 'Deprecated/preview__PageHeader',
  component: PageHeader,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  tags: ['!autodocs'],
};

export const Default = () => (
  <p>
    <code>PageHeader</code> has moved from <code>@carbon/react</code> to{' '}
    <a href="https://github.com/carbon-design-system/ibm-products">
      @carbon/ibm-products
    </a>
    . See issue{' '}
    <a href="https://github.com/carbon-design-system/carbon/issues/21926">
      #21926
    </a>{' '}
    for migration details.
  </p>
);
