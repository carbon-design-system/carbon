/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import HeaderNavigationClassic from './HeaderNavigation';
import { HeaderNavigation as HeaderNavigationNext } from './next';
import SideNavMenuClassic from './SideNavMenu';
import { SideNavMenu as SideNavMenuNext } from './next/SideNavMenu';

export Content from './Content';

export Header from './Header';
export HeaderContainer from './HeaderContainer';
export HeaderGlobalAction from './HeaderGlobalAction';
export HeaderGlobalBar from './HeaderGlobalBar';
export HeaderMenu from './HeaderMenu';
export HeaderMenuButton from './HeaderMenuButton';
export HeaderMenuItem from './HeaderMenuItem';
export HeaderName from './HeaderName';
export const HeaderNavigation = FeatureFlags.enabled('enable-v11-release')
  ? HeaderNavigationNext
  : HeaderNavigationClassic;
export HeaderPanel from './HeaderPanel';
export HeaderSideNavItems from './HeaderSideNavItems';
export Switcher from './Switcher';
export SwitcherItem from './SwitcherItem';
export SwitcherDivider from './SwitcherDivider';

export SkipToContent from './SkipToContent';

export SideNav from './SideNav';
export SideNavDetails from './SideNavDetails';
export SideNavDivider from './SideNavDivider';
export SideNavFooter from './SideNavFooter';
export SideNavHeader from './SideNavHeader';
export SideNavIcon from './SideNavIcon';
export SideNavItem from './SideNavItem';
export SideNavItems from './SideNavItems';
export SideNavLink from './SideNavLink';
export SideNavLinkText from './SideNavLinkText';
export const SideNavMenu = FeatureFlags.enabled('enable-v11-release')
  ? SideNavMenuNext
  : SideNavMenuClassic;
export SideNavMenuItem from './SideNavMenuItem';
export SideNavSwitcher from './SideNavSwitcher';
