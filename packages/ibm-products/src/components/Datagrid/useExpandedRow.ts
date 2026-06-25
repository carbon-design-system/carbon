/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from 'react';
import DatagridExpandedRow from './Datagrid/DatagridExpandedRow';
import useRowExpander from './useRowExpander';
import { Hooks, TableInstance } from 'react-table';
import { DataGridState, DatagridRow } from './types';

const useExpandedRow = (hooks: Hooks) => {
  useRowExpander(hooks);
  const useInstance = (instance: TableInstance) => {
    const {
      rows,
      expandedContentHeight,
      ExpandedRowContentComponent,
      onRowExpand,
    } = instance as DataGridState;
    const [expandedRowsHeight, setExpandedRowsHeight] = useState({});
    const setExpandedRowHeight = (rowIndex, height) =>
      setExpandedRowsHeight({ ...expandedRowsHeight, [rowIndex]: height });
    const rowsWithExpand = rows.map((row) => ({
      ...row,
      canExpand: row.original && !row.original.notExpandable,
      expandedContentHeight:
        expandedRowsHeight[row.index] || expandedContentHeight,
      RowExpansionRenderer:
        ExpandedRowContentComponent &&
        DatagridExpandedRow(ExpandedRowContentComponent),
      onClick: (row: DatagridRow, event: React.MouseEvent<HTMLElement>) =>
        onRowExpand?.(row, event),
    }));
    Object.assign(instance, {
      rows: rowsWithExpand,
      setExpandedRowHeight,
      withExpandedRows: true,
    });
  };
  hooks.useInstance.push(useInstance);
};

export default useExpandedRow;
