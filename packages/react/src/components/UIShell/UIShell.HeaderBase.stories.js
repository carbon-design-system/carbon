/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import cx from 'classnames';
import {
  Content,
  Header,
  HeaderContainer,
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
  SideNavDivider,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
} from '.';
import { HeaderMenu as HeaderMenuNative } from './HeaderMenu';
import Modal from '../Modal';
import Button from '../Button';
import {
  Search,
  Notification,
  Fade,
  Switcher as SwitcherIcon,
} from '@carbon/icons-react';
import mdx from './UIShell.mdx';

/* eslint-disable react/prop-types */
const StoryContent = ({ useResponsiveOffset = true }) => {
  const [open, setOpen] = useState(false);
  const classNameFirstColumn = cx({
    'cds--col-lg-13': true,
    'cds--offset-lg-3': useResponsiveOffset,
  });
  const content = (
    <div className="cds--grid">
      <div className="cds--row">
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

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/UI Shell/Header',
  component: Header,
  subcomponents: {
    Content,
    HeaderMenuButton,
    HeaderName,
    HeaderNavigation,
    HeaderMenu: HeaderMenuNative,
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
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      hideNoControlsWarning: true,
    },
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export const HeaderWNavigation = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
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
              <HeaderMenuItem isActive href="#">
                Sub-link 2
              </HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
            onSideNavBlur={onClickSideNavExpand}>
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                  <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem isActive href="#">
                    Sub-link 2
                  </HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

HeaderWNavigation.storyName = 'Header w/ Navigation';

export const HeaderWNavigationAndActions = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu isActive aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action('search click')}>
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={action('app-switcher click')}
              tooltipAlignment="end">
              <SwitcherIcon size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
            onSideNavBlur={onClickSideNavExpand}>
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
        <StoryContent />
      </>
    )}
  />
);

HeaderWNavigationAndActions.storyName = 'Header w/ Navigation and Actions';

export const HeaderWNavigationActionsAndSideNav = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
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
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={action('app-switcher click')}
              tooltipAlignment="end">
              <SwitcherIcon size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            onSideNavBlur={onClickSideNavExpand}
            href="#main-content">
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
              <SideNavMenu
                renderIcon={Fade}
                title="Category title"
                tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 5
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 6
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 7
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                renderIcon={Fade}
                title="Category title"
                tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 8
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 9
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 10
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                renderIcon={Fade}
                title="Category title"
                isActive={true}
                tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 11
                </SideNavMenuItem>
                <SideNavMenuItem
                  aria-current="page"
                  href="https://www.carbondesignsystem.com/">
                  Link 12
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 13
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

HeaderWNavigationActionsAndSideNav.storyName =
  'Header w/ Navigation, Actions and SideNav';

export const HeaderWSideNav = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            onSideNavBlur={onClickSideNavExpand}
            href="#main-content">
            <SideNavItems>
              <SideNavMenu renderIcon={Fade} title="Category title">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                renderIcon={Fade}
                title="Category title"
                isActive={true}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem
                  aria-current="page"
                  href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade} title="Category title">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

HeaderWSideNav.storyName = 'Header w/ SideNav';

export const HeaderWActionsAndRightPanel = (args) => {
  // Add state to control panel expansion
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  // Toggle the notification panel when the icon is clicked
  const togglePanel = () => {
    setIsPanelExpanded((prev) => !prev);
  };

  // Function to close panel specifically
  const closePanel = () => {
    setIsPanelExpanded(false);
  };

  // Close the panel when Escape key is pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  };

  return (
    <>
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Search"
            onClick={action('search click')}>
            <Search size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="Notifications"
            badgeCount={args.badgeCount}
            isActive={isPanelExpanded}
            onClick={togglePanel}
            onBlur={closePanel}
            onKeyDown={handleKeyDown}
            tooltipAlignment="center"
            id="notification-button">
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="App Switcher"
            onClick={action('app-switcher click')}
            tooltipAlignment="end">
            <SwitcherIcon size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <HeaderPanel expanded={isPanelExpanded} href="#notification-button">
          {/* Notification panel content here */}
        </HeaderPanel>
      </Header>
      <StoryContent />
    </>
  );
};

HeaderWActionsAndRightPanel.storyName = 'Header w/ Actions and Right Panel';

HeaderWActionsAndRightPanel.argTypes = {
  badgeCount: {
    description:
      ' **Experimental**: Display a badge on the button. An empty/dot badge if 0, a numbered badge if > 0. Must be used with size="lg" and kind="ghost"',
    control: {
      type: 'number',
    },
  },
};

HeaderWActionsAndRightPanel.args = {
  badgeCount: 4,
};

export const HeaderWActionsAndSwitcher = (args) => (
  <HeaderContainer
    {...args}
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action('search click')}>
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label={
                isSideNavExpanded ? 'Close switcher' : 'Open switcher'
              }
              aria-expanded={isSideNavExpanded}
              isActive={isSideNavExpanded}
              onClick={onClickSideNavExpand}
              tooltipAlignment="end"
              id="switcher-button">
              <SwitcherIcon size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <HeaderPanel
            expanded={isSideNavExpanded}
            onHeaderPanelFocus={onClickSideNavExpand}
            href="#switcher-button">
            <Switcher
              aria-label="Switcher Container"
              expanded={isSideNavExpanded}>
              <SwitcherItem aria-label="Link 1" href="#">
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
        <StoryContent />
      </>
    )}
  />
);

HeaderWActionsAndSwitcher.storyName = 'Header w/ Actions and Switcher';

HeaderWActionsAndSwitcher.argTypes = {
  isSideNavExpanded: {
    defaultValue: true,
    description: 'Optional prop to display the HeaderPanel.',
  },
};
