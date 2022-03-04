/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState } from 'react';

export function usePressable(
  ref,
  { onPress, onPressIn, onPressOut, onLongPress, delayLongPressMs = 500 } = {}
) {
  const savedOnPress = useRef(onPress);
  const savedOnPressIn = useRef(onPressIn);
  const savedOnPressOut = useRef(onPressOut);
  const savedOnLongPress = useRef(onLongPress);
  const [pendingLongPress, setPendingLongPress] = useState(false);
  const [longPress, setLongPress] = useState(false);
  const state = useRef({
    longPress: false,
  });

  useEffect(() => {
    savedOnPress.current = onPress;
  }, [onPress]);

  useEffect(() => {
    savedOnPressIn.current = onPressIn;
  }, [onPressIn]);

  useEffect(() => {
    savedOnPressOut.current = onPressOut;
  }, [onPressOut]);

  useEffect(() => {
    savedOnLongPress.current = onLongPress;
  }, [onLongPress]);

  useEffect(() => {
    const { current: element } = ref;

    // Fired when a pointer becomes active buttons state.
    function onPointerDown() {
      setPendingLongPress(true);
      savedOnPressIn.current?.();
    }

    // Fired when a pointer is no longer active buttons state.
    function onPointerUp() {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut.current?.(state.current);
    }

    // A browser fires this event if it concludes the pointer
    // will no longer be able to generate events (for example
    // the related device is deactivated).
    function onPointerCancel() {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut.current?.();
      state.current.longPress = false;
    }

    // Fired when a pointer is moved out of the hit test
    // boundaries of an element. For pen devices, this event
    // is fired when the stylus leaves the hover range
    // detectable by the digitizer.
    function onPointerLeave() {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut.current?.();
      state.current.longPress = false;
    }

    function onClick() {
      setLongPress(false);
      setPendingLongPress(false);
      savedOnPress.current?.(state.current);
      state.current.longPress = false;
    }

    function onTouchStart(event) {
      // We prevent the default event on touchstart so that text selection is
      // disabled on iOS  Safari when interacting with a "pressable" element
      event.preventDefault();
    }

    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointerup', onPointerUp);
    element.addEventListener('pointercancel', onPointerCancel);
    element.addEventListener('pointerleave', onPointerLeave);
    element.addEventListener('click', onClick);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerCancel);
      element.removeEventListener('pointerleave', onPointerLeave);
      element.removeEventListener('click', onClick);
    };
  }, [ref]);

  useEffect(() => {
    if (pendingLongPress) {
      const timeoutId = setTimeout(() => {
        setPendingLongPress(false);
        setLongPress(true);
      }, delayLongPressMs);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [pendingLongPress, delayLongPressMs]);

  useEffect(() => {
    if (longPress) {
      state.current.longPress = true;
      return savedOnLongPress.current?.();
    }
  }, [longPress]);
}
