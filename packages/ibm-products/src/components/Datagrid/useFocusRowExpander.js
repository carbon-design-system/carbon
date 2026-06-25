/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react';

// Focuses the row expander after a nested/expandable row state change.
// We have to add this workaround because react-table is re-rendering the entire row
// which removes the focus from the expander and interrupts the keyboard navigation
// flow.
export const useFocusRowExpander = ({
  instance,
  lastExpandedRowIndex = 0,
  blockClass,
  activeElement,
}) => {
  useEffect(() => {
    // We need to return at this point so that the focus is not stolen from
    // other interactive elements in the Datagrid
    if (!activeElement.classList.contains(`${blockClass}__row-expander`)) {
      return;
    }
    const tableId = instance?.tableId;
    const rowElements = document.querySelectorAll(`#${tableId} tbody tr`);
    const rowElementsArray = Array.from(rowElements);
    const activeRow = rowElementsArray.filter((r) => {
      if (r.getAttribute('data-nested-row-id') === lastExpandedRowIndex) {
        return r;
      }
      return null;
    });
    if (activeRow.length) {
      const rowExpander = activeRow[0].querySelector(
        `.${blockClass}__row-expander`
      );
      rowExpander?.focus();
    }
  }, [
    instance?.tableId,
    instance?.expandedRows,
    lastExpandedRowIndex,
    blockClass,
    activeElement,
  ]);
};
