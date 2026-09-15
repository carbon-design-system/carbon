/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  createContext,
  useCallback,
  useRef,
  useMemo,
  useState,
  type RefObject,
} from 'react';
import { usePresence } from './usePresence';

export interface PresenceContext {
  /**
   * The ref object the presence mode is mounted with
   */
  presenceRef: RefObject<HTMLDivElement | null>;

  /**
   * Indicates whether the ref object is currently exiting
   */
  isExiting: boolean;

  /**
   * Returns if the caller is exclusive to this presence context
   */
  isPresenceExclusive: (id: string) => boolean;

  /**
   * Registers a pending JS-driven exit animation (e.g. a motion surface)
   * that `getAnimations()` cannot observe. The presence exit does not finish
   * until the returned release function is called.
   */
  holdExit: () => () => void;
}

/**
 * Generic channel for presence providers (ModalPresence,
 * ComposedModalPresence). Lets presence-aware children — like MotionSurface —
 * register exit holds without depending on component-level context modules.
 */
export const PresenceHoldContext = createContext<PresenceContext | undefined>(
  undefined
);

/**
 * Returns if the presence node is present and the context value to be used by a presence context, e.g. ModalPresence.
 */
export const usePresenceContext = (
  open: boolean,
  initialPresenceId?: string
) => {
  const presenceIdRef = useRef<string | null>(initialPresenceId);
  const presenceRef = useRef<HTMLDivElement | null>(null);
  const prevPresenceRef = useRef<HTMLDivElement | null>(null);
  const [exitHoldCount, setExitHoldCount] = useState(0);

  // clean up the presence id, if not predefined and if the presence node was unmounted
  if (!initialPresenceId && prevPresenceRef.current && !presenceRef.current) {
    presenceIdRef.current = null;
  }

  prevPresenceRef.current = presenceRef.current;

  const { isPresent, isExiting } = usePresence(
    presenceRef,
    open,
    exitHoldCount
  );

  const isPresenceExclusive = useCallback((id: string | null) => {
    if (!id) return false;

    // return false if the presence context is occupied
    if (presenceIdRef.current && presenceIdRef.current !== id) return false;

    // otherwise occupy presence context and return true
    presenceIdRef.current = id;
    return true;
  }, []);

  const holdExit = useCallback(() => {
    setExitHoldCount((count) => count + 1);

    let released = false;
    return () => {
      if (released) return;
      released = true;
      setExitHoldCount((count) => count - 1);
    };
  }, []);

  const contextValue = useMemo<PresenceContext>(
    () => ({
      presenceRef,
      isPresenceExclusive,
      isExiting,
      holdExit,
    }),
    [presenceRef, isPresenceExclusive, isExiting, holdExit]
  );

  return [isPresent, contextValue] as const;
};
