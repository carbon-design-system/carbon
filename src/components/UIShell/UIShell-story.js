import { Notification16, User16 } from '@carbon/icons-react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import React from 'react';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

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
  SkipToContent,
  SideNav,
  SideNavHeader,
  SideNavDetails,
  SideNavSwitcher,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from '../UIShell';

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

const StoryContent = () => {
  const content = Array.from({ length: 10 }, (_, i) => (
    <div key={i}>
      <h2>Title</h2>
      <p>
        Elit dolores reiciendis sit id consequuntur facere! Recusandae rerum
        sequi possimus soluta sit Facilis quidem minima sit ipsa consequuntur
        Maiores facilis dolorum suscipit velit soluta unde. Aliquam consequuntur
        cum eum
      </p>
    </div>
  ));
  return <Content id="main-content">{content}</Content>;
};

// Ideally, we'd have a <UIShell> component that could help make using these
// components much simpler. In the interim, we're going to create presentational
// components and try and piece them together to figure out what are standard
// usage patterns for each to see what kind of component API we should expose
storiesOf('[Experimental] UI Shell', module)
  .add(
    'Header',
    withReadme(readme, () => (
      <Header>
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={action('Menu clicked')}
        />
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem href="#">Catalog</HeaderMenuItem>
          <HeaderMenuItem href="#">Docs</HeaderMenuItem>
          <HeaderMenuItem href="#">Support</HeaderMenuItem>
          <HeaderMenu aria-label="Manage">
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Notifications"
            onClick={action('notification click')}>
            <Notification16 />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="Profile"
            onClick={action('user click')}>
            <User16 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    )),
    {
      info: {
        text: '[Experimental] UI Shell',
      },
    }
  )
  .add(
    'SideNav',
    withReadme(readme, () => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={action('Menu clicked')}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Catalog</HeaderMenuItem>
            <HeaderMenuItem href="#">Docs</HeaderMenuItem>
            <HeaderMenuItem href="#">Support</HeaderMenuItem>
            <HeaderMenu aria-label="Manage">
              <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification16 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Profile"
              onClick={action('user click')}>
              <User16 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
        <SideNav aria-label="Side navigation">
          <SideNavHeader icon={<Fade16 />}>
            <SideNavDetails title="Side navigation title">
              <SideNavSwitcher
                labelText="Switcher"
                onChange={action('switcher changed')}
                options={['Option 1', 'Option 2', 'Option 3']}
              />
            </SideNavDetails>
          </SideNavHeader>
          <SideNavItems>
            <SideNavLink icon={<Fade16 />} href="javascript:void(0)">
              Link
            </SideNavLink>
            <SideNavMenu
              defaultExpanded
              icon={<Fade16 />}
              isActive
              title="Category title">
              <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
              <SideNavMenuItem aria-current="page" href="javascript:void(0)">
                Link
              </SideNavMenuItem>
              <SideNavMenuItem href="javascript:void(0)">Link</SideNavMenuItem>
            </SideNavMenu>
          </SideNavItems>
        </SideNav>
        <StoryContent />
      </>
    ))
  );
