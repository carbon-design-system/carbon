/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Theme } from '../../Theme';
import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent,
} from '../../UIShell';
import { UserAvatar } from '@carbon/icons-react';

// eslint-disable-next-line react/prop-types
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
                isPersistent={false}>
                <SideNavItems>
                  <HeaderSideNavItems>
                    <HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
              <HeaderGlobalBar style={{ marginRight: '1rem' }}>
                <HeaderGlobalAction
                  aria-label="User Avatar"
                  tooltipAlignment="end">
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
