/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pkg } from '../../../../../settings';
import { handleMultipleKeys } from './handleMultipleKeys';
import { getCellIdAsObject } from './InlineEditContext/getCellIdAsObject';

const blockClass = `${pkg.prefix}--datagrid`;

export const handleGridKeyPress = ({
  event,
  dispatch,
  state,
  instance,
  keysPressedList,
  usingMac,
  ref,
  carbonPrefix,
}) => {
  const { key } = event;
  const { gridActive, activeCellId, editId } = state;

  const focusedCell = document.querySelector(
    `#${instance.tableId} .${blockClass}__table-with-inline-edit [data-cell-id="${activeCellId}"]`
  );

  // If we reach this it means that tab was pressed while in
  // edit mode which should not remove the focus from the grid
  if (activeCellId === editId && key === 'Tab') {
    // Attempting to exit date picker
    if (focusedCell.getAttribute('data-inline-type') === 'date') {
      dispatch({ type: 'EXIT_EDIT_MODE', payload: activeCellId });
      const inlineEditArea = document.querySelector(
        `#${instance.tableId} .${blockClass}__table-with-inline-edit`
      );
      inlineEditArea.focus();
    }
    event.preventDefault();
    return;
  }

  if (activeCellId === editId && key === 'Escape') {
    if (focusedCell.getAttribute('data-inline-type') === 'date') {
      dispatch({ type: 'EXIT_EDIT_MODE', payload: activeCellId });
      event.preventDefault();
      const inlineEditArea = document.querySelector(
        `#${instance.tableId} .${blockClass}__table-with-inline-edit`
      );
      inlineEditArea.focus();
      return;
    }
  }

  // Checks if the dropdown menu is open
  const dropdownIsActive = () => {
    const selectedDropdown = ref?.current.querySelector(`
      #${instance.tableId} .${blockClass}__table-with-inline-edit [data-cell-id="${activeCellId}"] button[role='combobox']
    `);
    if (selectedDropdown) {
      // Prevents arrow keys from scrolling any other content when dropdown menu is open
      event.preventDefault();
      return true;
    }
    return false;
  };

  // Checks if the date picker is open
  const datePickerIsActive = () => {
    const focusedCalendarElement = document.querySelector(
      `.${carbonPrefix}--date-picker__input.flatpickr-input.active`
    );
    if (
      focusedCalendarElement ||
      document.activeElement.classList.contains(`flatpickr-day`)
    ) {
      return true;
    }
    return false;
  };

  // Stop grid key listener when in edit mode
  const isEditing =
    (focusedCell.getAttribute('data-inline-type') !== 'checkbox' &&
      document.activeElement.id === activeCellId &&
      document.activeElement.id === editId) ||
    dropdownIsActive() ||
    datePickerIsActive();
  if (isEditing || !gridActive) {
    return;
  }
  // Command keys need to be returned as there is default browser behavior with these keys
  if (key === 'Meta' || key === 'Control') {
    return;
  }
  // Prevent arrow keys, home key, and end key from scrolling the page when the data spreadsheet container has focus
  if (
    ['End', 'Home', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].indexOf(
      key
    ) > -1 &&
    !isEditing &&
    keysPressedList.length < 2
  ) {
    event.preventDefault();
  }
  const isDisabledCell =
    focusedCell.getAttribute('data-disabled') === 'false' ? false : true;
  const isEditableCell = !event.target.classList.contains(
    `${blockClass}__inline-edit-button--non-edit`
  );
  const sharedUpdateParams = {
    oldId: activeCellId,
    instance,
  };
  if (keysPressedList.length > 1) {
    handleMultipleKeys({
      usingMac,
      keysPressedList,
      dispatch,
      activeCellId,
      instance,
    });
  }
  if (keysPressedList.length < 2) {
    switch (key) {
      case 'Tab': {
        if (!editId) {
          dispatch({ type: 'REMOVE_GRID_ACTIVE_FOCUS', payload: activeCellId });
        }
        break;
      }
      case 'ArrowRight': {
        dispatch({
          type: 'UPDATE_ACTIVE_CELL_ID',
          payload: {
            direction: 'right',
            ...sharedUpdateParams,
          },
        });
        break;
      }
      case 'ArrowLeft': {
        dispatch({
          type: 'UPDATE_ACTIVE_CELL_ID',
          payload: {
            direction: 'left',
            ...sharedUpdateParams,
          },
        });
        break;
      }
      case 'ArrowUp': {
        dispatch({
          type: 'UPDATE_ACTIVE_CELL_ID',
          payload: {
            direction: 'up',
            ...sharedUpdateParams,
          },
        });
        break;
      }
      case 'ArrowDown': {
        dispatch({
          type: 'UPDATE_ACTIVE_CELL_ID',
          payload: {
            direction: 'down',
            ...sharedUpdateParams,
          },
        });
        break;
      }
      // Move active cell to first column in current row
      case 'Home': {
        const activeCellObject = getCellIdAsObject(activeCellId);
        const newActiveCellCoords = {
          ...activeCellObject,
          column: 0,
        };
        const newActiveCellId = `column-${newActiveCellCoords.column}-row-${newActiveCellCoords.row}`;
        const scrollElement = document.querySelector(
          `#${instance.tableId} .${pkg.prefix}--datagrid__table-container`
        );
        // Scroll table container to the furthest left position
        scrollElement.scrollLeft = 0;
        dispatch({
          type: 'UPDATE_ACTIVE_CELL_ID',
          payload: newActiveCellId,
        });
        break;
      }
      // Move active cell to last column in current row
      case 'End': {
        const activeCellObject = getCellIdAsObject(activeCellId);
        const totalVisibleColumns = instance.visibleColumns.filter(
          (item) => item.id !== 'spacer'
        );
        const newActiveCellCoords = {
          ...activeCellObject,
          column: totalVisibleColumns.length - 1,
        };
        const newActiveCellId = `column-${newActiveCellCoords.column}-row-${newActiveCellCoords.row}`;
        const scrollElement = document.querySelector(
          `#${instance.tableId} .${pkg.prefix}--datagrid__table-container`
        );
        // Scroll table container to the furthest right position
        scrollElement.scrollLeft = scrollElement.scrollWidth;
        dispatch({
          type: 'UPDATE_ACTIVE_CELL_ID',
          payload: newActiveCellId,
        });
        break;
      }
      case ' ':
      case 'F2':
      case 'Enter': {
        // Disabled cells are not allowed to go into edit mode
        if (isDisabledCell || !isEditableCell) {
          return;
        }
        // Only go into edit mode if there is no editId, meaning that we're not already in edit mode
        if (!editId) {
          const focusedType = focusedCell.getAttribute('data-inline-type');
          // Open dropdown immediately after entering edit mode for selection type
          if (focusedType === 'selection') {
            setTimeout(() => {
              const dropdownTrigger = focusedCell.querySelector('button');
              dropdownTrigger?.click();
            }, 1);
          }
          if (focusedType === 'checkbox') {
            setTimeout(() => {
              const checkboxTrigger = focusedCell.querySelector('input');
              checkboxTrigger?.click();
              checkboxTrigger?.focus();
            }, 1);
          }
          if (focusedType === 'date') {
            setTimeout(() => {
              const dateInputTrigger = focusedCell.querySelector('input');
              dateInputTrigger?.click();
              dateInputTrigger?.focus();
            }, 1);
          }
          dispatch({
            type: 'ENTER_EDIT_MODE',
            payload: {
              activeCellId,
              editId: activeCellId,
            },
          });
        }
      }
    }
  }
};
