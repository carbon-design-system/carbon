/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';

export interface WebTerminalContextType {
  open: boolean;
  openWebTerminal: () => void;
  closeWebTerminal: () => void;
  toggleWebTerminal: () => void;
}

export const WebTerminalContext = createContext<WebTerminalContextType>({
  open: false,
  openWebTerminal: () => {},
  closeWebTerminal: () => {},
  toggleWebTerminal: () => {},
});

export interface WebTerminalProviderProps {
  children: ReactNode;
}

export const WebTerminalProvider = ({ children }: WebTerminalProviderProps) => {
  const [open, setOpen] = useState(false);

  const openWebTerminal = useCallback(() => setOpen(true), []);
  const closeWebTerminal = useCallback(() => setOpen(false), []);
  const toggleWebTerminal = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <WebTerminalContext.Provider
      value={{ open, openWebTerminal, closeWebTerminal, toggleWebTerminal }}
    >
      {children}
    </WebTerminalContext.Provider>
  );
};

export const useWebTerminal = () => useContext(WebTerminalContext);
