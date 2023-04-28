/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
} from '.';
import { Theme } from '../Theme';
import TextInput from '../TextInput';
import Form from '../Form';
import mdx from './UIShell.mdx';

export const StaticStylesContainer = ({ children }) => (
  <>
    <head>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    {children}
  </>
);

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/UI Shell',
  component: Header,
  subcomponents: {
    HeaderMenuButton,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    HeaderSideNavItems,
    SkipToContent,
    SideNav,
    Theme,
    Form,
    TextInput,
  },
  parameters: {
    docs: {
      page: mdx,
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

export const HeaderBaseWThemeSideNavFormAndStaticStyles = () => (
  <StaticStylesContainer>
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Theme theme="g100">
          <Header aria-label="Navigation">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="/" prefix="IBM">
              Header
            </HeaderName>
            <HeaderNavigation aria-label="Test">
              <HeaderMenuItem href="/test">Test</HeaderMenuItem>
            </HeaderNavigation>
          </Header>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}>
            <HeaderSideNavItems>
              <HeaderMenuItem href="/test">Test</HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNav>
        </Theme>
      )}
    />
    <div
      id="main-content"
      data-cy="main-content"
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: '5em',
      }}>
      <Form method="post" style={{ width: '90%', maxWidth: '65ch' }}>
        <TextInput type="text" labelText="Text Input" name="url" />
      </Form>
    </div>
  </StaticStylesContainer>
);

HeaderBaseWThemeSideNavFormAndStaticStyles.storyName =
  'Header Base w/ Theme, SideNav, Form, and Static Styles';
