/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useRef, useMemo, type RefObject } from 'react';
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
}

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

  // clean up the presence id, if not predefined and if the presence node was unmounted
  if (!initialPresenceId && prevPresenceRef.current && !presenceRef.current) {
    presenceIdRef.current = null;
  }

  prevPresenceRef.current = presenceRef.current;

  const { isPresent, isExiting } = usePresence(presenceRef, open);

  const isPresenceExclusive = useCallback((id: string | null) => {
    if (!id) {
      return false;
    }

    // return false if the presence context is occupied
    if (presenceIdRef.current && presenceIdRef.current !== id) {
      return false;
    }

    // otherwise occupy presence context and return true
    presenceIdRef.current = id;
    return true;
  }, []);

  const contextValue = useMemo<PresenceContext>(
    () => ({
      presenceRef,
      isPresenceExclusive,
      isExiting,
    }),
    [presenceRef, isPresenceExclusive, isExiting]
  );

  return [isPresent, contextValue] as const;
};
