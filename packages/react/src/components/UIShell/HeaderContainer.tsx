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

export interface HeaderContainerRenderProps {
  isSideNavExpanded: boolean;
  onClickSideNavExpand: () => void;
}

export type HeaderContainerProps<P extends HeaderContainerRenderProps> = {
  isSideNavExpanded?: boolean;
  render: React.ComponentType<P>;
} & { [K in keyof Omit<P, keyof HeaderContainerRenderProps>]: P[K] };

export default function HeaderContainer<P extends HeaderContainerRenderProps>({
  render: Children,
  isSideNavExpanded = false,
  ...rest
}: HeaderContainerProps<P>) {
  //state for expandable sidenav
  const [isSideNavExpandedState, setIsSideNavExpandedState] =
    useState(isSideNavExpanded);

  useWindowEvent('keydown', (event) => {
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
      {...(rest as any)}
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
   * A function or a component that is invoked with `isSideNavExpanded` and `onClickSideNavExpand`.
   * The function or component can then use those properties to within the components it
   * returns, such as with the HeaderMenuButton and SideNav components. Additional props will also be passed
   * into this component for convenience.
   */
  render: PropTypes.elementType.isRequired,
};
