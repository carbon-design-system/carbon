/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

const HeaderContainer = ({
  isSideNavExpanded,
  render: Children,
  activeGlobalAction,
}) => {
  //state for expandable sidenav
  const [isSideNavExpandedState, setIsSideNavExpandedState] = useState(
    isSideNavExpanded
  );
  const [activeGlobalActionState, setActiveGlobalActionState] = useState(
    activeGlobalAction
  );

  const handleHeaderMenuButtonClick = useCallback(() => {
    setIsSideNavExpandedState(!isSideNavExpandedState);
  }, [isSideNavExpandedState, setIsSideNavExpandedState]);

  const handleChangeGlobalAction = globalAction => {
    setActiveGlobalActionState(globalAction);
  };

  return (
    <Children
      isSideNavExpanded={isSideNavExpandedState}
      onClickSideNavExpand={handleHeaderMenuButtonClick}
      activeGlobalAction={activeGlobalActionState}
      changeGlobalActionTo={handleChangeGlobalAction}
    />
  );
};

HeaderContainer.propTypes = {
  /**
   * Optionally provide initial state for expandable sidenav
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Optionally provide globalAction to be active initially
   */
  activeGlobalAction: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

HeaderContainer.defaultProps = {
  isSideNavExpanded: false,
};

export default HeaderContainer;
