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
  type ComponentType,
  type FC,
  type PropsWithChildren,
} from 'react';
import {
  usePresenceContext,
  type PresenceContext,
} from '../../internal/usePresenceContext';
import { useComposedModalState } from './useComposedModalState';

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
  // Since the modal could be used without an onClose callback, we need to be aware of the internal isOpen state
  const modalState = useComposedModalState(open);
  const [isOpen] = modalState;

  const [isPresent, context] = usePresenceContext(isOpen, presenceId);

  const presenceContextValue = useMemo(
    () => ({
      modalState,
      autoEnablePresence,
      ...context,
    }),
    [modalState, autoEnablePresence, context]
  );

  if (!isPresent) return null;

  return (
    <ComposedModalPresenceContext value={presenceContextValue}>
      {children}
    </ComposedModalPresenceContext>
  );
};

interface ComposedModalPresenceContextProps extends PresenceContext {
  modalState: ReturnType<typeof useComposedModalState>;
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

type WithComposedModalPresenceProps = Pick<ComposedModalPresenceProps, 'open'>;

/**
 * Higher-order function that wraps a component with ComposedModalPresence
 */
export const withComposedModalPresence = <TProps extends object>(
  Component: ComponentType<TProps>
): FC<TProps & WithComposedModalPresenceProps> => {
  const WithComposedModalPresence: FC<
    TProps & WithComposedModalPresenceProps
  > = (props) => {
    const { open, ...componentProps } = props;

    return (
      <ComposedModalPresence open={open}>
        <Component {...(componentProps as TProps)} />
      </ComposedModalPresence>
    );
  };

  WithComposedModalPresence.displayName = `withComposedModalPresence(${Component.displayName || Component.name || 'Component'})`;

  return WithComposedModalPresence;
};
