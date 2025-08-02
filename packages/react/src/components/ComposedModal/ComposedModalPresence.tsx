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
import {
  ComposedModalState,
  useComposedModalState,
} from './useComposedModalState';

export interface ComposedModalPresenceProps {
  /**
   * Specify whether the Modal is currently open
   */
  open: boolean;

  /**
   * Internal property for backwards compatibility. Specify whether the Modal should opt in to presence mode.
   */
  autoEnablePresence?: boolean;
}

export const ComposedModalPresence = ({
  open,
  autoEnablePresence = true,
  children,
}: PropsWithChildren<ComposedModalPresenceProps>) => {
  const registrationStateRef = useRef<'occupied' | 'free'>('free');
  const presenceRef = useRef<HTMLDivElement | null>(null);

  const modalState = useComposedModalState(open);
  const { isPresent, isExiting } = usePresence(presenceRef, modalState.isOpen);

  if (registrationStateRef.current === 'occupied' && !presenceRef.current) {
    registrationStateRef.current = 'free';
  }

  const _register = useCallback(() => {
    if (registrationStateRef.current === 'occupied') return false;
    registrationStateRef.current = 'occupied';
    return true;
  }, []);

  const presenceContextValue = useMemo(
    () => ({
      modalState,
      presenceRef,
      autoEnablePresence,
      isExiting,
      _register,
    }),
    [modalState, autoEnablePresence, isExiting, _register]
  );

  if (!isPresent) return null;

  return (
    <ComposedModalPresenceContext value={presenceContextValue}>
      {children}
    </ComposedModalPresenceContext>
  );
};

/**
 * Registers the modal with a presence context, following the first come first serves principal.
 * Prevents sibling modals potentially reading from the same context.
 * This applies to combinations of multiple modals, where the first sibling is opening the second modal.
 */
export const useRegisterWithComposedModalPresenceContext = () => {
  const presenceContext = useContext(ComposedModalPresenceContext);

  const isRegistered = useRef(presenceContext?._register());

  if (!isRegistered.current) {
    isRegistered.current = presenceContext?._register();
  }

  return Boolean(isRegistered.current);
};

interface ComposedModalPresenceContextProps {
  modalState: ComposedModalState;
  presenceRef: RefObject<HTMLDivElement | null>;
  autoEnablePresence: boolean;
  isExiting: boolean;
  _register: () => boolean;
}

export const ComposedModalPresenceContext = createContext<
  ComposedModalPresenceContextProps | undefined
>(undefined);
