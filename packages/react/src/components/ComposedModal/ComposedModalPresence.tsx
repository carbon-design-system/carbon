/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import {
  usePresenceContext,
  type PresenceContext,
} from '../../internal/usePresenceContext';

export interface ComposedModalPresenceProps {
  /**
   * Specify whether the Modal is currently open
   */
  open: boolean;

  /**
   * Internal property for backwards compatibility. Specify whether the Modal should opt in to presence mode.
   */
  _autoEnablePresence?: boolean;

  /**
   * Internal property to predefine the presence context's id for exclusivity.
   */
  _presenceId?: string;
}

export const ComposedModalPresence = ({
  open,
  _presenceId: presenceId,
  _autoEnablePresence: autoEnablePresence = true,
  children,
}: PropsWithChildren<ComposedModalPresenceProps>) => {
  const [isPresent, context] = usePresenceContext(open, presenceId);

  const presenceContextValue = useMemo(
    () => ({
      autoEnablePresence,
      ...context,
    }),
    [autoEnablePresence, context]
  );

  if (!isPresent) return null;

  return (
    <ComposedModalPresenceContext value={presenceContextValue}>
      {children}
    </ComposedModalPresenceContext>
  );
};

interface ComposedModalPresenceContextProps extends PresenceContext {
  autoEnablePresence: boolean;
}

export const ComposedModalPresenceContext = createContext<
  ComposedModalPresenceContextProps | undefined
>(undefined);

/**
 * Handles occurrences where only a single composed modal must consume a context.
 */
export const useExclusiveComposedModalPresenceContext = (id: string) => {
  const ctx = useContext(ComposedModalPresenceContext);
  return ctx?.isPresenceExclusive(id) ? ctx : undefined;
};
