/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import * as React from 'react';

export type GridMode = 'flexbox' | 'css-grid';

export interface GridSettingContext {
  /**
   * The grid mode for the GridContext
   */
  mode: GridMode;

  /**
   * Specifies whether subgrid should be enabled
   */
  subgrid?: boolean;
}

/**
 * Provides a grid context for communication the grid "mode" (flexbox or
 * css-grid) along with subgrid information.
 */
const GridSettingsContext = React.createContext<GridSettingContext>({
  mode: 'flexbox',
  subgrid: false,
});

export interface GridSettingsProps {
  /**
   * Pass in components which will be rendered within the `GridSettings`
   * component
   */
  children?: React.ReactNode;

  /**
   * Specify the grid mode for the GridContext
   */
  mode: GridMode;

  /**
   * Specify whether subgrid should be enabled
   */
  subgrid?: boolean;
}

export const GridSettings: React.FC<GridSettingsProps> = ({
  children,
  mode,
  subgrid = false,
}) => {
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
};

const gridModes: GridMode[] = ['flexbox', 'css-grid'];

GridSettings.propTypes = {
  /**
   * Pass in components which will be rendered within the `GridSettings`
   * component
   */
  children: PropTypes.node,

  /**
   * Specify the grid mode for the GridContext
   */
  mode: PropTypes.oneOf(gridModes).isRequired,

  /**
   * Specify whether subgrid should be enabled
   */
  subgrid: PropTypes.bool,
};

/**
 * Helper function for accessing the GridContext value
 */
export const useGridSettings = () => {
  return React.useContext(GridSettingsContext);
};
