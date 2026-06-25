//cspell: disable

/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import Nav from './Nav';
import NavItem from './NavItem';
import NavList from './NavList';
import mdx from './Nav.mdx';

import styles from './_storybook-styles.scss?inline';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Deprecated/Nav',
  component: Nav,
  subcomponents: {
    NavList,
    NavItem,
  },
  tags: ['autodocs'],
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (story) => (
      <Annotation
        type="deprecation-notice"
        text={
          <div>
            This component is deprecated and will be removed in the next major
            version.
          </div>
        }
      >
        {story()}
      </Annotation>
    ),
  ],
};

const Template = (args) => {
  return (
    <>
      <div style={{ width: '300px' }}>
        <Nav {...args}>
          <NavList title="Nav list 1">
            <NavItem
              key="navitem_1-1"
              element="span"
              customprop="uniqueValue"
              href="#navitem_1-1"
            >
              Nav item 1-1 (with a custom element)
            </NavItem>
            <NavItem
              key="navitem_1-2"
              onClick={action('onClick')}
              href="#navitem_1-2"
            >
              Nav item 1-2
            </NavItem>
          </NavList>
          <NavList
            title="Nav list 2 expanded on page load"
            isExpandedOnPageLoad
          >
            <NavItem key="navitem_2-1" href="#navitem_2-1">
              Nav item 2-1 - Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </NavItem>
            <NavItem key="navitem_2-2" href="#navitem_2-2">
              Nav item 2-2
            </NavItem>
          </NavList>
          <NavList title="Nav list 3">
            <NavItem key="navitem_3-1" href="#navitem_3-1">
              Nav item 3-1
            </NavItem>
            <NavItem key="navitem_3-2" href="https://www.ibm.com/">
              Nav item that is an external link and wraps to a new line
            </NavItem>
          </NavList>
        </Nav>
      </div>
    </>
  );
};

export const nav = Template.bind({});
nav.storyName = 'Default';
nav.args = {
  // TODO: Component args - https://storybook.js.org/docs/react/writing-stories/args#Nav-args
  label: 'Navigation',
  heading: 'Nav example',
  activeHref: '#',
};
