/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DatagridEmptyBody from './DatagridEmptyBody';
import DatagridVirtualBody from './DatagridVirtualBody';
import DatagridSimpleBody from './DatagridSimpleBody';
import DatagridRefBody from './DatagridRefBody';
import { DataGridState } from '../types';

const DatagridBody = (datagridState: DataGridState) => {
  const {
    isFetching,
    rows = [],
    withVirtualScroll,
    withStickyColumn,
  } = datagridState;

  if (!isFetching && rows.length === 0) {
    return <DatagridEmptyBody {...datagridState} />;
  }
  if (withVirtualScroll) {
    return <DatagridVirtualBody {...datagridState} />;
  }
  if (withStickyColumn) {
    return <DatagridRefBody {...datagridState} />;
  }
  return <DatagridSimpleBody {...datagridState} />;
};

export default DatagridBody;
