/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { keys, match } from '../../internal/keyboard';
import { useEvent } from '../../internal/useEvent';

// eslint-disable-next-line react/prop-types
const HeaderContainer = ({ isSideNavExpanded, render: Children }) => {
  //state for expandable sidenav
  const [isSideNavExpandedState, setIsSideNavExpandedState] =
    useState(isSideNavExpanded);

  useEvent(window, 'keydown', (event) => {
    if (match(event, keys.Escape)) {
      setIsSideNavExpandedState(false);
    }
  });

  const handleHeaderMenuButtonClick = useCallback(() => {
    setIsSideNavExpandedState(
      (prevIsSideNavExpanded) => !prevIsSideNavExpanded
    );
  }, [setIsSideNavExpandedState]);

  return (
    <Children
      isSideNavExpanded={isSideNavExpandedState}
      onClickSideNavExpand={handleHeaderMenuButtonClick}
    />
  );
};

HeaderContainer.propTypes = {
  /**
   * Optionally provide a custom class name that is applied to the underlying <header>
   */
  isSideNavExpanded: PropTypes.bool,
};

HeaderContainer.defaultProps = {
  isSideNavExpanded: false,
};

export default HeaderContainer;
