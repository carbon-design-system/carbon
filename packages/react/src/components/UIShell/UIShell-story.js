/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';

import { Search20, Notification20, AppSwitcher20 } from '@carbon/icons-react';

import { action } from '@storybook/addon-actions';

import React, { useState } from 'react';
import { withReadme } from 'storybook-readme';
import readme from './README.md';
import HeaderContainer from './HeaderContainer';
import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
  // Temporarily comment these out until they are needed again
  // SideNavHeader,
  // SideNavDetails,
  // SideNavSwitcher,
  SideNavDivider,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
} from '../UIShell';
import Modal from '../Modal';
import Button from '../Button';

import mdx from './UIShell.mdx';

SideNav.displayName = 'SideNav';
SideNavMenu.displayName = 'SideNavMenu';
SideNavMenuItem.displayName = 'SideNavMenuItem';

const Fade16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true">
    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
  </svg>
);

const StoryContent = ({ useResponsiveOffset = true }) => {
  const [open, setOpen] = useState(false);
  const classNameFirstColumn = cx({
    'bx--col-lg-13': true,
    'bx--offset-lg-3': useResponsiveOffset,
  });
  const content = (
    <div className="bx--grid">
      <div className="bx--row">
        <div className={classNameFirstColumn}>
          <h2 style={{ margin: '0 0 30px' }}>Purpose and function</h2>
          <p>
            The shell is perhaps the most crucial piece of any UI built with
            <a href="www.carbondesignsystem.com"> Carbon</a>. It contains the
            shared navigation framework for the entire design system and ties
            the products in IBM’s portfolio together in a cohesive and elegant
            way. The shell is the home of the topmost navigation, where users
            can quickly and dependably gain their bearings and move between
            pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve
            the needs of a broad range of products and users. Adopting the shell
            ensures compliance with IBM design standards, simplifies development
            efforts, and provides great user experiences. All IBM products built
            with Carbon are required to use the shell’s header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell,
            consider the “shell” of MacOS, which contains the Apple menu,
            top-level navigation, and universal, OS-level controls at the top of
            the screen, as well as a universal dock along the bottom or side of
            the screen. The Carbon UI shell is roughly analogous in function to
            these parts of the Mac UI. For example, the app switcher portion of
            the shell can be compared to the dock in MacOS.
          </p>
          <h2 style={{ margin: '30px 0' }}>Header responsive behavior</h2>
          <p>
            As a header scales down to fit smaller screen sizes, headers with
            persistent side nav menus should have the side nav collapse into
            “hamburger” menu. See the example to better understand responsive
            behavior of the header.
          </p>
          <h2 style={{ margin: '30px 0' }}>Secondary navigation</h2>
          <p>
            The side-nav contains secondary navigation and fits below the
            header. It can be configured to be either fixed-width or flexible,
            with only one level of nested items allowed. Both links and category
            lists can be used in the side-nav and may be mixed together. There
            are several configurations of the side-nav, but only one
            configuration should be used per product section. If tabs are needed
            on a page when using a side-nav, then the tabs are secondary in
            hierarchy to the side-nav.
          </p>
          <Button onClick={() => setOpen(true)}>Launch modal</Button>
          <Modal
            modalHeading="Add a custom domain"
            modalLabel="Account resources"
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            open={open}
            onRequestClose={() => setOpen(false)}>
            <p style={{ marginBottom: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
  const style = {
    height: '100%',
  };
  if (useResponsiveOffset) {
    style.margin = '0';
    style.width = '100%';
  }
  return (
    <Content id="main-content" style={style}>
      {content}
    </Content>
  );
};

export default {
  title: 'Components/UI Shell',

  parameters: {
    docs: {
      page: mdx,
    },
    subcomponents: {
      Content,
      Header,
      HeaderMenuButton,
      HeaderName,
      HeaderNavigation,
      HeaderMenu,
      HeaderMenuItem,
      HeaderGlobalBar,
      HeaderGlobalAction,
      HeaderPanel,
      HeaderSideNavItems,
      SkipToContent,
      SideNav,
      SideNavItems,
      SideNavDivider,
      SideNavLink,
      SideNavMenu,
      SideNavMenuItem,
      Switcher,
      SwitcherItem,
      SwitcherDivider,
    },
  },
};

export const HeaderBase = withReadme(readme, () => (
  <Header aria-label="IBM Platform Name">
    <HeaderName href="#" prefix="IBM">
      [Platform]
    </HeaderName>
  </Header>
));

export const HeaderBaseWNavigation = withReadme(readme, () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="IBM Platform Name">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
          <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
          <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
          <HeaderMenu aria-label="Link 4" menuLinkName="Link 4" isCurrentPage>
            <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
            <HeaderMenuItem href="#" isCurrentPage>
              Sub-link 2
            </HeaderMenuItem>
            <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}>
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
              <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
              </HeaderMenu>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
      </Header>
    )}
  />
));

HeaderBaseWNavigation.storyName = 'Header Base w/ Navigation';

export const HeaderBaseWActions = withReadme(readme, () => (
  <Header aria-label="IBM Platform Name">
    <HeaderName href="#" prefix="IBM">
      [Platform]
    </HeaderName>
    <HeaderGlobalBar>
      <HeaderGlobalAction aria-label="Search" onClick={action('search click')}>
        <Search20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        aria-label="Notifications"
        onClick={action('notification click')}>
        <Notification20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        aria-label="App Switcher"
        onClick={action('app-switcher click')}
        tooltipAlignment="end">
        <AppSwitcher20 />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  </Header>
));

HeaderBaseWActions.storyName = 'Header Base w/ Actions';

export const HeaderBaseWSkipToContent = withReadme(readme, () => (
  <>
    <Header aria-label="IBM Platform Name">
      <SkipToContent />
      <HeaderName href="#" prefix="IBM">
        [Platform]
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Search"
          onClick={action('search click')}>
          <Search20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Notifications"
          onClick={action('notification click')}>
          <Notification20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="App Switcher"
          onClick={action('app-switcher click')}
          tooltipAlignment="end">
          <AppSwitcher20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
    <StoryContent />
  </>
));

HeaderBaseWSkipToContent.storyName = 'Header Base w/ SkipToContent';

export const HeaderBaseWNavigationAndActions = withReadme(readme, () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="IBM Platform Name">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
          <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
          <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
          <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
            <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Search"
            onClick={action('search click')}>
            <Search20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="Notifications"
            onClick={action('notification click')}>
            <Notification20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="App Switcher"
            onClick={action('app-switcher click')}
            tooltipAlignment="end">
            <AppSwitcher20 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}>
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
              <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
              </HeaderMenu>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
      </Header>
    )}
  />
));

HeaderBaseWNavigationAndActions.storyName =
  'Header Base w/ Navigation and Actions';

export const HeaderBaseWNavigationActionsAndSideNav = withReadme(readme, () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action('search click')}>
              <Search20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={action('app-switcher click')}
              tooltipAlignment="end">
              <AppSwitcher20 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
            <SideNavItems>
              <HeaderSideNavItems hasDivider={true}>
                <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                  <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderSideNavItems>
              <SideNavMenu renderIcon={Fade16} title="Category title">
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade16} title="Category title">
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                renderIcon={Fade16}
                title="Category title"
                isActive={true}>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem aria-current="page" href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                Link
              </SideNavLink>
              <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                Link
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
));

HeaderBaseWNavigationActionsAndSideNav.storyName =
  'Header Base w/ Navigation, Actions and SideNav';

export const HeaderBaseWSideNav = withReadme(readme, () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
            <SideNavItems>
              <SideNavMenu renderIcon={Fade16} title="Category title">
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                renderIcon={Fade16}
                title="Category title"
                isActive={true}>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem aria-current="page" href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade16} title="Category title">
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                Link
              </SideNavLink>
              <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                Link
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
));

HeaderBaseWSideNav.storyName = 'Header Base w/ SideNav';

export const HeaderBaseWActionsAndRightPanel = withReadme(readme, () => {
  const [expanded, setExpanded] = useState(false);

  const toggleRightPanel = () => {
    setExpanded(!expanded);
  };

  return (
    <Header aria-label="IBM Platform Name">
      <HeaderName href="#" prefix="IBM">
        [Platform]
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          tooltipAlignment="end"
          isActive={expanded}
          aria-label="Notifications"
          onClick={toggleRightPanel}>
          <Notification20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel aria-label="Header Panel" expanded={expanded} />
    </Header>
  );
});

HeaderBaseWActionsAndRightPanel.storyName =
  'Header Base w/ Actions and Right Panel with Animation';

export const HeaderBaseWActionsAndSwitcher = withReadme(readme, () => (
  <Header aria-label="IBM Platform Name">
    <HeaderName href="#" prefix="IBM">
      [Platform]
    </HeaderName>
    <HeaderGlobalBar>
      <HeaderGlobalAction aria-label="Search" onClick={action('search click')}>
        <Search20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        aria-label="Notifications"
        onClick={action('notification click')}>
        <Notification20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        aria-label="App Switcher"
        isActive
        onClick={action('app-switcher click')}
        tooltipAlignment="end">
        <AppSwitcher20 />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
    <HeaderPanel aria-label="Header Panel" expanded>
      <Switcher aria-label="Switcher Container">
        <SwitcherItem isSelected aria-label="Link 1" href="#">
          Link 1
        </SwitcherItem>
        <SwitcherDivider />
        <SwitcherItem href="#" aria-label="Link 2">
          Link 2
        </SwitcherItem>
        <SwitcherItem href="#" aria-label="Link 3">
          Link 3
        </SwitcherItem>
        <SwitcherItem href="#" aria-label="Link 4">
          Link 4
        </SwitcherItem>
        <SwitcherItem href="#" aria-label="Link 5">
          Link 5
        </SwitcherItem>
        <SwitcherDivider />
        <SwitcherItem href="#" aria-label="Link 6">
          Link 6
        </SwitcherItem>
      </Switcher>
    </HeaderPanel>
  </Header>
));

HeaderBaseWActionsAndSwitcher.storyName = 'Header Base w/ Actions and Switcher';

export const FixedSideNav = withReadme(readme, () => (
  <>
    <SideNav
      isFixedNav
      expanded={true}
      isChildOfHeader={false}
      aria-label="Side navigation">
      <SideNavItems>
        <SideNavMenu title="L0 menu">
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title="L0 menu" isActive={true}>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem aria-current="page" href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title="L0 menu">
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink href="javascript:void(0)">L0 link</SideNavLink>
        <SideNavLink href="javascript:void(0)">L0 link</SideNavLink>
      </SideNavItems>
    </SideNav>
    <StoryContent useResponsiveOffset={false} />
  </>
));

FixedSideNav.storyName = 'Fixed SideNav';

export const FixedSideNavWIcons = withReadme(readme, () => (
  <>
    <SideNav
      isFixedNav
      expanded={true}
      isChildOfHeader={false}
      aria-label="Side navigation">
      <SideNavItems>
        <SideNavMenu renderIcon={Fade16} title="Category title">
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu renderIcon={Fade16} title="Category title" isActive={true}>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem aria-current="page" href="javascript:void(0)">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu renderIcon={Fade16} title="Category title">
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
          Link
        </SideNavLink>
        <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
          Link
        </SideNavLink>
      </SideNavItems>
    </SideNav>
    <StoryContent useResponsiveOffset={false} />
  </>
));

FixedSideNavWIcons.storyName = 'Fixed SideNav w/ Icons';

export const FixedSideNavWDivider = withReadme(readme, () => (
  <>
    <SideNav
      isFixedNav
      expanded={true}
      isChildOfHeader={false}
      aria-label="Side navigation">
      <SideNavItems>
        <SideNavMenu title="L0 menu">
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title="L0 menu" isActive={true}>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem aria-current="page" href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title="L0 menu">
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavDivider />
        <SideNavLink href="javascript:void(0)">L0 link</SideNavLink>
        <SideNavLink href="javascript:void(0)">L0 link</SideNavLink>
      </SideNavItems>
    </SideNav>
    <StoryContent useResponsiveOffset={false} />
  </>
));

FixedSideNavWDivider.storyName = 'Fixed SideNav w/ Divider';

export const SideNavRail = withReadme(readme, () => (
  <>
    <SideNav aria-label="Side navigation" isRail>
      <SideNavItems>
        <SideNavMenu renderIcon={Fade16} title="Category title">
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem aria-current="page" href="javascript:void(0)">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu renderIcon={Fade16} title="Category title">
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu renderIcon={Fade16} title="Category title">
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
          Link
        </SideNavLink>
        <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
          Link
        </SideNavLink>
      </SideNavItems>
    </SideNav>
    <StoryContent />
  </>
));

SideNavRail.storyName = 'SideNav Rail';

export const SideNavRailWHeader = withReadme(readme, () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            isCollapsible
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action('search click')}>
              <Search20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={action('app-switcher click')}
              tooltipAlignment="end">
              <AppSwitcher20 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav
            aria-label="Side navigation"
            isRail
            expanded={isSideNavExpanded}
            onOverlayClick={onClickSideNavExpand}>
            <SideNavItems>
              <SideNavMenu renderIcon={Fade16} title="Category title">
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem aria-current="page" href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade16} title="Category title">
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem aria-current="page" href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade16} title="Category title">
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem aria-current="page" href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="javascript:void(0)">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                Link
              </SideNavLink>
              <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                Link
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
));

SideNavRailWHeader.storyName = 'SideNav Rail w/Header';

export const SideNavWLargeSideNavItems = withReadme(readme, () => (
  <>
    <SideNav
      expanded={true}
      isChildOfHeader={false}
      aria-label="Side navigation">
      <SideNavItems>
        <SideNavMenu title="Large menu" large>
          <SideNavMenuItem href="javascript:void(0)">Menu 1</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Menu 2</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Menu 3</SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink href="javascript:void(0)" large>
          Large link
        </SideNavLink>
        <SideNavMenu renderIcon={Fade16} title="Large menu w/icon" large>
          <SideNavMenuItem href="javascript:void(0)">Menu 1</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Menu 2</SideNavMenuItem>
          <SideNavMenuItem href="javascript:void(0)">Menu 3</SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink renderIcon={Fade16} href="javascript:void(0)" large>
          Large link w/icon
        </SideNavLink>
      </SideNavItems>
    </SideNav>
    <StoryContent />
  </>
));

SideNavWLargeSideNavItems.storyName = 'SideNav w/ large side nav items';
