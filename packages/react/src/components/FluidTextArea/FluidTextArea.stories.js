/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTextArea from '../FluidTextArea';

export default {
  title: 'Experimental/unstable__FluidArea',
  component: FluidTextArea,
};

export const Default = () => (
  <FluidTextArea
    labelText="Text Area label"
    helperText="Optional helper text"
    cols={50}
    rows={4}
    id="text-area-1"
  />
);
