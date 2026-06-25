/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import { pkg } from '../../settings';
import useNestedRowExpander from './useNestedRowExpander';
import { useEffect } from 'react';
import { Hooks, TableInstance } from 'react-table';
import { DataGridState, DatagridRow } from './types';

const blockClass = `${pkg.prefix}--datagrid`;

const useNestedRows = (hooks: Hooks) => {
  useNestedRowExpander(hooks);
  const useInstance = (instance: TableInstance) => {
    useEffect(() => {
      const { rows } = instance as DataGridState;
      const defaultExpandedRows = rows.filter(
        (row) => row?.original?.defaultExpanded
      );
      if (defaultExpandedRows?.length) {
        defaultExpandedRows.map((defaultExpandedRow) => {
          if (
            !defaultExpandedRow?.isExpanded &&
            !defaultExpandedRow?.hasExpanded
          ) {
            defaultExpandedRow?.toggleRowExpanded?.();
            defaultExpandedRow.hasExpanded = true;
            return;
          }
        });
      }
    }, [instance, instance.rows]);
    // This useEffect will expand rows if they exist in the initialState obj
    useEffect(() => {
      const { rows, initialState } = instance;
      const { expandedRowIds } = initialState as DataGridState;

      if (expandedRowIds) {
        Object.keys(expandedRowIds).forEach((key) => {
          const row = rows.filter(
            (r: any) =>
              r.id.toString() === key.toString() ||
              r.original?.id?.toString() === key.toString()
          ) as DatagridRow[];

          if (
            (row.length && key.toString() === row[0].id.toString()) ||
            (row.length && key.toString() === row[0].original?.id?.toString())
          ) {
            row[0].toggleRowExpanded();
          }
        });
      }
    }, [instance]);

    const marginLeft = 24;

    const getRowProps = (props, { row }) => {
      return [
        props,
        {
          className: cx({
            [`${blockClass}__carbon-nested-row`]: row.depth > 0,
            [`${blockClass}__carbon-row-expanded`]: row.isExpanded,
          }),
        },
      ];
    };
    const getRowStyles = (props, { row }) => [
      props,
      {
        style: {
          paddingLeft: `${
            row.depth > 1
              ? marginLeft * 2 + (row.depth - 1) * (marginLeft + marginLeft / 3)
              : row.depth === 1
                ? marginLeft * 2
                : 0
          }px`,
        },
      },
    ];
    const getIndentation = (depth) => 32 * depth + 16; // row indentation padding
    const getCellProps = (props, { cell, instance }) => {
      // we add a dynamic -ve margin right only if the cell is resized below minimum width i.e 50px, else we set the width based on indentation at different levels
      const isFirstCell =
        instance.columns.findIndex((c) => c.id === cell.column.id) === 0;
      return [
        props,
        {
          style: {
            marginRight:
              isFirstCell &&
              cell.row.depth > 0 &&
              parseInt(props.style.width, 10) <=
                getIndentation(cell.row.depth) + 50 // indentation padding + expander cell or empty cell width
                ? `${
                    parseInt(props.style.width, 10) -
                    (getIndentation(cell.row.depth) + 50)
                  }px`
                : '',
            width:
              isFirstCell && cell.row.depth > 0
                ? parseInt(props.style.width, 10) -
                  getIndentation(cell.row.depth)
                : props.style.width,
          },
        },
      ];
    };

    Object.assign(instance, { withNestedRows: true });
    hooks.getRowProps.push(getRowProps);
    hooks.getRowProps.push(getRowStyles);
    hooks.getCellProps.push(getCellProps);
  };

  hooks.useInstance.push(useInstance);
};

export default useNestedRows;
