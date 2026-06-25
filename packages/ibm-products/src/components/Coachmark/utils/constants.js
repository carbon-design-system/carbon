/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { COACHMARK_ALIGNMENT, COACHMARK_OVERLAY_KIND } from './enums';

/**
 * If the coachmark's target is a link, button, etc. (i.e. not a beacon),
 * this adjusts the coachmark's position based on the position and size of the target.
 * @param {object} coachmark target reference
 * @param {string} kind type of coachmark
 * @returns {object} {top:number, left:number}
 */

export const getOffsetTune = (coachmark, kind) => {
  // for future reference
  // const coachmarkTarget = {
  //   x: coachmark.targetOffset.x,
  //   y: coachmark.targetOffset.y,
  //   width: coachmark.targetRect.width,
  //   height: coachmark.targetRect.height,
  // };

  const { width, height } = coachmark.targetRect;
  const distanceOffset = 24; // see also _coachmark-overlay.scss > $distance-offset
  let top = 0;
  let left = 0;

  if (kind !== COACHMARK_OVERLAY_KIND.TOOLTIP) {
    switch (coachmark.align) {
      case COACHMARK_ALIGNMENT.TOP:
        left = width / 2;
        break;
      case COACHMARK_ALIGNMENT.TOP_LEFT:
        left = distanceOffset;
        break;
      case COACHMARK_ALIGNMENT.TOP_RIGHT:
        left = width - distanceOffset;
        break;
      case COACHMARK_ALIGNMENT.BOTTOM:
        top = height;
        left = width / 2;
        break;
      case COACHMARK_ALIGNMENT.BOTTOM_LEFT:
        top = height;
        left = distanceOffset;
        break;
      case COACHMARK_ALIGNMENT.BOTTOM_RIGHT:
        top = height;
        left = width - distanceOffset;
        break;
      case COACHMARK_ALIGNMENT.LEFT:
        top = height / 2;
        break;
      case COACHMARK_ALIGNMENT.LEFT_TOP:
        top = distanceOffset;
        break;
      case COACHMARK_ALIGNMENT.LEFT_BOTTOM:
        top = height - distanceOffset;
        break;
      case COACHMARK_ALIGNMENT.RIGHT:
        top = height / 2;
        left = width;
        break;
      case COACHMARK_ALIGNMENT.RIGHT_TOP:
        top = distanceOffset;
        left = width;
        break;
      case COACHMARK_ALIGNMENT.RIGHT_BOTTOM:
        top = height - distanceOffset;
        left = width;
        break;
    }
  }

  return { top, left };
};
