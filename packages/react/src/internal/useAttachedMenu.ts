/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MouseEventHandler, useState } from 'react';

/**
 * Array of two numbers either representing [left, right] or [top, bottom].
 */
type TwoCoordinates = [number, number];

export interface UseAttachedMenuReturn {
  /**
   * Whether the menu is open or not.
   */
  open: boolean;

  /**
   * The x position of the menu.
   */
  x: TwoCoordinates;

  /**
   * The y position of the menu.
   */
  y: TwoCoordinates;

  /**
   * A function to be called when the trigger element receives a click event.
   */
  handleClick: () => void;

  /**
   * A function to be called when the trigger element receives a mousedown event.
   */
  handleMousedown: MouseEventHandler;

  /**
   * A function to be called when the menu emits onClose.
   */
  handleClose: () => void;
}

/**
 * This hook contains common code to be used when a menu should be visually attached to an anchor based on a click event.
 *
 * @param {Element|object} anchor The element or ref the menu should visually be attached to.
 * @returns {useAttachedMenuReturn}
 */
export function useAttachedMenu(anchor): UseAttachedMenuReturn {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<TwoCoordinates[]>([
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
