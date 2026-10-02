/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSHeader from './header';
import CDSHeaderGlobalAction from './header-global-action';
import CDSHeaderMenu from './header-menu';
import CDSHeaderMenuButton from './header-menu-button';
import CDSHeaderMenuItem from './header-menu-item';
import CDSHeaderName from './header-name';
import CDSHeaderNav from './header-nav';
import CDSHeaderNavItem from './header-nav-item';
import CDSHeaderPanel from './header-panel';
import CDSHeaderSideNavItems from './header-side-nav-items';
import CDSSideNav from './side-nav';
import CDSSideNavDivider from './side-nav-divider';
import CDSSideNavItems from './side-nav-items';
import CDSSideNavLink from './side-nav-link';
import CDSSideNavMenu from './side-nav-menu';
import CDSSideNavMenuItem from './side-nav-menu-item';
import CDSSwitcher from './switcher';
import CDSSwitcherDivider from './switcher-divider';
import CDSSwitcherItem from './switcher-item';

export {
  CDSHeader,
  CDSHeaderGlobalAction,
  CDSHeaderMenu,
  CDSHeaderMenuButton,
  CDSHeaderMenuItem,
  CDSHeaderName,
  CDSHeaderNav,
  CDSHeaderNavItem,
  CDSHeaderPanel,
  CDSHeaderSideNavItems,
  CDSSideNav,
  CDSSideNavDivider,
  CDSSideNavItems,
  CDSSideNavLink,
  CDSSideNavMenu,
  CDSSideNavMenuItem,
  CDSSwitcher,
  CDSSwitcherDivider,
  CDSSwitcherItem,
};

defineCustomElement(CDSHeader);
defineCustomElement(CDSHeaderGlobalAction);
defineCustomElement(CDSHeaderMenu);
defineCustomElement(CDSHeaderMenuButton);
defineCustomElement(CDSHeaderMenuItem);
defineCustomElement(CDSHeaderName);
defineCustomElement(CDSHeaderNav);
defineCustomElement(CDSHeaderNavItem);
defineCustomElement(CDSHeaderPanel);
defineCustomElement(CDSHeaderSideNavItems);
defineCustomElement(CDSSideNav);
defineCustomElement(CDSSideNavDivider);
defineCustomElement(CDSSideNavItems);
defineCustomElement(CDSSideNavLink);
defineCustomElement(CDSSideNavMenu);
defineCustomElement(CDSSideNavMenuItem);
defineCustomElement(CDSSwitcher);
defineCustomElement(CDSSwitcherDivider);
defineCustomElement(CDSSwitcherItem);
