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
};

// context that holds the store
const ResizeContext = createContext();

// the resizing store's initial values
// currently only exported for testing
export const initialState = {
  allColumnKeys: [], // used for column order
  columnsByKey: {}, // contains columns with width
  columnKeyResizeActive: null, // key of column currently being resized
};

// reducer for the resizing actions
// currently only exported for testing
export const resizeReducer = (state, action) => {
  if (action.type === actionTypes.ADD_COLUMN) {
    return {
      ...state,
      columnsByKey: {
        ...state.columnsByKey,
        [action.colKey]: {
          ref: action.ref,
          colWidth: action.colWidth,
          initialColWidth: action.colWidth,
        },
      },
      allColumnKeys: [...state.allColumnKeys, action.colKey],
    };
  }

  if (action.type === actionTypes.START_RESIZE_ACTION) {
    const clonedState = cloneDeep(state);
    clonedState.columnKeyResizeActive = action.colKey;
    return clonedState;
  }

  if (action.type === actionTypes.END_RESIZE_ACTION) {
    const clonedState = cloneDeep(state);
    clonedState.columnKeyResizeActive = null;
    // initialColWidths will be reset by BATCH_SET_COLWIDTHS
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

    // update resized column - only reduce until minimal width
    clonedState.columnsByKey[action.colKey].colWidth = Math.max(
      colMinWidth,
      clonedState.columnsByKey[action.colKey].colWidth + action.incr
    );
    if (clonedState.columnsByKey[action.colKey].colWidth <= colMinWidth) {
      return clonedState;
    }

    const completeWidthChange =
      clonedState.columnsByKey[action.colKey].colWidth -
      clonedState.columnsByKey[action.colKey].initialColWidth;

    // current resize strategy (works perfect on columns with minmal width - like sticky header tables)
    // first we try to modify the columns to the right
    // going right: when we reach the min width of the columns to the right, ...
    // ... then we start modifying the left columns
    // when we move back to the left: we first increase cols to the left up to their initial width
    // then increase the columns to the right again

    const colIdx = clonedState.allColumnKeys.indexOf(action.colKey);
    const numCols = clonedState.allColumnKeys.length;

    const colKeysToTheLeft = clonedState.allColumnKeys.slice(0, colIdx);
    const curWidthLeft =
      colKeysToTheLeft.length &&
      colKeysToTheLeft
        .map(key => clonedState.columnsByKey[key].colWidth)
        .reduce((sum, width) => sum + width);
    const initialWidthLeft =
      colKeysToTheLeft.length &&
      colKeysToTheLeft
        .map(key => clonedState.columnsByKey[key].initialColWidth)
        .reduce((sum, width) => sum + width);

    const colKeysToTheRight = clonedState.allColumnKeys.slice(colIdx + 1);
    const minWidthRight = colMinWidth * colKeysToTheRight.length;
    const curWidthRight =
      colKeysToTheRight.length &&
      colKeysToTheRight
        .map(key => clonedState.columnsByKey[key].colWidth)
        .reduce((sum, width) => sum + width);
    const initialWidthRight =
      colKeysToTheRight.length &&
      colKeysToTheRight
        .map(key => clonedState.columnsByKey[key].initialColWidth)
        .reduce((sum, width) => sum + width);

    // console.log(`diff: (col): ${completeWidthChange}`);
    // console.log(`right (min/initial/cur/diff): ${minWidthRight} ${initialWidthRight} ${curWidthRight} ${initialWidthRight-curWidthRight}`);
    // console.log(`left (initial/cur/diff): ${initialWidthLeft} ${curWidthLeft} ${initialWidthLeft - curWidthLeft}`);

    // modify right columns as long as we do not hit min width
    // or when left columns are at initial width
    // but not if we are the last column
    if (
      colIdx !== numCols - 1 &&
      (curWidthRight > minWidthRight || initialWidthLeft < curWidthLeft)
    ) {
      // dont reduce columns at minimal width
      const colKeysToDistribute =
        action.incr < 0
          ? colKeysToTheRight
          : colKeysToTheRight.filter(
              key => clonedState.columnsByKey[key].colWidth > colMinWidth
            );

      const firstColWidthDiff = Math.ceil(
        completeWidthChange / colKeysToDistribute.length
      );
      const newColWidthDiff = Math.floor(
        completeWidthChange / colKeysToDistribute.length
      );

      colKeysToDistribute.forEach((key, idx) => {
        const diff = idx === 0 ? firstColWidthDiff : newColWidthDiff;
        clonedState.columnsByKey[key].colWidth = Math.max(
          colMinWidth,
          clonedState.columnsByKey[key].initialColWidth - diff
        );
      });
    } else {
      // modify columns to the left

      // what we already distributed to the right cols
      const currentlyDistributedToTheRight = initialWidthRight - curWidthRight;
      const stillToDistribute =
        completeWidthChange - currentlyDistributedToTheRight;

      // dont reduce columns at minimal width
      const colKeysToDistribute =
        action.incr < 0
          ? colKeysToTheLeft
          : colKeysToTheLeft.filter(
              key => clonedState.columnsByKey[key].colWidth > colMinWidth
            );

      const firstColWidthDiff = Math.ceil(
        stillToDistribute / colKeysToDistribute.length
      );
      const newColWidthDiff = Math.floor(
        stillToDistribute / colKeysToDistribute.length
      );

      colKeysToDistribute.forEach((key, idx) => {
        const diff = idx === 0 ? firstColWidthDiff : newColWidthDiff;
        clonedState.columnsByKey[key].colWidth = Math.max(
          colMinWidth,
          clonedState.columnsByKey[key].initialColWidth - diff
        );
      });
    }
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
  return Object.keys(state.columnsByKey).map(colKey => {
    return {
      key: colKey,
      ref: state.columnsByKey[colKey].ref,
    };
  });
}

// the custom hook that provides the resizing functionality
// including the width of the column
export const useColumnResizing = colKey => {
  const context = useContext(ResizeContext);
  if (!context) {
    return {}; // no resizing context defined
  }

  const { state, dispatch } = context;
  const col = state.columnsByKey[colKey];

  return {
    colWidth: col && col.colWidth,
    ref: col && col.ref,
    columnKeyResizeActive: state.columnKeyResizeActive,

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
    startResizeAction: () => {
      dispatch({ type: actionTypes.START_RESIZE_ACTION, colKey });
    },

    // a resizing action has finishes on this column
    endResizeAction: () => {
      dispatch({ type: actionTypes.END_RESIZE_ACTION, colKey });
      // sync column width in store with actual column width
      const colWidths = {};
      getColRefs(state).forEach(({ key, ref }) => {
        const colWidth =
          ref.current && ref.current.getBoundingClientRect().width;
        colWidths[key] = colWidth;
      });
      dispatch({ type: actionTypes.BATCH_SET_COLWIDTHS, colWidths });
    },

    // change the column width by an increment
    resizeColumn: incr => {
      dispatch({ type: actionTypes.UPDATE_COLWIDTH, colKey, incr });
    },
  };
};
