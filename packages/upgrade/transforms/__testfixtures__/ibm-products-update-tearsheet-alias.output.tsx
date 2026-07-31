/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { preview__Tearsheet as MyTearsheet } from '@carbon/ibm-products';

// Test: Tearsheet with aliased import
export const AliasedTearsheet = () => {
  return (
    <MyTearsheet open={true} onClose={() => {}}>
      <MyTearsheet.Header>
        <MyTearsheet.HeaderContent title="Aliased Tearsheet" label="Test"></MyTearsheet.HeaderContent>
      </MyTearsheet.Header>
      <MyTearsheet.Body>
        <MyTearsheet.MainContent>

          <div>Content with alias</div>

        </MyTearsheet.MainContent>
      </MyTearsheet.Body>
    </MyTearsheet>
  );
};
