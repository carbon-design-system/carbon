/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { sortStates, type DataTableSortState } from './sortStates';
import { sortRows } from '../tools/sorting';
import type { DataTableCell } from '../DataTable';

export interface SortRowParams {
  key: string;
  sortDirection: DataTableSortState;
  sortStates: Record<DataTableSortState, DataTableSortState>;
  locale: string;
  compare: (a: string | number, b: string | number, locale?: string) => number;
}

export type SortRowFn = (
  cellA: any,
  cellB: any,
  options: SortRowParams
) => number;

interface Props {
  locale?: string;
  sortRow?: SortRowFn;
}

interface State<ColTypes extends any[]> {
  rowIds: string[];
  cellsById: Record<string, DataTableCell<ColTypes[number]>>;
  initialRowOrder: string[];
  sortHeaderKey: string | null;
  sortDirection: DataTableSortState;
}

export const initialSortState = sortStates.NONE;

/**
 * Gets the next sort direction for a header.
 *
 * @param prevHeader - Key of the previously sorted header.
 * @param currentHeader - Key of the currently selected header.
 * @param prevState - Previous sort direction.
 */
export const getNextSortDirection = (
  prevHeader: string,
  currentHeader: string,
  prevState: DataTableSortState
): DataTableSortState => {
  // Cycle for sorting the same header: NONE -> ASC -> DESC -> NONE.
  if (prevHeader === currentHeader) {
    switch (prevState) {
      case sortStates.NONE:
        return sortStates.ASC;
      case sortStates.ASC:
        return sortStates.DESC;
      case sortStates.DESC:
        return sortStates.NONE;
    }
  }

  // Sorting a new header starts at ascending order.
  return sortStates.ASC;
};

/**
 * Gets the next sort state.
 *
 * @param props - Component props.
 * @param state - Current table state.
 * @param key - Header key to sort by.
 */
export const getNextSortState = <ColTypes extends any[]>(
  props: Props,
  state: State<ColTypes>,
  { key }: { key: string }
): Pick<State<ColTypes>, 'sortHeaderKey' | 'sortDirection' | 'rowIds'> => {
  const { sortDirection, sortHeaderKey } = state;

  const nextSortDirection = getNextSortDirection(
    key,
    sortHeaderKey ?? '',
    sortDirection
  );

  return getSortedState(props, state, key, nextSortDirection);
};

/**
 * Gets a sort state update.
 *
 * @param props - Component props.
 * @param state - Current state of the table.
 * @param key - Header key to sort by.
 * @param sortDirection - Sort direction to apply.
 */
export const getSortedState = <ColTypes extends any[]>(
  { locale, sortRow }: Props,
  { rowIds, cellsById, initialRowOrder }: State<ColTypes>,
  key: string,
  sortDirection: DataTableSortState
): Pick<State<ColTypes>, 'rowIds' | 'sortDirection' | 'sortHeaderKey'> => {
  const nextRowIds =
    sortDirection !== sortStates.NONE
      ? sortRows({
          rowIds,
          cellsById,
          sortDirection,
          key,
          locale,
          sortRow,
        })
      : initialRowOrder;

  return {
    sortHeaderKey: key,
    sortDirection,
    rowIds: nextRowIds,
  };
};
