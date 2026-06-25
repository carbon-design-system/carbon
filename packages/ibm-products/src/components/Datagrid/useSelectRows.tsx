/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useState } from 'react';
import { useIsomorphicEffect } from '../../global/js/hooks';
import cx from 'classnames';
import { TableSelectRow, usePrefix } from '@carbon/react';
import { SelectAll } from './Datagrid/DatagridSelectAll';
import { selectionColumnId } from './common-column-ids';
import { pkg } from '../../settings';
import { handleToggleRowSelected } from './Datagrid/addons/stateReducer';
import { ColumnInstance, Hooks, TableInstance } from 'react-table';
import { DataGridState } from './types';

const blockClass = `${pkg.prefix}--datagrid`;
const checkboxClass = `${pkg.prefix}--datagrid__checkbox-cell`;

const renderSelectAll = (gridState: DataGridState) => (
  <SelectAll {...gridState} />
);
const renderSelectCell = (gridState: DataGridState) => (
  <SelectRow {...gridState} />
);

const useSelectRows = (hooks: Hooks) => {
  useHighlightSelection(hooks);
  const useInstance = (instance: TableInstance) => {
    const { rows } = instance;
    const rowsWithSelect = rows.map((row) => ({ ...row, isSelectable: true }));
    Object.assign(instance, { rows: rowsWithSelect });
  };
  hooks.useInstance.push(useInstance);
  hooks.useInstance.push((instance) => {
    Object.assign(instance, {
      withSelectRows: true,
    });
  });
  hooks.visibleColumns.push((columns) => {
    // Ensures that the first column is the row expander in the
    // case of selected rows and expandable rows being used together
    const newColOrder = [...columns];
    const expanderColumnIndex = newColOrder.findIndex(
      (col) => col.id === 'expander'
    );
    const expanderCol =
      expanderColumnIndex > -1
        ? newColOrder.splice(expanderColumnIndex, 1)
        : [];
    return [
      ...(expanderColumnIndex > -1 && expanderCol && expanderCol.length
        ? expanderCol
        : []),
      {
        id: selectionColumnId,
        Header: renderSelectAll,
        Cell: renderSelectCell,
      },
      ...newColOrder,
    ] as ColumnInstance[];
  });
};

const useHighlightSelection = (hooks) => {
  const carbonPrefix = usePrefix();
  const getRowProps = (props, { row }) => {
    const { checked } = row.getToggleRowSelectedProps();
    return [
      props,
      {
        className: cx([
          `${blockClass}__carbon-row`,
          {
            [`${carbonPrefix}--data-table--selected`]: checked,
            [`${blockClass}__active-row`]: checked,
          },
        ]),
      },
    ];
  };
  hooks.getRowProps.push(getRowProps);
};

const SelectRow = (datagridState) => {
  const {
    isFetching = false,
    tableId,
    row,
    cell,
    radio,
    toggleAllRowsSelected,
    onRadioSelect,
    onRowSelect,
    columns,
    withStickyColumn,
    dispatch,
    getRowId,
  } = datagridState;

  const [windowSize, setWindowSize] = useState<number>();

  useIsomorphicEffect(() => {
    setWindowSize(window.innerWidth);
    function updateSize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const selectDisabled = isFetching || row.getRowProps().disabled;
  const { onChange, title, ...selectProps } = row.getToggleRowSelectedProps();
  const cellProps = cell.getCellProps();
  const isFirstColumnStickyLeft =
    columns[0]?.sticky === 'left' && withStickyColumn;
  const rowId = `${tableId}-${row.id}-${row.index}`;
  const { key, _cellProps } = cellProps;

  const onSelectHandler = useCallback(
    (event) => {
      event.stopPropagation(); // avoid triggering onRowClick
      if (radio) {
        toggleAllRowsSelected(false);
        if (onRadioSelect) {
          onRadioSelect(row);
        }
      }
      onChange(event);
      onRowSelect?.(row, event);
      handleToggleRowSelected({
        dispatch,
        rowData: row,
        isChecked: event.target.checked,
        getRowId,
        selectAll: null,
      });
    },
    [
      dispatch,
      getRowId,
      onChange,
      onRadioSelect,
      onRowSelect,
      radio,
      row,
      toggleAllRowsSelected,
    ]
  );

  return (
    <TableSelectRow
      key={key}
      {..._cellProps}
      {...selectProps}
      radio={radio}
      onSelect={onSelectHandler}
      id={rowId}
      name={`${rowId}-name`}
      className={cx([
        checkboxClass,
        cellProps.className,
        {
          [`${checkboxClass}-sticky-left`]:
            isFirstColumnStickyLeft && Number(windowSize) > 671,
        },
      ])}
      aria-label={title}
      disabled={selectDisabled}
    />
  );
};

export default useSelectRows;
