/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { sortStates, type DataTableSortState } from './sortStates';
import { sortRows } from '../tools/sorting';

interface Props {
  locale?: string;
  sortRow?: (
    cellA: any,
    cellB: any,
    params: {
      key: string;
      sortDirection: DataTableSortState;
      sortStates: Record<DataTableSortState, DataTableSortState>;
      locale: string;
      compare: (a: any, b: any, locale?: string) => number;
      rowIds: string[];
    }
  ) => number;
}

interface State {
  rowIds: string[];
  cellsById: Record<string, { id: string; value: any }>;
  initialRowOrder: string[];
  sortHeaderKey: string | null;
  sortDirection: DataTableSortState;
}

export const initialSortState = sortStates.NONE;

/**
 * Determines the next sort direction for a header based on the previous state.
 *
 * @param prevHeader - The key of the previously sorted header.
 * @param header - The key of the currently selected header.
 * @param prevState - The previous sort direction.
 */
export const getNextSortDirection = (
  prevHeader: string,
  header: string,
  prevState: DataTableSortState
): DataTableSortState => {
  if (prevHeader === header) {
    // When transitioning, we know that the sequence of states is as follows:
    // NONE -> ASC -> DESC -> NONE
    if (prevState === sortStates.NONE) {
      return sortStates.ASC;
    }
    if (prevState === sortStates.ASC) {
      return sortStates.DESC;
    }
    return sortStates.NONE;
  }
  // Otherwise, we have selected a new header and need to start off by sorting
  // in descending order by default
  return sortStates.ASC;
};

/**
 * Gets the updated sort state for the table based on the selected header.
 *
 * @param props - Component props.
 * @param state - The current state of the `DataTable`.
 * @param key - The key of the header to sort by.
 */
export const getNextSortState = (
  props: Props,
  state: State,
  { key }: { key: string }
) => {
  const { sortDirection, sortHeaderKey } = state;

  const nextSortDirection = getNextSortDirection(
    key,
    sortHeaderKey ?? '',
    sortDirection
  );

  return getSortedState(props, state, key, nextSortDirection);
};

/**
 * Gets the next sorted state for the table.
 *
 * @param props - Component props.
 * @param state - The current state of the `DataTable`.
 * @param key - The key of the header to sort by.
 * @param sortDirection - The sort direction to apply.
 */
export const getSortedState = (
  props: Props,
  state: State,
  key: string,
  sortDirection: DataTableSortState
) => {
  const { rowIds, cellsById, initialRowOrder } = state;
  const { locale, sortRow } = props;
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
