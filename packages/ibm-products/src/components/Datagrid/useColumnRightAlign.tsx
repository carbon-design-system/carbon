/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import { pkg } from '../../settings';
import { Hooks } from 'react-table';
import {
  DataGridState,
  DatagridColumn,
  NodeFuncType,
  VisibleColumns,
} from './types';
const blockClass = `${pkg.prefix}--datagrid`;

const useColumnRightAlign = (hooks: Hooks) => {
  const RightAlignRenderer = (
    tableProps: DataGridState,
    column: DatagridColumn
  ) => (
    <div
      className={cx(`${blockClass}__right-align-cell-renderer`, {
        sortDisabled:
          !tableProps.isTableSortable ||
          tableProps?.column?.disableSortBy === true,
      })}
    >
      {(column?.Cell as NodeFuncType)?.(tableProps)}
    </div>
  );

  const RightAlignHeader = (
    headerProp: DataGridState,
    column: DatagridColumn
  ) => (
    <div className={`${blockClass}__right-align-header`}>
      {typeof column.Header === 'function'
        ? (column?.Header as NodeFuncType)(headerProp)
        : column.Header}
    </div>
  );

  const rightAlignedColumns = (columns: DatagridColumn[]) => {
    const columnsWithDefaultCells = columns.map((column) => ({
      ...column,
      Cell: column.rightAlignedColumn
        ? (tableProp: DataGridState) => RightAlignRenderer(tableProp, column)
        : column.Cell,
      Header: column.rightAlignedColumn
        ? (headerProp: DataGridState) => RightAlignHeader(headerProp, column)
        : column.Header,
    }));
    return [...columnsWithDefaultCells];
  };
  hooks.visibleColumns.push(rightAlignedColumns as VisibleColumns);
};

export default useColumnRightAlign;
