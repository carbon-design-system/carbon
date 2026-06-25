//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState, useCallback, createContext, ReactNode } from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { pkg } from '../../../settings';

export interface WebTerminalContextType {
  open?: boolean;
  openWebTerminal?: () => void;
  closeWebTerminal?: () => void;
  toggleWebTerminal?: () => void;
}

export const WebTerminalContext = createContext<WebTerminalContextType>({});

const componentName = 'WebTerminalProvider';

interface WebTerminalProviderProps {
  /**
   * Provide your own terminal component as children to show up in the web terminal
   */
  children: ReactNode | ReactNode[];
}

export const WebTerminalProvider: React.FC<WebTerminalProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  const openWebTerminal = useCallback(() => setOpen(true), []);
  const closeWebTerminal = useCallback(() => setOpen(false), []);
  const toggleWebTerminal = useCallback(() => setOpen(!open), [open]);

  return (
    <WebTerminalContext.Provider
      value={{ open, openWebTerminal, closeWebTerminal, toggleWebTerminal }}
    >
      {children}
    </WebTerminalContext.Provider>
  );
};

WebTerminalProvider.propTypes = {
  /**
   * Provide your own terminal component as children to show up in the web terminal
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

// Custom hook that exposes the provided value from context
export const useWebTerminal = () => {
  return useContext(WebTerminalContext);
};
