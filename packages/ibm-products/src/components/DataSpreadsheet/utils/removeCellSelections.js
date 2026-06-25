/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pkg } from '../../../settings';

// Removes the cell selection elements
export const removeCellSelections = ({
  matcher,
  spreadsheetRef,
  blockClass = `${pkg.prefix}--data-spreadsheet`,
}) => {
  if (matcher && typeof matcher === 'string') {
    const selectionToRemove = spreadsheetRef.current.querySelector(
      `[data-matcher-id="${matcher}"]`
    );
    if (selectionToRemove) {
      selectionToRemove.remove();
    }
  } else {
    const cellSelections = spreadsheetRef.current.querySelectorAll(
      `.${blockClass}__selection-area--element`
    );
    [...cellSelections].forEach((element) => element.remove());
  }
};
