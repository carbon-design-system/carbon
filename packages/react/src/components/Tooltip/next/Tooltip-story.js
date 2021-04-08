/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Add24 } from '@carbon/icons-react';
import React from 'react';
import { Tooltip } from './Tooltip';

export default {
  title: 'Experimental/unstable_Tooltip',
  component: Tooltip,
};

export const Default = () => {
  return (
    <Tooltip label="Close">
      <button type="button">
        <Add24 />
      </button>
    </Tooltip>
  );
};

export const Description = () => {
  return (
    <Tooltip description="Modify account settings">
      <button type="button">Edit</button>
    </Tooltip>
  );
};
