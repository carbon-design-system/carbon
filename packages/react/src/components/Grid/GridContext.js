/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, useContext, useMemo } from 'react';

/**
 * Provides a grid context for communication the grid "mode" (flexbox or
 * css-grid) along with subgrid information.
 */
export const GridContext = createContext({
  mode: 'flexbox',
  subgrid: false,
});

export function GridContext({ children, mode, subgrid }) {
  const value = useMemo(() => {
    return {
      mode,
      subgrid,
    };
  }, [mode, subgrid]);
  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
}

/**
 * Helper function for accessing the GridContext value
 */
export function useGrid() {
  return useContext(GridContext);
}
