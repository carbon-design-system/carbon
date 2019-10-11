/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const CheckboxSkeleton = () => (
  <div className={`${prefix}--form-item ${prefix}--checkbox-wrapper`}>
    <span className={`${prefix}--checkbox-label ${prefix}--skeleton`} />
  </div>
);

export default CheckboxSkeleton;
