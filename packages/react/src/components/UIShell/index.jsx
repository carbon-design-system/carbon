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

export { default as Content } from './Content';

export { default as Header } from './Header';
export { default as HeaderContainer } from './HeaderContainer';
export { default as HeaderGlobalAction } from './HeaderGlobalAction';
export { default as HeaderGlobalBar } from './HeaderGlobalBar';
export { default as HeaderMenu } from './HeaderMenu';
export { default as HeaderMenuButton } from './HeaderMenuButton';
export { default as HeaderMenuItem } from './HeaderMenuItem';
export { default as HeaderName } from './HeaderName';
export const HeaderNavigation = FeatureFlags.enabled('enable-v11-release')
  ? HeaderNavigationNext
  : HeaderNavigationClassic;
export { default as HeaderPanel } from './HeaderPanel';
export { default as HeaderSideNavItems } from './HeaderSideNavItems';
export { default as Switcher } from './Switcher';
export { default as SwitcherItem } from './SwitcherItem';
export { default as SwitcherDivider } from './SwitcherDivider';

export { default as SkipToContent } from './SkipToContent';

export { default as SideNav } from './SideNav';
export { default as SideNavDetails } from './SideNavDetails';
export { default as SideNavDivider } from './SideNavDivider';
export { default as SideNavFooter } from './SideNavFooter';
export { default as SideNavHeader } from './SideNavHeader';
export { default as SideNavIcon } from './SideNavIcon';
export { default as SideNavItem } from './SideNavItem';
export { default as SideNavItems } from './SideNavItems';
export { default as SideNavLink } from './SideNavLink';
export { default as SideNavLinkText } from './SideNavLinkText';
export const SideNavMenu = FeatureFlags.enabled('enable-v11-release')
  ? SideNavMenuNext
  : SideNavMenuClassic;
export { default as SideNavMenuItem } from './SideNavMenuItem';
export { default as SideNavSwitcher } from './SideNavSwitcher';
