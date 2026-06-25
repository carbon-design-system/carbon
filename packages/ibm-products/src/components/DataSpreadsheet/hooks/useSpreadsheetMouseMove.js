/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react';
import { px } from '@carbon/layout';
import { pkg } from '../../../settings';
import { moveColumnIndicatorLine } from '../utils/moveColumnIndicatorLine';

// Used specifically for reordering columns, will move the position of the
// cloned selection area to follow the position of the cursor
export const useSpreadsheetMouseMove = ({
  ref,
  blockClass = `${pkg.prefix}--data-spreadsheet`,
  headerCellHoldActive,
  defaultColumn,
}) => {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const clonedSelectionElement = ref.current.querySelector(
        `.${blockClass}__selection-area--element-cloned`
      );
      if (clonedSelectionElement) {
        ref.current.addEventListener('mousemove', handleMouseMove);
      }
      const spreadsheetCoords = ref.current.getBoundingClientRect();
      const listContainer = ref.current.querySelector(
        `.${blockClass}__list--container`
      );
      const scrollAmount = listContainer.scrollLeft;
      moveColumnIndicatorLine({
        clonedSelectionElement,
        ref,
        spreadsheetCoords,
        leftScrollAmount: scrollAmount,
      });
      const spreadsheetWrapperElement = ref.current;
      spreadsheetWrapperElement.getBoundingClientRect();
      const xPositionRelativeToSpreadsheet =
        event.clientX - spreadsheetCoords.left;
      const offsetXValue = clonedSelectionElement?.getAttribute(
        'data-clone-offset-x'
      );

      const totalSpreadsheetScrollingWidth = listContainer.scrollWidth;
      const clonedSelectionWidth = clonedSelectionElement.offsetWidth;
      const clonePlacement = Math.max(
        xPositionRelativeToSpreadsheet - offsetXValue,
        defaultColumn?.rowHeaderWidth
      );
      const leftPosition =
        totalSpreadsheetScrollingWidth - clonedSelectionWidth >= clonePlacement
          ? clonePlacement + scrollAmount
          : totalSpreadsheetScrollingWidth - clonedSelectionWidth;
      // Moves the position of the cloned selection area to follow mouse, and
      // add the amount horizontally scrolled
      if (leftPosition < spreadsheetCoords.right - 40) {
        clonedSelectionElement.style.left = px(leftPosition);
      }
    };
    if (headerCellHoldActive) {
      ref.current.addEventListener('mousemove', handleMouseMove);
    }

    const spreadsheetRef = ref.current;
    if (!headerCellHoldActive) {
      spreadsheetRef?.removeEventListener('mousemove', handleMouseMove);
    }
    return () => {
      spreadsheetRef?.removeEventListener('mousemove', handleMouseMove);
    };
  });
};
