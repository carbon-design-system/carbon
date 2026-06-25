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
import { type PresenceContext, usePresenceContext } from './usePresenceContext';

export interface TearsheetPresenceProps {
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

export const TearsheetPresence = ({
  open,
  _presenceId: presenceId,
  _autoEnablePresence: autoEnablePresence = true,
  children,
}: PropsWithChildren<TearsheetPresenceProps>) => {
  const [isPresent, context] = usePresenceContext(open, presenceId);

  const contextValue = useMemo(
    () => ({
      autoEnablePresence,
      ...context,
    }),
    [autoEnablePresence, context]
  );

  if (!isPresent) {
    return null;
  }

  return (
    <TearsheetPresenceContext.Provider value={contextValue}>
      {children}
    </TearsheetPresenceContext.Provider>
  );
};

interface ModalPresenceContextProps extends PresenceContext {
  autoEnablePresence: boolean;
}

export const TearsheetPresenceContext = createContext<
  ModalPresenceContextProps | undefined
>(undefined);

/**
 * Handles occurrences where only a single modal must consume a context.
 */
export const useExclusiveTearsheetPresenceContext = (id: string) => {
  const ctx = useContext(TearsheetPresenceContext);
  return ctx?.isPresenceExclusive(id) ? ctx : undefined;
};

type WithModalPresenceProps = Pick<TearsheetPresenceProps, 'open'>;

/**
 * Higher-order function that wraps a component with ModalPresence
 */
export const withTearsheetPresence = <TProps extends object>(
  Component: ComponentType<TProps>
): FC<TProps & WithModalPresenceProps> => {
  const WithModalPresence: FC<TProps & WithModalPresenceProps> = (props) => {
    const { open, ...componentProps } = props;

    return (
      <TearsheetPresence open={open}>
        <Component {...(componentProps as TProps)} />
      </TearsheetPresence>
    );
  };

  WithModalPresence.displayName = `withModalPresence(${Component.displayName || Component.name || 'Component'})`;

  return WithModalPresence;
};
