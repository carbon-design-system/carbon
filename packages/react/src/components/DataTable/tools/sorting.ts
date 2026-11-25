/**
 * Copyright IBM Corp. 2016, 2026
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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
 * Determines whether a whole string represents a finite number (e.g., `-5` or
 * `3.25`), as opposed to only starting with one (e.g., `10 MB`).
 */
const isNumericString = (value: string) =>
  value.trim() !== '' && Number.isFinite(Number(value));

const INTEGER_PATTERN = /^[+-]?\d+$/;

/**
 * Compares two numeric strings by value. Integer strings are compared as
 * `BigInt` so that values beyond `Number.MAX_SAFE_INTEGER` stay distinct.
 */
const compareNumericStrings = (a: string, b: string) => {
  const trimmedA = a.trim();
  const trimmedB = b.trim();

  if (INTEGER_PATTERN.test(trimmedA) && INTEGER_PATTERN.test(trimmedB)) {
    const bigA = BigInt(trimmedA);
    const bigB = BigInt(trimmedB);
    return bigA < bigB ? -1 : bigA > bigB ? 1 : 0;
  }

  return Math.sign(Number(a) - Number(b));
};

/**
 * Ranks a string so that mixed columns sort as a consistent total order: blank
 * strings first, then numeric strings, then everything else.
 */
const getStringRank = (value: string) => {
  if (value.trim() === '') return 0;
  return isNumericString(value) ? 1 : 2;
};

/**
 * Compares two strings by their numeric value if both represent a number.
 * Otherwise, compares them using `localeCompare`. A numeric string always sorts
 * before a non-numeric one so that the ordering stays transitive.
 *
 * Note: `localeCompare` only sees digit sequences, so it can't order signs or
 * decimals, but it still orders strings that start with a number by that number.
 */
const compareStrings = (a: string, b: string, locale = 'en') => {
  const rankA = getStringRank(a);
  const rankB = getStringRank(b);

  if (rankA !== rankB) {
    return rankA < rankB ? -1 : 1;
  }

  if (rankA === 1) {
    return compareNumericStrings(a, b);
  }

  const isNumeric = !isNaN(parseFloat(a)) && !isNaN(parseFloat(b));

  return a.localeCompare(b, locale, { numeric: isNumeric });
};

interface Cell {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  value: any;
}

// TODO: Should `SortRowParams` in
// packages/react/src/components/DataTable/state/sorting.ts be used here?
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  cellA: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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
