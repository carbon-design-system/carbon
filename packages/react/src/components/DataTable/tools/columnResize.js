/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, createContext, useReducer } from 'react';
import cloneDeep from 'lodash.clonedeep';

// minimal column width
// based on the minimal width in sticky header tables
const colMinWidth = 40;

// resizing actions
// currently only exported for testing
export const actionTypes = {
  ADD_COLUMN: 'ADD_COLUMN',
  REMOVE_COLUMN: 'REMOVE_COLUMN',
  START_RESIZE_ACTION: 'START_RESIZE_ACTION',
  END_RESIZE_ACTION: 'END_RESIZE_ACTION',
  UPDATE_COLWIDTH: 'UPDATE_COLWIDTH',
  BATCH_SET_COLWIDTHS: 'BATCH_SET_COLWIDTHS',
  SYNC_TABLE_WIDTH: 'SYNC_TABLE_WIDTH,',
};

// context that holds the store
const ResizeContext = createContext();

// the resizing store's initial values
// currently only exported for testing
export const initialState = {
  allColumnKeys: [], // used for column order
  columnsByKey: {}, // contains columns with width
  resizeActivity: {}, // colKey and pos when resizing is active
};

// reducer for the resizing actions
// currently only exported for testing
export const resizeReducer = (state, action) => {
  if (action.type === actionTypes.ADD_COLUMN) {
    const clonedState = cloneDeep(state);
    clonedState.columnsByKey[action.colKey] = {
      ref: action.ref,
      colWidth: action.colWidth,
      initialColWidth: action.colWidth,
    };
    clonedState.allColumnKeys = state.allColumnKeys.concat([action.colKey]);
    return clonedState;
  }

  if (action.type === actionTypes.START_RESIZE_ACTION) {
    const clonedState = cloneDeep(state);
    clonedState.resizeActivity = {
      colKey: action.colKey,
      initialPos: action.initialPos,
    };
    return clonedState;
  }

  if (action.type === actionTypes.END_RESIZE_ACTION) {
    const clonedState = cloneDeep(state);
    clonedState.resizeActivity = {};
    // finalize column width changes
    state.allColumnKeys.forEach(key => {
      clonedState.columnsByKey[key].initialColWidth =
        clonedState.columnsByKey[key].colWidth;
    });
    return clonedState;
  }

  if (action.type === actionTypes.REMOVE_COLUMN) {
    const clonedState = cloneDeep(state);
    delete clonedState.columnsByKey[action.colKey];
    clonedState.allColumnKeys = state.allColumnKeys.filter(
      item => item !== action.colKey
    );
    return clonedState;
  }

  if (action.type === actionTypes.UPDATE_COLWIDTH) {
    const clonedState = cloneDeep(state);
    const colIdx = clonedState.allColumnKeys.indexOf(action.colKey);

    // dont use right most resizer
    if (colIdx < clonedState.allColumnKeys.length - 1) {
      // way of resizer is how much we want the column to grow from its initial pos
      const resizerDiff = action.pos - clonedState.resizeActivity.initialPos;

      const colKeysToTheRight = clonedState.allColumnKeys.slice(colIdx + 1);
      const colKeysToTheLeft = clonedState.allColumnKeys.slice(0, colIdx + 1);

      if (resizerDiff >= 0) {
        // move resizer to the right:
        // first reset columns to the left to initial value
        // because they might still be altered from previous call
        resetToInitialWidth(clonedState, colKeysToTheLeft);

        // squeeze columns to the right as long as they are wider than their min
        const distributedWidth = distributeOverColumns(
          clonedState,
          -resizerDiff,
          colKeysToTheRight
        );

        // increase this column by the same amount
        incrementColumnFromInitial(
          clonedState,
          -distributedWidth,
          action.colKey
        );
      } else {
        // move resizer to the left (resizerDiff < 0):
        // first reset columns to the right to initial value
        // because they might still be altered from previous call
        resetToInitialWidth(clonedState, colKeysToTheRight);

        // first try to squeeze this column until min width
        let distributedWidth = incrementColumnFromInitial(
          clonedState,
          resizerDiff,
          action.colKey
        );
        const remainingWidth = distributedWidth - resizerDiff; // all negative

        // all columns from 0 to the one to the left
        const colKeysToTheLeft2 = clonedState.allColumnKeys.slice(0, colIdx);

        if (remainingWidth > 0) {
          // ... and squeeze this column and all columns to the left
          const distributedToTheLeft = distributeOverColumns(
            clonedState,
            -remainingWidth,
            colKeysToTheLeft2
          );
          distributedWidth += distributedToTheLeft;
        } else {
          resetToInitialWidth(clonedState, colKeysToTheLeft2);
        }

        // increase the column to the right by the same amount
        const rightColKey = clonedState.allColumnKeys[colIdx + 1];
        incrementColumnFromInitial(clonedState, -distributedWidth, rightColKey);
      }
    }
    return clonedState;
  }

  if (action.type === actionTypes.SYNC_TABLE_WIDTH) {
    const clonedState = cloneDeep(state);

    // compare actual table with with what we have stored
    // and distribute the difference over all columns
    // (called on window resize)
    const curWidth =
      clonedState.allColumnKeys.length &&
      clonedState.allColumnKeys
        .map(key => clonedState.columnsByKey[key].colWidth)
        .reduce((sum, width) => sum + width);
    const diff = action.tableWidth - curWidth;
    distributeOverColumns(clonedState, diff, clonedState.allColumnKeys);
    return clonedState;
  }

  if (action.type === actionTypes.BATCH_SET_COLWIDTHS) {
    const clonedState = cloneDeep(state);
    Object.entries(action.colWidths).forEach(entry => {
      const [key, width] = entry;
      clonedState.columnsByKey[key].colWidth = width;
      clonedState.columnsByKey[key].initialColWidth = width;
    });
    return clonedState;
  }

  throw new Error(`Unhandled action type: ${action.type}`);
};

// increment column width over initial width (respecting min width)
function incrementColumnFromInitial(state, incr, key) {
  const newColWidth = state.columnsByKey[key].initialColWidth + incr;
  const newWidth = Math.max(colMinWidth, newColWidth);
  state.columnsByKey[key].colWidth = newWidth;
  return newWidth - state.columnsByKey[key].initialColWidth; // actual diff
}

// reset all columns with columnIds to initial width
export function resetToInitialWidth(state, columnIds) {
  columnIds.forEach(key => {
    state.columnsByKey[key].colWidth = state.columnsByKey[key].initialColWidth;
  });
}

// distribute an increment of width `diff` (positive or negative)
// over the columns specified in `columnIds` proportially to their initial width
// and respect the minimal column width
// returns the actually distributed width
export function distributeOverColumns(state, diff, columnIds) {
  if (diff) {
    // sum of width over minimal width
    const sumPossibleDiff = columnIds
      .map(key => state.columnsByKey[key].initialColWidth - colMinWidth)
      .reduce((sum, val) => sum + val, 0);
    const relativeDiff = diff / sumPossibleDiff;
    let sumActDiff = 0;

    // we can distribute everything
    if (diff > 0 || sumPossibleDiff > -diff) {
      columnIds.forEach(key => {
        const colDiff =
          relativeDiff *
          (state.columnsByKey[key].initialColWidth - colMinWidth);
        const actDiff = incrementColumnFromInitial(state, colDiff, key);
        sumActDiff += actDiff;
      });
      return sumActDiff;
    }

    // we hit the minimum column width (only for diff < 0)
    columnIds.forEach(key => {
      state.columnsByKey[key].colWidth = colMinWidth;
    });
    return -sumPossibleDiff; // this is what we actually distributed
  }
  return 0;
}

// context provider for resizing actions
// needs to be defined over the whole table including header and cells
export const ResizeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resizeReducer, initialState);

  return (
    <ResizeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResizeContext.Provider>
  );
};

// currently only exported for testing
export function getColRefs(state) {
  return Object.keys(state.columnsByKey).map(colKey => ({
    key: colKey,
    ref: state.columnsByKey[colKey].ref,
  }));
}

// the custom hook that provides the resizing functionality
// including the width of the column
export const useColumnResizing = colKey => {
  const context = useContext(ResizeContext);
  if (!context) {
    // no resizing context defined
    return {
      colWidth: 0,
      ref: null,
      columnKeyResizeActive: null,
      initColumnResizing: () => {
        /* empty */
      },
      cleanupColumnResizing: () => {
        /* empty */
      },
      startResizeAction: () => {
        /* empty */
      },
      endResizeAction: () => {
        /* empty */
      },
      resizeColumn: () => {
        /* empty */
      },
      syncOnWindowResize: () => {
        /* empty */
      },
    };
  }

  const { state, dispatch } = context;
  const col = state.columnsByKey[colKey];

  const getActualColWidths = () => {
    const colWidths = {};
    getColRefs(state).forEach(({ key, ref }) => {
      const colWidth = ref.current && ref.current.getBoundingClientRect().width;
      colWidths[key] = colWidth;
    });
    return colWidths;
  };

  return {
    colWidth: col && col.colWidth,
    ref: col && col.ref,
    columnKeyResizeActive: state.resizeActivity.colKey,

    // add a new column to the store
    initColumnResizing: newRef => {
      const colWidth =
        newRef &&
        newRef.current &&
        newRef.current.getBoundingClientRect().width;
      dispatch({ type: actionTypes.ADD_COLUMN, colKey, ref: newRef, colWidth });
    },

    // removes a column from the store
    cleanupColumnResizing: () => {
      dispatch({ type: actionTypes.REMOVE_COLUMN, colKey });
    },

    // a resizing action has started on this column
    startResizeAction: initialPos => {
      // sync column width in store with actual column width
      // because they may not exactly align anymore
      dispatch({
        type: actionTypes.BATCH_SET_COLWIDTHS,
        colWidths: getActualColWidths(),
      });
      dispatch({ type: actionTypes.START_RESIZE_ACTION, colKey, initialPos });
    },

    // a resizing action has finishes on this column
    endResizeAction: () => {
      dispatch({ type: actionTypes.END_RESIZE_ACTION, colKey });
    },

    // change the column width by an increment
    resizeColumn: pos => {
      dispatch({ type: actionTypes.UPDATE_COLWIDTH, colKey, pos });
    },

    // sync stored column widths with resized table width
    syncOnWindowResize: headerRef => {
      const tr = headerRef.current.closest('tr');
      if (tr) {
        const { width } = tr.getBoundingClientRect();
        dispatch({
          type: actionTypes.SYNC_TABLE_WIDTH,
          colKey,
          tableWidth: width,
        });
      }
    },
  };
};
