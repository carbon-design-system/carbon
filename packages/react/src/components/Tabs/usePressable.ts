/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState, type RefObject } from 'react';

type UsePressableState = { longPress: boolean };

type UsePressableOptions = {
  onPress?: (state: UsePressableState) => void;
  onPressIn?: () => void;
  onPressOut?: (state: UsePressableState) => void;
  onLongPress?: () => void;
  delayLongPressMs?: number;
};

export const usePressable = (
  ref: RefObject<HTMLElement | null>,
  {
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPressMs = 500,
  }: UsePressableOptions = {}
) => {
  const savedOnPress = useRef(onPress);
  const savedOnPressIn = useRef(onPressIn);
  const savedOnPressOut = useRef(onPressOut);
  const savedOnLongPress = useRef(onLongPress);
  const [pendingLongPress, setPendingLongPress] = useState(false);
  const [longPress, setLongPress] = useState(false);
  const state = useRef<UsePressableState>({ longPress: false });

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
    const element = ref.current;

    if (!element) return;

    // Fired when a pointer becomes active buttons state.
    const onPointerDown = (event: globalThis.PointerEvent) => {
      setPendingLongPress(true);
      savedOnPressIn.current?.();
      event.preventDefault();
    };

    // Fired when a pointer is no longer active buttons state.
    const onPointerUp = () => {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut.current?.(state.current);
    };

    // A browser fires this event if it concludes the pointer
    // will no longer be able to generate events (for example
    // the related device is deactivated).
    const onPointerCancel = () => {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut.current?.(state.current);
      state.current.longPress = false;
    };

    // Fired when a pointer is moved out of the hit test
    // boundaries of an element. For pen devices, this event
    // is fired when the stylus leaves the hover range
    // detectable by the digitizer.
    const onPointerLeave = () => {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut.current?.(state.current);
      state.current.longPress = false;
    };

    const onClick = () => {
      setLongPress(false);
      setPendingLongPress(false);
      savedOnPress.current?.(state.current);
      state.current.longPress = false;
    };

    // Certain devices treat long press events as context menu triggers
    const onContextMenu = (event: globalThis.MouseEvent) => {
      event.preventDefault();
    };

    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointerup', onPointerUp);
    element.addEventListener('pointercancel', onPointerCancel);
    element.addEventListener('pointerleave', onPointerLeave);
    element.addEventListener('click', onClick);
    element.addEventListener('contextmenu', onContextMenu);

    return () => {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerCancel);
      element.removeEventListener('pointerleave', onPointerLeave);
      element.removeEventListener('click', onClick);
      element.removeEventListener('contextmenu', onContextMenu);
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
};
