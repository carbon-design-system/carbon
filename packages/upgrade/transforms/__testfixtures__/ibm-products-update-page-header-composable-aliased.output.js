/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { preview__PageHeader as ProductsPageHeader } from '@carbon/ibm-products';

// Test: PageHeader with aliased import
export const AliasedPageHeader = () => (
  <ProductsPageHeader><ProductsPageHeader.Content title="Page title"><ProductsPageHeader.ContentText subtitle="Optional subtitle" />
    <p>Content</p>
  </ProductsPageHeader.Content></ProductsPageHeader>
);
