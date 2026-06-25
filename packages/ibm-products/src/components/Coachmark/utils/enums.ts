/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Reserved for future expansion, i.e. "RING".
 */
export enum BEACON_KIND {
  DEFAULT = 'default',
}

/**
 * Describes the style and behavior of a Coachmark.
 * @param TOOLTIP includes a caret pointing to the animated beacon.
 * @param FLOATING includes a drag handle across the top.
 * @param FIXED is fixed to the bottom-right of the viewport.
 * @param STACKED is fixed to the bottom-right of the viewport, includes links to show more, stackable Coachmarks if included.
 */
export enum COACHMARK_OVERLAY_KIND {
  TOOLTIP = 'tooltip',
  FLOATING = 'floating',
  FIXED = 'fixed',
  STACKED = 'stacked',
}
/**
 * Where to render the Coachmark relative to its target.
 * Applies only to Floating and Tooltip Coachmarks.
 */
export enum COACHMARK_ALIGNMENT {
  BOTTOM = 'bottom',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  LEFT = 'left',
  LEFT_TOP = 'left-top',
  LEFT_BOTTOM = 'left-bottom',
  RIGHT = 'right',
  RIGHT_TOP = 'right-top',
  RIGHT_BOTTOM = 'right-bottom',
  TOP = 'top',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
}
