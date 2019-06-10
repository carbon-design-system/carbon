/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { sortRows } from '../tools/sorting';

/**
 * We currently support the following sorting states for DataTable headers,
 * namely: `NONE` for no sorting being applied, and then `DESC` and `ASC` for
 * the corresponding direction of the sorting order.
 */
export const sortStates = {
  NONE: 'NONE',
  DESC: 'DESC',
  ASC: 'ASC',
};

// Our initialSortState should be `NONE`, unless a consumer has specified a
// different initialSortState
export const initialSortState = sortStates.NONE;

/**
 * Utility used to get the next sort state given the following pieces of
 * information:
 *
 * @param {string} prevHeader the value of the previous header
 * @param {string} header the value of the currently selected header
 * @param {string} prevState the previous sort state of the table
 * @returns {string}
 */
export const getNextSortDirection = (prevHeader, header, prevState) => {
  // If the previous header is equivalent to the current header, we know that we
  // have to derive the next sort state from the previous sort state
  if (prevHeader === header) {
    // When transitioning, we know that the sequence of states is as follows:
    // NONE -> ASC -> DESC -> NONE
    if (prevState === 'NONE') {
      return sortStates.ASC;
    }
    if (prevState === 'ASC') {
      return sortStates.DESC;
    }
    return sortStates.NONE;
  }
  // Otherwise, we have selected a new header and need to start off by sorting
  // in descending order by default
  return sortStates.ASC;
};

export const getNextSortState = (props, state, { key }) => {
  const { sortDirection, sortHeaderKey } = state;

  const nextSortDirection = getNextSortDirection(
    key,
    sortHeaderKey,
    sortDirection
  );

  return getSortedState(props, state, key, nextSortDirection);
};

/**
 * Derive the set of sorted state fields from props and state for the given
 * header key and sortDirection
 *
 * @param {object} props
 * @param {string} props.locale The current locale
 * @param {Function} props.sortRows Method to handle sorting a collection of
 * rows
 * @param {object} state
 * @param {Array<string>} state.rowIds Array of row ids
 * @param {object} state.cellsById Lookup object for cells by id
 * @param {Array<string>} state.initialRowOrder Initial row order for the
 * current set of rows
 * @param {string} key The key for the given header we are derving the
 * sorted state for
 * @param {string} sortDirection The sortState that we want to order by
 * @returns {object}
 */
export const getSortedState = (props, state, key, sortDirection) => {
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
    sortDirection: sortDirection,
    rowIds: nextRowIds,
  };
};
