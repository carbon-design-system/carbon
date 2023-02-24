/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The interface of floating menus containing the trigger button.
 */
interface BXFloatingMenuTrigger extends HTMLElement {
  /**
   * `true` if the menu should be open.
   */
  open: boolean;

  /**
   * The position of the trigger button.
   */
  triggerPosition: ClientRect;
}

// eslint-disable-next-line no-undef
export default BXFloatingMenuTrigger;
