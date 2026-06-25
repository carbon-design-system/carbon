/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deepCloneObject } from '../../../global/js/utils/deepCloneObject';

export const checkSelectedHeaderCell = (
  headerIndex,
  selectionAreas,
  headerType,
  items
) => {
  const areasCloned = deepCloneObject(selectionAreas);
  const isSelectedHeader = areasCloned.some((area) => {
    const oppositeType = headerType === 'column' ? 'row' : 'column';
    const minOppositeSelection = Math.min(
      area?.point1?.[oppositeType],
      area?.point2?.[oppositeType]
    );
    const maxOppositeSelection = Math.max(
      area?.point1?.[oppositeType],
      area?.point2?.[oppositeType]
    );

    const minSelection = Math.min(
      area?.point1?.[headerType],
      area?.point2?.[headerType]
    );
    const maxSelection = Math.max(
      area?.point1?.[headerType],
      area?.point2?.[headerType]
    );
    const isTrueSelectedState =
      items?.length - 1 === maxOppositeSelection && minOppositeSelection === 0;
    // console.log({minSelection, maxSelection});
    // Iterate over all columns included in the selection area
    for (let i = minSelection; i <= maxSelection; i++) {
      if (headerIndex === i && isTrueSelectedState) {
        return true;
      }
    }
    return false;
  });
  return isSelectedHeader;
};
