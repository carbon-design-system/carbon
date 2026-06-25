/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { includesResourceKey } from '../../../../DataSpreadsheet/utils/handleMultipleKeys';
import { pkg } from '../../../../../settings';
import { getFocusableElements } from '../../../../../global/js/utils/getFocusableElements';

const blockClass = `${pkg.prefix}--datagrid`;

export const handleMultipleKeys = ({
  usingMac,
  keysPressedList,
  dispatch,
  activeCellId,
  instance,
}) => {
  // Resource key and Home
  // Move active cell to first cell in first row and column
  if (
    includesResourceKey(keysPressedList, usingMac) &&
    keysPressedList.includes('Home')
  ) {
    const scrollElement = document.querySelector(
      `#${instance.tableId} .${pkg.prefix}--datagrid__table-container`
    );
    // Scroll table container to the furthest top left position
    scrollElement.scrollTop = 0;
    scrollElement.scrollLeft = 0;
    dispatch({
      type: 'UPDATE_ACTIVE_CELL_ID',
      payload: 'column-0-row-0',
    });
  }

  // Resource key and End
  // Move active cell to last cell in in the last row and column
  if (
    includesResourceKey(keysPressedList, usingMac) &&
    keysPressedList.includes('End')
  ) {
    const totalVisibleColumns = instance.visibleColumns.filter(
      (item) => item.id !== 'spacer'
    ).length;
    const totalRows = instance.rows?.length;
    const lastCellDataId = `column-${totalVisibleColumns - 1}-row-${
      totalRows - 1
    }`;
    const lastCellElement = document.querySelector(
      `#${instance.tableId} .${blockClass}__table-with-inline-edit [data-cell-id="${activeCellId}"]`
    );
    const scrollElement = document.querySelector(
      `#${instance.tableId} .${pkg.prefix}--datagrid__table-container`
    );
    // Scroll table container to the furthest bottom right position
    scrollElement.scrollTop = scrollElement.scrollHeight;
    scrollElement.scrollLeft = scrollElement.scrollWidth;
    if (lastCellElement) {
      dispatch({
        type: 'UPDATE_ACTIVE_CELL_ID',
        payload: lastCellDataId,
      });
    } else {
      // If a Datagrid component is using virtualized data, it's possible that the last cell
      // has not yet been rendered. In this case, we simply need to wait until the scrollable
      // container has scrolled to the bottom/right most position, then we can dispatch the
      // update active cell id action
      setTimeout(() => {
        dispatch({
          type: 'UPDATE_ACTIVE_CELL_ID',
          payload: lastCellDataId,
        });
      }, 250);
    }
  }
  // Shift + Tab
  // This should remove the active grid state
  if (
    (keysPressedList.includes('ShiftLeft') ||
      keysPressedList.includes('ShiftRight')) &&
    keysPressedList.includes('Tab')
  ) {
    dispatch({ type: 'REMOVE_GRID_ACTIVE_FOCUS', payload: activeCellId });
    const tableElement = document.querySelector(`#${instance.tableId}`);
    const datagridFocusableElements = getFocusableElements(tableElement);
    const indexOfTable = datagridFocusableElements.findIndex(
      (item) => item instanceof HTMLTableElement
    );
    if (indexOfTable && Number.isFinite(indexOfTable)) {
      datagridFocusableElements[indexOfTable]?.focus();
    }
  }
};
