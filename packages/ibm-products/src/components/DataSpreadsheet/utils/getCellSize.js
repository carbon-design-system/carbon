/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  baseFontSize,
  sizeXSmall as xs,
  sizeSmall as sm,
  sizeMedium as md,
  sizeLarge as lg,
} from '@carbon/layout';

const getSizeInPixels = (carbonSize) =>
  Number(carbonSize.replace('rem', '') * baseFontSize);

export const getCellSize = (cellSize) => {
  switch (cellSize) {
    case 'xs':
      return getSizeInPixels(xs);
    case 'sm':
      return getSizeInPixels(sm);
    case 'md':
      return getSizeInPixels(md);
    case 'lg':
      return getSizeInPixels(lg);
    default:
      return getSizeInPixels(sm);
  }
};
