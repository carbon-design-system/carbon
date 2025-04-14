/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';

type TriggerType =
  | Element
  | Document
  | Window
  | React.RefObject<Element | null>;

export interface ContextMenuProps {
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
}

/**
 * @param {TriggerType} [trigger=document] The element or ref which should trigger the Menu on right-click
 * @returns {ContextMenuProps} Props object to pass onto Menu component
 */
function useContextMenu(trigger: TriggerType = document): ContextMenuProps {
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  function openContextMenu(e: MouseEvent): void {
    e.preventDefault();

    const { clientX: x, clientY: y } = e;

    setPosition([x, y]);
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

  useEffect(() => {
    const el =
      trigger instanceof Element ||
      trigger instanceof Document ||
      trigger instanceof Window
        ? trigger
        : trigger.current;

    if (el) {
      const eventListener = (e: Event) => openContextMenu(e as MouseEvent);

      el.addEventListener('contextmenu', eventListener);

      return () => {
        el.removeEventListener('contextmenu', eventListener);
      };
    }
  }, [trigger]);

  return {
    open,
    x: position[0],
    y: position[1],
    onClose,
  };
}

export default useContextMenu;
