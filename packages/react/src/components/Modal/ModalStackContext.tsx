/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';

interface ModalStackContextType {
  /**
   * Register a modal in the stack when it opens
   */
  register: (id: string) => void;

  /**
   * Unregister a modal from the stack when it closes
   */
  unregister: (id: string) => void;

  /**
   * Check if a modal is the topmost (most recently opened) modal
   */
  isTopmost: (id: string) => boolean;

  /**
   * Get the current stack for debugging
   */
  getStack?: () => string[];
}

const ModalStackContext = createContext<ModalStackContextType>({
  register: () => {},
  unregister: () => {},
  isTopmost: () => true,
});

interface ModalStackProviderProps {
  children: ReactNode;
}

/**
 * Provider component that manages the modal stack.
 * Should be placed at the root of your application.
 *
 * @example
 * ```tsx
 * <ModalStackProvider>
 *   <App />
 * </ModalStackProvider>
 * ```
 */
export function ModalStackProvider({ children }: ModalStackProviderProps) {
  // Use ref to avoid re-renders when stack changes
  const stackRef = useRef<string[]>([]);

  const register = useCallback((id: string) => {
    // Add modal to the end of the stack (becomes topmost)
    stackRef.current = [...stackRef.current, id];

    if (process.env.NODE_ENV === 'development') {
      if (stackRef.current.length > 10) {
        // eslint-disable-next-line no-console
        console.warn(
          `[Carbon Modal] Modal stack has ${stackRef.current.length} items. This may indicate a memory leak.`,
          stackRef.current
        );
      }
    }
  }, []);

  const unregister = useCallback((id: string) => {
    // Remove modal from stack
    stackRef.current = stackRef.current.filter((modalId) => modalId !== id);
  }, []);

  const isTopmost = useCallback((id: string) => {
    // Check if this modal is the last one in the stack
    const stack = stackRef.current;
    return stack.length > 0 && stack[stack.length - 1] === id;
  }, []);

  const getStack = useCallback(() => {
    return [...stackRef.current];
  }, []);

  const value = {
    register,
    unregister,
    isTopmost,
    ...(process.env.NODE_ENV === 'development' && { getStack }),
  };

  return (
    <ModalStackContext.Provider value={value}>
      {children}
    </ModalStackContext.Provider>
  );
}

/**
 * Hook to access the modal stack context.
 * Returns methods to register/unregister modals and check if a modal is topmost.
 *
 * @example
 * ```tsx
 * const { register, unregister, isTopmost } = useModalStack();
 * ```
 */
export function useModalStack() {
  const context = useContext(ModalStackContext);

  if (process.env.NODE_ENV === 'development') {
    if (!context) {
      // eslint-disable-next-line no-console
      console.warn(
        '[Carbon Modal] useModalStack must be used within a ModalStackProvider. ' +
          'Falling back to default behavior where each modal handles ESC independently.'
      );
    }
  }

  return context;
}

// Made with Bob
