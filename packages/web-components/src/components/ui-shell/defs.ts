/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Collapse modes of side nav.
 */
export enum SIDE_NAV_COLLAPSE_MODE {
  /**
   * Fixed mode.
   * In this mode, side nav is non-collapsible.
   */
  FIXED = 'fixed',

  /**
   * Rail mode.
   * In this mode, side nav can be collapsed to a narrower width ("rail" look) with a toggle button.
   */
  RAIL = 'rail',

  /**
   * Responsive mode.
   * In this mode, side nav sticks in wider screen, and can be completely collapsed with a toggle button in narrower screen.
   */
  RESPONSIVE = 'responsive',
}

/**
 * The usage purpose of side nav.
 */
export enum SIDE_NAV_USAGE_MODE {
  /**
   * Regular usage.
   */
  REGULAR = '',

  /**
   * To represent header nav.
   * In this mode, side nav is hidden when header nav is shown, and side nav is shown then header nav is hidden.
   * This mode can be used only with `SIDE_NAV_COLLAPSE_MODE.REGULAR`.
   */
  HEADER_NAV = 'header-nav',
}
