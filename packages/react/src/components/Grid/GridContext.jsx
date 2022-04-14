/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import * as React from 'react';

/**
 * Provides a grid context for communication the grid "mode" (flexbox or
 * css-grid) along with subgrid information.
 */
const GridSettingsContext = React.createContext({
  mode: 'flexbox',
  subgrid: false,
});

export function GridSettings({ children, mode, subgrid = false }) {
  const value = React.useMemo(() => {
    return {
      mode,
      subgrid,
    };
  }, [mode, subgrid]);
  return (
    <GridSettingsContext.Provider value={value}>
      {children}
    </GridSettingsContext.Provider>
  );
}

GridSettings.propTypes = {
  /**
   * Pass in components which will be rendered within the `GridSettings`
   * component
   */
  children: PropTypes.node,

  /**
   * Specify the grid mode for the GridContext
   */
  mode: PropTypes.oneOf(['flexbox', 'css-grid']).isRequired,

  /**
   * Specify whether subgrid should be enabled
   */
  subgrid: PropTypes.bool,
};

/**
 * Helper function for accessing the GridContext value
 */
export function useGridSettings() {
  return React.useContext(GridSettingsContext);
}
