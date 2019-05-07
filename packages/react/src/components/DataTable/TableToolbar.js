/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TableToolbar = ({ children }) => (
  <section
    aria-label="data table toolbar"
    className={`${prefix}--table-toolbar`}>
    {children}
  </section>
);
export default TableToolbar;
