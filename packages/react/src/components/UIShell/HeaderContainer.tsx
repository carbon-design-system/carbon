/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { keys, match } from '../../internal/keyboard';
import { useWindowEvent } from '../../internal/useEvent';

interface HeaderContainerRenderProps {
  isSideNavExpanded: boolean;
  onClickSideNavExpand: () => void;
}

interface HeaderContainerProps {
  isSideNavExpanded?: boolean;
  render: React.ComponentType<HeaderContainerRenderProps>;
}

export default function HeaderContainer({
  render: Children,
  isSideNavExpanded = false,
}: HeaderContainerProps) {
  //state for expandable sidenav
  const [isSideNavExpandedState, setIsSideNavExpandedState] =
    useState(isSideNavExpanded);

  useWindowEvent('keydown', (event: KeyboardEvent) => {
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
}

HeaderContainer.propTypes = {
  /**
   * Optionally provide a custom class name that is applied to the underlying <header>
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * A function or component that is passed an object parameter with two
   * properties: `isSideNavExpanded` and `onClickSideNavExpand`. The function or
   * component can then use those properties to within the components it
   * returns, such as with the HeaderMenuButton and SideNav components.
   */
  render: PropTypes.elementType.isRequired,
};
