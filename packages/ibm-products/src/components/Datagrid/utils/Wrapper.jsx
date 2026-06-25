/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

export const Wrapper = ({ children }) => (
  <div
    style={{
      height: '100vh',
      width: '100%',
      padding: '1rem',
      margin: '0',
      zIndex: '0',
    }}
  >
    {children}
  </div>
);
