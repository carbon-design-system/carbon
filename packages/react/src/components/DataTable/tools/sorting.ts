/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getCellId } from './cells';
import { sortStates, type DataTableSortState } from '../state/sortStates';

/**
 * Compare two values to determine their order. If both values have the same
 * type, the default sort algorithm will be used for those types. Otherwise, the
 * values will be converted to strings for comparison.
 */
export const compare = (a: any, b: any, locale = 'en') => {
  // prevent multiple null values in one column (sorting breaks)
  if (a === null) a = '';
  if (b === null) b = '';

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return compareStrings(a, b, locale);
  }

  const aChild = a?.props?.children;
  const bChild = b?.props?.children;

  if (typeof aChild === 'string' && typeof bChild === 'string') {
    return compareStrings(aChild, bChild, locale);
  }

  return compareStrings(String(a), String(b), locale);
};

/**
 * Compares two strings using `localeCompare`.
 *
 * Note: Uses numeric comparison if strings are numeric.
 */
const compareStrings = (a: string, b: string, locale = 'en') => {
  const isNumeric = !isNaN(parseFloat(a)) && !isNaN(parseFloat(b));

  return a.localeCompare(b, locale, { numeric: isNumeric });
};

interface Cell {
  id: string;
  value: any;
}

interface SortRowParams {
  key: string;
  sortDirection: DataTableSortState;
  sortStates: Record<DataTableSortState, DataTableSortState>;
  locale: string;
  compare: typeof compare;
  rowIds: string[];
}

interface SortRowsConfig {
  rowIds: string[];
  cellsById: Record<string, Cell>;
  key: string;
  sortDirection: DataTableSortState;
  locale?: string;
  sortRow?: (cellA: any, cellB: any, params: SortRowParams) => number;
}

/**
 * Sorts table rows based on the provided column key and direction.
 */
export const sortRows = ({
  rowIds,
  cellsById,
  sortDirection,
  key,
  locale = 'en',
  sortRow = defaultSortRow,
}: SortRowsConfig) =>
  rowIds.slice().sort((a, b) => {
    const cellA = cellsById[getCellId(a, key)];
    const cellB = cellsById[getCellId(b, key)];
    return sortRow(cellA?.value, cellB?.value, {
      key,
      sortDirection,
      sortStates,
      locale,
      compare,
      rowIds: [a, b],
    });
  });

/**
 * Sorts table rows based on the sort direction.
 */
export const defaultSortRow = (
  cellA: any,
  cellB: any,
  {
    sortDirection,
    sortStates,
    locale,
  }: Pick<SortRowParams, 'locale' | 'sortDirection' | 'sortStates'>
) => {
  if (sortDirection === sortStates.ASC) {
    return compare(cellA, cellB, locale);
  }

  return compare(cellB, cellA, locale);
};
