/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, createContext, useReducer } from 'react';
import cloneDeep from 'lodash.clonedeep';

// resizing actions
const actionTypes = {
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
const initialState = {
  allColumnKeys: [], // used for column order
  columnsByKey: {}, // contains columns with width
  columnKeyResizeActive: null, // key of column currently being resized
};

// reducer for the resizing actions
const resizeReducer = (state, action) => {
  if (action.type === actionTypes.ADD_COLUMN) {
    return {
      ...state,
      columnsByKey: {
        ...state.columnsByKey,
        [action.colKey]: {
          ref: action.ref,
          colWidth: action.colWidth,
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
    clonedState.columnsByKey[action.colKey].colWidth += action.incr;
    return clonedState;
  }

  if (action.type === actionTypes.BATCH_SET_COLWIDTHS) {
    const clonedState = cloneDeep(state);
    Object.entries(action.colWidths).forEach(entry => {
      const [key, width] = entry;
      clonedState.columnsByKey[key].colWidth = width;
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

// utility function to get the column key of the column to the right
function getNextColKey(state, colKey) {
  const idx = state.allColumnKeys.indexOf(colKey);
  return idx >= 0 && idx < state.allColumnKeys.length - 1
    ? state.allColumnKeys[idx + 1]
    : null;
}

function getColRefs(state) {
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
      // current resize-algorithm: move boundary between 2 columns
      dispatch({ type: actionTypes.UPDATE_COLWIDTH, colKey, incr });
      const nextColKey = getNextColKey(state, colKey);
      if (nextColKey) {
        dispatch({
          type: actionTypes.UPDATE_COLWIDTH,
          colKey: nextColKey,
          incr: -incr,
        });
      }
    },
  };
};
