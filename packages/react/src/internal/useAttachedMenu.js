/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from 'react';

/**
 * @typedef {object} useAttachedMenuReturn
 * @property {boolean} open Whether the menu is open or not
 * @property {[number, number]} x The x position of the menu
 * @property {[number, number]} y The y position of the menu
 * @property {Function} handleClick A function to be called when the trigger element receives a click event
 * @property {Function} handleMousedown A function to be called when the trigger element recives a mousedown event
 * @property {Function} handleClose A function to be called when the menu emits onClose
 */

/**
 * This hook contains common code to be used when a menu should be visually attached to an anchor based on a click event.
 *
 * @param {Element|object} anchor The element or ref the menu should visually be attached to.
 * @returns {useAttachedMenuReturn}
 */
export function useAttachedMenu(anchor) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState([
    [-1, -1],
    [-1, -1],
  ]);

  function openMenu() {
    const anchorEl = anchor?.current || anchor;

    if (anchorEl) {
      const { left, top, right, bottom } = anchorEl.getBoundingClientRect();

      setPosition([
        [left, right],
        [top, bottom],
      ]);
    }

    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  function handleClick() {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleMousedown(e) {
    // prevent default for mousedown on trigger element to avoid
    // the "blur" event from firing on the menu as this would close
    // it and immediately re-open since "click" event is fired after
    // "blur" event.
    e.preventDefault();
  }

  return {
    open,
    x: position[0],
    y: position[1],
    handleClick,
    handleMousedown,
    handleClose: closeMenu,
  };
}
