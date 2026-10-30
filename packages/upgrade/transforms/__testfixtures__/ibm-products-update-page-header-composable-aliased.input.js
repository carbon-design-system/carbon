/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  PageHeader as ProductsPageHeader,
  SidePanel,
} from '@carbon/ibm-products';

// Test: PageHeader with aliased import and no @carbon/react import
export const AliasedPageHeader = () => (
  <ProductsPageHeader title="Page title" subtitle="Optional subtitle">
    <p>Content</p>
  </ProductsPageHeader>
);

export const OtherProductsComponent = () => <SidePanel />;
