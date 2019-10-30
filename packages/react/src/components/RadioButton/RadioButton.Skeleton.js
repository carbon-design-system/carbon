/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

function RadioButtonSkeleton() {
  return (
    <div className={`${prefix}--radio-button-wrapper`}>
      <div className={`${prefix}--radio-button ${prefix}--skeleton`} />
      <span className={`${prefix}--radio-button__label ${prefix}--skeleton`} />
    </div>
  );
}

export default RadioButtonSkeleton;
