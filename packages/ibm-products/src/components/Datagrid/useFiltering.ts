/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMemo } from 'react';
import { FilterFlyout } from './Datagrid/addons/Filtering';
import {
  BATCH,
  CHECKBOX,
  DATE,
  MULTISELECT,
  NUMBER,
  RADIO,
} from './Datagrid/addons/Filtering/constants';
import { Hooks, TableInstance } from 'react-table';
import { DataGridState } from './types';

// This function was taken from https://github.com/TanStack/table/blob/v7/src/filterTypes.js
export const exactText = (rows, ids, filterValue) => {
  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];
      return rowValue !== undefined
        ? String(rowValue).toLowerCase() === String(filterValue).toLowerCase()
        : true;
    });
  });
};

const handleMultiFilter = (rows, id, value) => {
  // gets all the items that are selected and returns their value
  const selectedItems = value
    .filter((item) => item.selected)
    .map((item) => item.value);

  // if the user removed all checkboxes then display all rows
  if (selectedItems.length === 0) {
    return rows;
  }

  return rows.filter((row) => {
    const rowValue = row.values[id];
    return selectedItems.includes(rowValue);
  });
};

const useFiltering = (hooks: Hooks) => {
  /* istanbul ignore next */
  const filterTypes = useMemo(
    () => ({
      [DATE]: (rows, id, [startDate, endDate]) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          const startDateObj =
            typeof startDate === 'object' ? startDate : new Date(startDate);
          const endDateObj =
            typeof endDate === 'object' ? endDate : new Date(endDate);
          const rowValueDateObj =
            typeof rowValue === 'object' ? rowValue : new Date(rowValue);
          if (
            rowValueDateObj.getTime() <= endDateObj.getTime() &&
            rowValueDateObj.getTime() >= startDateObj.getTime()
          ) {
            // In date range
            return true;
          } else {
            // Not in date range
            return false;
          }
        });
      },
      [NUMBER]: (rows, id, value) => {
        if (value === '') {
          return rows;
        }

        const parsedValue = parseInt(value);
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue === parsedValue;
        });
      },
      [CHECKBOX]: (rows, id, value) => handleMultiFilter(rows, id, value),
      [MULTISELECT]: (rows, id, value) => handleMultiFilter(rows, id, value),
      [RADIO]: (rows, id, value) => exactText(rows, id, value),
    }),
    []
  );

  hooks.useInstance.push((instance: TableInstance) => {
    const { filterProps, setAllFilters, setFilter, headers, data, state } =
      instance as DataGridState;

    const defaultProps = {
      variation: 'flyout',
      updateMethod: BATCH,
      panelIconDescription: 'Open filter panel',
      reactTableFiltersState: state.filters,
    };

    const getFilterFlyoutProps = () => ({
      ...defaultProps,
      ...filterProps,
      setAllFilters,
      setFilter,
      headers,
      data,
    });

    Object.assign(instance, {
      filterProps: {
        ...defaultProps,
        ...(instance as DataGridState)?.filterProps,
      },
      filterTypes,
      getFilterFlyoutProps,
      FilterFlyout,
    });
  });
};

export default useFiltering;
