/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { initialSortState, getSortedState } from './sorting';
import normalize from '../tools/normalize';

/**
 * Helper to derive the next state from the given props and the
 * prevState. Potential future-facing API hook for React v17.
 *
 * Currently, it's being used as a way to normalize the incoming data that we
 * are receiving for rows
 */
const getDerivedStateFromProps = (props, prevState) => {
  const { rowIds, rowsById, cellsById } = normalize(
    props.rows,
    props.headers,
    prevState
  );
  const state = {
    rowIds,
    rowsById,
    cellsById,
    sortDirection: prevState.sortDirection || initialSortState,
    sortHeaderKey: prevState.sortHeaderKey || null,
    // Copy over rowIds so the reference doesn't mutate the stored
    // `initialRowOrder`
    initialRowOrder: rowIds.slice(),
    filterInputValue: prevState.filterInputValue || null,

    // Optional state field to indicate whether a consumer should show a
    // batch actions menu
    shouldShowBatchActions: prevState.shouldShowBatchActions || false,
  };

  if (prevState.sortDirection && prevState.sortHeaderKey) {
    const { rowIds } = getSortedState(
      props,
      state,
      prevState.sortHeaderKey,
      prevState.sortDirection
    );
    state.rowIds = rowIds;
  }

  return state;
};

export default getDerivedStateFromProps;
