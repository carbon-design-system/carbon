/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

interface HeaderContainerRenderProps {
  isSideNavExpanded?: boolean,
  onClickSideNavExpand?: () => void,
}

interface HeaderContainerProps {
  isSideNavExpanded?: boolean,
  render: (props: HeaderContainerRenderProps) => JSX.Element
}

export default function HeaderContainer({
  render: Children,
  isSideNavExpanded = false,
}: HeaderContainerProps) {
  //state for expandable sidenav
  const [isSideNavExpandedState, setIsSideNavExpandedState] =
    useState(isSideNavExpanded);

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
}

HeaderContainer.propTypes = {
  /**
   * Optionally provide a custom class name that is applied to the underlying <header>
   */
  isSideNavExpanded: PropTypes.bool,

  render: PropTypes.func,
};
