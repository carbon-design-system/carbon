/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import cx from 'classnames';
import { selectionColumnId } from './common-column-ids';
import SelectAllWithToggle from './Datagrid/DatagridSelectAllWithToggle';
import { pkg } from '../../settings';
import { useIsomorphicEffect } from '../../global/js/hooks';
import { Hooks, TableInstance } from 'react-table';
import { DataGridState } from './types';

const blockClass = `${pkg.prefix}--datagrid__select-all`;

const useSelectAllToggle = (hooks: Hooks) => {
  useSelectAllWithToggleComponent(hooks);
  useAddClassNameToSelectRow(hooks);
};

const useSelectAllWithToggleComponent = (hooks: Hooks) => {
  const useInstance = (instance: TableInstance) => {
    const { headers, DatagridPagination } = instance as DataGridState;
    const headersWithSelectAllToggle = headers?.map((header) => {
      if (header.id === selectionColumnId && DatagridPagination) {
        Object.assign(header, {
          Header,
        });
      }
      return header;
    });
    Object.assign(instance, { headers: headersWithSelectAllToggle });
  };
  hooks.useInstance.push(useInstance);
};

const useAddClassNameToSelectRow = (hooks: Hooks) => {
  const [windowSize, setWindowSize] = useState(0);

  useIsomorphicEffect(() => {
    setWindowSize(window.innerWidth);
    function updateSize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  hooks.getCellProps.push((props, data) => {
    const { column } = data.cell;
    const { DatagridPagination, columns, withStickyColumn } =
      data.instance as DataGridState;
    const isFirstColumnStickyLeft =
      columns[0]?.sticky === 'left' && withStickyColumn;
    if (column.id === selectionColumnId && DatagridPagination) {
      return [
        props,
        {
          className: cx(`${blockClass}-toggle-on`, {
            [`${blockClass}-sticky-left`]:
              isFirstColumnStickyLeft && windowSize > 671,
          }),
        },
      ];
    }
    return [props];
  });
};

const Header = (gridState: DataGridState) => {
  const {
    tableId,
    isFetching,
    selectAllToggle,
    getToggleAllPageRowsSelectedProps,
    getToggleAllRowsSelectedProps,
    isAllRowsSelected,
    withStickyColumn,
    columns,
  } = gridState;
  const props = {
    tableId,
    isFetching,
    selectAllToggle,
    getToggleAllPageRowsSelectedProps,
    getToggleAllRowsSelectedProps,
    isAllRowsSelected,
    withStickyColumn,
    columns,
  } as DataGridState;
  return <SelectAllWithToggle {...props} />;
};

export default useSelectAllToggle;
