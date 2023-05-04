/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

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
   * A function that is passed two parameters, `isSideNavExpanded`, and
   * `onClickSideNavExpand`, which can then be used the returned components. For
   * example:
   * ```TSX
   * <HeaderContainer render={
   *  ({ isSideNavExpanded, onClickSideNavExpand }) =>
   *    <Theme theme="g100">
   *      <Header aria-label="Navigation">
   *        <SkipToContent />
   *        <HeaderMenuButton
   *          aria-label="Open menu"
   *          onClick={onClickSideNavExpand}
   *          isActive={isSideNavExpanded}
   *        />
   *        <HeaderName href="/" prefix="IBM">Some App Name</HeaderName>
   *        <HeaderNavigation aria-label="Some label">
   *          <HeaderMenuItem href="/some-path">Some Label</HeaderMenuItem>
   *        </HeaderNavigation>
   *      </Header>
   *      <SideNav
   *        aria-label="Side navigation"
   *        expanded={isSideNavExpanded}
   *        isPersistent={false}>
   *        <HeaderSideNavItems>
   *          <HeaderMenuItem href="/some-path">Some label</HeaderMenuItem>
   *        </HeaderSideNavItems>
   *      </SideNav>
   *    </Theme>
   *}/>
   * ```
   */
  render: PropTypes.elementType.isRequired,
};
