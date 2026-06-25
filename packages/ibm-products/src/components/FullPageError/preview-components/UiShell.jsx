/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import { node } from 'prop-types';
import { Theme } from '@carbon/react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenuButton,
  HeaderMenuItem,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from '@carbon/react';
import { UserAvatar } from '@carbon/react/icons';

export const UiShell = ({ children }) => {
  return (
    <>
      <Theme theme="g100">
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label="IBM Product">
              <SkipToContent />
              <HeaderMenuButton
                aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
                onClick={onClickSideNavExpand}
                isCollapsible
                isActive={isSideNavExpanded}
              />
              <HeaderName href="/" prefix="IBM">
                Product
              </HeaderName>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}
              >
                <SideNavItems>
                  <HeaderSideNavItems>
                    {/* You can add more items here if needed */}
                    <HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
              <HeaderGlobalBar style={{ marginRight: '1rem' }}>
                <HeaderGlobalAction
                  aria-label="User Avatar"
                  tooltipAlignment="end"
                >
                  <UserAvatar size={20} />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>
          )}
        />
      </Theme>
      {children}
    </>
  );
};

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
UiShell.propTypes = {
  children: node,
};
