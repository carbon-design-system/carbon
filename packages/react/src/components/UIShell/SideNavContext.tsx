/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createContext, type ReactNode } from 'react';

interface SideNavContextData {
  isRail?: boolean | undefined;
  isSideNavExpanded?: boolean | undefined;
}

export const SideNavContext = createContext<SideNavContextData>({});

interface SideNavContextProviderProps extends SideNavContextData {
  children: ReactNode;
}

export const SideNavContextProvider = ({
  children,
  isRail,
  isSideNavExpanded,
}: SideNavContextProviderProps) => {
  return (
    <SideNavContext.Provider value={{ isRail, isSideNavExpanded }}>
      {children}
    </SideNavContext.Provider>
  );
};
