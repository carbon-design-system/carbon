/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from 'react';
import { usePresence } from '../../internal/usePresence';

export interface ModalPresenceProps {
  /**
   * Specify whether the Modal is currently open
   */
  open: boolean;

  /**
   * Internal property for backwards compatibility. Specify whether the Modal should opt in to presence mode.
   */
  autoEnablePresence?: boolean;
}

export const ModalPresence = ({
  open,
  autoEnablePresence = true,
  children,
}: PropsWithChildren<ModalPresenceProps>) => {
  const registrationStateRef = useRef<'occupied' | 'free'>('free');
  const presenceRef = useRef<HTMLDivElement | null>(null);

  const { isPresent, isExiting } = usePresence(presenceRef, open);

  if (registrationStateRef.current === 'occupied' && !presenceRef.current) {
    registrationStateRef.current = 'free';
  }

  const _register = useCallback(() => {
    if (registrationStateRef.current === 'occupied') return false;
    registrationStateRef.current = 'occupied';
    return true;
  }, []);

  const contextValue = useMemo(
    () => ({ _register, presenceRef, autoEnablePresence, isExiting }),
    [autoEnablePresence, isExiting]
  );

  if (!isPresent) return null;

  return (
    <ModalPresenceContext.Provider value={contextValue}>
      {children}
    </ModalPresenceContext.Provider>
  );
};

/**
 * Registers the modal with a presence context, following the first come first serves principal.
 * Prevents sibling modals potentially reading from the same context.
 * This applies to combinations of multiple modals, where the first sibling is opening the second modal.
 */
export const useRegisterWithModalPresenceContext = () => {
  const presenceContext = useContext(ModalPresenceContext);

  const isRegistered = useRef(presenceContext?._register());

  if (!isRegistered.current) {
    isRegistered.current = presenceContext?._register();
  }

  return Boolean(isRegistered.current);
};

interface ModalPresenceContextProps {
  presenceRef: RefObject<HTMLDivElement | null>;
  autoEnablePresence: boolean;
  isExiting: boolean;
  _register: () => boolean;
}

export const ModalPresenceContext = createContext<
  ModalPresenceContextProps | undefined
>(undefined);
