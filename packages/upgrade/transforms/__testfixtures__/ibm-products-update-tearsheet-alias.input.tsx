/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Tearsheet as MyTearsheet } from '@carbon/ibm-products';

// Test: Tearsheet with aliased import
export const AliasedTearsheet = () => {
  return (
    <MyTearsheet
      open={true}
      onClose={() => {}}
      title="Aliased Tearsheet"
      label="Test">
      <div>Content with alias</div>
    </MyTearsheet>
  );
};
