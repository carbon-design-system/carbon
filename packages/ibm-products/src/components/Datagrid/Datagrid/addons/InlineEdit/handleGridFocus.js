/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const handleGridFocus = (state, dispatch) => {
  const { gridActive, previousActiveCellId } = state;
  if (!gridActive) {
    // Initialize grid active state
    dispatch({
      type: 'ADD_GRID_ACTIVE_FOCUS',
      payload: previousActiveCellId || 'column-0-row-0', // If there is a previous active cell id that is found use that, otherwise use the first cell in the grid area
    });
  }
};
