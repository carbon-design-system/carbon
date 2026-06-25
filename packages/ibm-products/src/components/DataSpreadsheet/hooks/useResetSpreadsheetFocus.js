/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react';
import { pkg } from '../../../settings';

export const useResetSpreadsheetFocus = ({
  blockClass = `${pkg.prefix}--data-spreadsheet`,
  focusedElement,
  removeActiveCell,
  setContainerHasFocus,
}) => {
  // Reset everything when spreadsheet loses focus
  useEffect(() => {
    if (
      !focusedElement.classList.contains(
        `${blockClass}--interactive-cell-element`
      )
    ) {
      setContainerHasFocus(false);
      removeActiveCell();
    }
    if (
      focusedElement.classList.contains(blockClass) ||
      focusedElement.classList.contains(
        `${blockClass}--interactive-cell-element`
      )
    ) {
      setContainerHasFocus(true);
    }
  }, [focusedElement, removeActiveCell, blockClass, setContainerHasFocus]);
};
