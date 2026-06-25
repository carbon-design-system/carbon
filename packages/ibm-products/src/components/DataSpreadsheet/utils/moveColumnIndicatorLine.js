/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { px } from '@carbon/layout';
import { pkg } from '../../../settings';

export const moveColumnIndicatorLine = ({
  blockClass = `${pkg.prefix}--data-spreadsheet`,
  clonedSelectionElement,
  ref,
  spreadsheetCoords,
  leftScrollAmount,
}) => {
  const closestCell = event.target.closest(
    `.${blockClass}--interactive-cell-element`
  );
  const newColumnIndex = closestCell?.getAttribute('data-column-index');
  const originalColumnIndex = clonedSelectionElement?.getAttribute(
    'data-column-index-original'
  );
  const closestCellCoords = closestCell.getBoundingClientRect();
  const indicatorLineElement = ref.current.querySelector(
    `.${blockClass}__reorder-indicator-line`
  );
  const matcherId = clonedSelectionElement?.getAttribute('data-matcher-id');
  const selectionAreaOrigin = ref.current.querySelector(
    `[data-matcher-id="${matcherId}"]`
  );

  const listContainer = ref.current.querySelector(
    `.${blockClass}__list--container`
  );

  const scrollSpeed = 10; // Scrolling speed
  const leftEdgeThreshold = 120; // Distance from the left edge to start scrolling
  const rightEdgeThreshold = 100; // Distance from the right edge to start scrolling

  const { clientX } = event;
  const { left, right } = listContainer.getBoundingClientRect();

  // Is near left side of viewport
  if (clientX < leftEdgeThreshold) {
    window.scrollBy(-scrollSpeed, 0);
  }

  // Is near right side of viewport
  if (clientX > window.innerWidth - rightEdgeThreshold) {
    window.scrollBy(scrollSpeed, 0);
  }

  // Is near left edge of table
  if (clientX > left && clientX < left + leftEdgeThreshold) {
    listContainer.scrollBy(-scrollSpeed, 0);
  }

  // Is near right edge of table
  if (clientX < right && clientX > right - rightEdgeThreshold) {
    listContainer.scrollBy(scrollSpeed, 0);
  }

  if (Number(newColumnIndex) > Number(originalColumnIndex)) {
    const leftPosition =
      closestCellCoords.left -
      spreadsheetCoords.left +
      closestCell.offsetWidth -
      2 +
      leftScrollAmount;
    indicatorLineElement.style.left = px(leftPosition);
  }
  if (Number(newColumnIndex) < Number(originalColumnIndex)) {
    const leftPosition =
      closestCellCoords.left - spreadsheetCoords.left + leftScrollAmount;
    indicatorLineElement.style.left = px(leftPosition);
  }

  if (Number(newColumnIndex) === Number(originalColumnIndex)) {
    indicatorLineElement.style.left = selectionAreaOrigin.style.left;
  }
};
