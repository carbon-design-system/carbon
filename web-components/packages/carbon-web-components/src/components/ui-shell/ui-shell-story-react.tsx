/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Fade16 from '@carbon/icons-react/es/fade/16';
import contentStyles from 'carbon-components/scss/components/ui-shell/_content.scss';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import BXSideNav, {
  SIDE_NAV_COLLAPSE_MODE,
  SIDE_NAV_USAGE_MODE,
  // @ts-ignore
} from 'carbon-web-components/es/components-react/ui-shell/side-nav';
// @ts-ignore
import BXSideNavItems from 'carbon-web-components/es/components-react/ui-shell/side-nav-items';
// @ts-ignore
import BXSideNavLink from 'carbon-web-components/es/components-react/ui-shell/side-nav-link';
// @ts-ignore
import BXSideNavDivider from 'carbon-web-components/es/components-react/ui-shell/side-nav-divider';
// @ts-ignore
import BXSideNavMenu from 'carbon-web-components/es/components-react/ui-shell/side-nav-menu';
// @ts-ignore
import BXSideNavMenuItem from 'carbon-web-components/es/components-react/ui-shell/side-nav-menu-item';
// @ts-ignore
import BXHeader from 'carbon-web-components/es/components-react/ui-shell/header';
// @ts-ignore
import BXHeaderNav from 'carbon-web-components/es/components-react/ui-shell/header-nav';
// @ts-ignore
import BXHeaderNavItem from 'carbon-web-components/es/components-react/ui-shell/header-nav-item';
// @ts-ignore
import BXHeaderMenu from 'carbon-web-components/es/components-react/ui-shell/header-menu';
// @ts-ignore
import BXHeaderMenuItem from 'carbon-web-components/es/components-react/ui-shell/header-menu-item';
// @ts-ignore
import BXHeaderMenuButton from 'carbon-web-components/es/components-react/ui-shell/header-menu-button';
// @ts-ignore
import BXHeaderName from 'carbon-web-components/es/components-react/ui-shell/header-name';
import { sideNav as baseSideNav, sideNavWithIcons as baseSideNavWithIcons, header as baseHeader } from './ui-shell-story';
import styles from './ui-shell-story.scss';

export { default } from './ui-shell-story';

/* eslint-disable no-script-url */

const updateRailExpanded = ({ collapseMode, expanded, usageMode = SIDE_NAV_USAGE_MODE.REGULAR }) => {
  document.body.classList.toggle('bx-ce-demo-devenv--with-rail', collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL);
  document.body.classList.toggle('bx-ce-demo-devenv--rail-expanded', collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL && expanded);
  document.body.classList.toggle('bx-ce-demo-devenv--with-side-nav-for-header', usageMode === SIDE_NAV_USAGE_MODE.HEADER_NAV);
};

const StoryContent = () => (
  <>
    <style type="text/css">{contentStyles.cssText}</style>
    <main className="bx--content bx-ce-demo-devenv--ui-shell-content">
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--offset-lg-3 bx--col-lg-13">
            <h2>Purpose and function</h2>
            <p>
              The shell is perhaps the most crucial piece of any UI built with Carbon. It contains the shared navigation framework
              for the entire design system and ties the products in IBM’s portfolio together in a cohesive and elegant way. The
              shell is the home of the topmost navigation, where users can quickly and dependably gain their bearings and move
              between pages.
              <br />
              <br />
              The shell was designed with maximum flexibility built in, to serve the needs of a broad range of products and users.
              Adopting the shell ensures compliance with IBM design standards, simplifies development efforts, and provides great
              user experiences. All IBM products built with Carbon are required to use the shell’s header.
              <br />
              <br />
              To better understand the purpose and function of the UI shell, consider the “shell” of MacOS, which contains the
              Apple menu, top-level navigation, and universal, OS-level controls at the top of the screen, as well as a universal
              dock along the bottom or side of the screen. The Carbon UI shell is roughly analogous in function to these parts of
              the Mac UI. For example, the app switcher portion of the shell can be compared to the dock in MacOS.
            </p>
            <h2>Header responsive behavior</h2>
            <p>
              As a header scales down to fit smaller screen sizes, headers with persistent side nav menus should have the side nav
              collapse into “hamburger” menu. See the example to better understand responsive behavior of the header.
            </p>
            <h2>Secondary navigation</h2>
            <p>
              The side-nav contains secondary navigation and fits below the header. It can be configured to be either fixed-width
              or flexible, with only one level of nested items allowed. Both links and category lists can be used in the side-nav
              and may be mixed together. There are several configurations of the side-nav, but only one configuration should be
              used per product section. If tabs are needed on a page when using a side-nav, then the tabs are secondary in
              hierarchy to the side-nav.
            </p>
          </div>
        </div>
      </div>
    </main>
  </>
);

export const sideNav = args => {
  const { collapseMode, expanded } = args?.['bx-side-nav'];
  const { href } = args?.['bx-side-nav-menu-item'];
  updateRailExpanded({ collapseMode, expanded });
  return (
    <>
      <style type="text/css">{styles.cssText}</style>
      <BXSideNav aria-label="Side navigation" collapseMode={collapseMode} expanded={expanded}>
        <BXSideNavItems>
          <BXSideNavMenu title="L0 menu">
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
          </BXSideNavMenu>
          <BXSideNavMenu title="L0 menu">
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem active aria-current="page" href={href}>
              L0 menu item
            </BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
          </BXSideNavMenu>
          <BXSideNavMenu title="L0 menu">
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
          </BXSideNavMenu>
          <BXSideNavDivider />
          <BXSideNavLink href="javascript:void(0)">L0 link</BXSideNavLink>
          <BXSideNavLink href="javascript:void(0)">L0 link</BXSideNavLink>
        </BXSideNavItems>
      </BXSideNav>
      {StoryContent()}
    </>
  );
};

Object.assign(sideNav, baseSideNav);

export const sideNavWithIcons = args => {
  const { collapseMode, expanded } = args?.['bx-side-nav'];
  const { href } = args?.['bx-side-nav-menu-item'];
  updateRailExpanded({ collapseMode, expanded });
  return (
    <>
      <style type="text/css">{styles.cssText}</style>
      <BXSideNav aria-label="Side navigation" collapseMode={collapseMode} expanded={expanded}>
        <BXSideNavItems>
          <BXSideNavMenu title="L0 menu">
            <Fade16 slot="title-icon" />
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
          </BXSideNavMenu>
          <BXSideNavMenu title="L0 menu">
            <Fade16 slot="title-icon" />
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem active aria-current="page" href={href}>
              L0 menu item
            </BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
          </BXSideNavMenu>
          <BXSideNavMenu title="L0 menu">
            <Fade16 slot="title-icon" />
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
          </BXSideNavMenu>
          <BXSideNavDivider />
          <BXSideNavLink href="javascript:void(0)">
            <Fade16 slot="title-icon" />
            L0 link
          </BXSideNavLink>
          <BXSideNavLink href="javascript:void(0)">
            <Fade16 slot="title-icon" />
            L0 link
          </BXSideNavLink>
        </BXSideNavItems>
      </BXSideNav>
      {StoryContent()}
    </>
  );
};

Object.assign(sideNavWithIcons, baseSideNavWithIcons);

export const header = args => {
  const { collapseMode, expanded, usageMode } = args?.['bx-side-nav'];
  const { href } = args?.['bx-side-nav-menu-item'];
  updateRailExpanded({ collapseMode, expanded, usageMode });
  const handleButtonToggle = event => {
    updateRailExpanded({ collapseMode, expanded: event.detail.active, usageMode });
  };
  return (
    <>
      <style type="text/css">{styles.cssText}</style>
      <BXHeader aria-label="IBM Platform Name">
        <BXHeaderMenuButton button-label-active="Close menu" button-label-inactive="Open menu" onToggle={handleButtonToggle} />
        <BXHeaderName href="javascript:void 0" prefix="IBM">
          [Platform]
        </BXHeaderName>
        <BXHeaderNav menu-bar-label="IBM [Platform]">
          <BXHeaderNavItem href="javascript:void 0">Link 1</BXHeaderNavItem>
          <BXHeaderNavItem href="javascript:void 0">Link 2</BXHeaderNavItem>
          <BXHeaderNavItem href="javascript:void 0">Link 3</BXHeaderNavItem>
          <BXHeaderMenu menu-label="Link 4" trigger-content="Link 4">
            <BXHeaderMenuItem href="javascript:void 0">Sub-link 1</BXHeaderMenuItem>
            <BXHeaderMenuItem href="javascript:void 0">Sub-link 2</BXHeaderMenuItem>
            <BXHeaderMenuItem href="javascript:void 0">Sub-link 3</BXHeaderMenuItem>
          </BXHeaderMenu>
        </BXHeaderNav>
      </BXHeader>
      <BXSideNav aria-label="Side navigation" collapseMode={collapseMode} expanded={expanded} usageMode={usageMode}>
        <BXSideNavItems>
          <BXSideNavMenu title="L0 menu">
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
          </BXSideNavMenu>
          <BXSideNavMenu title="L0 menu">
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem active aria-current="page" href={href}>
              L0 menu item
            </BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
          </BXSideNavMenu>
          <BXSideNavMenu title="L0 menu">
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
            <BXSideNavMenuItem href={href}>L0 menu item</BXSideNavMenuItem>
          </BXSideNavMenu>
          <BXSideNavDivider />
          <BXSideNavLink href="javascript:void(0)">L0 link</BXSideNavLink>
          <BXSideNavLink href="javascript:void(0)">L0 link</BXSideNavLink>
        </BXSideNavItems>
      </BXSideNav>
      {StoryContent()}
    </>
  );
};

Object.assign(header, baseHeader);
