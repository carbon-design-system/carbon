import { useEffect, useState } from 'react';

/**
 * @param {Element|Document|Window} [trigger=document] The element which should trigger the Menu on right-click
 * @returns {object} Props object to pass onto Menu component
 */
function useContextMenu(trigger = document) {
  const [open, setOpen] = useState(false);
  const [canBeClosed, setCanBeClosed] = useState(false);
  const [position, setPosition] = useState([0, 0]);

  function openContextMenu(e) {
    e.preventDefault();

    const { x, y } = e;

    setPosition([x, y]);
    setOpen(true);

    // Safari emits the click event when preventDefault was called on
    // the contextmenu event. This is registered by the ClickListener
    // component and would lead to immediate closing when a user is
    // triggering the menu with ctrl+click. To prevent this, we only
    // allow the menu to be closed after the click event was received.
    // Since other browsers don't emit this event, it's also reset with
    // a 50ms delay after mouseup event was called.

    document.addEventListener(
      'mouseup',
      () => {
        setTimeout(() => {
          setCanBeClosed(true);
        }, 50);
      },
      { once: true }
    );

    document.addEventListener(
      'click',
      () => {
        setCanBeClosed(true);
      },
      { once: true }
    );
  }

  function onClose() {
    setOpen(false);
  }

  useEffect(() => {
    if (
      (trigger && trigger instanceof Element) ||
      trigger instanceof Document ||
      trigger instanceof Window
    ) {
      trigger.addEventListener('contextmenu', openContextMenu);

      return () => {
        trigger.removeEventListener('contextmenu', openContextMenu);
      };
    }
  }, [trigger]);

  return {
    open,
    x: position[0],
    y: position[1],
    autoclose: canBeClosed,
    onClose,
  };
}

export default useContextMenu;
