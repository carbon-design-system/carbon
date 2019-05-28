/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

const { prefix } = settings;

export const HandleMenuButtonClickContext = React.createContext();

const Header = ({
  className: customClassName,
  children,
  isSideNavExpanded,
  ...rest
}) => {
  const className = cx(`${prefix}--header`, customClassName);

  const [isSideNavExpandedState, setIsSideNavExpandedState] = useState(
    isSideNavExpanded
  );

  const handleHeaderMenuButtonClick = () => {
    const newSideNavExpandedState = !isSideNavExpandedState;
    setIsSideNavExpandedState(newSideNavExpandedState);
    console.log('new state:', newSideNavExpandedState);
    return newSideNavExpandedState;
  };

  const childrenProps = {
    function: handleHeaderMenuButtonClick,
    state: isSideNavExpandedState,
  };

  return (
    <header {...rest} className={className} role="banner">
      <HandleMenuButtonClickContext.Provider value={childrenProps}>
        {children}
      </HandleMenuButtonClickContext.Provider>
    </header>
  );
};

Header.propTypes = {
  /**
   * Required props for the accessibility label of the header
   */
  ...AriaLabelPropType,

  /**
   * Optionally provide a custom class name that is applied to the underlying <header>
   */
  className: PropTypes.string,
  /**
   * Optionally provide a custom class name that is applied to the underlying <header>
   */
  isSideNavExpanded: PropTypes.bool,
};

Header.defaultProps = {
  isSideNavExpanded: false,
};

export default Header;
