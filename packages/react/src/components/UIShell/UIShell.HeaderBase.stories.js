/**
 * Copyright IBM Corp. 2016, 2026
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
            The shell is perhaps the most crucial piece of any UI built with{' '}
            <a href="https://www.carbondesignsystem.com/">Carbon</a>. It
            contains the shared navigation framework for the entire design
            system and ties the products in IBM’s portfolio together in a
            cohesive and elegant way. The shell is the home of the topmost
            navigation, where users can quickly and dependably gain their
            bearings and move between pages.
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

const headerArgs = {
  headerAriaLabel: 'IBM Cloud',
  platformName: 'Cloud console',
  platformPrefix: 'IBM',
};

const headerArgTypes = {
  headerAriaLabel: {
    control: 'text',
    description: 'Provide an accessible label for the header.',
    table: { category: 'Header' },
  },
  platformName: {
    control: 'text',
    description: 'Specify the product name displayed in the header.',
    table: { category: 'HeaderName' },
  },
  platformPrefix: {
    control: 'text',
    description: 'Specify the prefix displayed before the product name.',
    table: { category: 'HeaderName' },
  },
};

const navigationArgs = {
  navigationAriaLabel: 'IBM Cloud',
  navigationMenuLabel: 'Manage',
};

const navigationArgTypes = {
  navigationAriaLabel: {
    control: 'text',
    description: 'Provide an accessible label for the header navigation.',
    table: { category: 'HeaderNavigation' },
  },
  navigationMenuLabel: {
    control: 'text',
    description: 'Specify the label for the header navigation menu.',
    table: { category: 'HeaderMenu' },
  },
};

const sideNavArgs = {
  sideNavAriaLabel: 'Side navigation',
};

const sideNavArgTypes = {
  sideNavAriaLabel: {
    control: 'text',
    description: 'Provide an accessible label for the side navigation.',
    table: { category: 'SideNav' },
  },
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
    'aria-label': { control: false },
    'aria-labelledby': { control: false },
    children: { control: false },
    className: { control: false },
  },
};

export const HeaderWNavigation = (args) => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label={args.headerAriaLabel}>
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix={args.platformPrefix}>
            {args.platformName}
          </HeaderName>
          <HeaderNavigation aria-label={args.navigationAriaLabel}>
            <HeaderMenuItem href="#">Overview</HeaderMenuItem>
            <HeaderMenuItem href="#">Activity</HeaderMenuItem>
            <HeaderMenuItem href="#">Resource list</HeaderMenuItem>
            <HeaderMenu
              aria-label={args.navigationMenuLabel}
              menuLinkName={args.navigationMenuLabel}>
              <HeaderMenuItem href="#">Users</HeaderMenuItem>
              <HeaderMenuItem isActive href="#">
                Access groups
              </HeaderMenuItem>
              <HeaderMenuItem href="#">API keys</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <SideNav
            aria-label={args.sideNavAriaLabel}
            expanded={isSideNavExpanded}
            isPersistent={false}
            onSideNavBlur={onClickSideNavExpand}>
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenuItem href="#">Overview</HeaderMenuItem>
                <HeaderMenuItem href="#">Activity</HeaderMenuItem>
                <HeaderMenuItem href="#">Resource list</HeaderMenuItem>
                <HeaderMenu
                  aria-label={args.navigationMenuLabel}
                  menuLinkName={args.navigationMenuLabel}>
                  <HeaderMenuItem href="#">Users</HeaderMenuItem>
                  <HeaderMenuItem isActive href="#">
                    Access groups
                  </HeaderMenuItem>
                  <HeaderMenuItem href="#">API keys</HeaderMenuItem>
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

HeaderWNavigation.storyName = 'Header with Navigation';

HeaderWNavigation.args = {
  ...headerArgs,
  ...navigationArgs,
  ...sideNavArgs,
};

HeaderWNavigation.argTypes = {
  ...headerArgTypes,
  ...navigationArgTypes,
  ...sideNavArgTypes,
};

export const HeaderWNavigationAndActions = (args) => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label={args.headerAriaLabel}>
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix={args.platformPrefix}>
            {args.platformName}
          </HeaderName>
          <HeaderNavigation aria-label={args.navigationAriaLabel}>
            <HeaderMenuItem href="#">Overview</HeaderMenuItem>
            <HeaderMenuItem href="#">Activity</HeaderMenuItem>
            <HeaderMenuItem href="#">Resource list</HeaderMenuItem>
            <HeaderMenu
              isActive
              aria-label={args.navigationMenuLabel}
              menuLinkName={args.navigationMenuLabel}>
              <HeaderMenuItem href="#">Users</HeaderMenuItem>
              <HeaderMenuItem href="#">Access groups</HeaderMenuItem>
              <HeaderMenuItem href="#">API keys</HeaderMenuItem>
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
            aria-label={args.sideNavAriaLabel}
            expanded={isSideNavExpanded}
            isPersistent={false}
            onSideNavBlur={onClickSideNavExpand}>
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenuItem href="#">Overview</HeaderMenuItem>
                <HeaderMenuItem href="#">Activity</HeaderMenuItem>
                <HeaderMenuItem href="#">Resource list</HeaderMenuItem>
                <HeaderMenu
                  aria-label={args.navigationMenuLabel}
                  menuLinkName={args.navigationMenuLabel}>
                  <HeaderMenuItem href="#">Users</HeaderMenuItem>
                  <HeaderMenuItem href="#">Access groups</HeaderMenuItem>
                  <HeaderMenuItem href="#">API keys</HeaderMenuItem>
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

HeaderWNavigationAndActions.storyName = 'Header with Navigation and Actions';

HeaderWNavigationAndActions.args = {
  ...headerArgs,
  ...navigationArgs,
  ...sideNavArgs,
};

HeaderWNavigationAndActions.argTypes = {
  ...headerArgTypes,
  ...navigationArgTypes,
  ...sideNavArgTypes,
};

export const HeaderWNavigationActionsAndSideNav = (args) => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label={args.headerAriaLabel}>
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix={args.platformPrefix}>
            {args.platformName}
          </HeaderName>
          <HeaderNavigation aria-label={args.navigationAriaLabel}>
            <HeaderMenuItem href="#">Overview</HeaderMenuItem>
            <HeaderMenuItem href="#">Activity</HeaderMenuItem>
            <HeaderMenuItem href="#">Resource list</HeaderMenuItem>
            <HeaderMenu
              aria-label={args.navigationMenuLabel}
              menuLinkName={args.navigationMenuLabel}>
              <HeaderMenuItem href="#users">Users</HeaderMenuItem>
              <HeaderMenuItem href="#access-groups">
                Access groups
              </HeaderMenuItem>
              <HeaderMenuItem href="#api-keys">API keys</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action('search click')}
              tooltipAlignment="start">
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
            aria-label={args.sideNavAriaLabel}
            expanded={isSideNavExpanded}
            onSideNavBlur={onClickSideNavExpand}
            href="#main-content">
            <SideNavItems>
              <HeaderSideNavItems hasDivider={true}>
                <HeaderMenuItem href="#">Overview</HeaderMenuItem>
                <HeaderMenuItem href="#">Activity</HeaderMenuItem>
                <HeaderMenuItem href="#">Resource list</HeaderMenuItem>
                <HeaderMenu
                  aria-label={args.navigationMenuLabel}
                  menuLinkName={args.navigationMenuLabel}>
                  <HeaderMenuItem href="#">Users</HeaderMenuItem>
                  <HeaderMenuItem href="#">Access groups</HeaderMenuItem>
                  <HeaderMenuItem href="#">API keys</HeaderMenuItem>
                </HeaderMenu>
              </HeaderSideNavItems>
              <SideNavMenu renderIcon={Fade} title="Compute" tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Virtual server instances
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Kubernetes clusters
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Container registries
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade} title="Storage" tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Object storage
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  File storage
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Block storage
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                renderIcon={Fade}
                title="Manage"
                isActive={true}
                tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Users
                </SideNavMenuItem>
                <SideNavMenuItem
                  aria-current="page"
                  href="https://www.carbondesignsystem.com/">
                  Access groups
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  API keys
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Billing
              </SideNavLink>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Support
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
  'Header with Navigation, Actions and Side Nav';

HeaderWNavigationActionsAndSideNav.args = {
  ...headerArgs,
  ...navigationArgs,
  ...sideNavArgs,
};

HeaderWNavigationActionsAndSideNav.argTypes = {
  ...headerArgTypes,
  ...navigationArgTypes,
  ...sideNavArgTypes,
};

export const HeaderWSideNav = (args) => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label={args.headerAriaLabel}>
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix={args.platformPrefix}>
            {args.platformName}
          </HeaderName>
          <SideNav
            aria-label={args.sideNavAriaLabel}
            expanded={isSideNavExpanded}
            onSideNavBlur={onClickSideNavExpand}
            href="#main-content">
            <SideNavItems>
              <SideNavMenu renderIcon={Fade} title="Compute">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Virtual server instances
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Kubernetes clusters
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Container registries
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade} title="Manage" isActive={true}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Users
                </SideNavMenuItem>
                <SideNavMenuItem
                  aria-current="page"
                  href="https://www.carbondesignsystem.com/">
                  Access groups
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  API keys
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade} title="Storage">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Object storage
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  File storage
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Block storage
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Billing
              </SideNavLink>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Support
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

HeaderWSideNav.storyName = 'Header with Side Nav';

HeaderWSideNav.args = {
  ...headerArgs,
  ...sideNavArgs,
};

HeaderWSideNav.argTypes = {
  ...headerArgTypes,
  ...sideNavArgTypes,
};

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
      <Header aria-label={args.headerAriaLabel}>
        <HeaderName href="#" prefix={args.platformPrefix}>
          {args.platformName}
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

HeaderWActionsAndRightPanel.storyName = 'Header with Actions and Right Panel';

HeaderWActionsAndRightPanel.argTypes = {
  ...headerArgTypes,
  badgeCount: {
    description:
      ' **Experimental**: Display a badge on the button. An empty/dot badge if 0, a numbered badge if > 0. Must be used with size="lg" and kind="ghost"',
    control: {
      type: 'number',
    },
  },
};

HeaderWActionsAndRightPanel.args = {
  ...headerArgs,
  badgeCount: 4,
};

export const HeaderWActionsAndSwitcher = (args) => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label={args.headerAriaLabel}>
          <HeaderName href="#" prefix={args.platformPrefix}>
            {args.platformName}
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
              <SwitcherItem aria-label="Catalog" href="#">
                Catalog
              </SwitcherItem>
              <SwitcherDivider />
              <SwitcherItem href="#" aria-label="Resource list">
                Resource list
              </SwitcherItem>
              <SwitcherItem href="#" aria-label="Observability">
                Observability
              </SwitcherItem>
              <SwitcherItem href="#" aria-label="Security">
                Security
              </SwitcherItem>
              <SwitcherItem href="#" aria-label="Billing">
                Billing
              </SwitcherItem>
              <SwitcherDivider />
              <SwitcherItem href="#" aria-label="Support">
                Support
              </SwitcherItem>
            </Switcher>
          </HeaderPanel>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

HeaderWActionsAndSwitcher.storyName = 'Header with Actions and Switcher';

HeaderWActionsAndSwitcher.args = {
  ...headerArgs,
};

HeaderWActionsAndSwitcher.argTypes = {
  ...headerArgTypes,
};
