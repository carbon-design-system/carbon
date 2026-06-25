/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import cx from 'classnames';
import { pkg } from '../../settings';
import { Hooks } from 'react-table';
import {
  DataGridHeader,
  DataGridState,
  DatagridColumn,
  VisibleColumns,
} from './types';

const blockClass = `${pkg.prefix}--datagrid`;

const useColumnCenterAlign = (hooks: Hooks) => {
  const centerAlignRenderer = (
    tableProps: DataGridState,
    column: DatagridColumn
  ) => (
    <div
      className={cx(`${blockClass}__center-align-cell-renderer`, {
        sortDisabled:
          !tableProps.isTableSortable ||
          (tableProps.column && tableProps.column.disableSortBy === true),
      })}
    >
      {(column.Cell as (props: any) => ReactNode)(tableProps)}
    </div>
  );

  const centerAlignHeader = (
    headerProp: DataGridHeader,
    column: DatagridColumn
  ) => (
    <div className={`${blockClass}__center-align-header`}>
      {typeof column.Header === 'function'
        ? (column.Header as (props: any) => ReactNode)(headerProp)
        : column.Header}
    </div>
  );

  const centerAlignedColumns = (columns: DatagridColumn[]) => {
    const columnsWithDefaultCells = columns.map((column) => ({
      ...column,
      Cell: column.centerAlignedColumn
        ? (tableProp: DataGridState) => centerAlignRenderer(tableProp, column)
        : column.Cell,
      Header: column.centerAlignedColumn
        ? (headerProp: DataGridHeader) => centerAlignHeader(headerProp, column)
        : column.Header,
    }));
    return [...columnsWithDefaultCells];
  };

  hooks.visibleColumns.push(centerAlignedColumns as VisibleColumns);
};

export default useColumnCenterAlign;
