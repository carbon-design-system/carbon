/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, useContext } from 'react';
import { CardContextValue } from './Card.types';

/**
 * Context for sharing Card state with child components
 */
export const CardContext = createContext<CardContextValue | undefined>(
  undefined
);

/**
 * Hook to access Card context
 * @returns CardContextValue
 * @throws Error if used outside of Card component
 */
export const useCardContext = (): CardContextValue => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card subcomponents must be used within a Card component');
  }
  return context;
};
