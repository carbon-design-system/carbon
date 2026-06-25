/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TableHead } from '@carbon/react';
import { DataGridState } from '../types';

const DatagridHead = (datagridState: DataGridState) => {
  const { headerGroups = [], headRef, HeaderRow } = datagridState;

  return (
    <TableHead>
      {headerGroups.map((headerGroup) =>
        // doesn't support header grouping.
        HeaderRow?.(datagridState, headRef, headerGroup)
      )}
    </TableHead>
  );
};

export default DatagridHead;
